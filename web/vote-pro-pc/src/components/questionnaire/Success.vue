<template>
  <div>
    <img src="../../assets/images/success.png" class="success-icon" alt="">
    <div class="success-title">申请成功！</div>
    <div class="success-content">恭喜您申请成为候选人，感谢您为cocos大家庭做出的贡献～</div>
    <div class="server-list">
      <p class="message">节点申请者需达到相应的硬件配置要求：</p>
      <a href="javascript:void(0);" class="router">《服务器型号推荐列表》</a>
    </div>
    <div class="server-list">
      <p class="message">节点、理事会候选人（机构）引导手册：</p>
      <a href="javascript:void(0);" class="router">《节点引导》</a>
      <a href="javascript:void(0);" class="router">《理事会引导》</a>
    </div>

    <div class="explain mart45">关于节点申请问题</div>
    <div class="explain mart5">请添加工作人员微信咨询</div>

    <img src="../../assets/images/ke-qrcode.jpg" class="ke-qrcode">
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.success-icon{
  width: 50px;
  height: 50px;
  margin: 0.5rem auto 0;
  display: block;
}
.mart45{
  margin-top: 45px;
}
.mart5{
  margin-top: 5px;
}
.success-title{
  width: 100%;
  height:30px;
  font-size:20px;
  font-weight:400;
  color:rgba(42,42,42,1);
  line-height:30px;
  text-align: center;
  margin-top: 25px;
}
.success-content{
  width: 100%;
  height:20px;
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:20px;
  margin-top: 15px;
  text-align: center;
}
.server-list{
  width:500px;
  height:60px;
  background:rgba(246,246,246,1);
  border-radius:4px;
  margin: 36px auto 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.server-list .message{
  margin-left: 28px;
  height:20px;
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:20px;
}
.server-list .router{
  height:20px;
  font-size:14px;
  font-weight:400;
  color:rgba(0,93,181,1);
  line-height:20px;
}
.explain {
  height:20px;
  font-size:14px;
  font-weight:400;
  color:rgba(42,42,42,1);
  line-height:20px;
  text-align: center;
}
.ke-qrcode{
  width:96px;
  height:96px;
  margin: 15px auto 0;
  display: block;
}
</style>


<script>
export default {
  data() {
    return {
      radio2: 3,
      radio3: 3
    };
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  }
};
</script>




