<template>
    <div class="mcc-info">
        <div class="mcc-info-header">
            <div>
                Ameco贵阳分公司航班信息系统(MCC)
                <el-button size="mini" type="text" style="float: right;color: #ffffff;
                margin-right:10px;font-size:24px"
                           @click="backHome()">
                    x
                </el-button>
            </div>
        </div>
        <new-flight-box></new-flight-box>
        <mcc-detail></mcc-detail>
        <search-box-mcc></search-box-mcc>

    </div>
</template>

<script type="text/ecmascript-6">
  import MccDetail from './MccPlane/MccDetail'
  import SearchBoxMcc from './MccPlane/SearchBoxMcc'
  import NewFlightBox from './MccPlane/NewFlightBox'

  export default {
    name: 'mcc-plane',
    data () {
      return {}
    },
    methods: {
      backHome () {
        this.$router.push({path: '/'})
        document.body.removeAttribute('class', 'bodyMcc')
        document.body.setAttribute('class', 'bodyIndex')
      }
    },
    created () {
      document.body.setAttribute('class', 'bodyMcc')
    },
    beforeDestroy: function () {
      document.body.removeAttribute('class', 'bodyMcc')
    },
    components: {
      NewFlightBox,
      MccDetail,
      SearchBoxMcc
    }
  }
</script>

<style scoped rel="stylesheet">
    body.bodyMcc {
        height: auto;
        /*background-color: #F0F0F0;*/
        background-image: none;
    }

    .mcc-info {
        width: 100%;
    }

    .mcc-info-header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #00acdd;
        font-size: 32px;
        color: white;
    }
</style>