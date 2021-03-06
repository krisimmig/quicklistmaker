toastr.options = {
  "closeButton": true,
  "positionClass": "toast-top-center",
  "timeOut": 3000,
  "extendedTimeOut": 5000,
}


$(function() {
  var messages = $('.flash-messages').data('messages');

  for (var i = messages.length - 1; i >= 0; i--) {
    var messageType = messages[i][0];
    var messageText = messages[i][1];

    toastr[messageType](messageText);
  }
});