<template>
    <div id="app">
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view></router-view>
        </keep-alive>
        <!-- 这里不会被keepalive -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
  export default {
    name: 'ameco-plane'
  }
</script>

<style>
    /* CSS */
    #app {
        width: 100%;
        overflow-x: hidden
    }

    ::-webkit-scrollbar {
        width: 1px;
    }

    /* 滚动槽 */

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #dddee1;
        border-radius: 10px;
    }

    /* 滚动条滑块 */

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #dddee1;
        -webkit-box-shadow: inset 0 0 6px #dddee1;
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background: #dddee1;
    }
</style>
