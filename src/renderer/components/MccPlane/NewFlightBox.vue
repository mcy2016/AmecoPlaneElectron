<template>
    <div class="edit-plane">
        <el-dialog title="新增航班信息"
                   :visible.sync="showNew"
                   :close-on-click-modal="false"
                   :before-close="cancleForm">
            <el-form ref="form" :model="formData" label-width="80px" size="mini">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="航班号">
                            <el-input v-model="formData.flt_id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="机号">
                            <el-input v-model="formData.ac_id"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="机型">
                            <el-input v-model="formData.ac_type"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="机位">
                            <el-input v-model="formData.ac_stop_arr"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="起飞站">
                            <el-input v-model="formData.dep_apt" placeholder="请输三字码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="起飞时间">
                            <!--<el-time-picker-->
                            <!--style="width:85%"-->
                            <!--v-model="formData.off_time"-->
                            <!--value-format="HH:mm"-->
                            <!--placeholder="起飞时间">-->
                            <!--</el-time-picker>-->
                            <el-date-picker
                                    style="width:90%"
                                    v-model="formData.off_time"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                            <!--<el-input v-model="formData.off_time"></el-input>-->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-select v-model="formData.ac_status" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <!--<el-input v-model="formData.ac_status" placeholder="航前为3，过站为2，航后为1"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input v-model="formData.remark" disabled placeholder="..."></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item size="mini">
                    <el-button type="primary" @click="onSubmit()">保存</el-button>
                    <el-button @click="cancleForm()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {handleDate} from '../../common/js/utils'
  import {postNewFlight, getArrFlight} from '../../api/plane'

  export default {
    name: 'new-flight-box',
    data () {
      return {
        formData: {
          flt_id: '',
          ac_id: '',
          ac_type: '',
          ac_stop_arr: '',
          flt_date: handleDate(new Date(), '-'),
          dep_apt: '',
          off_time: '',
          remark: '',
          ac_status: []
        },
        options: [{
          value: '3',
          label: '航前'
        }, {
          value: '1',
          label: '航后'
        }, {
          value: '2',
          label: '过站'
        }]
      }
    },
    computed: {
      ...mapGetters([
        'showNew'
      ])
    },
    methods: {
      cancleForm () {
        this.setShowNew(false)
      },
      onSubmit () {
        console.log(this.formData.off_time)
        postNewFlight(this.formData).then((res) => {
          if (res.data.code === 0) {
            this.openMessage(res.data.msg, 'success')
            this.setShowNew(false)
            this._getArrFlight(this.fltDate)
          } else {
            this.openMessage(res.data.msg)
            this.setShowNew(false)
          }
        }).catch((err) => {
          this.openMessage('一败涂地', 'error')
          console.log(err)
        })
      },
      _getArrFlight (d) {
        getArrFlight(d).then((res) => {
          this.setArrFlight(res.data)
          this.openMessage('更新成功！')
        })
      },
      openMessage (message, type) {
        this.$message({
          message: message,
          type: type
        })
      },
      ...mapMutations({
        setShowNew: 'SET_SHOW_NEW',
        setArrFlight: 'SET_ARR_FLIGHT'
      })
    }
  }
</script>

<style rel="stylesheet">
    .edit-plane {
        width: 80%;
        z-index: 10;
    }

    .edit-plane .el-dialog__header {
        background: rgb(10, 72, 101);
    }

    .edit-plane .el-dialog__header .el-dialog__title {
        color: #ffffff;
        font-size: x-large;
    }

    .edit-plane .el-dialog__headerbtn .el-dialog__close {
        color: #ffffff;
    }

    .edit-plane .el-dialog__headerbtn .el-dialog__close:hover {
        color: orangered;
    }
</style>