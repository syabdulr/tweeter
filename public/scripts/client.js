// Initialize when document is ready
$(document).ready(() => {
  // Load tweets when the page loads
  loadTweets();
  // Handle form submission events
  $('form').on('submit', handleFormSubmission);
});

// Handle form submission
const handleFormSubmission = function(event) {
  event.preventDefault();
  const textarea = $(this).find("textarea");
  const errorMessage = validateTextArea(textarea.val());
  
  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  submitTweet(textarea);
};

// Validate text area input
const validateTextArea = function(text) {
  if (text.length < 1) {
    return "Need to have characters!";
  }

  if (text.length > 140) {
    return "You have exceeded the character amount";
  }

  return null;
};

// Show error message
const showError = function(message) {
  $('.error-container').slideUp('fast', function() {
    $('.error-message').text(message);
    $('.error-container').slideDown('fast');
  });
};

// Submit tweet via AJAX
const submitTweet = function(textarea) {
  const formData = $(textarea).serialize();
  
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
    success: () => {
      console.log('Data successfully sent to the server!');
      loadTweets();
      $(textarea).val('');
    },
    error: () => {
      console.log('Error occurred while sending data to the server!');
    }
  });
};

// Escape special characters in text
const escape = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create a tweet element from tweet data
const createTweetElement = function(tweetData) {
  const { avatars, name, handle } = tweetData.user;
  const { text } = tweetData.content;
  const createdAt = timeago.format(tweetData.created_at);
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

// Render tweets on the page
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  tweets.reverse().forEach(tweet => $('#tweets-container').append(createTweetElement(tweet)));
};

// Load tweets from the server
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(data) {
      renderTweets(data);
    },
    error: function() {
      console.log('Error occurred while fetching tweets from the server!');
    }
  });
};
