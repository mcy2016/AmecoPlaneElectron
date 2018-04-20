<template>
    <div id="card">
        <div class="el-header"></div>
        <div class="el-main">
            <el-row :gutter="20">
                <el-col :span="10" :offset="7">
                    <div class="card-content bg-purple"
                         style="filter:alpha(opacity=80); -moz-opacity:0.8;
                 -khtml-opacity: 0.8; opacity: 0.8;">
                        <div class="app-location">
                            <h2>航线打卡系统</h2>
                            <div class="line"><span></span></div>
                            <div class="location" style="padding:0px">
                                <img src="../assets/logo_ameco.png" class="img-responsive" alt="">
                            </div>
                            <div class="form">
                                <el-form ref="form" :model="cardId">
                                    <el-input class="card-num" v-model="cardId.card_id" style="font-size: 25px;"
                                              prefix-icon="el-icon-message" size="medium" autofocus
                                              @keyup.enter.native="submitCard()">
                                    </el-input>
                                    <div style="margin-top: 40px"></div>
                                    <el-button type="primary" round style="width: 100%;height: 60px;font-size: 32px;
                          font-weight: lighter" @click="queryDuty()">
                                        查 询
                                    </el-button>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <!--<div style="margin-top: 20px;text-align-all: center;color: aliceblue">-->
                        <!--<h2>Ameco 贵阳分公司</h2>-->
                    <!--</div>-->
                    <div style="color: #ffffff;text-align: center; font-size: 20px;margin-top: 150px">
                        Copyright © 2017-2018. 技术支持：王 东
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="el-footer">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {card} from '../api/card'

  const {ipcRenderer} = require('electron') // TODO 如果是web打包需注释

  export default {
    name: 'user-card',
    data () {
      return {
        cardId: {
          card_id: '',
          id: ''
        }
      }
    },
    methods: {
      userCard () {
        card(this.cardId).then((res) => {
          if (res.data.code === 0) {
            this.openMessage(res.data.msg, 'success')
            this.cardId.card_id = ''
          } else {
            this.cardId.card_id = ''
            this.openMessage(res.data.msg, 'error')
          }
        }).catch((err) => {
          this.cardId.card_id = ''
          this.openMessage(err, 'error')
        })
      },
      submitCard () {
        this.userCard(this.cardId)
      },
      queryDuty () {
        if (!process.env.IS_WEB) {
          ipcRenderer.send('dutyPage') // TODO 如果是web打包需注释
        }
        // TODO electron打包需注释
        // const {href} = this.$router.resolve({
        //   path: '/duty/meal'
        // })
        // window.open(href, '用餐需求')
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      }
    }
  }
</script>

<style rel="stylesheet">
    #card {
        width: 100%;
        height: 100%;
        min-height: 960px;
        background-image: url("../assets/login-background.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
    }

    #card .el-header {
        height: 60px !important;
    }

    #card .el-main {
        margin-top: 20px;
    }

    #card .card-content {
        border-radius: 4px;
        min-height: 500px;
        max-height: 600px;

    }

    #card .app-location {
        margin: 0 auto;
        text-align: center;
        background: #323542;
        padding: 3em;
    }

    .app-location h2 {
        color: #fff;
        text-align: center;
        padding: 1em 0;
        font-size: 1.6em;
        font-weight: 300;
    }

    #card .line {
        position: relative;
    }

    #card .line span {
        position: absolute;
        top: 5%;
        left: 10%;
        background: aquamarine;
        height: 1px;
        width: 80%;
    }

    #card .location img {
        margin: 1em 0;
    }

    #card img {
        max-width: 100%;
    }

    #card .form {
        margin-top: 3em;
        left: 10%;
    }

    #card .form .el-form .card-num.el-input.el-input--medium.el-input--prefix .el-input__inner {
        background-color: #323542 !important;
        color: #fff;
        height: 50px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }

    #card .bg-purple {
        background: #323542;
    }

    #card .el-footer {
        margin-top: 50px;
        bottom: 5px;
        height: 50px;
    }
</style>