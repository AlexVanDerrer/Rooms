<template>
    <f7-page name="home">
        <!-- Top Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>rooms:
                <span class="subtitle" style="color: gray; font-size: 12px;">status: <span :style="'color: '+status[1] ">{{ status[0] }}</span></span>
            </f7-nav-title>
            <f7-nav-right>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>
            <div class="chat-message"></div>
        </f7-block>

        <f7-block>
              <f7-input
                    type="text"
                    resizable
                    placeholder="text"
                   @input="message = $event.target.value"
                >
                </f7-input>
        </f7-block>

        <f7-block>
            <f7-row tag="p">
                <f7-col tag="span">
                    <f7-button raised outline round @click="sendMsg()">Send</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>

    </f7-page>
</template>
<script>
export default {
    data(){
        return {
            message: "",
            status: [],
            ws: {}
        }
    },
    methods: {
        sendMsg() {
            this.ws.send(this.message);
            this.message = "";
        },
        printMsg(val){
            const elList = document.querySelector('.chat-message');
            const msg = document.createElement('p');
            msg.innerHTML = "> "+val;
            elList.appendChild(msg);
        },
        setStatus(msg, color = ""){
            this.status.push(msg);
            this.status.push(color);
            return this.status;
        }
    },
    mounted(){
        this.ws = new WebSocket('ws://192.168.0.15:3000');
        this.ws.onopen = () => { this.setStatus('ONLINE', 'green') }
        this.ws.onclose = () => { this.setStatus('OFFLINE', 'red') }
        this.ws.onmessage = response => { 
            this.printMsg(response.data)
        }
    }
}
</script>