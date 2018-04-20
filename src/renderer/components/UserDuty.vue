<template>
    <div class="duty">
        <el-container>
            <el-header class="user-header">航线值班人员信息管理
                <el-button size="mini" type="text" style="float: right;color: #ffffff;
                margin-right:10px;font-size:24px;line-height: 40px;"
                           @click="exitDuty()">
                    x
                </el-button>
            </el-header>
            <el-container>
                <el-aside ref="right">
                    <el-menu
                            default-active="/duty/meal"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            router>
                        <el-menu-item index="/duty/meal">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用餐需求</span>
                        </el-menu-item>
                        <el-menu-item index="/duty/info">
                            <i class="el-icon-setting"></i>
                            <span slot="title">值班人员</span>
                        </el-menu-item>
                        <el-menu-item index="/duty/search">
                            <i class="el-icon-search"></i>
                            <span slot="title">值班查询</span>
                        </el-menu-item>
                        <el-menu-item index="/duty/all">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">所有人员</span>
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
  export default {
    name: 'user-duty',
    methods: {
      handleOpen (key, keypath) {
        console.log(key, keypath)
      },
      handleClose (key, keypath) {
        console.log(key, keypath)
      },
      exitDuty () {
        window.close()
      }
    }
  }
</script>

<style scoped rel="stylesheet">
    .user-header {
        background-color: #0a4865;
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: x-large;
        color: #ffffff;
    }

    .duty .el-header {
        height: 60px;
    }
</style>