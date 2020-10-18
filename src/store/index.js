import Vue from 'vue';
import Vuex from 'vuex';

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
            state.allMessages.push(data);
        },
        SOCKET_updateUsers(state, users){
            state.users = users
        }
    },

});


