<template>
  <div>
    <div class="form-option-1">
      <ul class="option-head">
        <i class="required">*</i>
        <span>竞选身份：</span>
      </ul>
      <ul class="option-content">
        <el-radio-group v-model="formData.type_of_identity.value">
          <el-radio label="0">个人</el-radio>
          <el-radio label="1">机构</el-radio>
        </el-radio-group>
      </ul>
    </div>
    
    <div class="form-option-1">
      <ul class="option-head">
        <i class="required">*</i>
        <span>竞选方向：</span>
      </ul>
      <ul class="option-content">
        <el-radio-group v-model="formData.type_of_direction.value">
          <el-radio label="0">节点</el-radio>
          <el-radio label="1">理事会</el-radio>
        </el-radio-group>
      </ul>
    </div>

    <div class="form-other-option">

      <div class="other-option"> 
        <ul class="other-option-title"> <i class="required">*</i> 节点名称：</ul>
        <input type="text" class="other-option-content" v-model="formData.name.value">
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title"> <i class="required">*</i> 邮箱：</ul>
        <input type="text" class="other-option-content" v-model="formData.email.value">
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title"> <i class="required">*</i> 手机号码：</ul>
        <input type="text" class="other-option-content" v-model="formData.mobile_phone.value">
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">固话：</ul>
        <input type="text" class="other-option-content" v-model="formData.tel_phone.value">
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title"> <i class="required">*</i> 微信：</ul>
        <input type="text" class="other-option-content" v-model="formData.weixin.value">
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title"> <i class="required">*</i> 国家/地区：</ul>
        <input type="text" class="other-option-content" v-model="formData.country.value">
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title">官网链接：</ul>
        <input type="text" class="other-option-content" v-model="formData.website.value">
      </div>
      
      <div class="other-option"> 
        <ul class="other-option-title"> <i class="required">*</i> 城市：</ul>
        <input type="text" class="other-option-content" v-model="formData.city.value">
      </div>


      <div class="cocos-addr">
        <p class="head">cocos账户：</p>
        <!-- <p class="content">{{formData.cocos_address.value}}</p> -->
        <input type="text" class="other-option-content" v-model="formData.cocos_address.value">
        <!-- <p class="content">0xfb7720507671c5366c801a97363f10533097af4e</p> -->
        <p class="remarks">（账户cocos需≥5000万）</p>
      </div>

    </div>

      
    <div class="other-option"> 
      <ul class="other-option-title"> <i class="required">*</i> 节点申请人/机构介绍及未来规划：</ul>
      <textarea  class="other-option-textarea" v-model="formData.sunmary.value"></textarea>
    </div>

    <div class="next-step-bar">
      <a href="/questionnaire" class="next-step-btn">上一步</a>
      <!-- <a href="/questionnaire/confirmform" class="next-step-btn">下一步</a> -->
      <a href="javascript:;" class="next-step-btn" @click="submit()">下一步</a>
    </div>
  </div>
</template>



<script>
import { getAccountInfo } from '../../../libs/bcx.api'
import { MobilePhoneReg, MailReg } from '../../../libs/regular'
import { cacheSession } from '../../../libs/Utils'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      formData: {
        type_of_identity:{
          value: "0",
          name: '竞选身份',
          required: true
        },
        type_of_direction:{
          value: "0",
          name: '竞选方向',
          required: true
        },
        name:{
          value: "",
          name: '节点名称',
          required: true
        },
        mobile_phone:{
          value:"",
          name: '手机号码',
          required: true
        },
        tel_phone:{
          value: "",
          name: '固话',
          required: false
        },
        email:{
          value: "",
          name: '邮箱',
          required: true
        },
        weixin:{
          value: "",
          name: '微信',
          required: true
        },
        country:{
          value: "",
          name: '国家/地区',
          required: true
        },
        city:{
          value: "",
          name: '城市',
          required: true
        },
        website:{
          value: "",
          name: '官网链接',
          required: false
        },
        cocos_address:{
          value: "",
          name: 'cocos地址',
          required: true
        },
        sunmary:{
          value: "",
          name: '节点申请人/机构介绍及未来规划',
          required: true
        }
      }
    };
  },
  watch: {
  },
  mounted() {
    this.getAccountInfoAjax()
  },
  methods: {
    getAccountInfoAjax(){
      let _this = this
      getAccountInfo().then( res => {
        _this.formData.cocos_address.value = res.account_name
        if (cacheSession.get('formData')) {
          let formDataJson = JSON.parse(cacheSession.get('formData'))
          _this.formData = formDataJson
        }
        
      })
    },
    submit(){
      let _this = this
      let isContinue = true
      // http://192.168.15.60:8010/api/v1/application
      let resUrl = 'http://192.168.15.60:8010/api/v1/application'
      let formData = {
          type_of_identity: _this.formData.type_of_identity.value,
          type_of_direction: _this.formData.type_of_direction.value,
          name: _this.formData.name.value,
          mobile_phone: _this.formData.mobile_phone.value,
          tel_phone: _this.formData.tel_phone.value,
          email: _this.formData.email.value,
          weixin: _this.formData.weixin.value,
          country: _this.formData.country.value,
          city: _this.formData.city.value,
          website: _this.formData.website.value,
          cocos_address: _this.formData.cocos_address.value,
          sunmary: _this.formData.sunmary.value
      }
      for (const key in _this.formData) {
        if (_this.formData[key].required) {
          if (_this.formData[key].value == "") {
              Message({
                duration: 2000,
                message: '请填写' + _this.formData[key].name,
                type: 'error',
              })
              isContinue = false
              break;
          }
        }
      }
      if (!isContinue) return false
      if (!MobilePhoneReg.test(_this.formData.mobile_phone.value)) {
              Message({
                duration: 2000,
                message: '请正确填写手机号',
                type: 'error',
              })
              return false
      }
      if (!MailReg.test(_this.formData.email.value)) {
              Message({
                duration: 2000,
                message: '请正确填写邮箱',
                type: 'error',
              })
              return false
      }
          cacheSession.set('formData', JSON.stringify(_this.formData))
          this.$router.push('/questionnaire/confirmform')
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
  width: 300px;
}
.form-other-option .other-option:nth-child(even){
  margin-left: 210px;
}
.form-other-option .other-option .other-option-title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin-top: 30px;
  font-size: 14px;
}
.form-other-option .other-option .other-option-content {
  width: 100%;
  height: 34px;
  line-height: 34px;
  margin-top: 10px;
  text-indent: 0.5em;
}

.other-option .other-option-title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin-top: 30px;
  font-size: 14px;
}
.other-option .other-option-textarea{
  width:810px;
  height:112px;
  border-radius:2px;
  border:1px solid rgba(220,220,220,1);
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
  padding: 8px;
}

.cocos-addr{
  width: 100%;
  margin-top: 30px;
  height: 20px;
  line-height: 20px;
  font-size:14px;
  font-weight:400;
  color:rgba(42,42,42,1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cocos-addr .head{
  font-size:14px;
  font-weight:400;
  color:rgba(42,42,42,1);
}
.cocos-addr .content{
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


