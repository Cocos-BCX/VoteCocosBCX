<template>
  <div class="center-container">
    <div class="login-bar" v-if="isBrowserConnect">
      <div class="install-tips" v-if="!isBrowserConnect">

        请确认您已安装
        <a 
          href="https://chrome.google.com/webstore/detail/cocospay/ffbhaeoepdfapfjhcihbbhlaigejfack?utm_source=chrome-ntp-icon"
          target="_blank"
        >CocosPay</a>
      </div>
      <p class="currentLoginAccount" v-if="myAccount">
        <label>hi~ {{myAccount}}</label>
      </p>
    </div>

    <div class="node-container">
      <div class="title">
        <img src="../assets/images/node-title-icon.png" alt />
        <span>{{$t('nodeContainer.voteForNode')}}</span>
      </div>

      <div class="tag-container">
        <p
          class="selected-node-title"
          v-show="isWitnesses"  
        >{{$t('nodeContainer.selectedNode')}}（{{Object.keys(myVotesWitnesses).length}}/11）</p>
        <div class="node-container-tag" v-show="isWitnesses">
          <el-tag
            class="tag"
            :key="key"
            closable
            v-for="(tag, key) in myVotesWitnesses"
            :disable-transitions="false"
            type="info"
            size="small"
            @close="handleClose(key, 'witnesses')"
          >{{tag}}</el-tag>
        </div>
        <p
          class="selected-node-title"
          v-show="!isWitnesses"
        >{{$t('nodeContainer.selectedNode')}}（{{Object.keys(myVotesCommittee).length}}/11）</p>
        <div class="node-container-tag" v-show="!isWitnesses">
          <el-tag
            class="tag"
            :key="key"
            closable
            v-for="(tag, key) in myVotesCommittee"
            :disable-transitions="false"
            type="info"
            size="small"
            @close="handleClose(key, 'committee')"
          >{{tag}}</el-tag>
        </div>
      </div>
      <div class="tag-container">
        <div class="vote-operation-container">
          <p class="head">{{$t('common.numberVotesCast')}}</p>
          <input type="text" class="input-vote-num" v-model="votesNum">
          <input type="button" class="btn-vote-num-max" @click="addBlance()" :value="$t('common.max')">
          <p class="head">{{$t('common.remainingAvailableVotes')}}</p>
          <p class="vote-num">{{availableVotes}} COCOS</p>
        </div>
      </div>
      <div class="vote-btn-bar">

        <a href="javascript:void(0);"  @click="vote()">{{$t('common.vote')}}</a>
        <!-- <a href="javascript:void(0);"  @click="showVoteBtn(false)">投票</a> -->
        <!-- <a href="javascript:void(0);" @click="showVoteBtn(true)">撤票</a> -->
      </div>
    </div>

    <div class="tab-table-container">
      <div class="table-change-bar">
        <a
          href="javascript:void(0);"
          class="change-btn"
          :class="{active: isWitnesses}"
          @click="changeTpye(true)"
        >
          <img src="../assets/images/super-node-change.png" alt />
          <span>{{$t('tabTableContainer.superNode')}}</span>
        </a>
        <a
          href="javascript:void(0);"
          class="change-btn"
          :class="{active: !isWitnesses}"
          @click="changeTpye(false)"
        >
          <img src="../assets/images/council-change.png" alt />
          <span>{{$t('tabTableContainer.council')}}</span>
        </a>
      </div>

      <div class="table-container">
        <div class="search-bar">
          <ul class="screen">
            <p>Top 11</p>
            <p>Standby</p>
            <p>{{$t('common.total')}}：{{count}}个</p>
          </ul>
          <div class="search-input">
            <input type="text" :placeholder="$t('tipsMessage.business.pleaseEnterNode')" @keyup="searchKeyboard($event)" v-model="searchAccountName" />
            <a href="javascript:void(0);" class="search-btn" @click="searchBtn()"></a>
          </div>
        </div>
        <div class="empty-table" v-if="tableList.length == 0">
          {{$t('tipsMessage.business.noData')}}
        </div>
        <table class="table-main" border="0" cellpadding="0" cellspacing="0" v-if="tableList.length != 0">
          <tr>
            <td>{{$t('common.vote')}}</td>
            <td>{{$t('tabTableContainer.ranking')}}</td>
            <td>{{$t('tabTableContainer.name')}}</td>
            <td>{{$t('tabTableContainer.country')}}</td>
            <td>{{$t('tabTableContainer.voteRate')}}</td>
            <td>{{$t('tabTableContainer.numberVotingAccounts')}}</td>
            <td v-if="isWitnesses">{{$t('tabTableContainer.blockNum')}}</td>
            <td>{{$t('tabTableContainer.awardsClaimed')}}</td>
          </tr>
          <!-- <tr>
            <td>
              <el-checkbox v-model="checked"></el-checkbox>
            </td>
            <td>1</td>
            <td>
              <div class="name">
                <img src="../assets/images/test-table-icon.png" alt />
                <span>eoshuobipool</span>
              </div>
            </td>
            <td>China</td>
            <td>2.883%</td>
            <td>11,119</td>
            <td>522,169</td>
            <td>890.8067</td>
          </tr>-->
          <tr v-for="(li, index) in tableList" :key="index">
            <td>
              
              <a href="javascript:void(0);" @click="checkboxChangeEvents(li, index)" class="node-choice-btn">
                <img v-if="li.supported" src="../assets/images/choice.png" alt />
              </a>
              <!-- <el-checkbox @change="checkboxChangeEvents(li, index)" :checked="li.supported"></el-checkbox> -->
            </td>
            <td>
              <p class="ranking" :class="li.ranking>11?'standby':'top'">{{li.ranking}}</p>
            </td>
            <td>
              <div class="name">
                <!-- <img src="../assets/images/test-table-icon.png" alt /> -->
                <img :src="li.logo" v-if="li.logo" alt />
                <span>{{li.account_name}}</span>
              </div>
            </td>
            <td>{{li.country}}</td>
            <!-- <td>2.883%</td> -->
            <td>{{li.voteRate}}</td>
            <!-- <td>11,119</td> -->
            <td>{{li.supporters_count}}</td>
            <!-- <td>522,169</td> -->
            <td v-if="isWitnesses">{{li.generated_block_num}}</td>
            <td>{{lookupBlock[index]}}</td>
          </tr>
        </table>

        <div class="paging-bar" v-if="count">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="count"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- <div class="mask" v-if="isMask" @click.stop="hideLogin()">
      
    </div> -->
      <!-- <div class="vote-Popup" v-if="isShowVotePopup">
        <div class="title" v-if="!isWithdrawalTickets">投票</div>
        <div class="vote-Popup-option">
          <ul class="head">候选节点</ul>
          <ul class="content">
            <div class="node-container-tag" v-show="isWitnesses">
              <el-tag
                class="tag"
                :key="key"
                closable
                v-for="(tag, key) in myVotesWitnesses"
                :disable-transitions="false"
                type="info"
                size="small"
                @close="handleClose(key, 'witnesses')"
              >{{tag}}</el-tag>
            </div>
            <div class="node-container-tag" v-show="!isWitnesses">
              <el-tag
                class="tag"
                :key="key"
                closable
                v-for="(tag, key) in myVotesCommittee"
                :disable-transitions="false"
                type="info"
                size="small"
                @close="handleClose(key, 'committee')"
              >{{tag}}</el-tag>
            </div>
          </ul>
        </div>
        <div class="vote-Popup-option">
          <ul class="head" v-if="!isWithdrawalTickets">可投票数</ul>
          <ul class="head" v-if="isWithdrawalTickets">撤回票数</ul>
          <input type="text" class="content vote-Popup-option-input" v-model="votesNum">
        </div>
        <div class="vote-Popup-option" v-if="!isWithdrawalTickets">
          <ul class="head">余额</ul>
          <ul class="content">
            <p class="vote-Popup-option-blance">
              <a href="javascript:void(0);" @click="fullBlance()">{{myCOCOS || 0}} COCOS </a>
            </p>
          </ul>
        </div>
        <div class="vote-Popup-option" v-if="isWithdrawalTickets">
          <ul class="head">已投票数</ul>
          <ul class="content">
            <p class="vote-Popup-option-blance">
              <a href="javascript:void(0);" @click="fullBlance()">{{numberVotesCast || 0}} COCOS </a>
            </p>
          </ul>
        </div>
        <div class="btn-bar">
          <a href="javascript:void(0);" @click="hideLogin()">取消</a>
          <a href="javascript:void(0);" v-if="!isWithdrawalTickets" @click="vote()">投票</a>
          <a href="javascript:void(0);" v-if="isWithdrawalTickets" @click="vote()">撤票</a>
          
        </div>
      </div> -->
  </div>
