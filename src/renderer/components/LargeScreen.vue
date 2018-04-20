<template>
    <div class="screen-info">
        <!--<div class="screen-info-header">-->
            <!--&lt;!&ndash;<div>&ndash;&gt;-->
                <!--&lt;!&ndash;Ameco贵阳分公司航班信息系统(大屏幕)&ndash;&gt;-->
                <!--&lt;!&ndash;<el-button size="mini" type="text" style="float: right;color: #ffffff;&ndash;&gt;-->
                <!--&lt;!&ndash;margin-right:10px;font-size:24px"&ndash;&gt;-->
                           <!--&lt;!&ndash;@click="backHome()">&ndash;&gt;-->
                    <!--&lt;!&ndash;x&ndash;&gt;-->
                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</div>-->
        <screen-detail></screen-detail>
    </div>

</template>

<script type="text/ecmascript-6">
  import ScreenDetail from './LargeScreen/ScreenDetail'

  export default {
    name: 'large-screen',
    data () {
      return {}
    },
    methods: {
      backHome () {
        this.$router.push({path: '/'})
        document.body.removeAttribute('class', 'bodyScreen')
        document.body.setAttribute('class', 'bodyIndex')
      }
    },
    created () {
      document.body.setAttribute('class', 'bodyScreen')
    },
    beforeDestroy: function () {
      document.body.removeAttribute('class', 'bodyScreen')
    },
    components: {
      ScreenDetail
    }
  }
</script>

<style  rel="stylesheet">
    body.bodyScreen {
        height: auto;
        /*background-color: #F0F0F0;*/
        background-image: none;
    }

    .screen-info {
        width: 100%;
    }

    .screen-info-header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #00acdd;
        font-size: 32px;
        color: white;
    }
</style>