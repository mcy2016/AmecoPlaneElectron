<template>
    <div class="flight-route">
        <span>航段信息</span>
        <el-button type="primary"
                   size="mini"
                   @click="exportTable()"
                   class="export-table">
           新  增
        </el-button>
        <div style="border-bottom: gray solid 1px;margin: 5px 0;width: 100%;"></div>
        <el-table :data="routeInfo.data"
                  tooltip-effect="light"
                  center
                  stripe
                  border>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="起飞站">
                <el-table-column property="dep_apt_zh" label="中文名称"></el-table-column>
                <el-table-column property="dep_apt" label="三字码"></el-table-column>
            </el-table-column>

            <el-table-column property="flight_time" label="飞行时间(分钟)" width="150"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="recover(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 5px 0 0 0"></div>
        <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 30, 40]"
                :total="routeInfo.total"
                :current-page="handlePage"
                @size-change="sizeChange"
                @current-change="currentPage">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getAllRoute} from '../../api/route'

  export default {
    name: 'flight-route',
    data () {
      return {
        routeInfo: [], // 航段信息
        handlePage: 1, // 页数
        handlePageSize: 10 // 每页条数
      }
    },
    methods: {
      _getRouteInfo (page = 1, listRows = 10) {
        getAllRoute(page, listRows).then((res) => {
          console.log(res.data)
          this.routeInfo = res.data
        }).catch((err) => {
          console.log(err)
        })
      },
      sizeChange (val) {
        console.log(val)
        this.handlePageSize = val
        this._getRouteInfo(this.handlePage, val)
      },
      currentPage (val) {
        this.handlePage = val
        this._getRouteInfo(val, this.handlePageSize)
        console.log(val)
      }
    },
    created () {
      this._getRouteInfo()
    }
  }
</script>

<style rel="stylesheet">
    .flight-route {
        margin: 10px 10px;
        /*text-align: center;*/
        font-size: x-large;
    }
    .flight-route .export-table {
        float: right;
        bottom: 5px;
    }
    .flight-route .el-table thead {
        color: #ffffff;
        font-size: larger;
    }
    .flight-route .el-table .cell, .el-table th > div {
        text-align: center;
        /*margin-left: 10px;*/
    }
    .flight-route .el-table thead tr {
        color: #000000;
        font-size: larger;
    }

    .flight-route .el-table tbody tr {
        color: #000;
        font-size: larger;
    }

    .flight-route .el-table tbody tr td {
        padding: 2px 0;
    }
</style>