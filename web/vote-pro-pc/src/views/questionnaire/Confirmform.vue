<template>
  <div>
    <div class="form-option-1">
      <ul class="option-head">
        <span>竞选身份：</span>
      </ul>
      <ul class="option-content">
        {{showData.type_of_identity=="0"?"个人":"机构"}}
      </ul>
    </div>
    
    <div class="form-option-1">
      <ul class="option-head">
        <span>竞选方向：</span>
      </ul>
      <ul class="option-content">
        {{showData.type_of_direction=="0"?"节点":"理事会"}}
      </ul>
    </div>

    <div class="form-other-option">

      <div class="other-option"> 
        <ul class="other-option-title">节点名称：</ul>
        <li class="other-option-content">{{showData.name}}</li>
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">邮箱：</ul>
        <li class="other-option-content">{{showData.email}}</li>
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">手机号码：</ul>
        <li class="other-option-content">{{showData.mobile_phone}}</li>
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">固话：</ul>
        <li class="other-option-content">{{showData.tel_phone}}</li>
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">微信：</ul>
        <li class="other-option-content">{{showData.weixin}}</li>
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">国家/地区：</ul>
        <li class="other-option-content">{{showData.country}}</li>
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">官网链接：</ul>
        <li class="other-option-content">{{showData.website}}</li>
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">城市：</ul>
        <li class="other-option-content">{{showData.city}}</li>
      </div>


      <div class="cocos-addr">
        <p class="head">cocos地址：</p>
        <p class="content">{{showData.cocos_address}} <span class="remarks">（账户cocos需≥5000万）</span> </p>
      </div>

    </div>

      
    <div class="other-option"> 
      <ul class="other-option-title">节点申请人/机构介绍及未来规划：</ul>
      <p class="other-option-textarea">{{showData.sunmary}}</p>
    </div>

    <div class="next-step-bar">
      <a href="/questionnaire/form" class="next-step-btn">上一步</a>
      <a href="javascript:void(0);" @click="nextStep()" class="next-step-btn">下一步</a>
      <!-- /questionnaire/success -->
    </div>
  </div>
</template>



<script>
import { cacheSession, cacheKey, handleCOCOS } from '../../../libs/Utils'
import { MessageBox } from 'element-ui';
export default {
  data() {
    return {
      showData: {
          type_of_identity: '',
          type_of_direction: '',
          name: '',
          mobile_phone: '',
          tel_phone: '',
          email: '',
          weixin: '',
          country: '',
          city: '',
          website: '',
          cocos_address: '',
          sunmary: ''
      }
    };
  },
  watch: {
  },
  mounted() {
    this.showFormData()
  },
  methods: {
    showFormData(){
      let _this = this
      if (!cacheSession.get('formData')) return false
      let formDataCache = JSON.parse(cacheSession.get('formData'))
      _this.showData = {
          type_of_identity: Number(formDataCache.type_of_identity.value),
          type_of_direction: Number(formDataCache.type_of_direction.value),
          name: String(formDataCache.name.value),
          mobile_phone: String(formDataCache.mobile_phone.value),
          tel_phone: String(formDataCache.tel_phone.value),
          email: String(formDataCache.email.value),
          weixin: String(formDataCache.weixin.value),
          country: String(formDataCache.country.value),
          city: String(formDataCache.city.value),
          website: String(formDataCache.website.value),
          cocos_address: String(formDataCache.cocos_address.value),
          sunmary:String(formDataCache.sunmary.value)
      }
    },
    nextStep(){
      let _this = this
    //   let resUrl = 'http://192.168.15.60:8010/api/v1/application'
      let resUrl = 'https://vote.cocosbcx.net/api/api/v1/application'
      
      this.$axios
        .post(resUrl, _this.showData)
        .then(function(response) {
          console.log('*****')
          console.log(response)
          if (response.data.error == "ok") {
            
            MessageBox({
              message: '提交成功'
            }).then(action=>{
              console.log("****************")
              console.log(action)
              _this.$router.push('/questionnaire/success')
            })
          } else {
            if (response.data.error.indexOf("invalid cocos address") > -1) {
              MessageBox({
                message: 'COCOS地址无效'
              })
            } else {
              MessageBox({
                message: '提交失败'
              })
            }
            
          }
          
        })
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-option-1{
  width: 100%;
  height:20px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
}
.form-option-1 .option-head{
  width:78px;
  height:20px;
  line-height: 20px;
}
.form-option-1 .option-head span{
  font-size:14px;
}
.form-option-1 .option-content{
  height:20px;
  line-height: 20px;
}
.form-other-option{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.form-other-option .other-option{
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.form-other-option .other-option .other-option-title {
  width: 80px;
  height: 20px;
  line-height: 20px;
  margin-top: 30px;
  font-size: 14px;
  color:rgba(102,102,102,1);
}
.form-other-option .other-option .other-option-content {
  width: 250px;
  height: 20px;
  line-height: 20px;
  margin-top: 30px;
  font-size: 14px;
  color:rgba(51,51,51,1);
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.other-option .other-option-title {
  height: 20px;
  line-height: 20px;
  margin-top: 30px;
  font-size: 14px;
}
.other-option .other-option-textarea{
  width:810px;
  height:112px;
  border-radius:2px;
  font-size:14px;
  font-weight:400;
  margin-top: 8px;
  /* color:rgba(51,51,51,1); */
}

.cocos-addr{
  width: 100%;
  margin-top: 30px;
  line-height: 20px;
  font-size:14px;
  font-weight:400;
  color:rgba(42,42,42,1);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.cocos-addr .head{
  width: 80px;
  font-size:14px;
  font-weight:400;
  color:rgba(42,42,42,1);
}
.cocos-addr .content{
  width: 720px;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
}
.cocos-addr .remarks{
  font-size:14px;
  font-weight:400;
  color:rgba(255,57,57,1);
}
.next-step-bar{
  width: 100%;
  height: 45px;
  line-height: 45px;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.next-step-btn{
  width:180px;
  height:45px;
  line-height: 45px;
  background:rgba(84,101,223,1);
  border-radius:4px;
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-align: center;
  display: block;
}
.next-step-btn:nth-child(2){
  margin-left: 40px;
}
</style>




