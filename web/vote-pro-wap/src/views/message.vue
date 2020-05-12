<template>
  <div class="message">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="feiSeverPage.allLoaded" :max-distance="150"
                 @top-status-change="handleTopChange" ref="loadmore">
            <ul class='feiServerListBox scroll-wrapper'>
                <li class="read conatiner" v-for="item in personalMsgList">
                    <div class="left">
                        <span :class="{messagetitle:item.is_read=='0'}">●</span>
                        <span :class="{messagetitle:item.is_read=='0'}">消息</span>
                    </div>
                    <div class="right">
                        <span>{{item.create_time}}</span>
                    </div>

                    <div class="messagetext">
                        {{item.msg_content}}
                    </div>
                </li>

            </ul>
            <div v-if="feiSeverPage.allLoaded && feiSeverPage.NoData" class="tc divallLoaded">{{bottomdropText}}</div>
        </mt-loadmore>
    </div>
</template>


<script>
    import { Indicator, Loadmore } from 'mint-ui';  //引入mintui
    export default {
        name: 'message',
        data() {
            return {
                loading:false,
                scrollMode:"auto", 
                page:1,//第几页
                num_page:7,//一页显示几条
                count:'',
                bottomdropText:'数据加载完毕',
                scroll_end:false,
                allLoaded: false,
                topStatus: '',
                bottomStatus:''
            }
        },
        props: ['personalMsgList','feiSeverPage'],
        mounted() {
        },
        methods: {
            handleBottomChange(status){
                 this.bottomStatus = status;
            },
            handleTopChange: function (status) {
                this.topStatus = status;
            },
            loadBottom() { // 加载更多数据的操作
                var self = this;
                if(this.feiSeverPage.status){
                    this.feiSeverPage.page = this.feiSeverPage.page + 1;
                       this.$emit('loadBottom');
                }else{
                    this.feiSeverPage.allLoaded = true;
                }
            }
            
        },
        components:{
          'v-loadmore':Loadmore
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

