<template>
  <div class="home">
    <!-- <div class="routerQuestionnaire" v-if="isShowRouterQuestionnaire">
      <router-link to="/questionnaireintro">成为候选节点/理事会</router-link>
      <img src="../assets/images/close.png" @click="closeIsShowRouterQuestionnaire()" class="close" alt="">
    </div> -->
    
    <div class="search-bar">
      <div class="search-main">
        <a href="javascript:void(0);" class="search-btn" @click="searchBtn()"></a>
        <input type="text" class="search-input" v-model="searchAccountName" />
      </div>
    </div>

    <div class="change-btn">
      <a href="javascript:void(0);" :class="{active: isWitnesses}" @click="changeTpye(true)">{{$t('tabTableContainer.superNode')}}</a>
      <a href="javascript:void(0);" :class="{active: !isWitnesses}" @click="changeTpye(false)">{{$t('tabTableContainer.council')}}</a>
    </div>

    <div class="node-lists">
      <div class="node-main">
      <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多" bottomDropText="释放加载更多" bottomLoadingText="加载更多" ref="loadmore"> -->
        <div class="node" v-for="(li, index) in tableList" :key="index">
          <img v-if="li.logo" :src="li.logo"  class="node-icon" alt />
          <img v-if="!li.logo" src="../assets/images/default-icon.png"  class="node-icon" alt />
          <ul class="node-message">
            <li class="name">{{li.account_name}}</li>
            <li class="spec">
              <p>
                <img src="../assets/images/ranking-mobile.png" alt /> No.{{li.ranking}}
              </p>
              <p>
                <img src="../assets/images/percentage-mobile.png" alt /> {{li.voteRate}}
              </p>
              <p>
                <img src="../assets/images/pos-mobile.png" alt /> {{li.country}}
              </p>
            </li>
          </ul>
          <a href="javascript:void(0);" class="node-choice-btn" @click="checkboxChangeEvents(li)">
            <img v-if="li.supported" src="../assets/images/choice.png" alt />
          </a>
        </div>
        <div class="show-more" v-if="!searchAccountName && !stopLoading" @click="loadBottom()">
          {{$t('common.ShowMore')}}
        </div>
          <!-- </mt-loadmore> -->
        <div class="blank55"></div>
      </div>
    </div>

    <div class="bottom-btn-bar">
      <div @click="showDropDom()">{{isWitnesses?'已选节点':'已选理事会'}}：{{isWitnesses?Object.keys(myVotesWitnesses).length:Object.keys(myVotesCommittee).length}}</div>
      <!-- <div @click="showVoteBtn()">{{$t('common.vote')}}</div> -->
      <div :class="receiveNum < 1?'disable':''" @click="claimVestingBalanceAjax()">{{$t('common.Received')}}({{receiveNum}})</div>
    </div>
    <div class="mask" v-if="isMask">
      <div class="voted-list-container" ref="hideDropDom">
        <p class="drop-btn" @click="hidedrop()" :style="{bottom: dropbtnbottom}">
          <img src="../assets/images/drop.png" alt />
        </p>

        <div class="already-voted-list-container">

            <ul class="already-voted-list" v-if="isWitnesses">
                <li v-for="(li, key) in myVotesWitnesses" :key="key">
                    <p class="info">
                    <img v-if="li.logo" :src="li.logo"  class="node-icon" alt />
                    <img v-if="!li.logo" src="../assets/images/default-icon.png"  class="node-icon" alt />
                    <span>{{li.name}}</span>
                    </p>

                    <a href="javascript:void(0);" @click="handleClose(key, 'witnesses')" class="node-choice-btn">
                    <img src="../assets/images/remove.png" alt />
                    </a>
                </li>
            </ul>

            <ul class="already-voted-list" v-if="!isWitnesses">
                <li v-for="(li, key) in myVotesCommittee" :key="key">
                    <p class="info">
                    <img v-if="li.logo" :src="li.logo"  class="node-icon" alt />
                    <img v-if="!li.logo" src="../assets/images/default-icon.png"  class="node-icon" alt />
                    <span>{{li.name}}</span>
                    </p>

                    <a href="javascript:void(0);" @click="handleClose(key, 'committee')" class="node-choice-btn">
                    <img src="../assets/images/remove.png" alt />
                    </a>
                </li>
            </ul>
                
        </div>
        <div class="vote-btn-bar">
          <!-- <a href="javascript:void(0);" class="vote-btn" @click="vote()">投票</a> -->
          <a href="javascript:void(0);" class="vote-btn" @click="showVoteBtn()">投票</a>
        </div>
      </div>
    </div>
    <div class="mask" v-if="isShowVotePopup" @click.stop="hideLogin()"></div>
    <div class="vote-Popup" v-if="isShowVotePopup">
      <div class="title">
        <ul class="tab-btn"  @click="tabWithdrawalTickets(false)">
          <a href="javascript:void(0);" :class="{active: !isWithdrawalTickets}">{{$t('common.vote')}}</a>
        </ul>
        <ul class="tab-btn" @click="tabWithdrawalTickets(true)">
          <a href="javascript:void(0);" :class="{active: isWithdrawalTickets}">{{$t('common.withdrawalVotes')}}</a>
        </ul>
      </div>
      <div class="blance-bar" @click="fullBlance()" v-if="!isWithdrawalTickets">{{$t('common.votesAvailableNum')}}：{{availableVotes || 0}} COCOS</div>
      <div class="blance-bar" @click="fullBlance()" v-if="isWithdrawalTickets">{{$t('common.numberVotesCast')}}：{{haveVotedNum || 0}} COCOS</div>
      <input type="text" class="num-input" @blur="scrollTop()" :placeholder="$t('tipsMessage.common.pleaseEnter')" v-model="votesNum">
      <div class="confirm-btn-bar">
        <div class="btn cancel" @click="hideLogin()">{{$t('common.cancel')}}</div>
        <div class="btn confirm" @click="vote()">{{$t('common.confirm')}}</div>
      </div>
    </div>
  </div>
