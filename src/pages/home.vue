<template>
    <f7-page name="home">
        <!-- Top Navbar -->
    <f7-navbar>
        <f7-nav-title >rooms:
            <span class="subtitle" style="color: gray; font-size: 12px;">status: <span style='color: red'>OFFLINE</span></span>
        </f7-nav-title>
        <f7-nav-right>
            <f7-link icon-ios="f7:gear" icon-aurora="f7:gear" icon-md="material:settings" href="/settings/"></f7-link>
        </f7-nav-right>

    </f7-navbar>

<f7-list>
  <f7-list-input
    outline
    label="login"
    floating-label
    type="text"
    placeholder="Your login"
    clear-button
  >
    <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
  </f7-list-input>
  <f7-list-input
    outline
    label="room"
    floating-label
    type="text"
    placeholder="Your room"
    clear-button
  >
    <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
  </f7-list-input>
</f7-list>

<f7-block>
  <f7-row>
    <f7-col> </f7-col>
    <f7-col>
        
        <f7-link href="/chatroom/">Login</f7-link>
        
    </f7-col>
    <f7-col></f7-col>
  </f7-row>
</f7-block>




    </f7-page>
</template>
<script>


export default {
    
}
</script>