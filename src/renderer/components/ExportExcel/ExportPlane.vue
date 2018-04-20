<template>
    <div class="export-plane">
        <span class="demonstration">选择航班日期:</span>
        <el-date-picker
                v-model="planeDate"
                unlink-panels
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="ChoicePlaneDate()">
        </el-date-picker>
        <el-button @click="searchSelect()">查询</el-button>
        <el-button type="primary"
                   @click="exportTable()"
                   class="export-table"
                   :disabled="isDisabled">
            导出Excel
        </el-button>
        <div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getOldFlight} from '../../api/plane'
  import {mapMutations} from 'vuex'
  import ExportHandlePlane from '../../common/js/exportPlane'

  export default {
    name: 'export-plane',
    data () {
      return {
        planeDate: '',
        exportPlane: [],
        isDisabled: true
      }
    },
    methods: {
      searchSelect () {
        this._getOldFlight(this.planeDate)
      },
      ChoicePlaneDate () {
        // console.log(this.planeDate)
        this._getOldFlight(this.planeDate)
      },
      _getOldFlight (planeDate) {
        this.setPlaneDate = planeDate
        getOldFlight(planeDate).then((res) => {
          console.log(res.data)
          this.exportPlane = res.data
          this.setExportPlane(res.data)
          if (res.data.length > 0) {
            this.isDisabled = false
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      exportTable () {
        require.ensure([], () => {
          /* eslint-disable no-new */
          const {exportJsonToExcel} = require('../../vendor/Export2Excel')
          const tHeader1 = [`${this.planeDate[0]} 至 ${this.planeDate[1]}日航班数据`]
          const tHeader2 = ['航班号', '机号', '机型', '机位', '航班日期', '起飞站', '实起', '预达', '实达',
            '接机人1', '接机人2', '送机人1', '送机人2', '绕机人', '放行']
          const filterVal = ['flt_id', 'ac_id', 'ac_type', 'ac_stop_arr', 'flt_date', 'dep_apt', 'off_time', 'predict_time', 'on_time',
            'receiveUser1', 'receiveUser2', 'sendUser1', 'sendUser2', 'round', 'release']
          const list = this._handleArrFlight(this.exportPlane)
          // console.log(list)
          const data = this.formatJson(filterVal, list)
          // console.log(data)
          exportJsonToExcel(tHeader1, tHeader2, data, '历史航班数据', [0, 14])
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      _handleArrFlight (flightArr) {
        let arrFlights = []
        flightArr.forEach((item) => {
          arrFlights.push(new ExportHandlePlane(item))
        })
        return arrFlights
      },
      ...mapMutations({
        setExportPlane: 'SET_EXPORT_PLANE',
        setPlaneDate: 'SET_PLANE_DATE'
      })
    }
  }
</script>

<style scoped rel="stylesheet">
    .export-plane {
        margin: 10px 10px;
    }

    .export-table {
        margin-top: 10px;
    }
</style>