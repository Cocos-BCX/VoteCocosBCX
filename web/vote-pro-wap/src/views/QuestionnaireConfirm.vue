<template>
<div class="bg">
    <div style="height:1px;width:100%;"></div>
    <div class="main-container">
        <p>竞选身份：</p>
        <p>{{showData.type_of_identity=="0"?"个人":"机构"}}</p>
    </div>

    <div class="main-container">
        <p>竞选方向：</p>
        <p>{{showData.type_of_direction=="0"?"节点":"理事会"}}</p>
    </div>

    <div class="main-container">
        <p>节点名称：</p>
        <p>{{showData.name}}</p>
    </div>

    <div class="main-container">
        <p>邮箱：</p>
        <p>{{showData.email}}</p>
    </div>

    <div class="main-container">
        <p>手机号码：</p>
        <p>{{showData.mobile_phone}}</p>
    </div>

    <div class="main-container">
        <p>固话：</p>
        <p>{{showData.tel_phone}}</p>
    </div>

    <div class="main-container">
        <p>微信：</p>
        <p>{{showData.weixin}}</p>
    </div>

    <div class="main-container">
        <p>国家或地区：</p>
        <p>{{showData.country}}</p>
    </div>

    <div class="main-container">
        <p>城市：</p>
        <p>{{showData.city}}</p>
    </div>

    <div class="main-container-large">
        <p>官网链接：</p>
        <p>{{showData.website}}</p>
    </div>


    <div class="main-container-large">
        <p>cocos地址：</p>
        <p>{{showData.cocos_address}} <span class="required">(账户cocos需≥5000万)</span> </p>
    </div>

    <div class="main-container-large">
        <p>节点申请人/机构介绍及未来规划：</p>
        <p>{{showData.sunmary}}</p>
    </div>

    <div class="btn-container">
        <!-- <router-link to="/questionnaireform" class="btn">上一步</router-link> -->
        <a href="javascript:void(0);" class="btn" @click="goback()">上一步</a>
        <!-- <router-link to="/questionnairesuccess" class="btn">下一步</router-link> -->
      <a href="javascript:void(0);" @click="nextStep()" class="btn">下一步</a>
    </div> 
</div>
</template>


<script>
import { cacheSession, cacheKey, handleCOCOS } from '../../libs/Utils'
import { MessageBox } from 'mint-ui';
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
            }
        },
        mounted() {
    this.showFormData()
            //       console.log(this.personalMsgList)
        },
        methods: {
            goback(){
                this.$router.back()
            },
    showFormData(){
      let _this = this
      console.log("cacheSession.get('formData')")
      console.log(cacheSession.get('formData'))
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
                    title: '',
                    message: '提交成功',
                    confirmButtonText: '确定'
                }).then( action=>{
                    _this.$router.push('/questionnairesuccess')
                })
          } else {

            if (response.data.error.indexOf("invalid cocos address") > -1) {
                MessageBox({
                    title: '',
                    message: 'COCOS地址无效',
                    confirmButtonText: '确定'
                })
            } else {
                MessageBox({
                    title: '',
                    message: '提交失败',
                    confirmButtonText: '确定'
                })
            }
              
          }
          
        })
    }
    },
    }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
    
    background: #fff;
}
.main-container{
    width: 3.45rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0.2rem;
}
.main-container p:nth-child(1){
    width: 25%;
    height: 0.2rem;
    font-size: 0.14rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 0.2rem;
}
.main-container p:nth-child(2){
    width: 75%;
    height: 0.2rem;
    font-size: 0.14rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 0.2rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.main-container-large{
    width: 3.45rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 0.2rem;
}
.main-container-large p:nth-child(1){
    width: 100%;
    height: 0.2rem;
    font-size: 0.14rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 0.2rem;
}
.main-container-large p:nth-child(2){
    width: 100%;
    font-size: 0.14rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 0.2rem;
    margin-top: 0.1rem;
}
.btn-container{
    width: 100%;
    height: 0.78rem;
    line-height: 0.78rem;
    margin-top: 0.33rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.33rem;
}
.btn-container .btn{
    width: 1.2rem;
    height: 0.45rem;
    line-height: 0.45rem;
    border-radius: 0.04rem;
    text-align: center;
    font-size: 0.16rem;
    font-weight:400;
}
.btn-container .btn:nth-child(1){
    color:rgba(25,208,181,1);
    border:1px solid rgba(25,208,181,1);
}
.btn-container .btn:nth-child(2){
    margin-left: 0.4rem;
    color:rgba(255,255,255,1);
    background:rgba(25,208,181,1);
}
</style>

