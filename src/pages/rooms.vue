<template>
  <f7-page name="rooms">
    <f7-navbar title="Rooms"></f7-navbar>
    {{ 123 }} {{ getItems }} {{ test }}
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        test: this.$store.getters.getItems
      };
    },
    computed: {
      getItems(){
        return this.$store.getters.getItems
      }
    }
  };
</script>
