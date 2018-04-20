<template>
    <div class="edit">
        <el-table
                ref="multipleTable"
                :data="dutyUsers"
                border
                tooltip-effect="dark"
                style="width: 90%;">
            <el-table-column
                    label="序号"
                    width="60">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="100">
                <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <el-table-column
                    label="卡号"
                    width="140">
                <template slot-scope="scope">{{ scope.row.card_id }}</template>
            </el-table-column>
            <el-table-column
                    label="班制"
                    width="80">
                <template slot-scope="scope">{{ scope.row.shift===2 ? '白班':'晚班'}}</template>
            </el-table-column>

            <el-table-column
                    label="打卡时间">
                <template slot-scope="scope">{{ scope.row.create_time }}</template>
            </el-table-column>
            <el-table-column
                    label="值班日期"
                    width="180">
                <template slot-scope="scope">{{ scope.row.shift_date }}</template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="值班人员信息修改" :visible.sync="userEditVisible">
            <!--<user-edit :userItem="userItem"></user-edit>-->
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="卡号">
                    <el-input v-model="form.card_id"></el-input>
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
                    <el-button @click="cancleSubmit()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getDutyUsers, userCardMov, dutyUserUpdate} from '../../api/user'

  export default {
    name: 'duty-user-info',
    data () {
      return {
        dutyUsers: [],
        userEditVisible: false,
        form: {
          userlog_id: '',
          user_id: '',
          username: '',
          phone: '',
          profession: '',
          status: '',
          card_id: '',
          type: [],
          userJob: ''
        }
      }
    },
    methods: {
      handleEdit (index, row) {
        this.form.userlog_id = row.id
        this.form.user_id = row.user_id
        this.form.username = row.username
        this.form.card_id = row.card_id
        this.form.status = row.status
        this.form.phone = row.phone
        this.form.profession = row.profession
        this._handleRank(row.rank)
        this.form.userJob = row.rank === 0 ? '勤务' : '直聘'
        this.userEditVisible = true
        console.log(this.form)
      },
      onSubmit () {
        this.form.rank = this._prepareRank(this.form)
        console.log(this.form)
        dutyUserUpdate(this.form).then((res) => {
          if (res.data.code === 1) {
            this.openMessage(res.data.msg, 'success')
            this._getDuty()
            this.userEditVisible = false
          }
          if (res.data.code === -1) {
            this.openMessage(res.data.msg, 'danger')
          }
          console.log(res)
        })
      },
      cancleSubmit () {
        this.userEditVisible = false
      },
      // 移除上班人员
      handleDelete (index, row) {
        userCardMov(row).then((res) => {
          if (res.data.code === 1) {
            this.openMessage(res.data.msg, 'success')
            this._getDuty()
          } else {
            this.openMessage(res.data.msg, 'danger')
          }
        })
        console.log(row)
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
      _getDuty () {
        getDutyUsers().then((res) => {
          console.log(res.data)
          this.dutyUsers = res.data
        })
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      }
    },
    created () {
      this._getDuty()
    }
  }
</script>

<style scoped rel="stylesheet">
    .edit .el-table thead {
        color: #ffffff;
        font-size: larger;
    }
</style>