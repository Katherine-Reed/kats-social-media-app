import { chatsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const chatInput = document.getElementById('chat-input')

document.addEventListener('click', function(e) {
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.repost){
        handleRepostClick(e.target.dataset.repost)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'post-btn'){
        handlePostBtnClick()
    }
})

function handleLikeClick(chatId) {
    const targetChatObj = chatsData.filter(function(chat){
        return chat.uuid === chatId
    })[0]
    if(targetChatObj.isLiked){
        targetChatObj.likes--
    } else{
        targetChatObj.likes++
    }
    targetChatObj.isLiked = !targetChatObj.isLiked
    render()
}

function handleRepostClick(chatId){
    const targetChatObj = chatsData.filter(function(chat){
        return chat.uuid === chatId
    })[0]

    if(targetChatObj.isReposted){
        targetChatObj.reposts--
    }
    else{
        targetChatObj.reposts++
    }
    targetChatObj.isReposted = !targetChatObj.isReposted
    render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handlePostBtnClick(){
    console.log({
        handle: "@KatGrace",
        profilePic: "images/avatar.png",
        likes: 0,
        reposts: 0,
        chatText: chatInput.value,
        replies: [],
        isLiked: false,
        isReposted: false,
        uuid: uuidv4(),
    })
}

function getConversationHtml(){
    let conversationHtml = ''

    chatsData.forEach(function(chat){
        let likeIconClass = ''
        
        if(chat.isLiked){
            likeIconClass = 'liked'
        }

        let repostIconClass = ''
        
        if(chat.isReposted){
            repostIconClass = 'reposted'
        }
        
        let repliesHtml = ''

        if(chat.replies.length > 0){
            chat.replies.forEach(function(reply){
                repliesHtml+=`
<section class="chat-reply">
    <section class="chat-inner">
        <img src="${reply.profilePic}" class="profile-pic">
        <section>
            <p class="handle">${reply.handle}</p>
            <p class="chat-text">${reply.chatText}</p>
        </section>
    </section>
</section>
`
            })
        }

        conversationHtml += `
            <article class="chat">
                <section class="chat-inner">
                    <img src="${chat.profilePic}" class="profile-pic">
                    <section>
                        <p class="handle">${chat.handle}</p>
                        <p class="chat-text">${chat.chatText}</p>
                        <section class="chat-details">
                            <span class="detail">
                                <i
                                    data-reply="${chat.uuid}"
                                    class="fa-regular fa-comment-dots"
                                ></i>
                                ${chat.replies.length}
                            </span>
                            <span class="detail">
                                <i
                                data-like="${chat.uuid}"
                                class="fa-solid fa-heart ${likeIconClass}"
                                ></i>
                                ${chat.likes}
                            </span>
                            <span class="detail">
                                <i
                                    data-repost="${chat.uuid}"
                                    class="fa-solid fa-retweet ${repostIconClass}"
                                ></i>
                                ${chat.reposts}
                            </span>
                        </section>
                    </section>
                </section>
                <section id="replies-${chat.uuid}" class="hidden">
                    ${repliesHtml}
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