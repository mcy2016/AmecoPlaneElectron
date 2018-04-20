<template>
    <div class="close">
        <el-dialog title="航班恢复"
                   :visible.sync="showClose"
                   :close-on-click-modal="false"
                   :before-close="cancleForm">
            <el-table :data="closeFlight"
                      tooltip-effect="light">
                <el-table-column
                        type="index"
                        width="55">
                </el-table-column>
                <el-table-column property="flt_id" label="航班号" width="150"></el-table-column>
                <el-table-column property="ac_id" label="机号" width="150"></el-table-column>
                <el-table-column property="ac_stop_arr" label="机位"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="recover(scope.row)">恢复</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {recover, getArrFlight} from '../../api/plane'

  export default {
    name: 'close-flight-dialog',
    computed: {
      ...mapGetters([
        'showClose',
        'closeFlight',
        'fltDate'
      ])
    },
    methods: {
      cancleForm () {
        this.setShowClose(false)
      },
      recover (row) {
        recover(row).then((res) => {
          if (res.data.code === 0) {
            this.openMessage(res.data.msg, 'success')
            this.setShowClose(false)
            this._getArrFlight(this.fltDate)
          }
          if (res.data.code === -1) {
            this.openMessage(res.data.msg, 'danger')
          }
        })
      },
      _getArrFlight (d) {
        getArrFlight(d).then((res) => {
          this.setArrFlight(res.data)
        })
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      },
      ...mapMutations({
        setShowClose: 'SET_SHOW_CLOSE',
        setArrFlight: 'SET_ARR_FLIGHT'
      })
    }
  }
</script>

<style rel="stylesheet">
    .close {
        border-radius: 5px;
        background-color: rgba(3, 35, 107, 0.4);
        z-index: 10;
    }

    .close .el-table thead tr {
        color: #000000;
        font-size: x-large;
    }

    .close .el-table tbody tr {
        color: #000;
        font-size: larger;
    }

    .close .el-dialog__header {
        background: rgb(10, 72, 101);
    }

    .close .el-dialog__header .el-dialog__title {
        color: #ffffff;
        font-size: x-large;
    }

    .close .el-table tbody tr td {
        padding: 2px 0;
    }

    .close .el-dialog__headerbtn .el-dialog__close {
        color: #ffffff;
    }
    .close .el-dialog__headerbtn .el-dialog__close:hover {
        color: orangered;
    }
</style>