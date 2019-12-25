<template>
  <div>
    <div class="banner"></div>
    <div class="top-title">
      <p class="top-title-content">参选节点</p>
    </div>
    <div class="center-container bgfff">
      <div class="main-container">
        <div class="step-container">
          <ul class="step" :class="currentRouter(1)">1
            <li class="step-content" :class="currentRouter(1)">竞选简介</li>
          </ul>
          <ul class="step-line" :class="currentRouter(2)"></ul>
          <ul class="step" :class="currentRouter(2)">2
            <li class="step-content" :class="currentRouter(2)">填写基本信息</li>
          </ul>
          <ul class="step-line" :class="currentRouter(3)"></ul>
          <ul class="step" :class="currentRouter(3)">3
            <li class="step-content" :class="currentRouter(3)">确认信息</li>
          </ul>
          <ul class="step-line" :class="currentRouter(4)"></ul>
          <ul class="step" :class="currentRouter(4)">4
            <li class="step-content" :class="currentRouter(4)">申请成功</li>
          </ul>
        </div>
      </div>

      <div class="main-container">
        <router-view></router-view>
      </div>
        <!-- <div class="introduction-title">节点计划</div>
        <div class="introduction-content">TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一TRON以推动互联网去中心化为己任,致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一...</div>
      </div>
      
      <a href="javascript:void(0);" class="next-step-btn">下一步</a> -->
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bgfff{
  background: #fff;
}
.banner{
  width: 100%;
  height:260px;
  background: url('../assets/images/banner-bac.png') #5968D5 no-repeat center center;
  background-size: 945px 260px;
  position: absolute;
  top: 52px;
  left: 0;
  z-index: -1;
}

