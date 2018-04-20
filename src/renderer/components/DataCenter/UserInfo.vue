<template>
    <div class="user-data">
        <span>人员数据</span>
        <el-button type="primary"
                   size="mini"
                   @click="newUser()"
                   class="new-user">
            新增
        </el-button>
        <div style="border-bottom: gray solid 1px;margin: 5px 0;width: 100%;"></div>
        <!--接送机 rank===1,可接送绕rank===2,可接送绕放 rank===3,绕机放行 rank===4,只放行 rank===5-->
        <div class="user-info">
            <el-table
                    :data="currentPageUser"
                    border
                    stripe
                    tooltip-effect="light"
                    size="small"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        width="50" :index="u_index"
                        type="index">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        label="班组">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>用工: {{scope.row.rank===0?'勤务':'维修人员'}}</p>
                            <!--<p>住址: {{ scope.row.group }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.group }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column
                        label="接送机">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper" v-if="scope.row.rank>=0 && scope.row.rank<4">
                            <el-tag size="medium">是</el-tag>
                        </div>
                        <div v-else>否</div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="绕机">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper" v-if="scope.row.rank>1&& scope.row.rank<5">
                            <el-tag size="medium">是</el-tag>
                        </div>
                        <div v-else>否</div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="放行">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper" v-if="scope.row.rank>=3">
                            <el-tag size="medium">是</el-tag>
                        </div>
                        <div v-else>否</div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="专业"
                        prop="profession">
                </el-table-column>
                <el-table-column
                        label="联系方式"
                        prop="phone">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                                style="margin:3px"
                                size="small"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                style="margin:3px"
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    :page-size=pageSize
                    layout="prev, pager, next"
                    @current-change="currentPage"
                    :total="userData.length">
            </el-pagination>
            <el-dialog title="人员信息修改" :visible.sync="userEditVisible">
                <user-edit :userItem="userItem" @updateSuccess="updateSucess()"></user-edit>
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import UserEdit from './UserEdit'
  import {getAllUsers, userUpdate} from '../../api/user'

  export default {
    name: 'user-info',
    data () {
      return {
        userEditVisible: false,
        userItem: {},
        userData: [],
        currentPageUser: [],
        pageSize: 20
      }
    },
    components: {UserEdit},
    methods: {
      newUser () {
        console.log('新增用户')
      },
      handleEdit (index, row) {
        // console.log(index, row)
        // this.handleUserItem(row)
        this.userItem = row
        console.log(this.userItem)
        this.userEditVisible = true
      },
      handleUserItem (val) {
        console.log(val)
        this.userItem.username = val.username
        this.userItem.group = val.group
        if (val.rank === 0) {
          this.userItem.receive = '是'
          this.userItem.round = '否'
          this.userItem.userJob = '否'
          this.userItem.release = '否'
        }
        if (val.rank === 1) {
          this.userItem.receive = '是'
          this.userItem.userJob = '是'
          this.userItem.round = '否'
          this.userItem.release = '否'
        }
        if (val.rank === 2) {
          this.userItem.receive = '是'
          this.userItem.userJob = '是'
          this.userItem.round = '是'
          this.userItem.release = '否'
        }
        if (val.rank === 3) {
          this.userItem.receive = '是'
          this.userItem.userJob = '是'
          this.userItem.round = '是'
          this.userItem.release = '是'
        }
        if (val.rank === 4) {
          this.userItem.receive = '否'
          this.userItem.userJob = '是'
          this.userItem.round = '是'
          this.userItem.release = '是'
        }
        if (val.rank === 5) {
          this.userItem.receive = '否'
          this.userItem.userJob = '是'
          this.userItem.round = '否'
          this.userItem.release = '是'
        }
      },
      handleDelete (index, row) {
        row.status = -1
        row.user_id = row.id
        userUpdate(row).then((res) => {
          this.openMessage('删除成功', 'warning')
          this._getAllUsers()
        }).catch((err) => {
          console.log(err)
        })
      },
      u_index (index) {
        return index + 1
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      },
      currentPage (e) {
        this.currentPageUser = []
        for (var i = (e - 1) * 20; i < e * 20; i++) {
          if (this.userData[i]) {
            this.currentPageUser.push(this.userData[i])
          }
        }
        console.log(e, this.currentPageUser)
      },
      updateSucess () {
        this._getAllUsers()
        this.userEditVisible = false
      },
      _getAllUsers () {
        getAllUsers().then((res) => {
          console.log(res)
          this.userData = res.data
          this.currentPage(1)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    created () {
      this._getAllUsers()
    }
  }
</script>

<style rel="stylesheet">
    .user-data {
        margin: 10px 10px;
        /*text-align: center;*/
        font-size: x-large;
    }

    .user-data .new-user {
        float: right;
        bottom: 5px;
    }

    .user-data .user-info .el-table thead tr {
        color: #000000;
        font-size: larger;
    }

    .user-data .user-info .el-table thead tr th {
        padding: 2px;
        color: #000000;
        font-size: 20px;
    }

    .user-data .user-info .el-table tbody tr td {
        padding: 2px 0;
        font-size: larger;
    }
</style>