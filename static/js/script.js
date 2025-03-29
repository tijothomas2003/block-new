$(function () {
  // Initialize custom scrollbar
  $('.chat-area > .chat-list').jScrollPane({
    mouseWheelSpeed: 30,
  })

  // Connect to the WebSocket server
  const socket = io('https://block-new-wkus.onrender.com')

  // Function to update chat scroll
  function updateChatScroll() {
    var chat = $('.chat-area > .chat-list')
    chat.data('jsp').scrollToBottom()
  }

  // Receive messages from the server
  socket.on('message', (data) => {
    const chatList = $('.chat-area > .chat-list > ul')
    chatList.append(`<li>${data}</li>`)

    // Refresh jScrollPane and scroll to the bottom
    $('.chat-area > .chat-list').jScrollPane().data('jsp').scrollToBottom()
  })

  // Send message when button is clicked
  $('#sendButton').on('click', function () {
    const messageInput = $('#messageInput')
    const message = messageInput.val().trim()

    if (message !== '') {
      socket.emit('message', message)
      messageInput.val('') // Clear input field
    }
  })

  // Send message when Enter key is pressed
  $('#messageInput').on('keypress', function (e) {
    if (e.which === 13) {
      // Enter key
      $('#sendButton').click()
    }
  })
})
