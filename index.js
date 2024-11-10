import { chatsData } from "./data";

const chatInput = document.getElementById('chat-input')
const chatBtn = document.getElementById('chat-btn')

chatBtn.addEventListener('click', function() {
    console.log(chatInput)
})

function getConversationHtml(){
    let conversationHtml = ''

    for (let chat of chatsData){
        conversationHtml = `
        <article class="chat">
            <section class="chat-inner">
                <img src="${chat.profilePic}" class="profile-pic">
                <section>
                    <p class="handle">${chat.handle}</p>
                    <p class="chat-text">${chat.chatText}</p>
                    </section>
                    <section class="chat-details">
                    <span class="chat-detail">
                        ${chat.replies.length}
                    </span>
                    <span class="chat-detail">
                        ${chat.likes}
                    </span>
                    <span class="chat-detail">
                        ${chat.shares}
                    </span>
                </section>
            </section>
        </article>
        `
    }
    return conversationHtml
}

getConversationHtml()