</template>



<script>
import {
  getAccountInfo,
  queryVotes,
  queryVestingBalance,
  queryAccountInfo,
  queryDataByIds,
  publishVotes,
  passwordLogin,
  logout,
  queryAccountBalances,
  claimVestingBalance
} from "../../libs/bcx.api";
import { cacheSession, cacheKey, handleCOCOS } from '../../libs/Utils'
import { Indicator, Toast } from 'mint-ui';
import { IntReg } from '../../libs/regular'
export default {
  data() {
    return {
      isShowRouterQuestionnaire: true,

      dropbtnbottom: "0",
      isMask: false,
      
      dynamicTags: ["标签一", "标签二", "标签三"],
      checked: true,
      count: 0,
      currentPage: 1,

      isWitnesses: true,

      // page: 1,
      pageSize: 15,
      queryVotesList: [],

      votesTotal: 0,
      tableList: [],
      lookupBlock: [],
      searchAccountName: "",
      allLoaded: false,

      myVotesWitnesses: {},
      myVotesCommittee: {},

      // login
      account: '',
      password: '',
      isMask: false,
      isShowLogin: false,
      isShowVotePopup: false,

      isLogin: false,
      currentLoginAccount: '',

      availableVotes: '',
      availableVotesRegular: '',
      numberVotesCast: '',
      numberVotesCastRegular: '',
      votesNum: '',
      votesNumRegular: '',
      isAddAvailableVotes: false,
      haveVotedNum: 0,
      haveVotedNumWitnesses: 0,
      haveVotedNumCommittee: 0,

      isWithdrawalTickets: false,

      stopLoading: true,

      // 领取数量  右下角
      receiveNum: 0,
      voteId: ''
    };
  },
  watch: {
    'searchAccountName': function (val) {
      this.searchBtn()
    },
    // 'numberVotesCast': function (params) {
    //   if (IntegerOrDecimalReg1.test(val)) {
    //     this.numberVotesCastRegular = this.numberVotesCast 
    //   } else {
    //     this.numberVotesCast = this.numberVotesCastRegular
    //   }
    // },
    'votesNum': function (val) {
      if (!val) {
        this.votesNumRegular = this.votesNum
        return false
      }
      if (IntReg.test(val)) {
        this.votesNumRegular = this.votesNum
      } else {
        this.votesNum = this.votesNumRegular
      }
    }
  },
  mounted() {
    
    if (cacheSession.get(cacheKey.accountName)) {
      // this.isLogin = true
      this.currentLoginAccount = cacheSession.get(cacheKey.accountName)
    }
    this.queryVotesAjax();
  },
  methods: {
    closeIsShowRouterQuestionnaire(){
      this.isShowRouterQuestionnaire = false
    },

    // 领取方法
    claimVestingBalanceAjax(){
      let _this = this;
      // if (this.receiveNum < 1) return false
      claimVestingBalance(_this.voteId).then( res => {
        console.log('===========claimVestingBalance============')
        console.log(res)
        if (res.code == 1) {
          Toast({
              duration: 2000,
              message: '领取成功',
              className: 'toast-style',
            })
            setTimeout(() => {
              _this.queryVotesAjax();
            }, 1500);
          
        } else {
          _this.codeErr(res)
          // Toast({
          //     duration: 2000,
          //     message: '领取失败',
          //     className: 'toast-style',
          //   })
          // return false

        }
      })
    },
    // 获取当前可领取cocos
    getReceiveNumAjax(){
      let _this = this;
      getAccountInfo().then( res => {
        console.log('--------getAccountInfo-----------')
        console.log(res.account_name)
        let params = {
          account: res.account_name,
          type: 'cashback_vote'
        }
        queryVestingBalance(params).then(res=>{
          console.log('----------queryVestingBalance------------')
          console.log(res)
          if (res.data.length > 0) {
            _this.receiveNum = Number(res.data[0].available_balance.amount).toFixed(0) || 0
            _this.voteId = res.data[0].id
          }
        })
      })
    },
    scrollTop(){
      window.scroll(0, 0);
    },
    fullBlance(){
      // let _this = this;
      if (this.isAddAvailableVotes) return false
      this.votesNum = ''
      if (!this.isWithdrawalTickets) {
        this.votesNum = this.availableVotes
      } else {
        this.votesNum = this.haveVotedNum
      }
      
      // let _this = this
      // this.isAddAvailableVotes = true
      // this.votesNum = Number(this.haveVotedNum) + Number(_this.availableVotes)
      
    },
    hideLogin(){
      this.isMask = false
      this.isShowLogin = false
      this.isShowVotePopup = false
      this.votesNum = ''
      this.isAddAvailableVotes = false
    },
    showLogin(){
      this.isMask = true
      this.isShowLogin = true
    },
    showDropDom(){
        this.isMask = true
    },


    passwordLoginAjax() {
      let _this = this;
      passwordLogin({
        account: _this.account,
        password: _this.password
      }).then(res => {
        if (res.code == 1) {
          _this.account = "";
          _this.password = "";
          _this.isShowLogin = false;
          cacheSession.set(cacheKey.accountName, res.data.account_name);
          this.currentLoginAccount = res.data.account_name;
        } else {
          _this.codeErr(res)
          return false;
        }
      });
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
    
    tabWithdrawalTickets(val){
      this.isWithdrawalTickets = val
    },
    showVoteBtn(){
      let _this = this
      this.isShowVotePopup = true
      if (_this.isWitnesses) {
        _this.haveVotedNum = _this.haveVotedNumWitnesses
      } else {
        _this.haveVotedNum = _this.haveVotedNumCommittee
      }
      // this.queryAccountInfoAjax()

      
      // queryAccountInfo().then(res => {
      //   if (res.code == 1) {
          
      //     console.log('--------queryAccountInfo------res-----------')
      //     console.log(res)
      //     _this.availableVotes = Number(res.data.account.asset_locked.vote_for_witness.amount)/Math.pow(10,5) || 0
      //     // if (_this.isWitnesses) {
            
      //     // } else {
      //     //   _this.numberVotesCast = Number(res.data.account.asset_locked.vote_for_committee.amount)/Math.pow(10,5) || 0
            
      //     // }
      //     _this.queryAccountBalancesAjax(cacheSession.get(cacheKey.accountName))
      //   } else {
      //     _this.codeErr(res)
      //   }
      // })
      // getAccountInfo().then( res => {
      //   // res[cacheKey.accountName]
      //   console.log('-----------------getAccountInfo------------')
      //   console.log(res)
      //   _this.queryVestingBalanceAjax('syling')
      // })
    },
    vote() {
      let _this = this;
      // if (this.isWithdrawalTickets) {
      //   if (this.votesNum > this.numberVotesCast) {
          
      //     Toast({
      //       message: "投票数超过可使用余额",
      //       className: 'toast-style',
      //       duration: 2000
      //     });
      //     return false
      //   }
      // } else {
      //   if (this.votesNum > this.availableVotes) {
          
      //     Toast({
      //       message: "投票数超过可使用余额",
      //       className: 'toast-style',
      //       duration: 2000
      //     });
      //     return false
      //   }
      // }
      
      if (this.isWithdrawalTickets) {
        if (Number(this.votesNum) > Number(this.haveVotedNum)) {
          Toast({
              duration: 2000,
              message: _this.$t('tipsMessage.business.cannotExceedNumberVotes'),
              className: 'toast-style',
            })
          return false
        }
      } else {
        if (Number(this.votesNum) > Number(_this.availableVotes)) {
          Toast({
              duration: 2000,
              message: _this.$t('tipsMessage.business.moreVotesThanAvailable'),
              className: 'toast-style',
            })
          return false
        }
      }
      
      let params = {
        vote_ids: [],
        type: 'witnesses',
        votes: 0
      };

      // if (!cacheSession.get(cacheKey.accountName)) {
      //     Toast({
      //       duration: 2000,
      //       message: _this.$t('interFaceMessage.common[114]'),
      //       className: 'toast-style',
      //     })
      //     return false
      // }
      params.vote_ids = [];
      if (this.isWitnesses) {
        params.type = 'witnesses'
        for (const key in this.myVotesWitnesses) {
          params.vote_ids.push(key);
        }
      } else {
        params.type = 'committee'
        params.committee_ids = [];
        for (const key in this.myVotesCommittee) {
          params.vote_ids.push(key);
        }
      }
      if (String(_this.votesNum) == "") {
          let messageToast = ''
          if (!this.isWithdrawalTickets) {
            messageToast = _this.$t('tipsMessage.common.pleaseEnter') + _this.$t('common.numberVotes')
          } else {
            messageToast = _this.$t('tipsMessage.common.pleaseEnter') + _this.$t('common.withdrawalVotesNum')
          }
          Toast({
            duration: 2000,
            message: messageToast,
            className: 'toast-style',
          })
        return false
      }
      let votesNum = 0
      if (this.isWithdrawalTickets) {
        votesNum = Number(this.haveVotedNum) - Number(this.votesNum)
      } else {
        votesNum = Number(this.votesNum) + Number(this.haveVotedNum)
      }
      params.votes = Number(votesNum)
      if (params.vote_ids.length == 0) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[114]'),
            className: 'toast-style',
          })
          return false
        
      }
      // console.log(this.isWithdrawalTickets)
      // console.log(this.votesNum)
      // params.votes = votesNum
      // console.log('params')
      // console.log(params)
      
      if (params.vote_ids.length != 0) {
          
        if (!this.isWithdrawalTickets) {
          if (!params.votes || params.votes == 0) {
              Toast({
                message: _this.$t('tipsMessage.business.votesCannotZero'),
                className: 'toast-style',
                duration: 2000
              });
              return false
            
          }
        } else {
          if (params.votes > this.availableVotes) {
              Toast({
                message: _this.$t('tipsMessage.business.cannotExceedNumberVotes'),
                className: 'toast-style',
                duration: 2000
              });
              return false
            
          }
        }
      } else {
        params.votes = 0
      }
      console.log('=========publishVotes======params******************')
      console.log(params)
      // return false
      publishVotes(params).then(res => {
        console.log('=========publishVotes======res==================')
        console.log(res)
        if (res.code == 1) {
          
          if (this.isWithdrawalTickets) {
            Toast({
                // message: "撤票成功",
                message: _this.$t('tipsMessage.business.successfulWithdrawalTickets'),
                className: 'toast-style',
                duration: 2000
              });
          } else {
            Toast({
                message: _this.$t('tipsMessage.business.votedSuccessfully'),
                className: 'toast-style',
                duration: 2000
              });
          }
        
        // _this.isWitnesses = true;
        // _this.currentPage = 1;
        // _this.lookupBlock = [];
        // _this.tableList = [];
        _this.hideLogin()
        // _this.queryVotesAjax();this.isWitnesses
        _this.initDate()
        } else {
          
          _this.codeErr(res)
        }
      });
    },
    // queryAccountBalancesAjax(){
    //   let _this = this;
    //   queryAccountBalances().then( res => {
    //     console.log('----------queryAccountBalances----------------')
    //     console.log(res)
    //     console.log(_this.numberVotesCast)
    //     if (res.code == 1) {
    //       _this.availableVotes = (Number(res.data.COCOS) - Number(_this.numberVotesCast)).toFixed(5)
    //     } else {
    //       _this.codeErr(res)

    //     }
        
    //   })
    // },
    initDate(){
      this.currentPage = 1;
      this.votesTotal = 0
      this.lookupBlock = [];
      this.tableList = [];
      
      this.votesNum = ''
      this.isAddAvailableVotes = false
      this.myVotesWitnesses = {}
      this.myVotesCommittee = {}
      this.queryVotesAjax();
    },
    changeTpye(val) {
      let _this = this;
      if (val == this.isWitnesses) return false
      this.isWitnesses = val;
      this.initDate()
    },

    // 个人投票情况
    queryAccountInfoAjax() {
      let _this = this;
      queryAccountInfo().then(res => {
          console.log('-------queryAccountInfoAjax-------res--------')
          console.log(res)
        if (res.code == 1) {
          // 可用票数 计算
          // 总余额
          let balances = res.data.balances.filter((blance) => {
            return blance.asset_type == "1.3.0"
          })[0];
          // 冻结余额
          let lockedAsset = 0
          if (res.data.account.asset_locked.locked_total.length == 0) {
            
            _this.availableVotes = parseInt((Number(balances.balance) - 0)/Math.pow(10,5))
            console.log(balances.balance)
          console.log('======'+_this.availableVotes)
          } else {
            let lockedAsset = res.data.account.asset_locked.locked_total.filter((lockedblance) => {
              if (lockedblance[0] == "1.3.0") return lockedblance 
            })[0];
            _this.availableVotes = parseInt((Number(balances.balance) - Number(lockedAsset[1]))/Math.pow(10,5))
          console.log(_this.availableVotes)
          }
          
          // 已投票数 
          
          if (_this.isWitnesses) {
            if (res.data.account.asset_locked.vote_for_witness) {
              _this.haveVotedNumWitnesses = handleCOCOS(res.data.account.asset_locked.vote_for_witness.amount)
              _this.haveVotedNum = handleCOCOS(res.data.account.asset_locked.vote_for_witness.amount)
            } else {
              _this.haveVotedNumWitnesses = 0
              _this.haveVotedNum = 0
            }
            
          } else {
            if (res.data.account.asset_locked.vote_for_committee) {
              _this.haveVotedNumCommittee = handleCOCOS(res.data.account.asset_locked.vote_for_committee.amount)
              _this.haveVotedNum = handleCOCOS(res.data.account.asset_locked.vote_for_committee.amount)
            } else {
              _this.haveVotedNumCommittee = 0
              _this.haveVotedNum = 0
            }
            
          }
          console.log('----------_this.votesNum------------')
          console.log(_this.votesNum)
          // 投票的数
          let myVotes = res.data.votes;
          // myVotesWitnesses myVotesCommittee
          let myVotesIds = [];
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
            _this.getReceiveNumAjax()
            let myVotesWitnesses = {}
            let myVotesCommittee = {}
            for (let i = 0; i < res.data.length; i++) {
              let myVotesObj = {
                name: res.data[i].name,
                logo: res.data[i].logo
              }
              if (_this.myVotesWitnesses.hasOwnProperty(res.data[i].id)) {
                // _this.myVotesWitnesses[res.data[i].id] = res.data[i].name;
                myVotesWitnesses[res.data[i].id] = {
                  name: res.data[i].name,
                  logo: res.data[i].logo
                };

              }
              if (_this.myVotesCommittee.hasOwnProperty(res.data[i].id)) {
                // _this.myVotesCommittee[res.data[i].id] = res.data[i].name;
                myVotesCommittee[res.data[i].id] = {
                  name: res.data[i].name,
                  logo: res.data[i].logo
                };
              }
            }
            _this.myVotesWitnesses = myVotesWitnesses
            _this.myVotesCommittee = myVotesCommittee
            
          });
        } else {
          _this.codeErr(res)
        }
        
      });
    },

    witnessesAjax: function(formData) {
      let _this = this;
      // lang=en/zh-CN
      let lang = 'zh-CN'
      if (this.$i18n.locale == 'zh') {
        lang = 'zh-CN'
      } else {
        lang = 'en'
      }
      let localhost = "http://192.168.15.60:8010/api/v1/witnesses"
      // let localResUrl = "http://vote.test.cocosbcx.net/api/api/v1/"
      let localResUrl = "https://vote.cocosbcx.net/api/api/v1/"
      let resUrl = localResUrl + "witnesses?lang=" + lang;
      if (this.isWitnesses) {
        resUrl = localResUrl + "witnesses?lang=" + lang;
      } else {
        resUrl = localResUrl + "committee?lang=" + lang;
      }
      this.$axios
        .post(resUrl, formData)
        .then(function(response) {
          _this.queryAccountInfoAjax();
          _this.tableList = [];
          _this.tableList = response.data.result;
          
          _this.lookupBlock = new Array(response.data.result.length);
          if (_this.votesTotal == 0) {
            
            for (let i = 0; i < _this.tableList.length; i++) {
              _this.tableList[i].voteRate = "0%"
              // _this.lookupBlockRewardsByIdAjax(_this.tableList[i].account_id, i);
              
              // _this.queryVestingBalanceAjax(_this.tableList[i].account_name, i);
            }
          } else {
            for (let i = 0; i < _this.tableList.length; i++) {
              _this.tableList[i].voteRate =
                Number(Number(
                  Number(_this.tableList[i].votes) / Number(_this.votesTotal)
                ).toFixed(4) *
                  100).toFixed(2) +
                "%";
              // _this.lookupBlockRewardsByIdAjax(_this.tableList[i].account_id, i);
              
            // _this.queryVestingBalanceAjax(_this.tableList[i].account_name, i);
            }
            
            // _this.$nextTick(function () {
            //   _this.$refs.loadmore.onBottomLoaded();
            // })
            
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
        console.log('=======queryVestingBalance=======')
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
        type: queryType
      };
      queryVotes(params).then(res => {
        console.log('===========queryVotes===========')
        console.log(res)
        _this.stopLoading = false
        if (res.code == 1) {
          function sortId(a, b) {
            return b.votes - a.votes;
          }
          res.data.sort(sortId);
          _this.count = res.data.length;
          _this.queryVotesList = [];
          _this.votesTotal = 0;
          for (let i = 0; i < res.data.length; i++) {
            _this.votesTotal += Number(res.data[i].votes);
            res.data[i].supporters
              ? (res.data[i].supporters_count = res.data[i].supporters.length)
              : (res.data[i].supporters_count = 0);
            res.data[i].ranking = i + 1;
          }
          _this.queryVotesList = res.data;
          // let requestQueryVotesList = res.data.slice(
          //   Number(_this.currentPage - 1) * Number(_this.pageSize),
          //   Number(_this.currentPage) * Number(_this.pageSize)
          // );
          

          let currentPageSize = _this.currentPage * _this.pageSize
          if (currentPageSize > res.data.length) {
            currentPageSize = res.data.length
            if (_this.currentPage > 0) {
              _this.currentPage--
              _this.stopLoading = true
            }
          }
          let requestQueryVotesList = res.data.slice(0, Number(currentPageSize));
          let formData = {};
          if (this.isWitnesses) {
            formData = {
              witnesses: requestQueryVotesList,
              votes_total: _this.votesTotal
            };
          } else {
            formData = {
              committee: requestQueryVotesList,
              
            };
          }
          
          _this.witnessesAjax(formData);
        } else {
          _this.codeErr(res)
        }
        
      });
    },
    lookupBlockRewardsByIdAjax(account_id, index) {
      let _this = this;
      lookupBlockRewardsById(account_id).then(res => {
        if (res.code == 1) {
          _this.lookupBlock.splice(index, 1, res.data.earned_coindays);
        } else {
          _this.lookupBlock.splice(index, 1, 0);
        }
      });
    },
    checkboxChangeEvents(li) {
      let _this = this
      
      let myVotesCount = 0
      if (this.isWitnesses) {
        myVotesCount = Object.keys(_this.myVotesWitnesses).length
      } else {
        myVotesCount = Object.keys(_this.myVotesCommittee).length
      }
      if (!li.supported) {
        if (myVotesCount == 11) {
          Toast({
            message: _this.$t('tipsMessage.business.maximumNumberVotesReached'),
            className: 'toast-style',
            duration: 2000
          });
          return false
        }
      }
      li.supported = !li.supported
      let myVotesObj = {
          name: '',
          logo: ''
      }
      myVotesObj.name = li.account_name
      myVotesObj.logo = li.logo
      if (li.supported) {
        if (this.isWitnesses) {
          this.myVotesWitnesses[li.account_id] = myVotesObj
        } else {
          this.myVotesCommittee[li.account_id] = myVotesObj
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
      console.log(key);
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
        }
      }
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    hidedrop: function() {
      let _this = this;
      this.$refs.hideDropDom.style.bottom = "-2.6rem";
      setTimeout(() => {
        _this.isMask = false;
      }, 500);
    },
    
    loadTop() {
      this.currentPage = 1
      this.myVotesWitnesses = {}
      this.myVotesCommittee = {}
      this.queryVotesAjax();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom(){
      this.myVotesWitnesses = {}
      this.myVotesCommittee = {}
      this.currentPage++
      this.queryVotesAjax();
    },

    codeErr(res){
      let _this = this;
          
      if (res.code == 112) {
          Toast({
            duration: 2000,
            message: _this.$t('tipsMessage.business.importAccountPrivateKey'),
            className: 'toast-style',
          })
        return false
      } else if (res.code == 105) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[6]'),
            className: 'toast-style',
          })
        return false
      } else if (res.code == 402) {
        return false
      } else {
        if (res.message.indexOf('Parameter is missing') > -1) {
          
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[101]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("world view name can't start whith a digit")>-1) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.creatWorldView[3]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("Please login first")>-1) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[114]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf('Insufficient Balance') > -1) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common.InsufficientBalance'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf('You\'re not a nh asset creator')>-1) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.creatWorldView[2]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("world view name can't start whith a digit")>-1) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.creatWorldView[3]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("Most likely a uniqueness constraint is violated")>-1) {
          
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.creatWorldView[0]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("missing required owner authority")>-1) {
          
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.creatWorldView[0]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("locked->value >= 0")>-1) {
          
          Toast({
            duration: 2000,
            message: _this.$t('tipsMessage.business.lockedGreaterThanValue'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("No reward available")>-1) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[7]'),
            className: 'toast-style',
          })
        } else if (res.message.indexOf("Wrong password")>-1) {
          Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[6]'),
            className: 'toast-style',
          })
        } else {
            Toast({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[4]'),
            className: 'toast-style',
          })
        }
      }
      
      return false
    },
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  width: 100%;
  height: 100%;
}
.search-bar {
  width: 100%;
  height: 0.64rem;
  background: #fff;
  padding-top: 0.14rem;
}
.search-main {
  width: 3.35rem;
  height: 0.36rem;
  background: rgba(237, 238, 242, 1);
  border-radius: 0.18rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-main .search-btn {
  height: 0.25rem;
  width: 0.25rem;
  background: url("../assets/images/magnifier-mobile.png") no-repeat center
    center;
  background-size: 60% 60%;
  margin-left: 0.08rem;
}
.search-main .search-input {
  width: 3rem;
  height: 0.34rem;
  font-size: 0.14rem;
  font-weight: 400;
  color: rgba(165, 169, 177, 1);
  border: none;
  padding: 0;
  background: none;
  text-indent: 0.08rem;
}

.change-btn {
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.change-btn a {
  width: 50%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.16rem;
  font-weight: 300;
  color: rgba(98, 102, 112, 1);
  text-align: center;
}
.change-btn a.active {
  color: rgba(38, 42, 51, 1);
  background: rgba(236, 238, 255, 1) url("../assets/images/change-bg.png") no-repeat bottom center;
}

.node-lists {
  margin-top: 0.12rem;
  background: #fff;
  height: calc( 100% - 1.26rem);
}
.node-lists .node-main {
  height: 100%;
  margin-left: 0.2rem;
  overflow-y: auto;
}
.node-lists .node-main .node {
  width: 100%;
  height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(232, 235, 241, 1);
}
.node-lists .node-main .node .node-icon {
  width: 0.44rem;
  height: 0.44rem;
}
.node-lists .node-main .node .node-message {
  width: 2.58rem;
  margin-left: 0.16rem;
}
.node-lists .node-main .node .node-message .name {
  width: 100%;
  height: 0.22rem;
  line-height: 0.22rem;
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(38, 42, 51, 1);
}
.node-lists .node-main .node .node-message .author {
  width: 100%;
  height: 0.12rem;
  line-height: 0.12rem;
  font-size: 0.12rem;
  font-weight: 500;
  color: rgba(38, 42, 51, 1);
}
.node-lists .node-main .node .node-message .spec {
  width: 100%;
  height: 0.14rem;
  line-height: 0.14rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.node-lists .node-main .node .node-message .spec p {
  height: 0.14rem;
  line-height: 0.14rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 0.3rem;
}
.node-lists .node-main .node .node-message .spec p img {
  width: 0.08rem;
  height: 0.07rem;
  margin-right: 0.05rem;
}
.node-lists .node-main .node .node-message .spec .ranking {
  height: 0.14rem;
  line-height: 0.14rem;
  padding-left: 0.14rem;
  background: url("../assets/images/ranking-mobile.png") no-repeat center center;
  background-size: 0.08rem;
}
.node-lists .node-main .node .node-message .spec .percentage {
  height: 0.14rem;
  line-height: 0.14rem;
  padding-left: 0.14rem;
  background: url("../assets/images/percentage-mobile.png") no-repeat center
    center;
  background-size: 0.08rem;
}
.node-lists .node-main .node .node-message .spec .pos {
  height: 0.14rem;
  line-height: 0.14rem;
  padding-left: 0.14rem;
  background: url("../assets/images/pos-mobile.png") no-repeat center center;
  background-size: 0.08rem;
}
.node-lists .node-main .node .node-choice-btn {
  width: 0.22rem;
  height: 0.22rem;
  border: 1px solid #d5d5d5;
  border-radius: 50%;
}
.node-lists .node-main .node .node-choice-btn img {
  width: 100%;
  height: 100%;
}

.bottom-btn-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 200;
}
.bottom-btn-bar div {
  width: 50%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
}
.bottom-btn-bar div:nth-child(1) {
  background: #fff;
  font-size: 0.16rem;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.bottom-btn-bar div:nth-child(2) {
  background: rgba(93, 132, 245, 1);
  font-size: 0.16rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 500;
}
.voted-list-container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3.3rem;
  background: #fff;
  border-radius: 0.15rem 0.15rem 0 0;
  transition: all 0.5s;
}
.voted-list-container .vote-btn-bar{
  width: 100%;
  height: 0.7rem;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(232, 235, 241, 1);
}
.voted-list-container .vote-btn-bar .vote-btn{
  width: 1.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  display: block;
  background: #5D84F5;
  color: #fff;
  font-size: 0.14rem;
  text-align: center;
  border-radius: 0.04rem;

}
.voted-list-container .drop-btn {
  width: 100%;
  height: 0.42rem;
  line-height: 0.42rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.voted-list-container .drop-btn img {
  width: 0.3rem;
  height: 0.12rem;
}
.voted-list-container .already-voted-list-container {
    width: 100%;
    height: 2.18rem;
    overflow-y: auto;
}
.voted-list-container .already-voted-list-container .already-voted-list {
  width: 3.45rem;
  margin: 0 auto;
}
.voted-list-container .already-voted-list-container .already-voted-list li {
  width: 100%;
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.voted-list-container .already-voted-list li .info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.voted-list-container .already-voted-list li .info img {
  width: 0.36rem;
  height: 0.36rem;
  /* border: 1px solid rgba(210, 214, 222, 1); */
}
.voted-list-container .already-voted-list li .info span {
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(38, 42, 51, 1);
  margin-left: 0.08rem;
}
.voted-list-container .already-voted-list li .node-choice-btn {
  width: 0.22rem;
  height: 0.22rem;
  border: 1px solid #d5d5d5;
  border-radius: 50%;
}
.voted-list-container .already-voted-list li .node-choice-btn img {
  width: 100%;
  height: 100%;
}

.blank55{
    width: 100%;
    height: 0.8rem;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  background:rgba(38,42,51,0.4);
  width: 100%;
  height: 100%;
  z-index: 200;
}
.vote-Popup {
  position: fixed;
  top: 50%;
  left: 50%;
  background:rgba(38,42,51,0.4);
  width: 3.05rem;
  height: 2.1rem;
  z-index: 300;
  background:rgba(255,255,255,1);
  border-radius: 0.12rem;
  margin-left: -1.52rem;
  margin-top: -1.05rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.vote-Popup .title{
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

}
.vote-Popup .title .tab-btn{
  width: 50%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;

}
.vote-Popup .title .tab-btn a{
  height: 0.31rem;
  line-height: 0.24rem;
  font-size: 0.16rem;
  font-weight:500;
  color:rgba(38,42,51,1);
  padding-bottom: 0.07rem;
}
.vote-Popup .title .tab-btn a.active{
  padding-bottom: 0.05rem;
  background: none;
  border-bottom: 2px solid rgba(38,42,51,1);
}
.vote-Popup .blance-bar{
  width: 100%;
  margin-top: 0.23rem;
  height: 0.18rem;
  line-height: 0.18rem;
  font-size: 0.12rem;
  font-weight:400;
  color:rgba(165,169,177,1);
  text-align: left;
}
.vote-Popup .num-input{
  width: 100%;
  height: 0.44rem;
  background:rgba(246,248,251,1);
  border-radius: 0.04rem;
  margin-top: 0.03rem;
  font-size: 0.12rem;
  color:rgba(165,169,177,1);
  text-indent: 0.14rem;
}
.vote-Popup .confirm-btn-bar{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.44rem;
  line-height: 0.44rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(232,235,241,1);
}
.vote-Popup .confirm-btn-bar .btn{
  width: 50%;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.16rem;
}
.vote-Popup .confirm-btn-bar .btn.confirm{
  color:rgba(245,97,81,1);
}
.vote-Popup .confirm-btn-bar .btn.cancel{
  color:rgba(72,104,220,1);
}
.show-more{
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.18rem;
  text-align: center;
  color: #333;
}
.bottom-btn-bar div.disable{
  background: rgba(165,169,177,1);
}
.routerQuestionnaire{
  display: block;
  width: 100%;
  height: 0.38rem;
  line-height: 0.38rem;
  text-align: center;
  position: relative;
  background:rgba(255,154,0,0.2);
}
.routerQuestionnaire a{
  font-size: 0.14rem;
color:rgba(255,152,0,1);
  
}
.routerQuestionnaire .close{
  height: 0.15rem;
  width: 0.15rem;
  line-height: 0.15rem;
  color: #333;
  position: absolute;
  right: 0.2rem;
  top: 50%;
  margin-top: -0.07rem;
  display: block;
}
</style>

