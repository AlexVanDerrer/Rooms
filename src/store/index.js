import Vue from 'vue';
import Vuex from 'vuex';
import CryptoJS from 'crypto-js';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { 
        user: {},
        allMessages: [],
        users: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            console.log('setuser', state.user);
        },
        clearData(state){
            state.user = {};
            state.allMessages = [];
            state.users = []
        },
        SOCKET_newMessage(state, data){
            let message = data;
            // console.log('message.text', message.text);
            let cipherName  = CryptoJS.AES.decrypt(message.name, CryptoJS.MD5('rooms-security').toString());
            let cipherText  = CryptoJS.AES.decrypt(message.text, CryptoJS.MD5('rooms-security').toString());
            message.name = cipherName.toString(CryptoJS.enc.Utf8);
            message.text = cipherText.toString(CryptoJS.enc.Utf8);
            // console.log('decrypt text', message.text);
            state.allMessages.push(message);

        },
        SOCKET_updateUsersList(state, users){
            state.users = users,
            console.log('updateUser', state.users);
        }
    },

});


