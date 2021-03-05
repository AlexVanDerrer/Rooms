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
            if (data.name == 'AdminBot'){
                state.allMessages.push(data);
            } else {
                let cipherName  = CryptoJS.AES.decrypt(data.name, state.user.room);
                let cipherText  = CryptoJS.AES.decrypt(data.text, state.user.room);
                data.name = cipherName.toString(CryptoJS.enc.Utf8);
                data.text = cipherText.toString(CryptoJS.enc.Utf8);
                state.allMessages.push(data);
            }
        },
        SOCKET_updateUsersList(state, users){
            state.users = [];
            state.users = users;
            // console.log('updateUser', state.users);
        }
    },

});


