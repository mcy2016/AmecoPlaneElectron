<template>
    <div class="plane-detail">
        <div class="nav-btn">
            <span class="nav-btn-content">航班日期：{{fltDate}}</span>

            <span class="nav-btn-content">总航班：{{totlePlane}}</span>
            <span class="nav-btn-content" style="font-size: 24px;">剩余航班：{{residue}}</span>
            <span class="nav-btn-content" style="font-size: 24px;">当前时间：{{currentTime}}</span>
            <el-button class="nav-btn-content"
                       type="primary" style="height: 30px;"
                       size="mini" @click="showSearchBox()">显示/隐藏
            </el-button>
            <el-button type="primary" class="nav-btn-content"
                       size="mini" style="height: 30px;"
                       @click="showNextShiftDilog()">
                打卡&交班
            </el-button>
        </div>
        <el-table class="detail-info"
                  :data="flights"
                  border
                  size="small"
                  :height="screenHeight"
                  highlight-current-row
                  tooltip-effect="dark"
                  :row-class-name="tableRowClassName"
                  :cell-class-name="tableCellClassName"
                  header-row-class-name="headerClassName"
                  @cell-dblclick="dbClickCell">

            <el-table-column
                    type='index'
                    label="序" width="50">
            </el-table-column>
            <el-table-column
                    prop="flt_id"
                    label="航班号" width="83">
            </el-table-column>
            <el-table-column
                    prop="ac_id"
                    label="机号" width="65">
            </el-table-column>
            <el-table-column
                    prop="ac_type"
                    label="机型" width="65">
                <template slot-scope="scope">
                    <span style="color: red;">{{scope.row.ac_type}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="dep_apt"
                    label="起飞" width="60">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="off_time"-->
            <!--label="实起" width="60">-->
            <!--</el-table-column>-->
            <el-table-column
                    label="预达" width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.predict_time" style="color: red;font-size: larger">
                         {{convertHMS(scope.row.predict_time)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="余时" width="60">
                <template slot-scope="scope">
                    <span v-if="scope.row.surplus_time">
                        {{convertMinutes(scope.row.surplus_time)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ac_stop_arr"
                    label="机位" width="70">
                <template slot-scope="scope">
                    <div style="color:red;font-size: 18px;font-weight: 600;" scope="scope">
                        {{scope.row.ac_stop_arr.toUpperCase()}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="删"
                    width="30">
                <template slot-scope="scope">
                    <i class="el-icon-delete" style="color: #409EFF;cursor: pointer"
                       @click="closeFlight(scope.$index,scope.row)"></i>
                </template>
            </el-table-column>
            <el-table-column
                    label="接机" width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.receive.length===2" style="font-size: 20px;font-weight: 500;font-family: 黑体">
                        {{scope.row.receive[0]+' ' }} {{ scope.row.receive[1]}}
                    </span>
                    <span v-if="scope.row.receive.length===1"
                          style="color: black;font-size: 20px;font-weight: 500;font-weight: 500;font-family: 黑体">{{scope.row.receive[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="送机" width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.send.length===2" style="font-size: 20px;font-weight: 500;font-family: 黑体">
                        {{scope.row.send[0]+'   ' }} {{ scope.row.send[1]}}
                    </span>
                    <span v-if="scope.row.send.length===1" style="font-size: 20px;font-weight: 500;font-family: 黑体">{{scope.row.send[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="绕机" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.round.length===1" style="font-size: 20px;font-weight: 500;font-family: 黑体">{{scope.row.round[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="放行" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.release.length===1" style="font-size: 20px;font-weight: 500;font-family: 黑体">{{scope.row.release[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="实达" prop="on_time" width="55">
                <template slot-scope="scope">
                    <span style="font-size: 16px; padding-left: 0;">{{scope.row.on_time}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="出港" width="55">
                <template slot-scope="scope">
                    <span style="font-size: 16px; padding-left: 0;">{{scope.row.nextTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态" width="50">
                <template slot-scope="scope">
                    <span v-if="scope.row.cancel_flag===0" style="font-size: 16px;padding-left: 0;">过站</span>
                    <span v-else-if="scope.row.cancel_flag===3"
                          style="font-size: 18px;font-weight: bold; color:red;padding-left: 0;">备降</span>
                    <span v-else-if="scope.row.cancel_flag===4"
                          style="font-size: 18px;font-weight: bold; color:red;padding-left: 0;">备降</span>
                    <span v-else-if="scope.row.cancel_flag===1"
                          style="font-size: 18px; background-color:darkorange;padding-left: 0;">取消</span>
                    <span v-else>{{scope.row.cancel_flag}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column-->
            <!--label="提醒" width="80">-->
            <!--<template slot-scope="scope">-->
            <!--{{}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    label="备注">
                <template slot-scope="scope">
                    <div style="background-color: rebeccapurple;color: #ffffff;">{{scope.row.remark}}</div>
                </template>
            </el-table-column>
        </el-table>
        <div style="color:gray;text-align: center;font-size: 20px;margin: 10px 0;">------我也是有底线的{{screenHeight}}------
        </div>
        <div style="border: darkred 1px dashed;width: 100%;margin-bottom: 10px;"></div>
        <!--接机排班dialog对话框-->
        <el-dialog title="人员按排" :visible.sync="receiveDialogVisible"
                   :close-on-click-modal=false>
            <el-form :model="receiveTemp">
                <!--{{arrangeDialogTitle.oneTitle}}：-->
                <!--v-if="dbCell==='receive'"-->
                接机人员：
                <el-select v-model="receiveTemp.receive" multiple :multiple-limit=2
                           placeholder="请选择接机人员"
                           :disabled="isDisabled"
                           @change="changeUser()">
                    <el-option
                            v-for="item in dutyUsersTemp.oneUser"
                            :key="item.id"
                            :label="item.username"
                            :value="item.username">
                    </el-option>
                </el-select>
                <!--<el-select v-if="dbCell==='round'" v-model="receiveTemp.round" multiple :multiple-limit=1-->
                <!--placeholder="绕机人员"-->
                <!--@change="changeUser()">-->
                <!--<el-option-->
                <!--v-for="item in dutyUsersTemp.oneUser"-->
                <!--:key="item.id"-->
                <!--:label="item.username"-->
                <!--:value="item.username">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--<el-select v-if="dbCell==='release'" v-model="receiveTemp.release" multiple :multiple-limit=1-->
                <!--placeholder="放行人员"-->
                <!--@change="changeUser()">-->
                <!--<el-option-->
                <!--v-for="item in dutyUsersTemp.oneUser"-->
                <!--:key="item.id"-->
                <!--:label="item.username"-->
                <!--:value="item.username">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <span style="margin-left: 10px"></span>
                <!--{{arrangeDialogTitle['twoTitle']}}：-->
                送机人员：
                <el-select v-model="receiveTemp.send"
                           multiple :multiple-limit=2
                           :disabled="isDisabled"
                           placeholder="请选送机人员"
                           @change="changeUser()">
                    <el-option
                            v-for="item in dutyUsersTemp.twoUser"
                            :key="item.id"
                            :label="item.username"
                            :value="item.username">
                    </el-option>
                </el-select>
                <div style="margin-top: 10px"></div>
                绕机人员：
                <el-select v-model="receiveTemp.round"
                           multiple :multiple-limit=1
                           placeholder="请选绕机人员"
                           @change="changeUser()">
                    <el-option
                            v-for="item in dutyUsersTemp.threeUser"
                            :key="item.id"
                            :label="item.username"
                            :value="item.username">
                    </el-option>
                </el-select>
                <span style="margin-left: 10px"></span>
                放行人员：
                <el-select v-model="receiveTemp.release"
                           multiple :multiple-limit=1
                           placeholder="请选放行人员"
                           @change="changeUser()">
                    <el-option
                            v-for="item in dutyUsersTemp.fourUser"
                            :key="item.id"
                            :label="item.username"
                            :value="item.username">
                    </el-option>
                </el-select>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="receiveDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onsubmitUser()">确 定</el-button>
            </div>
        </el-dialog>
        <!--交接班dialog对话框-->
        <el-dialog
                title="打卡&交班"
                :visible.sync="nextShift"
                center
                :close-on-click-modal="false"
                :before-close="cancelShift">
            <el-transfer filterable :titles="['所有人员','值班人员']"
                         v-model="duty"
                         :data="all" @change="userCard">
            </el-transfer>
            <div slot="footer" class="dialog-footer">
                <span style="color: red;">注意：手动打卡不需要点击【交班】按钮</span>
                <el-button @click="cancelShift">取 消</el-button>
                <el-button type="primary" @click="postShift">交 班</el-button>
            </div>
        </el-dialog>
        <!--航班备注信息修改-->
        <el-dialog title="航班备注信息修改" :visible.sync="flightRemarkDialogVIsible"
                   :close-on-click-modal=false width="70%" center>
            <el-form :model="receiveTemp" label-width="90px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="航班号">
                            <el-input ref="flt_id"
                                      v-model="receiveTemp.flt_id" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="备注信息">
                        <el-col :span="24">
                            <el-select
                                    class="remark"
                                    v-model="receiveTemp.remarkArr"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择备注信息">
                                <el-option
                                        v-for="item in remarkOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="flightRemarkDialogVIsible = false">取 消</el-button>
                <el-button type="primary" @click="submitRemark()">保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import {getArrFlight, postAttr, closeFlight, getCloseFlight, getAllFlight} from '../../api/plane'
  import {mapMutations, mapGetters} from 'vuex'
  // import {convertHMS} from '../../common/js/utils'
  import {convertHMS} from '../../common/js/utils'
  import ArrFlight from '../../common/js/arrFlight'
  import {getAllUsers, getDutyUsers, userCard, userCardMov, nextDuty} from '../../api/user'
  // import {getAllUsers, getDutyUsers} from '../../api/user'

  export default {
    name: 'plane-detail',
    data () {
      return {
        totlePlane: 0, // 总航班量
        residue: 0, // 剩余航班量
        closeFlightNum: 0, // 已关闭的航班量
        flights: [], // 处理后的进港航班数据
        searchBoxVisable: true, // 搜索框显示
        receiveDialogVisible: false, // 接机人排班对话框
        arrangeDialogTitle: {'oneTitle': '接', 'twoTitle': '送'}, // 人员安排对话框标题
        isDisabled: false, // 人员安排对话框是否disabled
        receiveTemp: [],
        dbCell: '', // 双击的是哪个单元格
        dutyUsersTemp: {'oneUser': [], 'twoUser': [], 'threeUser': [], 'fourUser': []}, // 临时变量用于安排人员
        // flightInfoDialogVisible: false, // 航班信息修改对话框显示
        allUsers: [], // 所有人员
        all: [], // 处理后用于打卡界面显示的所有人员
        dutyUsers: [], // 所有值班人员,
        duty: [], // 处理后用于打卡界面显示的所有值班人员
        receive_users: [], // 接机人员
        send_users: [], // 送机人员
        round_users: [], // 绕机人员
        release_usres: [], // 放行人员
        currentTime: '', // 当前时间
        screenHeight: window.screen.availHeight, // window.screen.height - 100
        nextShift: false, // 交接班对话框显示
        flightRemarkDialogVIsible: false, // 航班备注信息修改
        closeFlag: false, // 显示已关闭还是正常进港航班开关
        remarkOptions: [
          {value: '进v', label: '进v'},
          {value: '进vv', label: '进vv'},
          {value: '出v', label: '出v'},
          {value: '出vv', label: '出vv'},
          {value: '电', label: '电'},
          {value: '气', label: '气'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'arrFlight',
        'fltDate'
      ])
    },
    methods: {
      dbClickCell (row, column, cell, event) {
        if (column.label === '接机') {
          this.receiveTemp = row
          // this.arrangeDialogTitle.oneTitle = '接机人员'
          // this.arrangeDialogTitle.twoTitle = '送机人员'
          this.dbCell = 'receive'
          this.isDisabled = false
          this.dutyUsersTemp.oneUser = this.receive_users
          this.dutyUsersTemp.twoUser = this.send_users
          this.dutyUsersTemp.threeUser = this.round_users
          this.dutyUsersTemp.fourUser = this.release_usres
          this.receiveDialogVisible = true
        }
        if (column.label === '绕机') {
          this.receiveTemp = row
          // this.arrangeDialogTitle.oneTitle = '绕机人员'
          // this.arrangeDialogTitle.twoTitle = '送机人员'
          this.dbCell = 'round'
          this.dutyUsersTemp.threeUser = this.round_users
          // this.dutyUsersTemp.twoUser = []
          this.isDisabled = true
          this.receiveDialogVisible = true
        }
        if (column.label === '放行') {
          this.receiveTemp = row
          this.dbCell = 'release'
          this.dutyUsersTemp.threeUser = this.round_users
          this.dutyUsersTemp.fourUser = this.release_usres
          this.isDisabled = true
          this.receiveDialogVisible = true
        }
        if (column.label === '备注') {
          this.receiveTemp = row
          this.flightRemarkDialogVIsible = true
          // this.isRemarksDis = false
        }
      },
      // 更改航班维护人员信息
      changeUser () {
        this.postData(this.receiveTemp)
      },
      // 提交航班维护人员信息
      onsubmitUser () {
        this.receiveDialogVisible = false
      },

      // 提交航班备注信息
      submitRemark () {
        console.log(this.receiveTemp.remarkArr)
        this.receiveTemp.remark = this.receiveTemp.remarkArr ? this.receiveTemp.remarkArr.join(',') : ''
        this.postData(this.receiveTemp)
        this.flightRemarkDialogVIsible = false
      },
      // 根据名字检索用户id
      checkOutUserId (usname) {
        let id = this.allUsers.find(function (item) {
          // usname = '杨印'
          console.log(item)
          return item.username === usname
        })
        console.log(id.username, id.id)
        return id.id
      },

      // 提交更新数据
      postData (e) {
        let data = {}
        console.log(e)
        data['f_id'] = e['id']
        data['receive_id1'] = e['receive'][0] ? this.checkOutUserId(e['receive'][0]) : null
        data['receive_id2'] = e['receive'][1] ? this.checkOutUserId(e['receive'][1]) : null
        data['send_id1'] = e['send'][0] ? this.checkOutUserId(e['send'][0]) : null
        data['send_id2'] = e['send'][1] ? this.checkOutUserId(e['send'][1]) : null
        data['round_id'] = e['round'][0] ? this.checkOutUserId(e['round'][0]) : null
        data['release_id'] = e['release'][0] ? this.checkOutUserId(e['release'][0]) : null
        data['reminder_time'] = e['reminder_time'] ? e['reminder_time'] : null
        data['ac_status'] = e['ac_status'] ? e['ac_status'] : null
        data['remark'] = e['remark'] ? e['remark'] : null
        data['compute_time'] = e['predict_time'] ? this.convertHMS(e['predict_time']) : null
        console.log(data)
        postAttr(data).then((res) => {
          if (res.data.code === 0) {
            if (res.data.data.remark && res.data.data.reminder_time) {
              this.reminderContent.push(e)
              this.openMessage('备注信息更新成功', 'success')
              return true
            } else {
              console.log(data)
              this.openMessage('成功', 'success')
            }
          }
          if (res.data.code === -1) {
            this.openMessage('没有更新数据', 'warning')
            return false
          }
        }).catch((err) => {
          this.openMessage('服务器出错' + err, 'error')
        })
      },

      // 更改nextShift状态
      cancelShift () {
        this.nextShift = false
      },

      showNextShiftDilog () {
        this._getDutyUsers()
        this.nextShift = true
        // console.log(this.duty)
        // console.log(this.all)
      },
      // 手动打卡
      userCard (value, direction, movekeys) {
        console.log(value, direction, movekeys)
        let cardedUsers = []
        let moveCardedUsers = []
        if (direction === 'right') {
          for (let i = 0; i < movekeys.length; i++) {
            this.allUsers.find(function (item) {
              if (item.id === movekeys[i]) {
                cardedUsers.push(item)
              }
            })
          }
          userCard({card_id: cardedUsers}).then((res) => {
            if (res.data.code === 1) {
              console.log('打卡成功！')
              this._getDutyUsers()
              this.cancelShift()
            } else {
              // TODO 处理打卡失败的情况
            }
          })
        } else {
          if (direction === 'left') {
            for (let i = 0; i < movekeys.length; i++) {
              this.allUsers.find(function (item) {
                if (item.id === movekeys[i]) {
                  moveCardedUsers.push(item)
                }
              })
            }
            userCardMov({id: moveCardedUsers}).then((res) => {
              if (res.data.code === 1) {
                this._getDutyUsers()
                this.cancelShift()
              } else {
                // TODO 处理移除失败的情况
              }
            })
          }
        }
      },

      // 交班
      postShift: function () {
        nextDuty().then((res) => {
          this.openMessage('交班人数:' + res.data.pre.length + '接班人数:' + res.data.data.length, 'success')
          if (res.data.code === 1) {
            this._getDutyUsers()
            this.cancelShift()
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      // 处理接送放资格人员
      handleDutyUser (users) {
        this.release_usres = []
        this.round_users = []
        this.send_users = []
        this.receive_users = []
        users.forEach((item) => {
          if (item.rank === 0) {
            this.receive_users.push(item)
            this.send_users.push(item)
          }
          if (item.rank === 1) {
            this.receive_users.push(item)
            this.send_users.push(item)
          }
          if (item.rank === 2) {
            this.receive_users.push(item)
            this.round_users.push(item)
            this.send_users.push(item)
          }
          if (item.rank === 3) {
            this.receive_users.push(item)
            this.round_users.push(item)
            this.send_users.push(item)
            this.release_usres.push(item)
          }
          if (item.rank === 4) {
            this.round_users.push(item)
          }
          if (item.rank === 5) {
            this.release_usres.push(item)
          }
        })
        this.release_usres = this.unique(this.release_usres)
        this.send_users = this.unique(this.send_users)
        this.receive_users = this.unique(this.receive_users)
        this.round_users = this.unique(this.round_users)
        console.log(this.receive_users)
      },
      // 数组去重
      unique (arr) {
        let result = []
        let hash = {}
        let hash_ = {}
        for (var i = 0; i < arr.length; i++) {
          // var elem = arr[i].flt_id
          var elem = arr[i].id
          var elem_ = arr[i].id
          if (!hash[elem]) {
            if (!hash_[elem_]) {
              result.push(arr[i])
              hash_[elem_] = true
            }
            hash[elem] = true
          }
        }
        return result
      },
      closeFlight (index, row) {
        //   console.log(index)
        this.$confirm('此操作将删除' + row.flt_id + '航班', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (!row.surplus_time || row.surplus_time > 0) {
            this.openMessage('不能删除没有到达的航班', 'info')
          } else {
            closeFlight(row.id).then((res) => {
              console.log(row.id)
              if (res.data.code === 0) {
                this.flights.splice(index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }
              this._getArrPlane()
              this._getCloseFlight()
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        // 关闭航班
        // this.$confirm('此操作将删除' + row.flt_id + '航班, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   if (!row.surplus_time || row.surplus_time > 0) {
        //     this.openMessage('不能删除没有到达的航班', 'info')
        //   } else {
        //     closeFlight(row.id).then((res) => {
        //       if (res.data.code === 0) {
        //         // this.flights.splice(index, 1)
        //         this.$message({
        //           type: 'success',
        //           message: '删除成功!'
        //         })
        //         this._getArrPlane()
        //       }
        //     }).catch((err) => {
        //       console.log(err)
        //     })
        //   }
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   })
        // })
      },

      // 获取已关闭的航班
      _getCloseFlight () {
        getCloseFlight(this.flightDate).then((res) => {
          // TODO 是否要保存在vuex中
          // this.setCloseFlights(res.data)
          this.closeFlightNum = res.data.length
        }).catch((err) => {
          console.log(err)
        })
      },

      _getArrPlane () {
        // 1.如果选择已关闭 closeFlag=true,则请求已关闭航班使用getCloseFlight()方法
        // 2.未选择关闭表示请求正常进港航班，closeFlag=false,使用getArrFlight()方法
        // if (this.closeFlag) {
        //   getCloseFlight(this.flightDate).then((res) => {
        //     this.flights = this._handleArrFlight(res.data)
        //   }).catch((err) => {
        //     console.log(err)
        //   })
        // } else {
        //   getArrFlight(this.fltDate).then((res) => {
        //     this.flights = this._handleArrFlight(res.data)
        //     this.setArrFlight(res.data)
        //   }).catch((err) => {
        //     console.log(err)
        //   })
        // }
        getArrFlight(this.fltDate).then((res) => {
          this.flights = this._handleArrFlight(res.data)
          console.log(this.flights)
          this.setArrFlight(res.data)
        }).catch((err) => {
          console.log(err)
        })
      },
      _getAllPlane (d) {
        getAllFlight(d).then((res) => {
          this.totlePlane = res.data.length
        }).catch((err) => {
          console.log(err)
        })
      },
      _getDutyUsers () {
        getDutyUsers().then((res) => {
          this.dutyUsers = res.data
          this.handleDutyUser(res.data)
          this.setDutyUser(res.data)
        })
      },
      _getAllUser () {
        getAllUsers().then((res) => {
          this.allUsers = res.data
        })
      },
      // 处理进港航班数据格式
      _handleArrFlight (flightArr) {
        let arrFlights = []
        flightArr.forEach((item) => {
          arrFlights.push(new ArrFlight(item))
        })
        return arrFlights
      },
      // 处理时间的函数,把毫秒数转换成分钟数
      convertHMS (time) {
        return convertHMS(time)
      },
      // 把毫秒数转换成分钟数
      convertMinutes (ms) {
        if (!ms) {
          return ''
        } else {
          let leave = Math.floor(Number(ms) / (60 * 1000)) // 计算分钟数后的毫秒数
          return leave
        }
      },
      // 弹出消息提示
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      },
      showSearchBox () {
        this.searchBoxVisable = !this.searchBoxVisable
        this.setShowSearch(this.searchBoxVisable)
      },
      tableRowClassName ({row, rowIndex}) {
        if (row.on_time) {
          return 'over'
        }
        if (row.surplus_time && this.convertMinutes(row.surplus_time) < 15) {
          if (row.receive.length > 0) {
            return 'waring'
          } else {
            return 'blink'
          }
        }
        if (rowIndex % 2) {
          return 'double'
        }
      },
      headerClassName ({row, rowIndex}) {
        return 'headerRowClass'
      },
      // 单元格的className回调方法
      tableCellClassName ({row, column, rowIndex, columnIndex}) {
        if (row.ac_type) {
          if (!this.findNoRelease(row)) {
            return ''
          }
          if (row.off_time && this.convertMinutes(row.surplus_time) < 15 && row.release.length === 0) {
            if (columnIndex === 12) {
              return 'blink'
            }
          }
        }
      },
      findNoRelease (row) {
        if (['ZH', 'JD', 'HX', 'PN'].indexOf(row.flt_id.slice(0, 2)) >= 0) {
          return false
        } else if (['B789', 'B7M8'].indexOf(row.ac_type.slice(0, 4)) >= 0) {
          return false
        } else {
          return true
        }
      },
      // 获取当前时间
      getCurrentTime () {
        let dateNow = new Date()
        let hours = this.p(dateNow.getHours())
        let minutes = this.p(dateNow.getMinutes())
        this.currentTime = [hours, minutes].join(':')
      },
      // 时间补足两位
      p (n) {
        return n < 10 ? '0' + n : n
      },
      ...mapMutations({
        setShowSearch: 'SET_SHOW_SEARCH',
        setDutyUser: 'SET_DUTY_USER',
        setArrFlight: 'SET_ARR_FLIGHT'
      })
    },
    watch: {
      fltDate (val) {
        this._getAllPlane(val)
      },
      arrFlight (newval) {
        this.flights = this._handleArrFlight(newval)
        this.residue = newval.length
        this._getAllPlane(this.fltDate)
        // this.totlePlane = this.residue + this.closeFlightNum
      },
      currentTime (newval) {
        this._getArrPlane()
        // this._getAllPlane(this.fltDate)
      },
      allUsers: function (val) {
        val.forEach((item) => {
          this.all.push({key: item.id, label: item.username})
        })
      },
      dutyUsers: function (val) {
        this.duty = []
        val.forEach((item) => {
          this.duty.push(item.user_id)
        })
      }
    },
    created () {
      this._getAllPlane(this.fltDate)
      this.getCurrentTime()
      this._getArrPlane()
      this._getCloseFlight()
      this._getAllUser()
      this._getDutyUsers()
      setInterval(this.getCurrentTime, 60000)
    }
  }
</script>

<style>
    .plane-detail {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        margin-top: 76px
    }

    .detail-info.el-table.el-table--small td, .el-table--small th {
        padding: 0 3px;
        font-size: 18px;
    }

    .detail-info.el-table .cell, .el-table th div {
        padding-right: 1px;
        padding-left: 2px;
    }

    .nav-btn {
        width: 100%;
        height: 30px;
        line-height: 30px;
        position: fixed;
        top: 41px;
        margin-top: 1px;
        background-color: #ffffff;
        border-color: rgb(10, 72, 101);
        z-index: 2;
    }

    .nav-btn .nav-btn-content {
        margin-left: 5%;
        /*padding: 0 10px;*/
        border-radius: 3px;
        font-size: 18px;
        background-color: rgba(64, 158, 255, 0.02);
        color: rgb(10, 72, 101);
    }

    .detail-info.el-table thead th {
        height: 40px;
        font-size: 20px;
        text-align: center;
        color: #ffffff;
        background-color: #409EFF;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .detail-info.el-table tbody td {
        text-align: center;
        height: 35px;
    }

    .detail-info.el-table tbody tr {
        color: #000;
    }

    .detail-info.el-table .el-table--striped .el-table__body tr.el-table__row--striped.current-row > td,
    .detail-info.el-table .el-table__body tr.current-row > td,
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td, .el-table__body tr.hover-row > td {
        background-color: #8cbbe6;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #8cbbe6 !important;
    }

    /*.el-table--striped .el-table__body tr.el-table__row--striped td {*/
    /*background-color: rgba(201, 227, 234, 0.52) !important;*/
    /*}*/
    .el-table tr.double td {
        background-color: rgba(201, 227, 234, 0.52) !important;
        color: #000;
    }

    .detail-info.el-table .el-table__body tr.double {
        background-color: rgba(201, 227, 234, 0.52) !important;
        color: #000;
    }

    .detail-info.el-table .el-table__body tr.over {
        background-color: #DEE1E0;
        color: gray !important;
    }

    .detail-info.el-table .el-table__body tr.waring {
        background-color: rgba(255, 147, 147, 0.45);
    }

    /* 定义keyframe动画，命名为blink */

    @keyframes blink {
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

    /* 添加兼容性前缀 */

    /*@-webkit-keyframes blink {*/
    /*0% {*/
    /*opacity: 1;*/
    /*}*/
    /*50% {*/
    /*opacity: 1;*/
    /*}*/
    /*50.01% {*/
    /*opacity: 0;*/
    /*}*/
    /*100% {*/
    /*opacity: 0;*/
    /*}*/
    /*}*/

    /*@-moz-keyframes blink {*/
    /*0% {*/
    /*opacity: 1;*/
    /*}*/
    /*50% {*/
    /*opacity: 1;*/
    /*}*/
    /*50.01% {*/
    /*opacity: 0;*/
    /*}*/
    /*100% {*/
    /*opacity: 0;*/
    /*}*/
    /*}*/

    /*@-ms-keyframes blink {*/
    /*0% {*/
    /*opacity: 1;*/
    /*}*/
    /*50% {*/
    /*opacity: 1;*/
    /*}*/
    /*50.01% {*/
    /*opacity: 0;*/
    /*}*/
    /*100% {*/
    /*opacity: 0;*/
    /*}*/
    /*}*/

    /*@-o-keyframes blink {*/
    /*0% {*/
    /*opacity: 1;*/
    /*}*/
    /*50% {*/
    /*opacity: 1;*/
    /*}*/
    /*50.01% {*/
    /*opacity: 0;*/
    /*}*/
    /*100% {*/
    /*opacity: 0;*/
    /*}*/
    /*}*/

    /* 定义blink类*/
    .detail-info.el-tabel .el-table__body tr.blink td, .detail-info.el-table .el-table__body tr.el-table__row--striped.blink td {
        animation: blink .75s linear infinite;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: blink .75s linear infinite;
        -moz-animation: blink .75s linear infinite;
        -ms-animation: blink .75s linear infinite;
        -o-animation: blink .75s linear infinite;
        background-color: #ea2118 !important;
        color: #ffffff;
    }

    .blink {
        animation: blink .75s linear infinite;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: blink .75s linear infinite;
        -moz-animation: blink .75s linear infinite;
        -ms-animation: blink .75s linear infinite;
        -o-animation: blink .75s linear infinite;
        background-color: #ea2118 !important;
        color: #000000;
    }


</style>
