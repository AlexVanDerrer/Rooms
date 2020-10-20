<template>
    <f7-app :params="f7params" theme-dark>
        <f7-view id="view-home" main url="/"></f7-view>
    </f7-app>
</template>
<script>
import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
import cordovaApp from '../js/cordova-app.js';
import routes from '../js/routes.js';

export default {
    data() {
    return {
        // Framework7 Parameters
        f7params: {
            id: 'io.framework7.myapp', // App bundle ID
            name: 'Rooms:', // App name
            theme: 'auto', // Automatic theme detection

            // App root data
            data: function () {
                return {}
            },
            // App routes
            routes: routes,
            // Input settings
            input: {
                scrollIntoViewOnFocus: Device.cordova && !Device.electron,
                scrollIntoViewCentered: Device.cordova && !Device.electron,
            },
            // Cordova Statusbar settings
            statusbar: {
                iosOverlaysWebView: true,
                androidOverlaysWebView: false,
            },
        },
    }
    },
    mounted() {
    this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
        cordovaApp.init(f7);
        }
        // Call F7 APIs here
    });
    }
}
</script>

<style lang="less">
    :root {
        --f7-theme-color: #b29a65;
        --f7-theme-color-rgb: 178, 154, 101;
        --f7-theme-color-shade: #9f864f;
        --f7-theme-color-tint: #c0ac80;
    }
</style>