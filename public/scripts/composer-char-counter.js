$(document).ready(function () {
  // Executes the following code when the document is ready

  $('#tweet-text').on('input', function () {
    // Attaches an event listener to the input event of the element with ID "tweet-text"

    let inputLength = $(this).val().length;
    // Stores the length of the value entered in the "tweet-text" input field

    let remainingChars = 140 - inputLength;
    // Calculates the number of characters remaining by subtracting "inputLength" from 140

    let counter = $(this).closest('form').find('.counter');
    // Selects the element with class "counter" which is a descendant of the closest form element to "tweet-text"

    counter.text(remainingChars);
    // Updates the text content of "counter" to display the "remainingChars"

    if (remainingChars < 0) {
      // Checks if the "remainingChars" is less than 0
      counter.addClass('invalid');
      // Adds the class "invalid" to "counter" if the condition is true
    } else {
      counter.removeClass('invalid');
      // Removes the class "invalid" from "counter" if the condition is false
    }
  });
});
