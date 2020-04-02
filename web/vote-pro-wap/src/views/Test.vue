<template>
  <div>
    <message :personalMsgList='personalMsgList' :feiSeverPage="feiSeverPage" v-on:loadBottom="loadBottom"></message>
  </div>
</template>


<script>

import message from './message'
    export default {
        name: 'messageTeleplate',
        data() {
            return {
               personalMsgList:[],
               arr:[],
               feiSevercountText:'点击获取更多数据',
               feiSevercount:'',
               feiSeverPage:{page:1,status:true,NoData:false, allLoaded:false},
               feiNumber:null,
               feiSevercount:null
            }
        },
        props: {

        },
        components: {
            message
        },
        mounted() {
         this.messageList();
        },
        methods: {
            loadBottom(){
                //给后台传入的参数
                let obj = this.qs.stringify({
                    list:10,
                    p:this.feiSeverPage.page
                })    
               this.messageList(obj);
            },
            //访问接口
            messageList(obj){
                this.$axios.post('访问的接口名称', obj, res => {
                    
                      if(res.data.count == 0){
                           this.feiSeverPage.NoData = false;
                      }
                      res.data.data.forEach((item, index) => {
                         this.personalMsgList.push(item)
                      })       
                     
                      this.feiSevercount = Number(res.data.count);
                      this.feiNumber = Math.ceil( this.feiSevercount/10);
                      if(this.feiSeverPage.page == this.feiNumber){
                          this.feiSeverPage.status = false;
                          this.feiSeverPage.NoData = true;
                      }
                }, f => {
                    console.log(f)
                }, e => {
                    console.log(e)
                })
            }
            
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     .message{
        height:100%;
        overflow-y:scroll;
    }
</style>

