let userList= document.getElementById('userList');
let messagesList=document.getElementById('messageList');
let chatHeading=document.getElementById('chatHeading');
let selectedUserForChatId;
let selectedUserForChat;
let fetchedUsersList;
const joinChat=(id)=>{
    console.log(id)
    selectedUserForChatId= id;
    socket.emit('joinGroup',{conversationId:id});
    getSelectedChat(id);
}


const getSelectedChat=(id)=>{
    fetchedUsersList.forEach(element => {
        if(element._id==id){
            selectedUserForChat=element;
        }
    });
}

const updateUsersList=(usersList)=>{
    fetchedUsersList=usersList;
   
    setHtmlOfChat(usersList,'usersList');
}


const updateMessages=(messageList)=>{
    setHtmlOfChat(messageList,'messageList')
}

const setHtmlOfChat=(list,type)=>{
    if(type=='usersList'){
        userList.innerHTML='';
        for(let i=0;i<list.length;i++){
            userList.innerHTML= userList.innerHTML + `<li class="contact" onclick="joinChat('${list[i]._id}')">
            <div class="contact_items">
                <figure>
                    <img src="images/louislitt.png" alt="" />
                    <span class="contact-status online"></span>
                </figure>
                <div class="contact_info">
                    <span class="msg_time">${list[i].updatedAt?moment(new Date(list[i].updatedAt)).format('LT'):moment(new Date()).format('LT')}</span>
                    
                    <h6 class="name">${list[i].name}</h6>
                    <p class="preview"><i class="chk_icon read_icon"><svg xmlns="http://www.w3.org/2000/svg"
                                width="8.178" height="8.179" viewBox="0 0 8.178 8.179">
                                <path id="Icon_awesome-check-double" data-name="Icon awesome-check-double"
                                    d="M8.063,2.791l-.633-.633a.382.382,0,0,0-.541,0L3.064,5.984,1.285,4.2a.382.382,0,0,0-.541,0l-.634.634a.384.384,0,0,0,0,.543L2.792,8.065a.382.382,0,0,0,.541,0L8.062,3.334A.385.385,0,0,0,8.063,2.791ZM2.884,4.484a.254.254,0,0,0,.361,0L6.567,1.158a.256.256,0,0,0,0-.361L5.845.074a.254.254,0,0,0-.361,0l-2.42,2.42-.885-.886a.254.254,0,0,0-.361,0l-.724.724a.256.256,0,0,0,0,.361Z"
                                    transform="translate(0.004 0.002)" fill="#fff" />
                            </svg>
                        </i> ${list[i].message}</p>
                </div>
            </div>
        </li>`;
        }
    }else if(type=='messageList'){
        chatHeading.innerHTML='';
        chatHeading.innerHTML=chatHeading.innerHTML + `<h6 class="title">${selectedUserForChat.name}</h6>`;
        // <span>Harvey Specter</span>
        messagesList.innerHTML='';
        console.log("fdsfsdfghjd",messagesList.innerHTML)
        for(let i=0;i<list.length;i++){
            console.log(list[i].senderId==userId)
            messagesList.innerHTML = `${list[i].senderId==userId?'<li class="sent"><p>'+list[i].message+'</p></li>':'<li class="replies"><p>'+list[i].message+'</p></li>'}`+messagesList.innerHTML;
        }
    }
}

const sendMessage=()=>{
    let message=document.getElementById('textMessage').value;
	if ($.trim(message) == '') {
		return false;
	}
	$('<li class="sent"><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
    console.log('inside')
    
    console.log(message,selectedUserForChatId,1)
    socket.emit('send',{message:message,conversationId:selectedUserForChatId,type:1,mediaUrl:''});
}

const clickPress=(event) =>{
    console.log(event.keyCode)
    if (event.keyCode == 13) {
        sendMessage();
    }
}

const getPreviousMessages=async (id)=>{
    let newMessages=await get(`${APIS.GET_PREVIOUS_MESSAGES}?id=${id}`);
}



    
