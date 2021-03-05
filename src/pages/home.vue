<template>
    <f7-page name="home">
        <!-- Top Navbar -->
        <template v-if="!auth">
            <f7-navbar>
                <f7-nav-title >rooms:
                    <span class="subtitle" style="color: gray; font-size: 12px;">server: <span :style='"color:"+ serverStatus.color'>{{ serverStatus.text }}</span></span>
                </f7-nav-title>
                <f7-nav-right>
                    <f7-link icon-ios="f7:info" icon-aurora="f7:help_outline" icon-md="material:help_outline" href="/about/"></f7-link>
                </f7-nav-right>

            </f7-navbar>

            <f7-list inset>
                <f7-list-input
                    autofocus
                    outline
                    label="login"
                    floating-label
                    type="text"
                    placeholder="Your login"
                    clear-button
                    required
                    validate
                    @input="name = $event.target.value"
                ></f7-list-input>

                <f7-list-input
                    outline
                    label="room"
                    floating-label
                    type="text"
                    placeholder="Your room"
                    clear-button
                    required
                    validate
                    @input="room = $event.target.value"
                ></f7-list-input>

            </f7-list>

            <f7-block>
                <f7-row>
                    <f7-col> </f7-col>
                    <f7-col>
                        <f7-button outline @click="submit()"><div v-show="preloader" class="preloader" style="width: 25px; height: 25px; margin-right: 20px"></div>Login</f7-button>
                    </f7-col>
                    <f7-col></f7-col>
                </f7-row>
            </f7-block>
        </template>

        <template v-else>
            <f7-navbar>
                <f7-nav-left>
                    <f7-link icon-ios="f7:arrow_back" icon-aurora="f7:back" icon-md="material:arrow_back" @click="exit()"></f7-link>
                    
                </f7-nav-left>
                <f7-nav-title>rooms: {{ user.room }}
                     <span class="subtitle" style="color: gray; font-size: 12px;">status: <span :style='"color:"+ serverStatus.color'>{{ serverStatus.text }}</span></span>
                </f7-nav-title>
                <f7-nav-right>
                    <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
                </f7-nav-right>
            </f7-navbar>

            <chat :allMessages="allMessages"/>

            <f7-panel right resizable theme-dark>
                <f7-view>
                    <f7-page>
                        <f7-block-title>Users in the room {{ users.length }}</f7-block-title>
                            <f7-list>
                                <f7-list-item v-for="u in users" :key="u.id" :title="u.name">
                                    <template >
                                        <f7-icon v-if="u.isAdmin" slot="media" size="32" ios="f7:house" aurora="f7:house" md="material:stars"></f7-icon>
                                        <f7-toggle v-if="user.id == u.id && u.isAdmin" slot="after" @change="closeRoom()"></f7-toggle>
                                    </template>

                                </f7-list-item>
                            </f7-list>
                    </f7-page>
                </f7-view>
            </f7-panel>
        </template>

    </f7-page>
</template>
<script>
import CryptoJS from 'crypto-js'
import { mapMutations, mapState } from 'vuex';
import Chat from '../components/chat';

export default {
    sockets: {
        connect() {
            this.serverStatus = { text: 'ONLINE', color: 'green'}
        },
        disconnect(){
            this.serverStatus = { text: 'OFFLINE', color: 'red'}
        }
    },
    data: () => ({
        auth: false,
        name: "",
        room: "",
        serverStatus: { text: 'Connecting...', color: 'yellow'},
        preloader: false 
    }),
    computed: {
        ...mapState(['user', 'allMessages', 'users']),
    }, 
    methods: {
        ...mapMutations(['setUser', 'clearData']),
        submit(){
            // console.log('submit');
            // console.log(this.users.length);

            const user = {
                name: this.name,
                room: this.room
            }
            
            this.$socket.emit('userJoined', user, data => {
                if(typeof data === 'string'){
                    // выводить всплывающее сообщение
                    console.log(data);
                } else {
                    // console.log('submit ok');
                    user.id = data.userId
                    user.roomName = this.room;
                    this.setUser(user);
                    this.preloader = true
                    setTimeout(() => {
                        this.preloader = false
                        this.auth = true
                    }, 1000);
                    
                }
            })
        },
        exit(){
            this.$socket.emit('userlogout', this.user.id, () => {
                this.clearData();
                this.auth = false;
            })

        },
        closeRoom(){
            console.log('close room');
        }
    },
    components: {
        chat: Chat
    }
}
</script>