.top-title{
  width: 100%;
  height: 145px;
  font-size:40px;
  font-weight:400;
  color:rgba(255,255,255,1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-title .top-title-content{
  height:66px;
  line-height: 56px;
  font-size:40px;
  color: #fff;
  background: url('../assets/images/underline.png') no-repeat center bottom;
  padding-bottom: 10px;
}

.center-container{
  width: 1100px;
  margin: 0 auto;
}
.center-container .main-container{
  width: 810px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.center-container .main-container .step-container{
  width: 100%;
  padding-top: 60px;
  height: 130px;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-container .main-container .step-container .step{
  width:30px;
  height:30px;
  line-height: 30px;
  background:rgba(255,255,255,1);
  border:2px solid rgba(220,220,220,1);
  font-size:20px;
  color:rgba(220,220,220,1);
  text-align: center;
  border-radius: 50%;
  position: relative;
}
.center-container .main-container .step-container .step.active{
  color:rgba(84,101,223,1);
  border:2px solid rgba(84,101,223,1);

}
.center-container .main-container .step-container .step .step-content{
  position: absolute;
  width: 90px;
  bottom: -30px;
  left: 50%;
  height: 20px;
  line-height: 20px;
  font-size:14px;
  font-weight:400;
  text-align: center;
  margin-left: -45px;
  color:rgba(155,155,155,1);
}
.center-container .main-container .step-container .step .step-content.active{
  color:rgba(84,101,223,1);
}
.center-container .main-container .step-container .step-line{
  width: 218px;
  height: 2px;
  /* background:rgba(84,101,223,1); */
  background:rgba(220,220,220,1);
}
.center-container .main-container .step-container .step-line.active{
  background:rgba(84,101,223,1);
}

.center-container .main-container .introduction-title{
  width: 100%;
  height:28px;
  line-height: 28px;
  font-size:20px;
  margin-top: 50px;
  text-align: center;
}
.center-container .main-container .introduction-content{
  margin-top: 30px;
  line-height:20px;
  width: 100%;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
}
.center-container .next-step-btn{
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
  margin: 38px auto 0;
}
</style>


<script>
export default {
  data() {
    return {
    };
  },
  watch: {
  },
  mounted() {
    this.currentRouter()
    // this.getAccountInfoAjax()
  },
  methods: {
    currentRouter(val){
      let _this = this
      let routerRank = 1
      if (this.$route.path == "/questionnaire/success") {
        routerRank = 4
      } else if (this.$route.path == "/questionnaire/confirmform") {
        routerRank = 3
      } else if (this.$route.path == "/questionnaire/form") {
        routerRank = 2
      } else if (this.$route.path == "/questionnaire") {
        routerRank = 1
      }
      if (val>routerRank) {
        return ''
      } else {
        return 'active'
      }
    },
    browserConnectAjax(){
      let _this = this;
      browserConnect().then( res => {
        if (res.code == 1) {
          console.log('------------browserConnect---------')
          console.log(res)
          _this.isBrowserConnect = res
        }
      })
    },
    // fullBlance(){
    //   let _this = this;
      // if (!this.isWithdrawalTickets) {
      //   this.votesNum = this.myCOCOS
      // } else {
      //   this.votesNum = this.numberVotesCast
      // }
    // },
    addBlance(){
      let _this = this
      if (this.isAddAvailableVotes) return false
      this.isAddAvailableVotes = true
      this.votesNum = Number(this.haveVotedNum) + Number(_this.availableVotes)
    },
    getAccountInfoAjax(){
      let _this = this;
      getAccountInfo().then(res=>{
        _this.myAccount = res.account_name
        _this.queryAccountInfoAjax(res.account_name);
        
      })
    },
    hideLogin(){
      this.isMask = false
      this.isShowVotePopup = false
    },
    showLogin(){
      this.isMask = true
    },
    searchKeyboard(ev){
      
      if (ev.keyCode==13) {
        this.searchBtn();
      }
    },
    initDate(){
      let _this = this;
      this.isAddAvailableVotes = false
      this.currentPage = 1;
      this.lookupBlock = [];
      this.tableList = [];
      this.queryVotesAjax();
      
    },
    changeTpye(val) {
      if (this.isWitnesses == val) return false
      this.isWitnesses = val;
      let _this = this;
      this.initDate()
    },
    searchBtn() {
      let _this = this;
      let searchResult = this.queryVotesList.filter(stu => {
        return stu.account_name.indexOf(_this.searchAccountName) > -1 ;
      });

      let formData = {};
      if (this.isWitnesses) {
        formData = {
          witnesses: searchResult,
          votes_total: _this.votesTotal
        };
      } else {
        formData = {
          committee: searchResult
        };
      }
      _this.witnessesAjax(formData);
    },
    // showVoteBtn(val){
    //   let _this = this
    //   this.isMask = true
    //   this.isShowVotePopup = true
    //   this.isWithdrawalTickets = val
      
    //   queryAccountInfo().then(res => {
    //     console.log('-------queryAccountInfo---then--res--------')
    //     console.log(res)
    //     if (res.code == 1) {
    //       // if (_this.isWitnesses) {
    //       //   if (res.data.account.asset_locked.vote_for_witness) {
    //       //     _this.numberVotesCast = Number(res.data.account.asset_locked.vote_for_witness.amount)/Math.pow(10,5)
    //       //   }
            
    //       // } else {
    //       //   if (res.data.account.asset_locked.vote_for_committee) {
    //       //     _this.numberVotesCast = Number(res.data.account.asset_locked.vote_for_committee.amount)/Math.pow(10,5)
    //       //   }
    //       // }
    //       _this.votesNum = 
    //       _this.numberVotesCast
    //     } else {
    //       _this.codeErr(res)
    //     }
        
    //   })
    // },
    vote() {
      let _this = this;
      
      // if (this.isWithdrawalTickets) {
      //   if (this.votesNum > this.numberVotesCast) {
      //     Message({
      //         duration: 2000,
      //         message: '投票数超过可使用余额',
      //         type: 'error',
      //       })
      //     return false
      //   }
      // } else {
      //   if (this.votesNum > this.myCOCOS) {
      //     Message({
      //         duration: 2000,
      //         message: '撤票数超过已投票数',
      //         type: 'error',
      //       })
      //     return false
      //   }
      // }
      if (Number(this.votesNum) > Number(this.haveVotedNum) + Number(_this.availableVotes)) {
        Message({
            duration: 2000,
            message: _this.$t('tipsMessage.business.moreVotesThanAvailable'),
            type: 'error',
          })
        return false
      }

      let params = {
        vote_ids: [],
        type: 'witnesses',
        votes: 0
      };

      if (!cacheSession.get(cacheKey.accountName)) {
          Message({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[114]'),
            type: 'error',
          })
          return false
      }
      params.vote_ids = [];
      if (this.isWitnesses) {
        params.type = 'witnesses'
        for (const key in this.myVotesWitnesses) {
          params.vote_ids.push(key);
        }
      } else {
        params.type = 'committee'
        for (const key in this.myVotesCommittee) {
          params.vote_ids.push(key);
        }
      }
      // let votesNum = 0
      // if (this.isWithdrawalTickets) {
      //   votesNum = this.numberVotesCast - this.votesNum
      // } else {
      //   votesNum = this.votesNum
      // }
      // votesNum = this.votesNum
      if (params.vote_ids.length != 0) {
        params.votes = Number(this.votesNum)
        if (!params.votes || params.votes == 0) {
            Message({
              duration: 2000,
              message: _this.$t('tipsMessage.business.votesCannotZero'),
              type: 'error',
            })
            return false
          
        }
      } else {
        this.votesNum = 0
        params.votes = Number(this.votesNum)
      }
      
      publishVotes(params).then(res => {
        console.log('---------------publishVotes----------')
        console.log(res)
        if (res.code == 1) {
          
             
            Message({
              duration: 2000,
              message: _this.$t('tipsMessage.business.votedSuccessfully'),
              type: 'success',
            })
            // _this.hideLogin()
            // _this.queryVotesAjax();
            // _this.queryAccountInfoAjax();
            
            _this.initDate(_this.isWitnesses)
        } else {
          _this.codeErr(res)
        }
        // if (res.code == 1) {
          
             
        //     Message({
        //       duration: 2000,
        //       message: '投票成功',
        //       type: 'success',
        //     })
        //     _this.hideLogin()
        //     _this.queryVotesAjax();
        //     _this.queryAccountInfoAjax();
        // } else if(res.code == 402){
        //     _this.hideLogin()
        //   return false
        // } else {
          
        //   if (res.message.indexOf('Account is locked or not logged in') > -1) {
            
        //     Message({
        //       duration: 2000,
        //       message: _this.$t('interFaceMessage.common[114]'),
        //       type: 'error',
        //     })
        //   } else {
             
        //     Message({
        //       duration: 2000,
        //       message: '投票失败',
        //       type: 'error',
        //     })
        //   }
        //     _this.hideLogin()
        // }
        
            _this.hideLogin()
      });
    },
    // queryAccountBalancesAjax(){
    //   let _this = this;
    //   queryAccountBalances().then( res => {
    //     console.log('-------------------')
    //     console.log(res)
    //     if (res.code == 1) {
    //       _this.myCOCOS = res.data.COCOS
    //     } else {
    //       _this.codeErr(res)
    //     }
        
    //   })
    // },
    queryAccountInfoAjax(account) {
          console.log('**********************queryAccountInfoAjax-------res--------')
      let _this = this;
      queryAccountInfo(account).then(res => {
        if (res.code == 1) {
          console.log('-------queryAccountInfoAjax-------res--------')
          console.log(res)
          // 可用票数 计算
          // 总余额
          let balances = res.data.balances.filter((blance) => {
            return blance.asset_type == "1.3.0"
          })[0];
          // 冻结余额
          let lockedAsset = 0
          if (res.data.account.asset_locked.locked_total.length == 0) {
            
            _this.availableVotes = parseInt((Number(balances.balance) - 0)/Math.pow(10,5))
          } else {
            let lockedAsset = res.data.account.asset_locked.locked_total.filter((lockedblance) => {
              if (lockedblance[0] == "1.3.0") return lockedblance 
            })[0];
            _this.availableVotes = parseInt((Number(balances.balance) - Number(lockedAsset[1]))/Math.pow(10,5))
          }
          

          // 已投票数 
          
          if (_this.isWitnesses) {
            if (res.data.account.asset_locked.vote_for_witness) {
              _this.haveVotedNum = handleCOCOS(res.data.account.asset_locked.vote_for_witness.amount)
              _this.votesNum = _this.haveVotedNum
            } else {
              _this.haveVotedNum = 0
              _this.votesNum = _this.haveVotedNum
            }
            
          } else {
            if (res.data.account.asset_locked.vote_for_committee) {
              _this.haveVotedNum = handleCOCOS(res.data.account.asset_locked.vote_for_committee.amount)
              _this.votesNum = _this.haveVotedNum
            } else {
              _this.haveVotedNum = 0
              _this.votesNum = _this.haveVotedNum
            }
            
          }
          console.log('----------_this.votesNum------------')
          console.log(_this.votesNum)
          // 投票的数
          let myVotes = res.data.votes;
          // myVotesWitnesses myVotesCommittee
          let myVotesIds = [];
          _this.myVotesWitnesses = {}
          _this.myVotesCommittee = {}
          for (let i = 0; i < myVotes.length; i++) {
            if (myVotes[i].hasOwnProperty("witness_account")) {
              myVotesIds.push(myVotes[i].witness_account);
              _this.myVotesWitnesses[myVotes[i].witness_account] = "";
            } else if (myVotes[i].hasOwnProperty("committee_member_account")) {
              myVotesIds.push(myVotes[i].committee_member_account);
              _this.myVotesCommittee[myVotes[i].committee_member_account] = "";
            }
          }
          let duplicateRemovalMyVotesIds = myVotesIds.filter(
            (item, index, self) => self.indexOf(item) === index
          );
          queryDataByIds(duplicateRemovalMyVotesIds).then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (_this.myVotesWitnesses.hasOwnProperty(res.data[i].id)) {
                _this.myVotesWitnesses[res.data[i].id] = res.data[i].name;
              }
              if (_this.myVotesCommittee.hasOwnProperty(res.data[i].id)) {
                _this.myVotesCommittee[res.data[i].id] = res.data[i].name;
              }
            }
          });
        } else {
          _this.codeErr(res)
        }
        
        
      });
    },

    witnessesAjax: function(formData) {
      let _this = this;
      //   var formData = new FormData();
      //   formData.append("picture", files);
      let lang = 'zh-CN'
      if (this.$i18n.locale == 'zh') {
        lang = 'zh-CN'
      } else {
        lang = 'en'
      }
      let localhost = "http://192.168.15.60:8010/api/v1/witnesses"
      let resUrl = "https://vote.cocosbcx.net/api/api/v1/witnesses?lang=" + lang;
      if (this.isWitnesses) {
        resUrl = "https://vote.cocosbcx.net/api/api/v1/witnesses?lang=" + lang;
      } else {
        resUrl = "https://vote.cocosbcx.net/api/api/v1/committee?lang=" + lang;
      }
      this.$axios
        .post(resUrl, formData)
        .then(function(response) {
          console.log('response')
          console.log(response)
          _this.tableList= ''
          _this.tableList = response.data.result;
          _this.lookupBlock = new Array(response.data.result.length);
          for (let i = 0; i < _this.tableList.length; i++) {
            _this.tableList[i].voteRate = Number(_this.votesTotal) == 0 ? "0%":Number(Number(
                Number(_this.tableList[i].votes) / Number(_this.votesTotal)
              ).toFixed(4) *
                100).toFixed(2) +
              "%";
            _this.queryVestingBalanceAjax(_this.tableList[i].account_name, i);
          }
        })
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    },
    queryVestingBalanceAjax(account_name, index) {
      let _this = this;
      queryVestingBalance(account_name).then(res => {
        if (account_name == "syling") {
          console.log('===========queryVestingBalance===========')
          console.log(res)
        }
        if (res.code == 1) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].type == "cashback_block") {
                _this.lookupBlock.splice(index, 1, res.data[i].return_cash)
                break;
              } else {
                _this.lookupBlock.splice(index, 1, 0)
              }
              
            }
            
          } else {
            _this.lookupBlock.splice(index, 1, 0);
          }
          
        } else {
          _this.lookupBlock.splice(index, 1, 0);
        }
      });
    },
    queryVotesAjax() {
      let _this = this;
      // witnesses 见证人    committee 理事会
      let queryType = "witnesses";
      if (this.isWitnesses) {
        queryType = "witnesses";
      } else {
        queryType = "committee";
      }
      let params = {
        queryAccount: cacheSession.get(cacheKey.accountName) || '',
        type: queryType
      };
      queryVotes(params).then(res => {
        console.log('--------queryVotes-------------')
        console.log(res)
        if (res.code == 1) {
          
          function sortId(a, b) {
            return b.votes - a.votes;
          }
          let activeVotesList = res.data.filter( (activeVotesLi) => {
            return activeVotesLi.active == true
          })
          console.log('------------activeVotesList-------------------')
          console.log(activeVotesList)
          let noActiveVotesList = res.data.filter( (noActiveVotesLi) => {
            return noActiveVotesLi.active == false
          })
          noActiveVotesList.sort(sortId)
          console.log('------------noActiveVotesList-------------------')
          console.log(noActiveVotesList)
          noActiveVotesList.sort(sortId)
          let voteList = activeVotesList.concat(noActiveVotesList)
          // res.data.sort(sortId);
          _this.count = res.data.length;
          _this.queryVotesList = [];
          _this.votesTotal = 0;
          for (let i = 0; i < voteList.length; i++) {
            _this.votesTotal += Number(voteList[i].votes);
            voteList[i].supporters
              ? (voteList[i].supporters_count = voteList[i].supporters.length)
              : (voteList[i].supporters_count = 0);
            if (voteList[i].work_status) {
              voteList[i].supporters_count = Number(voteList[i].supporters_count) + 1
            }
            voteList[i].ranking = i + 1;
          }
          _this.queryVotesList = voteList;
          let requestQueryVotesList = voteList.slice(
            Number(_this.currentPage - 1) * Number(_this.pageSize),
            Number(_this.currentPage) * Number(_this.pageSize)
          );
          let formData = {};
          if (this.isWitnesses) {
            formData = {
              witnesses: requestQueryVotesList,
              votes_total: _this.votesTotal
            };
          } else {
            formData = {
              committee: requestQueryVotesList
            };
          }
            _this.tableList = [];
          _this.witnessesAjax(formData);
        } else {
          _this.codeErr(res)
        }
        
      });
    },

    // element ui
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let _this = this;
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.queryVotesAjax();
      this.queryAccountInfoAjax();
    },

    checkboxChangeEvents(li, index) {
      let _this = this;
      let myVotesCount = 0
      if (this.isWitnesses) {
        myVotesCount = Object.keys(_this.myVotesWitnesses).length
      } else {
        myVotesCount = Object.keys(_this.myVotesCommittee).length
      }
      if (!this.tableList[index].supported) {
        if (myVotesCount == 11) {
          Message({
            duration: 2000,
            message: _this.$t('tipsMessage.business.maximumNumberVotesReached'),
            type: 'error',
          })
          return false
        }
      }

      this.tableList[index].supported = !this.tableList[index].supported
      if (li.supported) {
        if (this.isWitnesses) {
          this.myVotesWitnesses[li.account_id] = li.account_name;
        } else {
          this.myVotesCommittee[li.account_id] = li.account_name;
        }
      } else {
        let dynamicTags = {};
        if (this.isWitnesses) {
          delete this.myVotesWitnesses[li.account_id];
          dynamicTags = this.myVotesWitnesses;
          this.myVotesWitnesses = {};
          this.myVotesWitnesses = dynamicTags;
        } else {
          delete this.myVotesCommittee[li.account_id];
          dynamicTags = this.myVotesCommittee;
          this.myVotesCommittee = {};
          this.myVotesCommittee = dynamicTags;
        }
      }
    },

    handleClose(key, typeName) {
      let _this = this;
      // witnesses 见证人    committee 理事会
      let dynamicTags = {};
      if (typeName == "witnesses") {
        delete this.myVotesWitnesses[key];
        dynamicTags = this.myVotesWitnesses;
        this.myVotesWitnesses = {};
        this.myVotesWitnesses = dynamicTags;
      } else if (typeName == "committee") {
        delete this.myVotesCommittee[key];
        dynamicTags = this.myVotesCommittee;
        this.myVotesCommittee = {};
        this.myVotesCommittee = dynamicTags;
      }
      for (let i = 0; i < this.tableList.length; i++) {
        if (this.tableList[i].account_id == key) {
          this.tableList[i].supported = false;
          let targetObj = this.tableList
          this.tableList = []
          this.tableList = targetObj
          return false
        }
      }
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    codeErr(res){
      let _this = this;
          if (res.code == 105) {
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.common[6]'),
                type: 'error',
              })
            return false
          } else if (res.code == 402) {
            return false
          } else {
            if (res.message.indexOf('Parameter is missing') > -1) {
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.common[101]'),
                type: 'error',
              })
            } else if (res.message.indexOf("world view name can't start whith a digit")>-1) {
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.creatWorldView[3]'),
                type: 'error',
              })
            } else if (res.message.indexOf("Please login first")>-1) {
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.common[114]'),
                type: 'error',
              })
            } else if (res.message.indexOf('Insufficient Balance') > -1) {
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.common.InsufficientBalance'),
                type: 'error',
              })
            } else if (res.message.indexOf('You\'re not a nh asset creator')>-1) {
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.creatWorldView[2]'),
                type: 'error',
              })
            } else if (res.message.indexOf("world view name can't start whith a digit")>-1) {
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.creatWorldView[3]'),
                type: 'error',
              })
            } else if (res.message.indexOf("Most likely a uniqueness constraint is violated")>-1) {
              
              Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.creatWorldView[0]'),
                type: 'error',
              })
            } else if (res.message.indexOf("missing required owner authority")>-1) {
              
              Message({
                duration: 2000,
                message: _this.$t('tipsMessage.business.pleaseImportAccountPrivateKey'),
                type: 'error',
              })
            } else if (res.message.indexOf("locked->value >= 0")>-1) {
              
              Message({
                duration: 2000,
                message: _this.$t('tipsMessage.business.lockedGreaterThanValue'),
                type: 'error',
              })
            } else if (res.message.indexOf("Wrong password")>-1) {
              Toast({
                duration: 2000,
                message: _this.$t('interFaceMessage.common[6]'),
                className: 'toast-style',
              })
            } else {
                Message({
                duration: 2000,
                message: _this.$t('interFaceMessage.common[5]'),
                type: 'error',
              })
            }
          }
    },
  }
};
</script>




