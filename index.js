import { chatsData } from "./data.js";

const chatInput = document.getElementById('chat-input')
const chatBtn = document.getElementById('chat-btn')

chatBtn.addEventListener('click', function() {
    console.log(chatInput)
})

function getConversationHtml(){
    let conversationHtml = ''

    chatsData.forEach(function(chat){
        conversationHtml += `
<article class="chat">
    <section class="chat-inner">
        <img src="${chat.profilePic}" class="profile-pic">
        <section>
            <p class="handle">${chat.handle}</p>
            <p class="chat-text">${chat.chatText}</p>
            <section class="chat-details">
                <span class="detail">
                    <i class="fa-regular fa-comment-dots"></i>
                    ${chat.replies.length}
                </span>
                <span class="detail">
                    <i class="fa-solid fa-heart"></i>
                    ${chat.likes}
                </span>
                <span class="detail">
                    <i class="fa-solid fa-retweet"></i>
                    ${chat.shares}
                </span>
            </section>
        </section>
    </section>
</article>
`
    })
    return conversationHtml
}

function render(){
    document.getElementById('conversation').innerHTML = getConversationHtml()
}

render()