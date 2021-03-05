<template>
<f7-page>
    <f7-messagebar
    placeholder="Message"
    ref="messagebar"
    >
    <f7-link
        icon-ios="f7:arrow_up_circle_fill"
        icon-aurora="f7:arrow_up_circle_fill"
        icon-md="material:send"
        slot="inner-end"
        @click="sendMessage"
    ></f7-link>
    </f7-messagebar>
    
    <f7-messages ref="messages">
    <f7-messages-title>	&#128274; The room is protected by end-to-end encryption. <br>All text and names are transmitted in encrypted form. <br>No one but you and your interlocutors can read them.</f7-messages-title>
    <f7-messages-title><b>{{ date }}</b></f7-messages-title>
    <f7-message
        v-for="(message, index) in messageData"
        :key="index"
        :type="message.type"
        :avatar="message.avatar"
        :first="isFirstMessage(message, index)"
        :last="isLastMessage(message, index)"
        :tail="isTailMessage(message, index)"
    >
        <span slot="name">{{ message.name}}</span>

        <span slot="text" v-if="message.name == 'AdminBot'"><span style="color: yellow">{{message.text }}</span></span>
        <span slot="text" v-else-if="message.text && message.name">{{ message.text }}</span>


    </f7-message>

    </f7-messages>
</f7-page>
</template>
<script>
import fulldate from 'moment';
import CryptoJS from 'crypto-js'

export default {
    props: {
        allMessages: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            attachments: [],
            typingMessage: null,
            messagesData: this.allMessages,
            responseInProgress: false,
        };
    },
    computed: {
        messageData(){
            const self = this;
            return self.allMessages;
        },
        date() {
            let date = fulldate();
            date.lang('en');
            return date.format('dddd, MMMM DD YYYY, HH:mm')
        }
    },
    mounted() {
        const self = this;
        self.$f7ready(() => {
            self.messagebar = self.$refs.messagebar.f7Messagebar;
            self.messages = self.$refs.messages.f7Messages;
        });
    },
    methods: {
        isFirstMessage(message, index) {
            const self = this;
            const previousMessage = self.messagesData[index - 1];
            if (message.isTitle) return false;
            if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
            return false;
        },
        isLastMessage(message, index) {
            const self = this;
            const nextMessage = self.messagesData[index + 1];
            if (message.isTitle) return false;
            if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
            return false;
        },
        isTailMessage(message, index) {
            const self = this;
            const nextMessage = self.messagesData[index + 1];
            if (message.isTitle) return false;
            if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
            return false;
        },
        sendMessage() {
            const self = this;
            const text = self.messagebar.getValue().trim();
            const messageToSend = {};

            if (text.length && text != '') {
                self.messagebar.focus();
                messageToSend.id = self.$store.state.user.id;
                messageToSend.text = text;
            } else {
                return;
            }
            self.messagebar.clear();
            
            // Send message
            messageToSend.text = CryptoJS.AES.encrypt(messageToSend.text, self.$store.state.user.room).toString();
            // console.log('messageToSend', messageToSend);
            self.$socket.emit('createMessage', messageToSend, data => {
                if(typeof data === "string"){
                    console.error(data);
                }
            })


        },
    },
};
</script>