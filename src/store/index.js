import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: function () {
            return { 
                test: 'test123',
                messageList: [
                    {
                        id: 1,
                        text: 'Hello'
                    },
                    {
                        id: 2,
                        text: 'Hi'
                    },
                ]
            } 
            
        },
        getters: {
            getItems: state => {
                return state.test
            },
            getMessageList: state => {
                return state.messageList
            }
        },

    });
}
