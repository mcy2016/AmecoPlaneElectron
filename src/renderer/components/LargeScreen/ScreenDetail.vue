<template>
    <div class="screen-detail">
        <div class="screen-nav-btn">
            <el-date-picker class="screen-nav-btn-content-date"
                            v-model="flightDate"
                            size="mini"
                            type="date"
                            :default-value="new Date()"
                            value-format="yyyy-MM-dd"
                            @change="changeFltDate()"
                            placeholder="选择日期">
            </el-date-picker>
            <span class="screen-nav-btn-content">航班日期：{{fltDate}}</span>
            <span class="screen-nav-btn-content">总航班：{{totlePlane}}</span>
            <span class="screen-nav-btn-content" style="font-size: 24px;">剩余航班：{{residue}}</span>
            <span class="screen-nav-btn-content" style="font-size: 24px;">当前时间：{{currentTime}}</span>

            <!--<el-button class="screen-nav-btn-content"-->
            <!--type="primary" style="height: 30px;"-->
            <!--size="mini" @click="showDutyBox()">今日值日人员-->
            <!--</el-button>-->
            <span class="screen-nav-btn-content" style="font-size: 24px;">今日值日人员：</span>
            <!--<span class="screen-nav-btn-content" style="font-size: 24px;">今日值班人数：{{dutyUsers.length}}</span>-->
        </div>
        <div style="border: 2px solid #DCD486"></div>
        <el-table class="screen-detail-info"
                  :data="flights"
                  border
                  stripe
                  size="small"
                  highlight-current-row
                  tooltip-effect="dark"
                  :row-class-name="tableRowClassName"
                  :cell-class-name="tableCellClassName"
                  :header-row-class-name="headerClassName">

            <el-table-column
                    type='index'
                    label="序" width="50">
            </el-table-column>
            <el-table-column
                    prop="flt_id"
                    label="航班号" width="100">
            </el-table-column>
            <el-table-column
                    prop="ac_id"
                    label="机号" width="85">
            </el-table-column>
            <el-table-column
                    prop="ac_type"
                    label="机型" width="75">
                <template slot-scope="scope">
                    <span style="">{{scope.row.ac_type}}</span>
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
                    label="预达" width="75">
                <template slot-scope="scope">
                    <span v-if="scope.row.predict_time" style="color: red;">
                         {{convertHMS(scope.row.predict_time)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="余时" width="65">
                <template slot-scope="scope">
                    <span v-if="scope.row.surplus_time && convertMinutes(scope.row.surplus_time) >= 0"
                          style="color: blue">
                        {{convertMinutes(scope.row.surplus_time)}}
                    </span>
                    <span v-else>
                        {{convertMinutes(scope.row.surplus_time)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ac_stop_arr"
                    label="机位" width="85">
                <template slot-scope="scope">
                    <div style="color:red;" scope="scope">
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
                    <span v-if="scope.row.receive.length===2" style="font-size:24px;font-weight: 600;">
                        {{scope.row.receive[0]+' &nbsp' }} {{ scope.row.receive[1]}}
                    </span>
                    <span v-if="scope.row.receive.length===1"
                          style="color: black;font-weight: 500;">{{scope.row.receive[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="送机" width="160">
                <template slot-scope="scope">
                    <span v-if="scope.row.send.length===2" style="font-weight: 500;">
                        {{scope.row.send[0]+' ' }} {{ scope.row.send[1]}}
                    </span>
                    <span v-if="scope.row.send.length===1" style="font-size: 22px;font-weight: 500;font-family: 黑体">{{scope.row.send[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="绕机" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.round.length===1" style="font-size:24px;font-weight: 500;">{{scope.row.round[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="放行" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.release.length===1" style="font-size:24px;font-weight: 500;">{{scope.row.release[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="实达" prop="on_time" width="55">
                <template slot-scope="scope">
                    <span style="font-size: 16px; padding-left: 0;">{{scope.row.on_time}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="出港" width="60">
                <template slot-scope="scope">
                    <span style="font-size: 18px; padding-left: 0;">{{scope.row.nextTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态" width="50">
                <template slot-scope="scope">
                    <span v-if="scope.row.cancel_flag===0" style="font-size: 16px;padding-left: 0;">过</span>
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
    </div>
</template>

<script type="text/ecmascript-6">
  import ArrFlight from '../../common/js/arrFlight'
  import {getAllFlight, getArrFlight} from '../../api/plane'
  import {mapGetters, mapMutations} from 'vuex'
  import {convertHMS} from '../../common/js/utils'

  export default {
    name: 'screen-detail',
    data () {
      return {
        flights: [],
        flightDate: '', // 选择的日期
        totlePlane: null,
        residue: null,
        currentTime: ''
      }
    },
    computed: {
      ...mapGetters([
        'fltDate'
      ])
    },
    methods: {
      changeFltDate () {
        this.setFltDate(this.flightDate)
        this._getArrPlane(this.fltDate)
      },
      _getArrPlane () {
        getArrFlight(this.fltDate).then((res) => {
          this.flights = this._handleArrFlight(res.data)
          this.residue = res.data.length
          // this.setArrFlight(res.data)
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
      // 处理进港航班数据格式
      _handleArrFlight (flightArr) {
        let arrFlights = []
        flightArr.forEach((item) => {
          arrFlights.push(new ArrFlight(item))
        })
        return arrFlights
      },
      headerClassName ({row, rowIndex}) {
        return 'screen-detail-table-header'
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
      tableCellClassName ({row, column, rowIndex, columnIndex}) {
        if (row.ac_type) {
          if (!this.findNoRelease(row)) {
            return ''
          }
          if (row.off_time && this.convertMinutes(row.surplus_time) < 15 && row.release.length === 0) {
            if (columnIndex === 11) {
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
        let s = this.p(dateNow.getSeconds())
        this.currentTime = [hours, minutes, s].join(':')
        console.log(this.currentTime)
      },
      // 时间补足两位
      p (n) {
        return n < 10 ? '0' + n : n
      },
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
      ...mapMutations({
        setArrFlight: 'SET_ARR_FLIGHT',
        setFltDate: 'SET_FLT_DATE'
      })
    },
    watch: {
      fltDate (newval) {
        this._getArrPlane()
      },
      // arrFlight (newval) {
      //   this.flights = this._handleArrFlight(newval)
      //   this.residue = newval.length
      // },
      currentTime (newval) {
        this._getArrPlane()
        this._getAllPlane(this.fltDate)
        // this.getCurrentTime()
        setInterval(this.getCurrentTime, 30000)
      }
    },
    created () {
      this._getAllPlane(this.fltDate)
      this._getArrPlane()
      this.getCurrentTime()
    }
  }
</script>

<style rel="stylesheet">
    .screen-detail {
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    .screen-nav-btn {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-top: 1px;
        /*background-color: rgb(10, 72, 101);*/
        background-color: #828DA1;
        /*border-color: rgb(10, 72, 101);*/
    }

    .screen-nav-btn .screen-nav-btn-content {
        margin-left: 2%;
        /*padding: 0 10px;*/
        border-radius: 2px;
        font-size: 18px;
        font-weight: 600;
        /*background-color: rgba(64, 158, 255, 0.02);*/
        background-color: #828DA1;
        color: #EFE570;
    }

    .el-date-editor.screen-nav-btn-content-date.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date {
        margin-left: 2%;
        font-size: 18px;
        background: none;
    }

    /*.screen-nav-btn .screen-nav-btn-content-date {*/
    /*margin-left: 2%;*/
    /*font-size: 18px;*/
    /*background: none;*/
    /*}*/

    .screen-nav-btn .el-date-editor.screen-nav-btn-content-date.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date .el-input__inner {
        height: 24px;
        background-color: #828DA1;
        color: #EFE570;
        border: 1px solid #efe570 !important;
    }

    .screen-nav-btn .el-date-editor.screen-nav-btn-content-date.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date .el-input__prefix, .el-input__suffix {
        color: #EFE570;
    }

    .screen-detail .el-table th, .el-table tr {
        background: none;
        font-size: 22px;
    }

    .el-table thead tr.screen-detail-table-header {
        background-color: #6DAED5 !important;
        font-size: 22px;
        color: #ffffff;
    }

    /*.el-table.screen-detail-info.el-table--striped .el-table__body tr.el-table__row--striped td {*/
    /*background-color: blue;*/
    /*}*/

    .screen-detail-info.el-table.el-table--striped .el-table__body tr.el-table__row--striped.double td {
        background-color: #8996A7 !important;
        color: #ffffff;
    }

    .screen-detail-info.el-table.el-table--striped .el-table__body tr td {
        background-color: #6A8EE6;
        color: #ffffff;
    }

    .screen-detail-info.el-table.el-table--striped .el-table__body tr.el-table__row--striped.over td {
        /*background-color: #94D5DB;*/
        /*color: rgba(62, 62, 62, 0.8) !important;*/
        background-color: #DEE1E0 !important;
        color: gray;

    }

    .screen-detail-info.el-table.el-table--striped .el-table__body tr.over td {
        /*background-color: #94D5DB;*/
        /*color: rgba(62, 62, 62, 0.8) !important;*/
        background-color: #DEE1E0 !important;
        color: gray;
    }

    .screen-detail-info.el-table.el-table--striped .el-table__body tr.el-table__row--striped.waring td {
        background-color: rgba(255, 147, 147, 0.65);

    }

    .screen-detail-info.el-table.el-table--striped .el-table__body tr.waring td {
        background-color: rgba(255, 147, 147, 0.65);

    }

    .screen-detail-info.el-table .cell, .el-table th div {
        text-align: center;
        padding-right: 1px;
        padding-left: 2px;
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
    .screen-detail-info.el-table.el-table--striped .el-table__body tr.blink td, .screen-detail-info.el-table.el-table--striped .el-table__body tr.el-table__row--striped.blink td {
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