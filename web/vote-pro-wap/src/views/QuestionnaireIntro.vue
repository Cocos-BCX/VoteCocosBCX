<template>
<div class="bg">
    <div class="center-container">
        <ul class="title">
            <p class="title-content">节点计划</p>
        </ul>

        <ul class="node-content">TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块</ul>

        <router-link class="next-step-btn" to="/questionnaireform">下一步</router-link>
    </div>   
</div>
</template>


<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
    width: 100%;
    height: 100%;
    background: url('../assets/images/bac.png') no-repeat center center;
    background-size: cover;
    padding-top: 0.44rem;
}
.center-container {
    width: 3.45rem;
    margin: 0 auto;
    padding-bottom: 0.58rem;
    background: #fff;
    padding-top: 0.3rem;
}
.title{
    height: 0.28rem;
    font-size: 0.2rem;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.title .title-content {
    height:28px;
    font-size:20px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:28px;
    border-bottom: 0.07rem solid rgba(192,200,255,1);
}
.node-content{
    width: 3.15rem;
    margin: 0.2rem auto 0;
    font-size: 0.16rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 0.2rem;
}
.next-step-btn{
    width: 1.8rem;
    height: 0.45rem;
    line-height: 0.45rem;
    background:rgba(25,208,181,1);
    border-radius: 0.04rem;
    font-size: 0.16rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: block;
    text-align: center;
    margin: 0.35rem auto 0;
}
</style>

