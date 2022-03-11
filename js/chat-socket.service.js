
let socket;
let userId="622208b5cf1e1da3f44e4f23";
const connectSocket = () => {
  socket = io(`${baseUrl.replace("/v1/", "")}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjIwOGI1Y2YxZTFkYTNmNDRlNGYyMyIsImRhdGUiOiIyMDIyLTAzLTExVDA2OjIwOjI3LjczNloiLCJpYXQiOjE2NDY5Nzk2MjcsImV4cCI6MTY0NzA2NjAyN30.0JpHlZICVYBtBFla1-fKbMJUaHV5UWDJeMonarFN4X8`, {
    transports: ["websocket"],
  });
  socket.on("connect", () => {
    console.log(socket.connected); 
    initilizeSocketEvents(socket);
  });
};

const initilizeSocketEvents = (socket) => {
  socket.emit('getUpdatedRoomList',{});
    socket.on('newMessage', (data) => {
        console.log("newMessageData",data)
      // updateMessageList(data.message);
    //   socket.emit('getUpdatedUserList', { userInCall: userInCall, conversation: options.channel });
    })
  
    socket.on('roomList', (data) => {
      console.log(data)
    
      
      updateUsersList(data?.rooms);
      // userListInChat(data.rooms);
      // if (data.rooms.length > 0) {
      //   chatInput(true);
      // }
    })

    socket.on('roomJoined', (data) => {
      console.log(data)
     
      updateUsersList(data.rooms);
      updateMessages(data.messages)
    })

  
   
  }
