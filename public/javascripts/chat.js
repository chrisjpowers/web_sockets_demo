$(function() {
  WebSocketDemo.init('demo_chat');
});


var WebSocketDemo = {
  init: function(channel) {
    // initialize Pusher
    WebSocket.__swfLocation = "/javascripts/support/WebSocketMain.swf";
    this.pusher = new Pusher('2f26b8b3ea8bbda5ec02', channel);
    this.pusher.bind('message_posted', this.on_message_posted);
    
    this.message_list = $("#messages");
    this.message_form = $("#message_form");
    this.message_form.submit(this.on_form_submit);
    
    this.name_field = $('#message_name');
    this.body_field = $('#message_body');
    this.submit_button = $('#submit_button');
  },
  
  // 'this' is NOT WebSocketDemo
  on_message_posted: function(data) {
    WebSocketDemo.display_message(data.name, data.body)
  },
  
  display_message: function(name, body) {
    this.message_list.prepend("<li><strong>" + sanitize(name) + 
                              ":</strong> " + sanitize(body) + "</li>");
  },
  
  // 'this' is the form element
  on_form_submit: function(event) {
    if(WebSocketDemo.name_field.val() == '') {
      alert('Please enter your name.');
    }
    else if(WebSocketDemo.body_field.val() == '') {
      alert('Please enter a message.');
    }
    else {
      WebSocketDemo.submit_button.attr('disabled', true).text('Submitting...');
      $.post('/', $(this).serialize(), function() {
        WebSocketDemo.body_field.val('');
        WebSocketDemo.submit_button.attr('disabled', false).text('Submit');
      });
    }
    event.preventDefault();
  }
};

function sanitize(str) {
  return str.replace(/</ig, '&lt;').replace(/>/ig, '&gt;');
}