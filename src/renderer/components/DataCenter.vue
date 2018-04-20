<template>
    <div class="data-center">
        <el-container>
            <el-header class="user-header">航班数据管理
                <el-button size="mini" type="text" style="float: right;color: #ffffff;
                margin-right:10px;font-size:24px;line-height: 40px;"
                           @click="exit()">
                    <i class="el-icon-close close-button"></i>
                </el-button>
            </el-header>
            <el-container>
                <el-aside ref="right" width="200px">
                    <el-menu
                            default-active="/data-center/flight-time"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            router>
                        <el-menu-item index="/data-center/flight-time">
                            <i class="el-icon-time"></i>
                            <span slot="title">飞行时间</span>
                        </el-menu-item>
                        <el-menu-item index="/data-center/flight-route">
                            <i class="el-icon-setting"></i>
                            <span slot="title">航段维护</span>
                        </el-menu-item>
                        <el-menu-item index="/data-center/ac-type-data">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">机型数据</span>
                        </el-menu-item>
                        <el-menu-item index="/data-center/user-info">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">人员数据</span>
                        </el-menu-item>
                        <el-menu-item index="/data-center/data-analysis">
                            <i class="el-icon-warning"></i>
                            <span slot="title">数据分析</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <transition>
                    <el-main>
                        <transition>
                            <router-view></router-view>
                        </transition>
                    </el-main>
                </transition>
            </el-container>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    name: 'data-center',
    methods: {
      handleOpen (key, keypath) {
        console.log(key, keypath)
      },
      handleClose (key, keypath) {
        console.log(key, keypath)
      },
      exit () {
        this.setUsername('')
        this.setPassword('')
        window.close()
      },
      ...mapMutations({
        'setUsername': 'SET_USERNAME',
        'setPassword': 'SET_PASSWORD'
      })
    }
  }
</script>

<style scoped rel="stylesheet">
    .data-center .user-header {
        background-color: #0a4865;
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: x-large;
        color: #ffffff;
    }

    .data-center .el-header {
        height: 60px;
    }

    .data-center .close-button:hover {
        color: orangered;
    }
</style>