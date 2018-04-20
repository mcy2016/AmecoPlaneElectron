<template>
    <div class="export-work-hours">
        <span class="demonstration">选择航班日期:</span>
        <el-date-picker
                v-model="dutyDate"
                unlink-panels
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="ChoiceDutyDate()">
        </el-date-picker>
        <el-button @click="searchSelect()">查询工时</el-button>
        <el-button @click="searchDetail()">工时详情</el-button>

        <el-button type="primary"
                   @click="exportDutyWorkTable()"
                   class="export-btn"
                   :disabled="isDisabled">
            导出工时
        </el-button>
        <el-button type="primary"
                   @click="exportDetailTable()"
                   class="export-btn"
                   :disabled="isDisabled">
            导出工时详情
        </el-button>
        <div style="border: 1px solid rosybrown;margin: 5px 0"></div>
        <!--// detail-->
        <div v-show="flag === 'detail'">
            <el-table id="duty-log"
                      :data="dutyWorks"
                      style="width: 100%"
                      border
                      stripe
                      tooltip-effect="light">
                <!--:row-class-name="tableRowClassName">-->
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>

                <el-table-column
                        prop="shift_date"
                        label="日期">
                </el-table-column>

                <el-table-column
                        prop="shift"
                        label="班制"
                        width="80">
                    <template slot-scope="scope">
                        {{scope.row.shift === 2 ? '白班' : '晚班'}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="时间">
                </el-table-column>
                <el-table-column
                        prop="profession"
                        label="工时角色">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="备注">
                </el-table-column>
            </el-table>

        </div>
        <!--// dutyWork-->
        <div v-show="flag==='dutyWork'">
            <el-table id="duty-log"
                      :data="dutyWorks"
                      style="width: 100%"
                      border
                      stripe
                      tooltip-effect="light">
                <!--:row-class-name="tableRowClassName">-->
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>

                <el-table-column
                        prop="shift"
                        label="班制"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="prefession"
                        label="工时角色">
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="出勤天数">
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="工时">
                    <template slot-scope="scope">
                        {{scope.row.count * 12.5}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="备注">
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import {getDutyLog} from '../../api/user_log'

  export default {
    name: 'export-work-hours',
    data () {
      return {
        dutyDate: '',
        isDisabled: false,
        dutyLog: [],
        dutyWorks: [],
        flag: 'detail' // dutyWork
      }
    },
    methods: {
      ChoiceDutyDate () {
        this.dutyWorks = []

        this.dutyWorks = this._getWorkHours(this.dutyDate, this.flag)
      },
      searchSelect () {
        this.flag = 'dutyWork'
        this.dutyWorks = []
        this.dutyWorks = this._getWorkHours(this.dutyDate, this.flag)
      },

      searchDetail () {
        this.dutyWorks = []
        this.flag = 'detail'
        this._getWorkHours(this.dutyDate, this.flag)
      },
      exportDutyWorkTable () {
        require.ensure([], () => {
          /* eslint-disable no-new */
          const {exportJsonToExcel} = require('../../vendor/Export2Excel')
          const tHeader1 = [`${this.dutyDate[0]} 至 ${this.dutyDate[1]}工时统计数据`]
          const tHeader2 = ['班制', '工时角色', '出勤天数', '工时', '备注']
          const filterVal = ['shift', 'prefession', 'count', 'workHours', '']
          const list = this._handleDutyWorkExport(this.dutyWorks)
          const data = this.formatJson(filterVal, list)
          exportJsonToExcel(tHeader1, tHeader2, data, `${this.dutyDate[0]} 至 ${this.dutyDate[1]}工时统计数据`, [0, 4])
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      exportDetailTable () {
        require.ensure([], () => {
          /* eslint-disable no-new */
          const {exportJsonToExcel} = require('../../vendor/Export2Excel')
          const tHeader1 = [`${this.dutyDate[0]} 至 ${this.dutyDate[1]}工时详情数据`]
          const tHeader2 = ['日期', '班制', '姓名', '时间', '工时角色', '备注']
          const filterVal = ['shift_date', 'shift', 'username', 'create_time', 'profession', '']
          const list = this._handleDetailWorks(this.dutyWorks)
          const data = this.formatJson(filterVal, list)
          exportJsonToExcel(tHeader1, tHeader2, data, `${this.dutyDate[0]} 至 ${this.dutyDate[1]}工时详情数据`, [0, 5])
        })
      },
      _handleDetailWorks (data) {
        let list = []
        data.forEach(item => {
          if (item.shift === 2) {
            item.shift = '白班'
          }
          if (item.shift === 1) {
            item.shift = '晚班'
          }
          list.push(item)
        })
        return list
      },
      _handleDutyWorkExport (data) {
        let list = []
        data.forEach(item => {
          console.log(item)
          item.workHours = item.count * 12.5
          list.push(item)
        })
        return list
      },
      _getWorkHours (d) {
        if (!d) {
          return ''
        }
        getDutyLog(d).then((res) => {
          this.dutyLog = res.data
          this.dutyWorks = this._handleWorkHours(res.data, this.flag)
          console.log(this.dutyWorks)
        }).catch((err) => {
          console.log(err)
        })
      },
      // [{prefession:AV,count:10,shift:'白班'},{},{},{}]
      _handleWorkHours (data, flag) {
        const dutyWork = []
        // 各专业晚班
        let avdTemp = []
        let medTemp = []
        let svdTemp = []
        let xjdTemp = []
        // 白班各专业
        let avnTemp = []
        let menTemp = []
        let svnTemp = []
        let xjnTemp = []
        let dutyDetail = []

        for (let i = 0; i < data.AV.length; i++) {
          if (data.AV[i].shift === 1) {
            // avTemp.prefession = 'AV'
            // avTemp.shift = '白班'
            avnTemp.push(data.AV[i])
          }
          if (data.AV[i].shift === 2) {
            // avTemp.prefession = 'AV'
            // avTemp.shift = '白班'
            avdTemp.push(data.AV[i])
          }
        }
        for (let j = 0; j < data.ME.length; j++) {
          if (data.ME[j].shift === 2) {
            medTemp.push(data.ME[j])
          }
          if (data.ME[j].shift === 1) {
            menTemp.push(data.ME[j])
          }
        }
        for (let j = 0; j < data.SV.length; j++) {
          if (data.SV[j].shift === 2) {
            svdTemp.push(data.SV[j])
          }
          if (data.SV[j].shift === 1) {
            svnTemp.push(data.SV[j])
          }
        }
        for (let j = 0; j < data.XJ.length; j++) {
          if (data.XJ[j].shift === 2) {
            xjdTemp.push(data.XJ[j])
          }
          if (data.XJ[j].shift === 1) {
            xjnTemp.push(data.XJ[j])
          }
        }
        // console.log(avnTemp, avdTemp)
        let nightAv = {}
        let dayAV = {}
        let nightMe = {}
        let dayMe = {}
        let nightSv = {}
        let daySv = {}
        let nightXj = {}
        let dayXj = {}

        dayAV['prefession'] = 'AV'
        dayAV['shift'] = '白班'
        dayAV['count'] = avdTemp.length
        // dutyWork.push(dayAV)
        nightAv['prefession'] = 'AV'
        nightAv['shift'] = '晚班'
        nightAv['count'] = avnTemp.length
        // dutyWork.push(nightAv)

        dayMe['prefession'] = 'ME'
        dayMe['shift'] = '白班'
        dayMe['count'] = medTemp.length
        // dutyWork.push(dayMe)
        nightMe['prefession'] = 'ME'
        nightMe['shift'] = '晚班'
        nightMe['count'] = menTemp.length
        // dutyWork.push(nightMe)

        daySv['prefession'] = 'SV'
        daySv['shift'] = '白班'
        daySv['count'] = svdTemp.length
        // dutyWork.push(daySv)
        nightSv['prefession'] = 'SV'
        nightSv['shift'] = '晚班'
        nightSv['count'] = svnTemp.length
        // dutyWork.push(nightSv)

        dayXj['prefession'] = 'XJ'
        dayXj['shift'] = '白班'
        dayXj['count'] = xjdTemp.length
        // dutyWork.push(dayXj)
        nightXj['prefession'] = 'XJ'
        nightXj['shift'] = '晚班'
        nightXj['count'] = xjnTemp.length
        dutyWork.push(dayAV, dayMe, daySv, dayXj, nightAv, nightMe, nightSv, nightXj)
        // dutyDetail.push(avdTemp, avnTemp, medTemp, menTemp, svdTemp, svnTemp, xjdTemp, xjnTemp)
        dutyDetail = avdTemp.concat(avnTemp, medTemp, menTemp, svdTemp, svnTemp, xjdTemp, xjnTemp)
        // console.log(dutyDetail)
        if (flag === 'dutyWork') {
          return dutyWork
        } else {
          return dutyDetail
        }
      }
    }
  }
</script>

<style rel="stylesheet">
    .export-work-hours {
        margin: 10px 10px;
    }

    .export-work-hours .export-btn {
        margin-top: 10px;
    }

    .export-table {
        margin-top: 10px;
    }
</style>