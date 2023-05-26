// Once the document is ready, this code runs.
$(document).ready(() => {
  // This function loads existing tweets from the server.
  loadTweets();
  // Event listener to handle form submission (tweet creation).
  $('form').on('submit', handleFormSubmission);

  // Event listener for clicking the double arrow, which triggers a scroll action.
  $('.fa-angle-double-down').on('click', function () {
    // Scrolls the view to the new tweet section smoothly.
    $('html, body').animate({
      scrollTop: $(".new-tweet").offset().top
    }, 'slow');
  });
});

// Handles form submission events.
const handleFormSubmission = function (event) {
  // Prevents the default form submission action.
  event.preventDefault();

  // Gets the textarea input from the form.
  const textarea = $(this).find("textarea");
  // Validates the content of the textarea.
  const errorMessage = validateTextArea(textarea.val());

  // If there's an error, shows the error and ends the function.
  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  // If there's no error, submits the tweet.
  submitTweet(textarea);
};

// Checks if the text in the textarea is valid (has content and is not too long).
const validateTextArea = function (text) {
  if (text.length < 1) {
    return "Need to have characters!";
  }

  if (text.length > 140) {
    return "You have exceeded the character amount";
  }

  return null;
};

// Shows error messages.
const showError = function (message) {
  // Hides the error container fast, changes the error message, then shows the container fast.
  $('.error-container').slideUp('fast', function () {
    $('.error-message').text(message);
    $('.error-container').slideDown('fast');
  });
};

// Sends the tweet to the server.
const submitTweet = function (textarea) {
  // Serializes the textarea content to be sent to the server.
  const formData = $(textarea).serialize();

  // AJAX request to send the data to the server.
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
    success: () => {
      // Reloads tweets and clears the textarea after successful submission.
      loadTweets();
      $(textarea).val('');
    },
    error: () => {
      // Logs an error message in the console if the submission fails.
      console.log('Error occurred while sending data to the server!');
    }
  });
};

// Escapes HTML characters to prevent XSS attacks.
const escape = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates a tweet element with the provided data.
const createTweetElement = function (tweetData) {
  const { avatars, name, handle } = tweetData.user;
  const { text } = tweetData.content;
  const createdAt = timeago.format(tweetData.created_at);

  // Escapes the text of the tweet.
  const escapedText = escape(text);

  return $(`
    <article class="tweet" style="margin-left: 10px; margin-right: 10px;">
      <div class="tweet-header">
        <div class="icon-container">
          <img src="${avatars}">
          <div class="username">${name}</div>
        </div>
        <div class="handle">${handle}</div>
      </div>
      <p class="tweet-content">${escapedText}</p>
      <footer class="tweet-footer">
        <div class="time-ago">${createdAt}</div>
        <div class="tweet-actions">
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
          <i class="fa fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
};

// Renders all tweets to the tweets container.
const renderTweets = function (tweets) {
  // Clears the tweet container.
  $('#tweets-container').empty();
  // Appends each tweet to the tweet container in reverse order (newest first).
  tweets.reverse().forEach(tweet => $('#tweets-container').append(createTweetElement(tweet)));
};

// Fetches tweets from the server.
const loadTweets = function () {
  // AJAX request to fetch the tweets.
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (data) {
      // Renders the fetched tweets.
      renderTweets(data);
    },
    error: function () {
      // Logs an error message in the console if the fetch fails.
      console.log('Error occurred while fetching tweets from the server!');
    }
  });
};