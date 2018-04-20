<template>
    <div class="plane-info">
        <div class="plane-info-header">
            <div>
                Ameco贵阳分公司航班信息系统(航线)
                <el-button size="mini" type="text" style="float: right;color: #ffffff;
                margin-right:10px;font-size:24px"
                           @click="backHome()">
                    x
                </el-button>
            </div>
        </div>
        <close-flight-dialog></close-flight-dialog>
        <plane-detail></plane-detail>
        <search-box></search-box>
    </div>
</template>

<script>
  import SearchBox from './PlaneInfo/SearchBox'
  import PlaneDetail from './PlaneInfo/PlaneDetail'
  import CloseFlightDialog from './PlaneInfo/CloseFlightDialog'

  export default {
    name: 'plane-info',
    components: {
      SearchBox,
      PlaneDetail,
      CloseFlightDialog
    },
    methods: {
      backHome () {
        this.$router.push({path: '/'})
        document.body.removeAttribute('class', 'bodyPlane')
        document.body.setAttribute('class', 'bodyIndex')
      }
    },
    created () {
      document.body.setAttribute('class', 'bodyPlane')
    },
    beforeDestroy: function () {
      document.body.removeAttribute('class', 'bodyPlane')
    }
  }
</script>

<style>
    body.bodyPlane {
        height: auto;
        /*background-color: #F0F0F0;*/
        background-image: none;
    }

    .plane-info {
        width: 100%;
    }

    .plane-info-header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        background: #00acdd;
        font-size: 32px;
        color: white;
        z-index: 2;
    }
</style>
