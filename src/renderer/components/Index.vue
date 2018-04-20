<template>
    <div class="home">
        <h1 style="margin-top:100px;font-size: 44px;text-align: center;color: #ffffff;">
            Amceo贵阳分公司航班信息系统
        </h1>
        <div style="margin-top: 40px;margin-bottom:40px;text-align: center">
            <img src="@/assets/logo_ameco.png" alt="logo">
        </div>

        <div style="margin-bottom: 260px"></div>
        <el-row :gutter="20">
            <div class="hx" @click="routerHx()">
                <el-col :span="6">
                    <img class="btnImg" src="@/assets/air.png" alt="航线排班">
                    <div style="font-size: x-large">航线排班</div>
                </el-col>
            </div>
            <div class="hx" @click="routerMcc()">
                <el-col :span="6">
                    <img class="btnImg" src="@/assets/air.png" alt="MCC">
                    <div style="font-size: x-large">MCC</div>
                </el-col>
            </div>
            <div class="hx">
                <el-col :span="6">
                    <img class="btnImg" src="@/assets/air.png" alt="特种车">
                    <div style="font-size: x-large">特种车</div>
                    <div>（意见收集）</div>
                </el-col>
            </div>
            <div class="hx" @click=routerScreen()>
                <el-col :span="6">
                    <img class="btnImg" src="@/assets/air.png" alt="大屏幕">
                    <div style="font-size: x-large">大屏幕</div>
                </el-col>
            </div>
        </el-row>

        <div style="margin-top: 100px"></div>

        <div style="color: #ffffff;text-align: center; font-size: 20px;margin-top: 150px">
            Copyright © 2017-2018. 技术支持：王 东
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index',
    methods: {
      routerHx () {
        this.$router.push({
          path: '/hx'
        })
      },
      routerMcc () {
        this.$router.push({
          path: '/mcc'
        })
      },
      routerScreen () {
        this.$router.push({
          path: '/screen'
        })
      }
    },
    created () {
      document.body.setAttribute('class', 'bodyIndex')
    },
    mounted () {
      document.body.setAttribute('class', 'bodyIndex')
    }
  }
</script>

<style rel="stylesheet">
    body.bodyIndex {
        /*background-color: #F0F0F0;*/
        background-image: url("../assets/login-background.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
    }

    .home {

    }

    .btnImg {
        width: 100px;
        height: 100px;
    }

    @keyframes hx {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        50.01% {
            opacity: 0;
        }
        /* 注意这里定义50.01%立刻透明度为０，可以设置闪烁效果 */
        100% {
            opacity: 0.5;
        }
    }

    .hx {
        text-align: center;
        color: #ffffff;
        opacity: 1;
    }

    .hx :hover {
        text-align: center;
        cursor: pointer;
        animation: hx .75s linear infinite;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: hx .75s linear infinite;
        -moz-animation: hx .75s linear infinite;
        -ms-animation: hx .75s linear infinite;
        -o-animation: hx .75s linear infinite;
        color: yellow;
        font-weight: bold;
    }
</style>