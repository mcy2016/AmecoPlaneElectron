<template>
    <div class="user-edit">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="卡号">
                <el-input v-model="form.card_id"></el-input>
            </el-form-item>
            <el-form-item label="专业">
                <el-input v-model="form.profession"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="所属班组">
                <el-select v-model="form.group" placeholder="请选择班组">
                    <el-option label="筑福" value="筑福"></el-option>
                    <el-option label="黔鹰" value="黔鹰"></el-option>
                    <el-option label="防火墙" value="防火墙"></el-option>
                    <el-option label="地平线" value="地平线"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="接送机" name="type"></el-checkbox>
                    <el-checkbox label="绕机" name="type"></el-checkbox>
                    <el-checkbox label="放行" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="性质">
                <el-radio-group v-model="form.userJob">
                    <el-radio label="直聘"></el-radio>
                    <el-radio label="勤务"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
  import {userUpdate} from '../../api/user'

  export default {
    name: 'user-edit',
    data () {
      return {
        userData: {},
        form: {
          user_id: '', // 更新User表
          username: '',
          card_id: '',
          status: 1,
          phone: '', // 联系方式
          profession: '', // 专业
          group: '',
          type: [],
          userJob: ''
        }
      }
    },

    props: {
      userItem: {
        type: Object
        // default: () => {}
      }
    },
    computed: {},
    methods: {
      onSubmit () {
        this.form.rank = this._prepareRank(this.form)
        console.log(this.form)
        userUpdate(this.form).then((res) => {
          if (res.data.code === 1) {
            this.openMessage(res.data.msg, 'success')
            this.$emit('updateSuccess')
          }
          if (res.data.code === -1) {
            this.openMessage(res.data.msg, 'danger')
          }
          console.log(res)
        })
        console.log(this.form)
      },
      _handleRank (rank) {
        if (rank === 0) {
          this.form.type = ['接送机']
        }
        if (rank === 1) {
          this.form.type = ['接送机']
        }
        if (rank === 2) {
          this.form.type = ['接送机', '绕机']
        }
        if (rank === 3) {
          this.form.type = ['接送机', '绕机', '放行']
        }
        if (rank === 4) {
          this.form.type = ['绕机', '放行']
        }
        if (rank === 5) {
          this.form.type = ['放行']
        }
      },
      _prepareRank (form) {
        let rank = null
        if (form.userJob && form.userJob === '勤务') {
          rank = 0
        } else {
          if (form.type.length === 3) {
            rank = 3
          }
          if (form.type.length === 2 && form.type.indexOf('绕机') >= 0 && form.type.indexOf('接送机') >= 0) {
            rank = 2
          }
          if (form.type.length === 2 && form.type.indexOf('绕机') >= 0 && form.type.indexOf('放行') >= 0) {
            rank = 4
          }
          if (form.type.length === 1 && form.type.indexOf('放行') >= 0) {
            rank = 5
          }
          if (form.type.length === 1 && form.type.indexOf('放行') < 0) {
            rank = 1
          }
        }
        return rank
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      },
      _handleFormData () {
        console.log(this.userItem)
        this.form.user_id = this.userItem.id
        this.form.username = this.userItem.username
        this.form.card_id = this.userItem.card_id
        this.form.phone = this.userItem.phone
        this.form.profession = this.userItem.profession
        this.form.status = this.userItem.status
        this.form.group = this.userItem.group
        this.form.userJob = this.userItem.rank === 0 ? '勤务' : '直聘'
        this._handleRank(this.userItem.rank)
      }
    },
    watch: {
      userItem (val) {
        this.form.user_id = val.id
        this.form.username = val.username
        this.form.card_id = val.card_id
        this.form.phone = this.userItem.phone
        this.form.profession = this.userItem.profession
        this.form.status = this.userItem.status
        this.form.group = val.group
        this.form.userJob = val.rank === 0 ? '勤务' : '直聘'
        this._handleRank(val.rank)
        console.log(val, this.form)
      }
    },
    created () {
      this._handleFormData()
    }
  }
</script>

<style scoped rel="stylesheet">

</style>