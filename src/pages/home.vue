<template>
    <f7-page name="home">
        <!-- Top Navbar -->
        <f7-navbar large :sliding="false">
        <!-- <f7-nav-left>
            <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
        </f7-nav-left> -->
        <f7-nav-title sliding>PrivateChat</f7-nav-title>
        <!-- <f7-nav-right>
            <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
        </f7-nav-right> -->
        <f7-nav-title-large>PrivateChat</f7-nav-title-large>
        </f7-navbar>

        <!-- Page content-->
        <f7-block strong>
        <p>This is an example of tabs-layout application. The main point of such tabbed layout is that each tab contains independent view with its own routing and navigation.</p>

        <p>Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or without navbar like this tab.</p>
        </f7-block>

        <f7-block-title>Simple List</f7-block-title>
        <f7-list simple-list >
            <f7-list-item v-for="list in messageList" :key="list.id" :title="list.text"></f7-list-item>
        </f7-list>

    </f7-page>
</template>
<script>
const ws = new WebSocket('ws://localhost:3000');

export default {
    computed: {
        messageList(){
        return this.$store.getters.getMessageList
        },
        
    }
}
</script>