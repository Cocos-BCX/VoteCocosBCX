<template>
<div>
    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>1/12 竞选身份：</span>
            </ul>
            <ul class="content">
                <li class="radio" @click="radioChange('type_of_identity', 0)">
                    <img src="../assets/images/radio.png" v-if="formData.type_of_identity.value == 0" alt="">
                    <img src="../assets/images/nochoice.png" v-if="formData.type_of_identity.value == 1" alt="">
                    <span>个人</span>
                </li>
                <li class="radio" @click="radioChange('type_of_identity', 1)">
                    <img src="../assets/images/radio.png" v-if="formData.type_of_identity.value == 1" alt="">
                    <img src="../assets/images/nochoice.png" v-if="formData.type_of_identity.value == 0" alt="">
                    <span>机构</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>2/12 竞选方向：</span>
            </ul>
            <ul class="content">
                <li class="radio" @click="radioChange('type_of_direction', 0)">
                    <img src="../assets/images/radio.png" v-if="formData.type_of_direction.value == 0" alt="">
                    <img src="../assets/images/nochoice.png" v-if="formData.type_of_direction.value == 1" alt="">
                    <span>节点</span>
                </li>
                <li class="radio" @click="radioChange('type_of_direction', 1)">
                    <img src="../assets/images/radio.png" v-if="formData.type_of_direction.value == 1" alt="">
                    <img src="../assets/images/nochoice.png" v-if="formData.type_of_direction.value == 0" alt="">
                    <span>理事会</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>3/12 节点名称：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.name.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>4/12 邮箱：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.email.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>5/12 手机号码：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.mobile_phone.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <span>6/12 固话：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.tel_phone.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>7/12 微信：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.weixin.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>8/12 国家或地区：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.country.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <span>9/12 官网链接：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.website.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>10/12 城市：</span>
            </ul>
            <ul class="content">
                <input type="text" v-model="formData.city.value" placeholder="请输入">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="cocos-header">
                <p class="head-content">11/12 cocos账户：</p>
                <p class="head-remarks required">(账户cocos需≥5000万)</p>
            </ul>
            <ul class="content">
                <input type="text" placeholder="请输入" v-model="formData.cocos_address.value">
            </ul>
        </div>
    </div>

    <div class="main-container">
        <div class="center-container">
            <ul class="header">
                <i class="required">*</i>
                <span>12/12 节点申请人/机构介绍及未来规划：</span>
            </ul>
            <ul class="content">
                <input type="text" placeholder="请输入" v-model="formData.sunmary.value">
            </ul>
        </div>
    </div>

    <div class="btn-container">
        <!-- <router-link to="/questionnaireintro" class="btn">上一步</router-link> -->
        <a href="javascript:void(0);" class="btn" @click="goback()">上一步</a>
        <!-- <router-link to="/auestionnaireconfirm" class="btn">下一步</router-link> -->
        <a href="javascript:void(0);" class="btn" @click="submit()">下一步</a>
    </div> 
</div>
</template>


<script>
import { getAccountInfo } from '../../libs/bcx.api'
import { MobilePhoneReg, MailReg } from '../../libs/regular'
import { cacheSession } from '../../libs/Utils'
import { Toast } from 'mint-ui';
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
            }
        },
        mounted() {
            
                this.getAccountInfoAjax()
            //       console.log(this.personalMsgList)
        },
        methods: {
            goback(){
                this.$router.back()
            },
            radioChange(key, val){
                let _this = this
                if (_this.formData[key].value == val) return false
                _this.formData[key].value = val
                let obj = _this.formData[key]
                delete _this.formData[key]
                _this.formData[key] = obj
            },
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
                if (String(_this.formData[key].value) == "") {
                    
                    Toast({
                        duration: 2000,
                        message: '请填写' + _this.formData[key].name,
                        className: 'toast-style',
                    })
                    isContinue = false
                    break;
                }
                }
            }
            if (!isContinue) return false
            if (!MobilePhoneReg.test(_this.formData.mobile_phone.value)) {
                    Toast({
                        duration: 2000,
                        message: "请正确填写手机号",
                        className: 'toast-style',
                    })
                    return false
            }
            if (!MailReg.test(_this.formData.email.value)) {
                    Toast({
                        duration: 2000,
                        message: "请正确填写邮箱",
                        className: 'toast-style',
                    })
                    return false
            }
                cacheSession.set('formData', JSON.stringify(_this.formData))
                this.$router.push('/auestionnaireconfirm')
            }
        },
    }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container{
    width: 100%;
    background: #fff;
    margin-top: 0.1rem;
}
.center-container{
    width: 3.45rem;
    margin: 0 auto;
}
.center-container .header{
    width: 100%;
    height: 0.54rem;
    line-height: 0.54rem;
    border-bottom: 1px solid #DCDCDC;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.center-container .cocos-header{
    padding-top: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #DCDCDC;
}
.center-container .cocos-header .head-content{
    height: 0.24rem;
    line-height: 0.24rem;
    font-size: 0.16rem;
    font-weight:400;
    color:rgba(42,42,42,1);
}
.center-container .cocos-header .head-remarks{
    height: 0.24rem;
    line-height: 0.24rem;
    font-size: 0.14rem;
    font-weight:400;
}
.center-container .header span{
    font-size: 0.16rem;
    font-weight:400;
}
.center-container .content{
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.center-container .content input{
    width:100%;
    height: 0.45rem;
    background:rgba(255,255,255,1);
    border-radius: 0.02rem;
    font-size: 0.14rem;
    font-weight:400;
    color:#2A2A2A;
    text-indent: 5px;
}
.center-container .content .radio{
    height: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.center-container .content .radio img{
    width: 0.2rem;
    height: 0.2rem;

}
.center-container .content .radio span{
    height: 0.2rem;
    line-height: 0.2rem;
    margin-left: 0.1rem;
}
.center-container .content .radio:nth-child(2){
    margin-left: 0.46rem;
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

