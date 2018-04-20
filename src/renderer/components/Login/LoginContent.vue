<template>
    <div class="index-content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;font-size:1.8em">系统登录</span>
            </div>
            <div class="login-text">
                <span>该项目是Ameco贵阳分公司用于生产的一个综合服务平台</span>
            </div>
            <el-form :model="formData" ref="formData" label-width="100px" class="login-form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"
                              @keyup.enter.native="submitForm('formData')"></el-input>
                </el-form-item>
                <el-form-item label="密  码" prop="password" v-model="formData">
                    <el-input type="password" v-model="formData.password" auto-complete="off"
                              @keyup.enter.native="submitForm('formData')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('formData')">登录</el-button>
                    <el-button type="primary" @click="submitCancle()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {login} from '../../api/user'

  export default {
    name: 'login-content',
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          // 必需
          callback()
        }
      }
      return {
        formData: {
          username: '',
          password: ''
        },
        rule: {
          token: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'username',
        'password'
      ])
    },
    methods: {
      submitForm (formData) {
        this.$refs[formData].validate((valid) => {
          console.log(this.formData)
          if (valid) {
            login(this.formData).then((res) => {
              console.log(res)
              if (res.data.code !== 0) {
                this.openMessage(res.data.msg, 'error')
              } else {
                // this.$store.commit(Mutations.LOGIN, this.formData.token)
                this.openMessage(res.data.msg, 'success')
                this.setPassword(this.formData.password)
                this.setUsername(this.formData.username)
                let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                // 编程式导航
                this.$router.push({
                  path: redirect // '/duty/meal'
                })
                console.log(this.password, redirect)
              }
            })
          } else {
            return false
          }
        })
      },
      submitCancle () {
        this.setPassword('')
        this.setUsername('')
        window.close()
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      },
      ...mapMutations({
        setUsername: 'SET_USERNAME',
        setPassword: 'SET_PASSWORD'
      })
    }
  }
</script>

<style rel="stylesheet">
    .login-text {
        margin: 10px 0 20px 0;
        font-size: 18px;
        text-align: center;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }

    .login-bottom {
        margin-top: 20px;
    }

    .login-form {
        margin: 20px;
        width: 450px;
    }

    .box-card {
        margin: 100px auto 50px auto;
        width: 600px;
    }
</style>