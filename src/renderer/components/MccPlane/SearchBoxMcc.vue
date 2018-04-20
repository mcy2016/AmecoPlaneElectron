<template>
    <div class="search-box" v-if="showSearch">
        <table class="search-table">
            <thead>
            <tr>
                <th style="width: 20%;border-top-left-radius: 5px;">航班号</th>
                <th style="width: 20%;">机 号</th>
                <th style="width: 30%;">航班日期</th>
                <th style="border-top-right-radius: 5px;">操 作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <el-input v-model="searchData.flt_id" placeholder="航班号"></el-input>
                </td>
                <td>
                    <el-input v-model="searchData.ac_id" placeholder="机号"></el-input>
                </td>
                <td>
                    <el-date-picker
                            v-model="flightDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            @change="changeFltDate()"
                            placeholder="选择日期">
                    </el-date-picker>
                </td>
                <td>
                    <el-button type="primary" @click="selectFlight()">查 询</el-button>
                </td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td>
                    <el-button type="primary" @click="exportTable()">导 出</el-button>
                </td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td>
                    <el-button type="primary" @click="searchFilterVisible=true">过 滤</el-button>
                </td>
            </tr>
            <tr>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td style="border:none"></td>
                <td>
                    <el-button type="primary" @click="newFlight()">新 增</el-button>
                </td>
            </tr>
            </tbody>
        </table>

        <!--过虑-->
        <div class="search-fliter" v-if="searchFilterVisible">
            <div style="margin-left: 20px;margin-top: 10px">
                <el-radio size="small" v-model="searchFilter" label="1" border>航前</el-radio>
                <el-radio size="small" v-model="searchFilter" label="2" border>关闭</el-radio>
                <el-radio size="small" v-model="searchFilter" label="3" border>正班</el-radio>
                <el-radio size="small" v-model="searchFilter" label="4" border>备降</el-radio>
            </div>
            <div style="margin-left: 10px;margin-top: 15px;">
                <el-button size="small" style="background-color:#f5f7fa;width: 60%; "
                           @click="onsubmitFilter()">
                    确定
                </el-button>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {getArrFlight, getBeforFlight} from '../../api/plane'

  const {ipcRenderer} = require('electron') // TODO 如果是web打包需注释

  export default {
    name: 'search-box-mcc',
    data () {
      return {
        flightDate: this.fltDate,
        searchBoxVisable: true,
        newFlightBoxVisable: false,
        searchFilter: '',
        searchFilterVisible: false,
        searchData: {flt_id: '', ac_id: ''}
      }
    },
    computed: {
      ...mapGetters([
        'showSearch',
        'fltDate'
      ])
    },
    methods: {
      selectFlight () {
        this._getArrFlight(this.flightDate)
      },
      onsubmitFilter () {
        this.searchFilterVisible = false
        if (this.searchFilter === '1') {
          getBeforFlight(this.fltDate).then((res) => {
            this.openMessage(`增加了${res.data.data.length}个航前`, 'success')
            this._getArrFlight(this.flightDate)
          })
        }
      },
      exportTable () {
        ipcRenderer.send('exportPage') // TODO 如果是web打包需注释
        // TODO electron打包需注释
        // const {href} = this.$router.resolve({
        //   path: '/excel'
        // })
        // let exportWin = window.open(href, 'Ameco贵阳分公司-数据导出', '{frame: false}')
        //
        // console.log(exportWin)
        // this.$router.push({
        //   path: '/excel'
        // })
      },
      _getArrFlight (d) {
        getArrFlight(d).then((res) => {
          this.setArrFlight(res.data)
          this.setFltDate(d)
        })
      },
      changeFltDate () {
        this._getArrFlight(this.flightDate)
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      },
      // 新增航班
      newFlight () {
        this.newFlightBoxVisable = true
        this.setShowNew(this.newFlightBoxVisable)
      },
      ...mapMutations({
        setArrFlight: 'SET_ARR_FLIGHT',
        setFltDate: 'SET_FLT_DATE',
        setShowNew: 'SET_SHOW_NEW'
      })
    },
    watch: {
      flightDate (newval) {
        // this.setFltDate(newval)
      }
    },
    created () {
      this.flightDate = this.fltDate
      this.searchBoxVisable = this.showSearch
    }
  }
</script>

<style>
    .search-box {
        width: 600px;
        height: 240px;
        position: fixed;
        bottom: 15px;
        right: 15px;
        border-radius: 5px;
        background-color: rgba(3, 35, 107, 0.4);
        z-index: 10;
    }

    .search-box .search-table {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: white;
        font-size: 20px;
        border-spacing: 0;
        /*border: blue 1px solid;*/
    }

    .search-box .search-table thead tr th {
        border-left: 1px #ffffff solid;
        border-top: 1px #ffffff solid;
        border-bottom: 1px #ffffff solid;
    }

    .search-box .search-table tbody {
        width: 30px;
        line-height: 30px;
    }

    .search-box .search-table tbody tr td {
        border-left: 1px #ffffff solid;
        border-bottom: 1px #ffffff solid;
    }

    .search-table .el-input__inner {
        background-color: rgba(251, 245, 245, 0);
        color: #ffffff;
        border: rgba(251, 245, 245, 0);
        border-radius: 2px;
        font-size: 18px;
    }

    .search-table .el-input__icon {
        color: #ffffff;
    }

    .search-box .el-button {
        width: 80%;
        margin: 2px 10%;
    }

    .search-box .search-fliter {
        position: absolute;
        width: 400px;
        height: 120px;
        bottom: 10px;
        right: 30%;
        padding-top: 10px;
        padding-left: 10px;
        border-radius: 4px;
        background-color: #f5f7fa;

    }
</style>