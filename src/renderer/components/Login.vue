<template>
    <div class="index">
        <div class="nav">
            <el-row class="menu">
                <el-col :span="24">
                    <div class="grid-content title">{{title}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content">
                        <!--<el-button type="text" @click="logout" class="logout-button">注销</el-button>-->
                    </div>
                </el-col>
            </el-row>
            <!--引入组件-->
            <login-content></login-content>
        </div>
        <div class="copy">Copyright © 2017-2018. 技术支持：王 东</div>
    </div>
</template>

<script type="text/ecmascript-6">
  import LoginContent from './Login/LoginContent'

  export default {
    name: 'login',
    data () {
      return {
        title: 'Ameco贵阳分公司航班综合信息系统'
      }
    },
    components: {LoginContent},
    methods: {}
  }
</script>

<style rel="stylesheet">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    * {
        margin: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-decoration: none;
    }

    .menu,
    .menu a {
        color: #fff;
        font-size: 1.2em;
        height: 60px;
        line-height: 60px;
        color: #fff;
        background-color: #00acdd;
    }

    .title {
        font-size: 2em;
    }

    .logout-button {
        color: #fff !important;
        font-size: inherit !important;
    }

    .copy {
        /*margin: 5px;*/
    }
</style>