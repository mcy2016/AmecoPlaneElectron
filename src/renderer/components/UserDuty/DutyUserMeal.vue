<template>
    <div class="meal">
        <el-switch
                style="display: block"
                v-model="mealType"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="中餐"
                inactive-text="早餐">
        </el-switch>
        <el-button @click="doPrint()" id="do-print" size="mini">打印</el-button>
        <div id="print">
            <div v-show="mealType" class="meal-record">
                <h2>中餐需求记录</h2>
                <div style="border-bottom: gray solid 1px;margin: 5px 0;width: 100%;"></div>
                <el-table
                        ref="multipleTable"
                        :data="dutyUsers"
                        border
                        tooltip-effect="dark">
                    <el-table-column
                            label="姓名"
                            width="100">
                        <template slot-scope="scope">{{ scope.row.username }}</template>
                    </el-table-column>
                    <!--type="selection"-->
                    <el-table-column
                            label="交卡"
                            width="90">
                        <template slot-scope="scope">
                            <el-checkbox>已交</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="个性需求">
                        <template slot-scope="scope">
                            <el-checkbox>标餐</el-checkbox>
                            <span>个性需求：</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="!mealType" class="meal-record">
                <h2>早餐需求记录</h2>
                <div style="border-bottom: gray solid 1px;margin: 5px 0;width: 100%;"></div>
                <el-table
                        ref="multipleTable"
                        :data="dutyUsers"
                        border
                        tooltip-effect="dark">

                    <el-table-column
                            label="姓名"
                            width="100">
                        <template slot-scope="scope">{{ scope.row.username }}</template>
                    </el-table-column>
                    <!--type="selection"-->
                    <el-table-column
                            label="交卡"
                            width="90">
                        <template slot-scope="scope">
                            <el-checkbox>已交</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="个性需求">
                        <template slot-scope="scope">
                            <el-checkbox>粉</el-checkbox>
                            <el-checkbox>面</el-checkbox>
                            <el-checkbox>浆</el-checkbox>
                            <el-checkbox>条</el-checkbox>
                            <el-checkbox>包</el-checkbox>
                            <el-checkbox>花</el-checkbox>
                            <el-checkbox>煎/卤</el-checkbox>
                            <el-checkbox>菜</el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getDutyUsers} from '../../api/user'

  export default {
    name: 'duty-user-meal',
    data () {
      return {
        mealType: false,
        dutyUsers: []
      }
    },
    methods: {
      _getDuty () {
        getDutyUsers().then((res) => {
          console.log(res)
          this.dutyUsers = res.data
        })
      },
      doPrint (e) {
        let subOutputRankPrint = document.getElementById('print')
        console.log(subOutputRankPrint.innerHTML)
        let newContent = subOutputRankPrint.innerHTML
        let oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        window.print()
        window.location.reload()
        document.body.innerHTML = oldContent
        return false
      }
    },
    mounted () {
      this._getDuty()
    }
  }
</script>

<style scoped rel="stylesheet">
    @media print {
        @page {
            size: A4 portrait;
        }

        .meal-record .el-table thead .cell, .el-table th > div {
            text-align: left;
        }

        .meal-record .el-table .cell, .el-table th > div {
            text-align: left;
            margin-left: 5px;
        }

        .meal-record .el-checkbox__label {
            font-size: 22px;
        }

        .meal-record .el-checkbox + .el-checkbox {
            margin-left: 5px;
        }

        .meal-record .el-table td, .el-table th {
            padding: 6px 0;
        }

        .meal-record .el-table {
            zoom: 0.9
        }
    }

    .meal .el-table--border td, .el-table--border th {
        border-right: 1px solid #795548;
    }

    .meal .el-table td, .el-table th.is-leaf {
        border-bottom: 1px solid #795548;
    }

    .meal .el-checkbox__label {
        font-size: 20px;
    }

    .meal .el-table thead {
        color: #ffffff;
        font-size: larger;
    }

    .meal .meal-record {
        margin: 10px 10px;
        text-align: center;
        font-size: x-large;
    }

    .meal .el-checkbox__inner {
        width: 18px;
        height: 18px;
    }

    .meal .el-checkbox + .el-checkbox {
        margin-left: 10px;
    }

    .meal .el-table .cell, .el-table th > div {
        text-align: center;
        /*margin-left: 10px;*/
    }

    #do-print {
        position: absolute;
        right: 20px;
        top: 75px;
    }
</style>