</template>


<script>
import {
  browserConnect,
  getAccountInfo,
  queryVotes,
  queryVestingBalance,
  queryAccountInfo,
  queryDataByIds,
  publishVotes,
  logout,
  queryAccountBalances
} from "../../libs/bcx.api";
import { cacheSession, cacheKey, handleCOCOS } from '../../libs/Utils'
import { IntReg } from '../../libs/regular'
import { Message } from 'element-ui';
export default {
  data() {
    return {
      isBrowserConnect: true,
      myAccount: '',
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

      myVotesWitnesses: {},
      myVotesCommittee: {},

      // login
      account: '',
      isMask: false,
      isShowVotePopup: false,

      isLogin: false,
      currentLoginAccount: '',

      myCOCOS: '',
      numberVotesCast: '',
      votesNum: '',
      votesNumRegular: '',
      availableVotes: '',
      isAddAvailableVotes: false,
      haveVotedNum: 0,
      // haveVotedCommitteeNum: '',
      // haveVotedWitnessNum: '',

      isWithdrawalTickets: true
    };
  },
  watch: {
    
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
      let _this = this;
    // if (cacheSession.get(cacheKey.accountName)) {
    //   // this.isLogin = true
    //   this.currentLoginAccount = cacheSession.get(cacheKey.accountName)
    // }
    _this.browserConnectAjax()
    _this.getAccountInfoAjax()

    _this.queryVotesAjax();
    _this.queryAccountInfoAjax();
  },
  methods: {
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
      this.queryAccountInfoAjax();
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
    queryAccountInfoAjax() {
          console.log('**********************queryAccountInfoAjax-------res--------')
      let _this = this;
      queryAccountInfo().then(res => {
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
      let resUrl = "http://vote.test.cjfan.net/api/api/v1/witnesses?lang=" + lang;
      if (this.isWitnesses) {
        resUrl = "http://vote.test.cjfan.net/api/api/v1/witnesses?lang=" + lang;
      } else {
        resUrl = "http://vote.test.cjfan.net/api/api/v1/committee?lang=" + lang;
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
                message: _this.$t('interFaceMessage.publishVotes[1]'),
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



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-bar {
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(230, 230, 230, 1);
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  margin-top: 12px;
}
.install-tips {
  height: 64px;
  line-height: 64px;
  margin-left: 30px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.install-tips a {
  font-size: 14px;
  color: #2140fc;
}
.install-tips span:nth-child(1) {
  font-size: 14px;
  color: #2140fc;
}
.install-tips span:nth-child(2) {
  font-size: 14px;
  color: #1c34ff;
}
.login-btn {
  width: 86px;
  height: 34px;
  background: linear-gradient(
    112deg,
    rgba(100, 103, 207, 1) 0%,
    rgba(72, 107, 224, 1) 100%
  );
  border-radius: 4px;
  filter: blur(0px);
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
}
.login-btn span {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-left: 7px;
}
.node-container {
  margin-top: 12px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(230, 230, 230, 1);
  /* padding-left: 30px;
    padding-right: 25px;  */
  padding-bottom: 20px;
  background: #fff;
}
.node-container .title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 18px;
  padding-left: 30px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
}
.node-container .title span {
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 10px;
}
.tag-container {
  padding-left: 30px;
  padding-right: 25px;
}
.vote-operation-container{
  width: 100%;
  height: 26px;
  line-height: 26px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.vote-operation-container .head{
  width: auto;
  height: 26px;
  line-height: 26px;
  margin-right: 12px;
  font-size:18px;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.vote-operation-container .input-vote-num {
  width:115px;
  text-indent: 12px;
  height:26px;
  line-height: 26px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(225,222,222,1);
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  margin-right: 12px;
}
.vote-operation-container .btn-vote-num-max {
  width:48px;
  height:26px;
  line-height: 26px;
  background:linear-gradient(112deg,rgba(100,103,207,1) 0%,rgba(72,107,224,1) 100%);
  border-radius:4px;
  filter:blur(0px);
  font-size:12px;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-align: center;
  margin-right: 80px;
  border: none;
}
.vote-operation-container .vote-num {
  height:26px;
  line-height: 26px;
  font-size:20px;
  font-weight:bold;
  color:rgba(86,105,215,1);
}



.node-container-tag {
  width: 100%;
  margin-top: 10px;
}
.node-container-tag .tag {
  margin-right: 10px;
  border-radius: 14px;
}

.selected-node-title {
  margin-top: 30px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.vote-btn-bar {
  margin-top: 20px;
  height: 44px;
  line-height: 44px;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  display: block;
  position: relative;
  text-align: center;
}
.vote-btn-bar a{
  width: 130px;
  height: 44px;
  line-height: 44px;
  display: inline-block;
  font-size: 14px;
}

.vote-btn-bar a:nth-child(1){
  margin-left: 68px;
  background: #3E9AFF;
  color: #fff;
}
.vote-btn-bar a:nth-child(2){
  border: 1px solid #3E9AFF;
  color: #3E9AFF;
}

/* 表格容器 */
.tab-table-container {
  width: 100%;
  margin-top: 12px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(230, 230, 230, 1);
}
.tab-table-container .table-change-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(234, 235, 235, 1);
}
.tab-table-container .table-change-bar .change-btn {
  width: 180px;
  height: 60px;
  line-height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px 4px 0px 0px;
  border-right: 1px solid rgba(234, 235, 235, 1);
  filter: blur(0px);
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.tab-table-container .table-change-bar .change-btn:hover {
  background: rgba(236, 238, 255, 1);
}
.tab-table-container .table-change-bar .change-btn.active {
  background: rgba(236, 238, 255, 1);
}
.tab-table-container .table-change-bar .change-btn span {
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 10px;
}
.table-container {
  padding-left: 30px;
  padding-right: 30px;
}
.search-bar {
  width: 100%;
  height: 70px;
  line-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-bar .screen {
  margin-left: 10px;
}
.search-bar .search-input {
  width: 262px;
  height: 40px;
  line-height: 40px;
  border-radius: 2px;
  border: 1px solid rgba(225, 222, 222, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-bar .search-input input {
  width: 212px;
  height: 36px;
  line-height: 36px;
  border: none;
  text-indent: 20px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(140, 148, 176, 1);
}
.search-bar .search-input .search-btn {
  width: 50px;
  height: 38px;
  line-height: 38px;
  background: url("../assets/images/magnifier.png") no-repeat 10px center;
}
.search-bar .screen p {
  margin-right: 24px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  position: relative;
  display: inline-block;
}
.search-bar .screen p:nth-child(1)::before {
  content: "";
  width: 6px;
  height: 6px;
  display: block;
  background: rgba(121, 215, 176, 1);
  border-radius: 50%;
  position: absolute;
  top: 45%;
  left: -15px;
}
.search-bar .screen p:nth-child(2)::before {
  content: "";
  width: 6px;
  height: 6px;
  display: block;
  background: rgba(255, 184, 84, 1);
  border-radius: 50%;
  position: absolute;
  top: 45%;
  left: -15px;
}
table.table-main {
  width: 100%;
  border-top: 1px solid rgba(226, 226, 226, 1);
  border-left: 1px solid rgba(226, 226, 226, 1);
  border-right: 1px solid rgba(226, 226, 226, 1);
}
table.table-main tr:nth-child(1) td {
  background: rgba(250, 250, 250, 1);
}
table.table-main tr td {
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(140, 148, 176, 1);
  text-align: center;
  border-bottom: 1px solid rgba(226, 226, 226, 1);
  position: relative;
}
table.table-main tr td p.ranking {
  width: 34px;
  height: 25px;
  line-height: 25px;
  background: rgba(236, 249, 243, 1);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -17px;
  margin-top: -12px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(68, 200, 145, 1);
  text-align: center;
}
table.table-main tr td p.ranking.top{
  color: rgba(121,215,176,1);
}
table.table-main tr td p.ranking.standby{
  color: rgba(255,184,84,1);
}
table.table-main tr td a.node-choice-btn {
  width:18px;
  height:18px;
  line-height: 14px;
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -7px;
  margin-top: -7px;
  display: block;
  border: 1px solid #ccc;
}
table.table-main tr td a.node-choice-btn img{
  width:18px;
  height:18px;
}
table.table-main tr td:nth-child(3) {
  text-align: left;
  text-indent: 10px;
}
table.table-main tr td div.name {
  height: 56px;
  line-height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
}
table.table-main tr td div.name span {
  margin-left: 16px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(89, 104, 213, 1);
}

.paging-bar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
}


/* 遮罩 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
.currentLoginAccount{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 30px;
  float: right;
  height: 64px;
  line-height: 64px;
}
.currentLoginAccount label{
  color: rgba(100, 103, 207, 1);
  font-size: 16px;
}
.vote-Popup{
  width:660px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 20px 0px rgba(162,162,166,1);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -272px;
  margin-left: -330px;
  background: #fff;
  border-radius: 4px;
  z-index: 1100;
  padding-left: 46px;
  padding-right: 46px;
}
.vote-Popup .title{
  width: 100%;
  height: 101px;
  line-height: 101px;
  font-size:24px;
  font-weight:400;
  color:rgba(51,51,51,1);
  text-align: center;
}
.vote-Popup-option{
  display: flex;
  margin-top: 15px;
}
.vote-Popup-option .head{
  width: 15%;
  height: 44px;
  line-height: 44px;
  font-size:16px;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.vote-Popup-option .content{
  width: 85%;
  background:rgba(255,255,255,1);
  border-radius:4px;
  position: relative;
  display: flex;
}
.vote-Popup-option .vote-Popup-option-input{
  width: 100%;
  height: 44px;
  line-height: 44px;
  border: none;
  border:1px solid rgba(207,207,207,1);
  text-indent: 0.5rem;
  font-size: 14px;
}
.vote-Popup-option .content .vote-Popup-option-blance{
  width: 167px;
  height: 44px;
  line-height: 44px;
  font-weight:400;
}
.vote-Popup-option .content .vote-Popup-option-blance a{
  margin-left: 12px;
  color:rgba(62,154,255,1);
  font-size:14px;
}
.vote-Popup .btn-bar{
  width: 100%;
  height: 116px;
  line-height: 40px;
  padding-top: 40px;
  padding-bottom: 36px;
  position: relative;
  text-align: center;
}
.vote-Popup .btn-bar a{
  width: 116px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  font-size:16px;
  font-weight:600;
  color:rgba(255,255,255,1);
}
.vote-Popup .btn-bar a:nth-child(1){
  border: 1px solid #3E9AFF;
  color: #3E9AFF;
}
.vote-Popup .btn-bar a:nth-child(2){
  margin-left: 68px;
  background: #3E9AFF;
  color: #fff;
}
.empty-table{
  width: 100%;
  font-size: 24px;
  text-align: center;
  padding-top: 60px;
  padding-bottom: 60px;
  color: rgba(140, 148, 176, 1);
}
</style>

