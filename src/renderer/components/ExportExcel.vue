<template>
    <div class="excel-info">
        <div class="excel-info-header">
            <div>
                Ameco贵阳分公司航班信息系统-数据导出
                <el-button size="mini" type="text" style="float: right;color: #ffffff;
                margin-right:10px;font-size:24px"
                           @click="backHome()">
                    x
                </el-button>
            </div>
        </div>
        <div class="excel-info-nav">
            <el-button size="medium " class="excel-info-nav-btn" :class="[dutyActive ? 'is-active':'']"
                       @click="jumpExportDuty()">航班计划
            </el-button>
            <el-button size="medium " class="excel-info-nav-btn" :class="[planeActive ? 'is-active':'']"
                       @click="jumpExportPlane()">航班信息
            </el-button>
            <el-button size="medium " class="excel-info-nav-btn"
                       @click="jumpExportWorkHours()">工时信息
            </el-button>
            <el-button size="medium " class="excel-info-nav-btn"
                       @click="jumpExportNight()">夜餐信息
            </el-button>
        </div>
        <div style="border: 1px solid lightgray;"></div>
        <router-view></router-view>

    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'export-excel',
    data () {
      return {
        arrFlights: [],
        dutyActive: true,
        planeActive: false,
        nightActive: false,
        workHoursActive: false,
        tableData:
          [
            {
              num: '00900',
              name: '充电宝',
              words: '电',
              shuiwu_num: 123131
            },
            {
              num: '00900',
              name: '充电宝',
              words: '电',
              shuiwu_num: 123131
            }
          ]
      }
    },
    computed: {
      //   ...mapGetters([
      //     'exportPlanes',
      //     'planeDate'
      //   ])
    },
    methods: {
      backHome () {
        window.close()
        // this.$router.push({path: '/'})
      },
      jumpExportDuty () {
        this.$router.push({path: '/excel/export-duty'})
        this.dutyActive = true
        this.planeActive = false
      },
      jumpExportPlane () {
        this.$router.push({path: '/excel/export-plane'})
        this.planeActive = true
        this.dutyActive = false
      },
      jumpExportNight () {
        this.$router.push({path: '/excel/export-night'})
        this.nightActive = true
        this.planeActive = false
        this.dutyActive = false
      },
      jumpExportWorkHours () {
        this.$router.push({path: '/excel/export-workHours'})
        this.workHoursActive = true
        this.nightActive = false
        this.planeActive = false
        this.dutyActive = false
      }
    },
    created () {
      this.jumpExportDuty()
    }
  }
</script>

<style scoped rel="stylesheet">
    .excel-info {
        width: 100%;
    }

    .excel-info-header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #00acdd;
        font-size: 32px;
        color: white;
    }

    .excel-info .excel-info-nav {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .excel-info-nav-btn {
        width: 18%;
        margin-right: 5%;
    }

</style>