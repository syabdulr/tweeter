$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let inputLength = $(this).val().length;
    let remainingChars = 140 - inputLength;
    let counter = $(this).closest('form').find('.counter');
    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }
  });
});
