<template>
    <!--实际是航班计划导出-->
    <div class="export-flight-plan">
        <div class="block">
            <span class="demonstration">请选择日期</span>
            <el-date-picker
                    v-model="planeDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    @change="changeDate">
            </el-date-picker>
            <el-button @click="searchSelect()">查询</el-button>
            <el-button type="primary"
                       @click="exportTable()"
                       class="export-flight"
                       :disabled="isDisabled">
                导出Excel
            </el-button>
            <div style="border: 1px solid rosybrown;margin: 5px 0"></div>
        </div>
        <el-table id="flight-plan"
                  :data="planePlan"
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
                    prop="id"
                    label="编号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="co"
                    label="航空公司">
            </el-table-column>
            <el-table-column
                    prop="flt_id"
                    label="航班号">
            </el-table-column>
            <el-table-column
                    prop="ac_id"
                    label="机号">
            </el-table-column>
            <el-table-column
                    prop="ac_type"
                    label="机型">
            </el-table-column>
            <el-table-column
                    prop="dep_apt"
                    label="起飞站">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="ac_stop_arr"-->
            <!--label="机位">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop=""
                    label="交回人">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="交回时间">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="回收人">
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getArrFlight} from '../../api/plane'

  export default {
    name: 'export-duty',
    data () {
      return {
        planeDate: '',
        planePlan: [],
        isDisabled: true
      }
    },
    methods: {
      changeDate (val) {
        this.planeDate = val
        this.planePlan = []
        this._getArrPlane(val)
      },
      _getArrPlane (d) {
        getArrFlight(d).then((res) => {
          this._handleExportData(res.data)
          if (this.planePlan.length > 0) {
            this.isDisabled = false
          }
          console.log(this.planePlan)
        }).catch((err) => {
          console.log(err)
        })
      },
      // 处理航班航空公司及导出数据
      _handleExportData (data) {
        data.forEach((item, index) => {
          let flightPlan = []
          flightPlan['index'] = index
          flightPlan['id'] = item.id
          flightPlan['ac_id'] = item.ac_id
          flightPlan['flt_id'] = item.flt_id
          flightPlan['ac_type'] = item.ac_type.ac_type
          flightPlan['dep_apt'] = item.dep_apt.dep_apt_zh
          flightPlan['ac_stop_arr'] = item.ac_stop_arr
          flightPlan['co'] = this._handleFlightCo(item.flt_id)
          this.planePlan.push(flightPlan)
        })
      },
      _handleFlightCo (fltId) {
        const List = [
          {
            flightCode: 'CA',
            coName: '国航'
          },
          {
            flightCode: 'SC',
            coName: '山东航空'
          },
          {
            flightCode: '8L',
            coName: '祥鹏航空'
          },
          {
            flightCode: 'TV',
            coName: '西藏航空'
          },
          {
            flightCode: '3U',
            coName: '四川航空'
          },
          {
            flightCode: 'ZH',
            coName: '深圳航空'
          },
          {
            flightCode: 'HU',
            coName: '海南航空'
          },
          {
            flightCode: 'HO',
            coName: '吉祥航空'
          },
          {
            flightCode: 'PN',
            coName: '西部航空'
          },
          {
            flightCode: 'MU',
            coName: '东方航空'
          },
          {
            flightCode: 'NX',
            coName: '澳门航空'
          },
          {
            flightCode: 'HX',
            coName: '香港航空'
          },
          {
            flightCode: 'KY',
            coName: '昆明航空'
          },
          {
            flightCode: 'FU',
            coName: '福州航空'
          },
          {
            flightCode: 'Y8',
            coName: '杨子江航空'
          },
          {
            flightCode: 'FM',
            coName: '上海航空'
          },
          {
            flightCode: 'JD',
            coName: '首都航空'
          }
        ]
        let CN = List.find(function (x) { return x.flightCode === fltId.substr(0, 2) })
        if (CN !== undefined) {
          return CN.coName
        }
      },

      tableRowClassName () {},
      searchSelect () {
        this.planePlan = []
        this._getArrPlane(this.planeDate)
      },
      // 导出数据
      exportTable () {
        require.ensure([], () => {
          /* eslint-disable no-new */
          const {exportJsonToExcel} = require('../../vendor/Export2Excel')
          const tHeader1 = [`${this.planeDate}日航班计划`]
          const tHeader2 = ['序号', '编号', '航空公司', '航班号', '机号', '机型', '起飞', '交回人',
            '交回时间', '接收人']
          const filterVal = ['index', 'id', 'co', 'flt_id', 'ac_id', 'ac_type', 'dep_apt', '', '',
            '']
          const list = this.planePlan
          // console.log(list)
          const data = this.formatJson(filterVal, list)
          // console.log(data)
          exportJsonToExcel(tHeader1, tHeader2, data, `${this.planeDate}日航班计划`, [0, 9])
        })
      },

      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>

<style rel="stylesheet">
    .export-flight-plan {
        margin: 10px 10px;
    }

    .export-flight {
        margin-top: 10px;
    }

    .export-flight-plan .el-table thead tr {
        color: #000000;
        font-size: larger;
        font-weight: bold;
    }

    .export-flight-plan .el-table tbody tr {
        color: #000;
        font-size: larger;
    }
</style>