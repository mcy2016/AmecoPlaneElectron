<template>
    <div class="mcc-detail">
        <div class="mcc-nav-btn">
            <span class="mcc-nav-btn-content">航班日期：{{fltDate}}</span>
            <span class="mcc-nav-btn-content">总航班：{{totlePlane}}</span>
            <span class="mcc-nav-btn-content" style="font-size: 24px;">剩余航班：{{residue}}</span>
            <span class="mcc-nav-btn-content" style="font-size: 24px;">当前时间：{{currentTime}}</span>
            <el-button class="mcc-nav-btn-content"
                       type="primary" style="height: 30px;"
                       size="mini" @click="showSearchBox()">显示/隐藏
            </el-button>
            <el-button class="mcc-nav-btn-content"
                       type="primary" style="height: 30px;"
                       size="mini" @click="showDutyBox()">值班人员
            </el-button>
            <!--<span class="mcc-nav-btn-content" style="font-size: 24px;">今日值班人数：{{dutyUsers.length}}</span>-->
            <!--<span class="mcc-nav-btn-content" style="font-size: 24px;">维修人员：{{maintainCount}}</span>-->
            <!--<span class="mcc-nav-btn-content" style="font-size: 24px;">勤务人员：{{serviceCount }}</span>-->

        </div>
        <el-table class="mcc-detail-info"
                  :data="flights"
                  border
                  size="small"
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
            <el-table-column
                    prop="off_time"
                    label="实起" width="60">
            </el-table-column>
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
            <!--<el-table-column-->
            <!--label="删"-->
            <!--width="30">-->
            <!--<template slot-scope="scope">-->
            <!--<i class="el-icon-delete" style="color: #409EFF;cursor: pointer"-->
            <!--@click="closeFlight(scope.$index,scope.row)"></i>-->
            <!--&lt;!&ndash;<el-button type="primary" @click="testBtn">测试</el-button>&ndash;&gt;-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    label="接机" width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.receive.length===2" style="font-size: 20px;font-weight: 500;font-family: 黑体">
                        {{scope.row.receive[0]+' ||' }} {{ scope.row.receive[1]}}
                    </span>
                    <span v-if="scope.row.receive.length===1"
                          style="color: black;font-size: 20px;font-weight: 500;font-weight: 500;font-family: 黑体">{{scope.row.receive[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="送机" width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.send.length===2" style="font-size: 20px;font-weight: 500;font-family: 黑体">
                        {{scope.row.send[0]+' ||' }} {{ scope.row.send[1]}}
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
        <div style="color:gray;text-align: center;font-size: 20px;margin: 10px 0;">------我也是有底线的------</div>
        <div style="border: darkred 1px dashed;width: 100%;margin-bottom: 10px;"></div>
        <!--放行人员信息dialog对话框-->
        <el-dialog title="放行人员信息" :visible.sync="releaseDialogVisible"
                   :close-on-click-modal=false class="releaseInfoBox">
            <el-form :model="receiveTemp.release_id">
                <div v-if="receiveTemp.release_id">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓 名" :label-width="formLabelWidth">
                                <el-input v-model="receiveTemp.release_id.username" auto-complete="off" :maxlength=40
                                          size="small" :disabled="true" class="releaseInfo">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手 机" :label-width="formLabelWidth">
                                <el-input v-model="receiveTemp.release_id.phone" auto-complete="off" :maxlength=40
                                          size="small" :disabled="true" class="releaseInfo">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="职 务" :label-width="formLabelWidth">
                                <el-input v-model="receiveTemp.release_id.duty" auto-complete="off" :maxlength=40
                                          size="small" :disabled="true" class="releaseInfo">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="12">-->
                        <!--<el-form-item label="手 机" :label-width="formLabelWidth">-->
                        <!--<el-input v-model="receiveTemp.release_id.phone" auto-complete="off" :maxlength=40-->
                        <!--size="mini" :disabled="true" class="releaseInfo">-->
                        <!--</el-input>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                    </el-row>
                </div>
            </el-form>
            <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button @click="receiveDialogVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="onsubmitUser()">确 定</el-button>-->
            <!--</div>-->
        </el-dialog>
        <!--航班信息修改-->
        <el-dialog title="航班信息修改" :visible.sync="flightInfoDialogVisible"
                   :close-on-click-modal=false width="50%" center>
            <el-form :model="receiveTemp" ref="flightInfo" label-width="80px" size="small">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="航班">
                            <el-input ref="flt_id" v-model="receiveTemp.flt_id" :disabled="isFltIdDis"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="机号">
                            <el-input ref="ac_id" v-model="receiveTemp.ac_id" :disabled="isAcIdDis"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="机型">
                            <el-input ref="ac_type" v-model="receiveTemp.ac_type" :disabled="isAcTypeDis"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="机位">
                            <el-input ref="ac_stop_arr" v-model="receiveTemp.ac_stop_arr"
                                      :disabled="isAcStopArrDis"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实起">
                            <!--<el-input ref="off_time" v-model="receiveTemp.ac_type" :disabled="isOffTimeDis"></el-input>-->
                            <el-time-picker
                                    style="width:100%"
                                    v-model="receiveTemp.off_time"
                                    value-format="HH:mm"
                                    format="HH:mm"
                                    :disabled="isOffTimeDis"
                                    placeholder="选择时间">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出港">
                            <!--<el-input ref="next_time" v-model="receiveTemp.nextTime"-->
                            <!--:disabled="isNextTimeDis"></el-input>-->
                            <el-time-picker
                                    style="width:100%"
                                    v-model="receiveTemp.nextTime"
                                    value-format="HH:mm"
                                    format="HH:mm"
                                    :disabled="isNextTimeDis"
                                    placeholder="选择日期时间">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="日期">
                            <el-date-picker
                                    style="width:100%"
                                    v-model="receiveTemp.flt_date"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="航班日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-select v-model="receiveTemp.cancel_flag" placeholder="请选择"
                                       :disabled="isStatusDis"
                                       @change="changeAcStatus">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="flightInfoDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFlightInfo()">保 存</el-button>
            </div>
        </el-dialog>
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
        <el-dialog title="值班人员信息" :visible.sync="dutyInfoVisable"
                   :close-on-click-model=false width="80%" center class="duty-dialog">
            <div style="">
                <span class="mcc-nav-btn-content"
                      style="font-size: 24px;margin-left: 3%">今日值班人数：{{dutyUsers.length}}</span>
                <span class="mcc-nav-btn-content" style="font-size: 24px;margin-left: 3%;">维修人员：{{maintainCount}}</span>
                <span class="mcc-nav-btn-content" style="font-size: 24px;margin-left: 3%">勤务人员：{{serviceCount }}</span>
                <span class="mcc-nav-btn-content"
                      style="font-size: 24px;margin-left: 3%">值班经理：{{dutyMangerCount }}</span>
                <span class="mcc-nav-btn-content"
                      style="font-size: 24px;margin-left: 3%">工程师：{{dutyEngineerCount }}</span>
            </div>
            <el-table :data="dutyUsers" class="duty-info"
                      stripe
                      :cell-class-name="tableDutyCellClassName"
                      border
                      style="width: 100%">
                <el-table-column
                        prop="username"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="rank"
                        label="用工形式">
                    <template slot-scope="scope">
                        <span v-if="scope.row.rank===0">勤务</span>
                        <span v-else>维修人员</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="duty"
                        label="职务">
                    <template slot-scope="scope">
                        <div>{{scope.row.duty}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="联系方式">
                </el-table-column>
            </el-table>
        </el-dialog>
        <!--&lt;!&ndash;航班信息修改&ndash;&gt;-->
        <!--<el-dialog title="航班信息修改" :visible.sync="flightInfoDialogVisible"-->
        <!--:close-on-click-modal=false>-->
        <!--<el-form :model="receiveTemp">-->

        <!--</el-form>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
  import {
    getArrFlight,
    getCloseFlight,
    getAllFlight,
    postAttr,
    postAcType,
    postFltId,
    postAcId,
    postOffTime,
    postNextime,
    postAcStopArr,
    postStatus
  } from '../../api/plane'

  import {mapMutations, mapGetters} from 'vuex'
  import {convertHMS} from '../../common/js/utils'
  import ArrFlight from '../../common/js/arrFlight'
  import {getAllUsers, getDutyUsers} from '../../api/user'

  export default {
    name: 'mcc-detail',
    data () {
      return {
        totlePlane: 100, // 总航班量
        residue: 16, // 剩余航班量
        closeFlightNum: 0, // 已关闭的航班量
        flights: [], // 处理后的进港航班数据
        searchBoxVisable: true, // 搜索框显示
        dutyInfoVisable: false, // 值班人员情况是否显示
        releaseDialogVisible: false, // 放行人员信息对话框
        flightInfoDialogVisible: false, // 航班信息修改对话框
        flightRemarkDialogVIsible: false, // 航班信息修改对话框
        isFltIdDis: true, // 控制航班号能否修改
        isAcIdDis: true, // 控制机号能否修改
        isAcTypeDis: true, // 控制机型能否修改
        isAcStopArrDis: true, // 控制机位能否修改
        isOffTimeDis: true, // 控制实起时间能否修改
        isNextTimeDis: true, // 控制出港时间能否修改
        isStatusDis: true, // 控制航班状态
        isRemarksDis: true, // 控制航班备注能否修改
        // isOnTimeDis: true, // 控制实达时间能否修改
        // receiveDialogVisible: false, // 接机人排班对话框
        // arrangeDialogTitle: {'oneTitle': '接', 'twoTitle': '送'}, // 人员安排对话框标题
        // isDisabled: false, // 人员安排对话框是否disabled
        reminder_temp: [],
        remarkOptions: [
          {value: '进v', label: '进v'},
          {value: '进vv', label: '进vv'},
          {value: '出v', label: '出v'},
          {value: '出vv', label: '出vv'},
          {value: '电', label: '电'},
          {value: '气', label: '气'}
        ],
        options: [ // 航班状态选项
          {
            label: '航前',
            value: 3
          },
          {
            label: '过站',
            value: 2
          },
          {
            label: '航后',
            value: 1
          }
        ],
        receiveTemp: {},
        releaseTemp: [], // 临时保存放行人员信息
        dbCell: '', // 双击的是哪个单元格
        formLabelWidth: '60px',
        // dutyUsersTemp: {'oneUser': [], 'twoUser': []}, // 临时变量用于安排人员
        // flightInfoDialogVisible: false, // 航班信息修改对话框显示
        dutyUsers: [], // 所有值班人员,
        // receive_users: [], // 接机人员
        // send_users: [], // 送机人员
        // round_users: [], // 绕机人员
        // release_usres: [], // 放行人员
        maintainCount: '', // 维修人员人数
        serviceCount: '', // 勤务人员人数
        dutyMangerCount: '', // 值班经理
        dutyEngineerCount: '', // 值班工程师
        allUsers: [], // 所有人员
        currentTime: '' // 当前时间
      }
    },
    computed: {
      ...mapGetters([
        'arrFlight',
        'fltDate'
      ])
    },
    methods: {
      // 航班状态改变
      changeAcStatus (e) {
        console.log(e)
        // this.receiveTemp.cancel_flag = e
      },
      dbClickCell (row, column, cell, event) {
        if (column.label === '放行') {
          this.receiveTemp = row
          this.releaseDialogVisible = true
        }
        if (column.label === '航班号') {
          this.isDialogBoxDis()
          this.receiveTemp = row
          // this.nextTimeDilog = true
          this.flightInfoDialogVisible = true
          this.isFltIdDis = false
        }
        if (column.label === '机号') {
          this.isDialogBoxDis()
          this.receiveTemp = row
          // this.nextTimeDilog = true
          this.flightInfoDialogVisible = true
          this.isAcIdDis = false
        }
        if (column.label === '机型') {
          this.isDialogBoxDis()
          this.receiveTemp = row
          this.flightInfoDialogVisible = true
          this.isAcTypeDis = false
        }
        if (column.label === '机位') {
          this.isDialogBoxDis()
          this.receiveTemp = row
          this.flightInfoDialogVisible = true
          this.isAcStopArrDis = false
        }
        if (column.label === '实起') {
          this.isDialogBoxDis()
          this.receiveTemp = row
          this.flightInfoDialogVisible = true
          this.isOffTimeDis = false
        }
        if (column.label === '出港') {
          console.log(row)
          this.isDialogBoxDis()
          this.receiveTemp = row
          this.flightInfoDialogVisible = true
          this.isNextTimeDis = false
        }
        if (column.label === '状态') {
          console.log(row)
          this.isDialogBoxDis()
          this.receiveTemp = row
          this.flightInfoDialogVisible = true
          this.isStatusDis = false
          this.isNextTimeDis = false
        }
        if (column.label === '备注') {
          this.receiveTemp = row
          this.flightRemarkDialogVIsible = true
          // this.isRemarksDis = false
        }
      },
      // 控制能修改的航班信息选项
      isDialogBoxDis () {
        this.isFltIdDis = true // 控制航班号能否修改
        this.isAcIdDis = true // 控制机号能否修改
        this.isAcTypeDis = true // 控制机型能否修改
        this.isAcStopArrDis = true // 控制机位能否修改
        this.isOffTimeDis = true // 控制实起时间能否修改
        this.isNextTimeDis = true // 控制出港时间能否修改
        this.isStatusDis = true // 航班状态能否修改
        // this.isOnTimeDis = true // 控制实达时间能否修改
      },
      // 提交修改的航班信息
      submitFlightInfo () {
        if (!this.isNextTimeDis) {
          this._postNextime(this.receiveTemp)
        }
        if (!this.isAcTypeDis) {
          this._postAcType(this.receiveTemp)
        }
        if (!this.isFltIdDis) {
          this._postFltId(this.receiveTemp)
        }
        if (!this.isAcIdDis) {
          this._postAcId(this.receiveTemp)
        }
        if (!this.isOffTimeDis) {
          this._postOffTime(this.receiveTemp)
        }
        if (!this.isAcStopArrDis) {
          this._postAcStopArr(this.receiveTemp)
        }
        if (!this.isStatusDis) {
          this._postStatus(this.receiveTemp)
        }
      },
      submitRemark () {
        console.log(this.receiveTemp.remarkArr)
        this.receiveTemp.remark = this.receiveTemp.remarkArr ? this.receiveTemp.remarkArr.join(',') : ''
        this.postData(this.receiveTemp)
        this.flightRemarkDialogVIsible = false
      },
      _postAcStopArr (e) {
        let data = {}
        data['f_id'] = e['id']
        data['ac_id'] = e['ac_id']
        data['ac_type'] = e['ac_type']
        data['ac_stop_arr'] = e['ac_stop_arr']
        postAcStopArr(data).then((res) => {
          this.openMessage(res.data.msg, 'success')
        }).catch((err) => {
          console.log(err)
        })
      },
      _postAcType (e) {
        let data = {}
        data['ac_id'] = e['ac_id']
        data['ac_type'] = e['ac_type']
        postAcType(data).then((res) => {
          this.openMessage(res.data.msg, 'success')
        }).catch((err) => {
          console.log(err)
        })
      },
      _postNextime (e) {
        let data = {}
        data['f_id'] = e['id']
        data['flt_date'] = e['flt_date']
        if (!e['nextTime']) {
          data['next_time'] = ''
        } else {
          data['next_time'] = e['flt_date'] + ' ' + e['nextTime']
        }
        postNextime(data).then((res) => {
          this.openMessage(res.data.msg, 'success')
        }).catch((err) => {
          console.log(err)
        })
        console.log(data)
      },
      _postFltId (e) {
        let data = {}
        data['f_id'] = e['id']
        data['flt_id'] = e['flt_id']
        data['flt_date'] = e['flt_date']
        postFltId(data).then((res) => {
          if (res.data.code === 0) {
            this.openMessage(res.data.msg, 'success')
          } else {
            this.openMessage(res.data.msg, 'danger')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      _postAcId (e) {
        let data = {}
        data['f_id'] = e['id']
        data['ac_id'] = e['ac_id']
        data['flt_date'] = e['flt_date']
        postAcId(data).then((res) => {
          if (res.data.code === 0) {
            this.openMessage(res.data.msg, 'success')
          } else {
            this.openMessage(res.data.msg, 'danger')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      _postOffTime (e) {
        let data = {}
        data['f_id'] = e['id']
        data['flt_date'] = e['flt_date']
        data['off_time'] = e['flt_date'] + ' ' + e['off_time']
        postOffTime(data).then((res) => {
          if (res.data.code === 0) {
            this.openMessage(res.data.msg, 'success')
          } else {
            this.openMessage(res.data.msg, 'danger')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      _postStatus (e) {
        let data = {}
        data['f_id'] = e['id']
        data['flt_date'] = e['flt_date']
        if (e['cancel_flag'] === '航后') {
          data['ac_status'] = 1
        }
        if (e['cancel_flag'] === '过站') {
          data['ac_status'] = 2
        }
        if (e['cancel_flag'] === '航前') {
          data['ac_status'] = 3
        } else {
          data['ac_status'] = e['cancel_flag']
        }
        postStatus(data).then((res) => {
          if (res.data.code === 0) {
            this._getArrPlane()
            this.openMessage(res.data.msg, 'success')
          } else {
            this.openMessage(res.data.msg, 'danger')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 根据名字检索用户id
      checkOutUserId (usname) {
        let id = this.allUsers.find(function (item) {
          return item.username === usname
        })
        console.log(id.username, id.id)
        return id.id
      },

      // 提交更新数据
      postData (e) {
        let data = {}
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
        postAttr(data).then((res) => {
          if (res.data.code === 0) {
            if (res.data.data.remark && res.data.data.reminder_time) {
              this.reminderContent.push(e)
              this.openMessage('备注信息更新成功', 'success')
              return true
            } else {
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
        getArrFlight(this.fltDate).then((res) => {
          this.flights = this._handleArrFlight(res.data)
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
          this._serviceCount(res.data)
          // this.handleDutyUser(res.data)
          this.setDutyUser(res.data)
        })
      },
      // 计算维修人员和勤务人员人数
      _serviceCount (data) {
        let service = []
        let maintain = []
        let dutyManger = []
        let dutyEngineer = []
        data.forEach((item) => {
          if (item.rank === 0) {
            service.push(item)
          }
          if (item.rank > 0) {
            maintain.push(item)
            if (item.duty === '值班经理') {
              dutyManger.push(item)
            } else if (item.duty === '工程师') {
              dutyEngineer.push(item)
            }
          }
        })
        this.maintainCount = maintain.length
        this.serviceCount = service.length
        this.dutyEngineerCount = dutyEngineer.length
        this.dutyMangerCount = dutyManger.length
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
      showDutyBox () {
        this.dutyInfoVisable = !this.dutyInfoVisable
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
      tableDutyCellClassName ({row, column, rowIndex, columnIndex}) {
        if (row.duty === '值班经理' && columnIndex === 2) {
          return 'duty-info-manager'
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
      fltDate (newval) {
        this._getAllPlane(newval)
      },
      arrFlight (newval) {
        this.flights = this._handleArrFlight(newval)
        this.residue = newval.length
        this.totlePlane = this.residue + this.closeFlightNum
      },
      currentTime (newval) {
        this._getArrPlane()
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
    .mcc-detail {
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    .mcc-detail-info.el-table.el-table--small td, .el-table--small th {
        padding: 0 3px;
        font-size: 18px;
    }

    .mcc-detail-info.el-table .cell, .el-table th div {
        padding-right: 1px;
        padding-left: 2px;
    }

    .mcc-nav-btn {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-top: 1px;
        /*background-color: rgb(10, 72, 101);*/
        border-color: rgb(10, 72, 101);
    }

    .mcc-nav-btn .mcc-nav-btn-content {
        margin-left: 2%;
        /*padding: 0 10px;*/
        border-radius: 3px;
        font-size: 18px;
        background-color: rgba(64, 158, 255, 0.02);
        color: rgb(10, 72, 101);
    }

    .mcc-detail-info.el-table thead th {
        height: 40px;
        font-size: 20px;
        text-align: center;
        color: #ffffff;
        background-color: #409EFF;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .mcc-detail-info.el-table tbody td {
        text-align: center;
        height: 35px;
    }

    .mcc-detail-info.el-table tbody tr {
        color: #000;
    }

    .mcc-detail-info.el-table .el-table--striped .el-table__body tr.el-table__row--striped.current-row > td,
    .mcc-detail-info.el-table .el-table__body tr.current-row > td,
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td, .el-table__body tr.hover-row > td {
        background-color: #8cbbe6;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #8cbbe6 !important;
    }

    .el-table tr.double td {
        background-color: rgba(201, 227, 234, 0.52) !important;
        color: #000;
    }

    .mcc-detail-info.el-table .el-table__body tr.double {
        background-color: rgba(201, 227, 234, 0.52) !important;
        color: #000;
    }

    .mcc-detail-info.el-table .el-table__body tr.over {
        background-color: #DEE1E0;
        color: gray !important;
    }

    .mcc-detail-info.el-table .el-table__body tr.waring {
        background-color: rgba(255, 147, 147, 0.45);
    }

    .releaseInfo.el-input.is-disabled .el-input__inner {
        background-color: #ffffff;
        color: #000;
    }

    .releaseInfoBox .el-dialog__header {
        background-color: #00ACDD;
    }

    .releaseInfoBox .el-dialog__header .el-dialog__title {
        color: #ffffff;
    }

    .releaseInfoBox .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
        color: #ffffff;
    }

    .el-select.remark {
        width: 100%;
    }

    .duty-dialog .el-dialog__header {
        background-color: #00ACDD;
    }

    .duty-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
        color: #ffffff;
    }

    .duty-dialog .el-dialog__header .el-dialog__title {
        font-size: 22px;
        font-weight: 600;
        color: #ffffff;
    }

    .duty-info {
        font-size: 18px;
    }

    .el-table.duty-info thead th {
        background-color: #409EFF;
        color: #ffffff;
    }

    .duty-info-manager {
        background-color: rebeccapurple !important;
        color: #ffffff;
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

    /* 定义blink类*/
    .mcc-detail-info.el-tabel .el-table__body tr.blink td, .detail-info.el-table .el-table__body tr.el-table__row--striped.blink td {
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
