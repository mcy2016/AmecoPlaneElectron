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
                    <el-button type="primary">导 出</el-button>
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
                    <el-button type="primary" @click="getCloseFlight()">恢 复</el-button>
                </td>
            </tr>
            </tbody>
        </table>

        <!--过虑-->
        <div class="search-fliter" v-if="searchFilterVisible">
            <div style="margin-left: 20px;margin-top: 10px">
                <el-radio size="small" v-model="searchFilter" label="1" border>航前</el-radio>
                <el-radio size="small" v-model="searchFilter" label="2" border>关闭</el-radio>
                <el-radio size="small" v-model="searchFilter" label="3" border>正常</el-radio>
                <el-radio size="small" v-model="searchFilter" label="4" border>所有</el-radio>
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

<script>
  // const {Remote} = require('electron').remote
  import {mapGetters, mapMutations} from 'vuex'
  import {getArrFlight, getBeforFlight, getCloseFlight, getAllFlight} from '../../api/plane'

  export default {
    name: 'search-box',
    data () {
      return {
        flightDate: this.fltDate,
        searchBoxVisable: true,
        searchFilter: '',
        searchFilterVisible: false,
        closeFlightVisible: false,
        searchData: {flt_id: '', ac_id: ''},
        allFlight: []
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
        if (this.searchFilter === '1') {
          getBeforFlight(this.fltDate).then((res) => {
            this.openMessage(`增加了${res.data.data.length}个航前`, 'success')
            this._getArrFlight(this.flightDate)
            this.searchFilterVisible = false
          })
        }
        // 选择关闭时显示关闭的航班
        if (this.searchFilter === '2') {
          getCloseFlight(this.flightDate).then((res) => {
            this.setArrFlight(res.data)
            console.log(res.data)
            this.setFltDate(this.flightDate)
            this.searchFilterVisible = false
          }).catch((err) => {
            console.log(err)
          })
        }
        // 选择正常时显示未进港的航班
        if (this.searchFilter === '3') {
          this._getArrFlight(this.flightDate)
          this.searchFilterVisible = false
        }
        // 选择所有时显示所有进港的航班
        if (this.searchFilter === '4') {
          getAllFlight(this.flightDate).then((res) => {
            this.searchFilterVisible = false
            this.setArrFlight(res.data)
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      // TODO 获取所有航班
      // _getAllFlight (d) {
      //   getCloseFlight(d).then((res) => {
      //     this.allFlight = res.data
      //     console.log(this.allFlight)
      //     getArrFlight(d).then((rs) => {
      //       this.allFlight += rs.data
      //       console.log(this.allFlight)
      //     }).catch((error) => {
      //       console.log(error)
      //     })
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      //   this.setArrFlight(this.allFlight)
      // },
      getCloseFlight () {
        this.closeFlightVisible = true
        this.setShowClose(this.closeFlightVisible)
        getCloseFlight(this.flightDate).then((res) => {
          console.log(res.data)
          this.setCloseFlight(res.data)
        }).catch((err) => {
          console.log(err)
        })
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
      ...mapMutations({
        setArrFlight: 'SET_ARR_FLIGHT',
        setFltDate: 'SET_FLT_DATE',
        setCloseFlight: 'SET_CLOSE_FLIGHT',
        setShowClose: 'SET_SHOW_CLOSE'
      })
    },
    watch: {
      flightDate (newval) {
        // this.setFltDate(newval)
        this.searchFilter = ''
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
