<template>
<div class="bg padt50">
    
    <img src="../assets/images/success.png" class="success-icon" alt="">
    <div class="success-title">申请成功！</div>
    <div class="success-content mart5">恭喜您申请成为候选人</div>
    <div class="success-content">感谢您为cocos大家庭做出的贡献～</div>

    <div class="mart36">
    <div class="server-list">
        <div class="server-list-message">节点申请者需达到相应的硬件配置要求</div>
        <div class="server-list-router">
            <a href="javascript:void(0);">《服务器型号推荐列表》</a>
        </div>
    </div>
    </div>

    <div class="mart10">
    <div class="server-list">
        <div class="server-list-message">节点、理事会候选人（机构）引导手册</div>
        <div class="server-list-router">
            <a href="javascript:void(0);">《节点引导》</a>
            <a href="javascript:void(0);">《理事会引导》</a>
        </div>
    </div>
    </div>

    <img src='../assets/images/ke-qrcode.jpg' class="qrcode" alt="">
    <div class="success-content mart5">关于节点申请问题</div>
    <div class="success-content mart5">请添加工作人员微信咨询</div>

</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.success-icon{
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 auto;
  display: block;
}
.padt50{
    padding-top: 0.5rem;
}
.bg{
    height: 100%;
    width: 100%;
    background: #fff;
}
.mart5{
    margin-top: 0.05rem;
}
.mart10{
    margin-top: 0.1rem;
}
.mart36{
    margin-top: 0.36rem;
}
.success-title{
  width: 100%;
  height: 0.3rem;
  font-size:0.2rem;
  font-weight:400;
  color:rgba(42,42,42,1);
  line-height: 0.3rem;
  text-align: center;
  margin-top: 0.15rem;
}
.success-content{
  width: 100%;
  height: 0.2rem;
  font-size: 0.14rem;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height: 0.2rem;
  text-align: center;
}


.server-list{
  width: 3.35rem;
  height: 0.8rem;
  background:rgba(248,249,255,1);
  border-radius: 0.04rem;
  margin: 0 auto;
  padding-top: 0.15rem;
  border:1px solid rgba(191,196,226,1);
}
.server-list-message{
    width: 100%;
    height: 0.2rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    text-align: center;
}
.server-list-router {
    width: 100%;
    height: 0.2rem;
    line-height: 0.2rem;
    margin-top: 0.1rem;
    text-align: center;
}
.server-list-router a{
    font-size: 0.14rem;
    font-weight:400;
    color:rgba(0,93,181,1);
}
.qrcode{
    width: 1.01rem;
    height: 1.01rem;
    display: block;
    margin: 0.25rem auto 0;
}
</style>


<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
            //       console.log(this.personalMsgList)
        },
        methods: {
        },
    }
</script>


