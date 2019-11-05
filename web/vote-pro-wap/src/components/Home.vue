<template>
  <div class="home">
    <div class="search-bar">
      <div class="search-main">
        <a href="javascript:void(0);" class="search-btn" @click="searchBtn()"></a>
        <input type="text" class="search-input" v-model="searchAccountName" />
      </div>
    </div>

    <div class="change-btn">
      <a href="javascript:void(0);" :class="{active: isWitnesses}" @click="changeTpye(true)">超级节点</a>
      <a href="javascript:void(0);" :class="{active: !isWitnesses}" @click="changeTpye(false)">理事会</a>
    </div>

    <div class="node-lists">
      <div class="node-main">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多" bottomDropText="释放加载更多" bottomLoadingText="加载更多" ref="loadmore">
        <div class="node" v-for="(li, index) in tableList" :key="index">
          <img :src="li.logo" v-if="li.logo" class="node-icon" alt />
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

          </mt-loadmore>
        <div class="blank55"></div>
      </div>
    </div>

    <div class="bottom-btn-bar">
      <div @click="showDropDom()">已投节点：{{isWitnesses?Object.keys(myVotesWitnesses).length:Object.keys(myVotesCommittee).length}}</div>
      <div @click="vote()">投票</div>
    </div>
    <div class="mask" v-if="isMask">
      <div class="already-voted-list-container" ref="hideDropDom">
        <p class="drop-btn" @click="hidedrop()" :style="{bottom: dropbtnbottom}">
          <img src="../assets/images/drop.png" alt />
        </p>

        <div class="already-voted-list-container">

            <ul class="already-voted-list" v-if="isWitnesses">
                <li v-for="(li, key) in myVotesWitnesses" :key="key">
                    <p class="info">
                    <img :src="li.logo" v-if="li.logo" class="node-icon" alt />
                    <span>{{li.name}}</span>
                    </p>

                    <a href="javascript:void(0);" @click="handleClose(key, 'witnesses')" class="node-choice-btn">
                    <img src="../assets/images/choice.png" alt />
                    </a>
                </li>
            </ul>

            <ul class="already-voted-list" v-if="!isWitnesses">
                <li v-for="(li, key) in myVotesCommittee" :key="key">
                    <p class="info">
                    <img :src="li.logo" v-if="li.logo" class="node-icon" alt />
                    <span>{{li.name}}</span>
                    </p>

                    <a href="javascript:void(0);" @click="handleClose(key, 'committee')" class="node-choice-btn">
                    <img src="../assets/images/remove.png" alt />
                    </a>
                </li>
            </ul>
                
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import {
  queryVotes,
  lookupBlockRewardsById,
  queryAccountInfo,
  queryDataByIds,
  publishVotes,
  passwordLogin
} from "../../libs/bcx.api";
import { cacheSession, cacheKey } from '../../libs/Utils'
// import { Message } from 'element-ui';
import { Indicator } from 'mint-ui';

export default {
  data() {
    return {
      dropbtnbottom: "0",
      isMask: false,
      
      dynamicTags: ["标签一", "标签二", "标签三"],
      checked: true,
      count: 0,
      currentPage: 1,

      isWitnesses: true,

      // page: 1,
      pageSize: 4,
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
      isShowLogin: false,

      isLogin: false,
      currentLoginAccount: ''
    };
  },
  watch: {
  },
  mounted() {
    if (cacheSession.get(cacheKey.accountName)) {
      // this.isLogin = true
      this.currentLoginAccount = cacheSession.get(cacheKey.accountName)
    }
    this.queryVotesAjax();
  },
  methods: {
      showDropDom(){
          this.isMask = true
        // if (this.isWitnesses) {
        // } else {
        // }
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
        //   Message({
        //     duration: 2000,
        //     message: "登录成功",
        //     type: "success"
        //   });
          cacheSession.set(cacheKey.accountName, res.data.account_name);
          this.currentLoginAccount = res.data.account_name;
        } else {
        //   Message({
        //     duration: 2000,
        //     message: "登录失败",
        //     type: "error"
        //   });
          return false;
        }
      });
    },

    searchBtn() {
      let _this = this;
      let searchResult = this.tableList.filter(stu => {
        return stu.account_name == _this.searchAccountName;
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
    vote() {
      let _this = this;
      let params = {};
      if (this.isWitnesses) {
        params.witnessesIds;
        params.witnessesIds = [];
        for (const key in this.myVotesWitnesses) {
          params.witnessesIds.push(key);
        }
      } else {
        params.committee_ids = [];
        for (const key in this.myVotesCommittee) {
          params.committee_ids.push(key);
        }
      }

      publishVotes(params).then(res => {
        if (res.code == 1) {
          alert('success vote')
        } else {
          alert('error vote')
        }

        _this.queryVotesAjax();
      });
    },
    changeTpye(val) {
      
      if (val == this.isWitnesses) return false
      let _this = this;
      this.isWitnesses = val;
      this.currentPage = 1;
      this.votesTotal = 0
      this.lookupBlock = [];
      this.tableList = [];
      
      this.queryVotesAjax();
    },

    // 个人投票情况
    queryAccountInfoAjax() {
      let _this = this;
      queryAccountInfo().then(res => {
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
      });
    },

    witnessesAjax: function(formData) {
      let _this = this;
      //   var formData = new FormData();
      //   formData.append("picture", files);
      // lang=en/zh-CN
      let resUrl = "http://vote.test.cjfan.net/api/api/v1/witnesses";
      if (this.isWitnesses) {
        resUrl = "http://vote.test.cjfan.net/api/api/v1/witnesses";
      } else {
        resUrl = "http://vote.test.cjfan.net/api/api/v1/committee";
      }
      this.$axios
        .post(resUrl, formData)
        .then(function(response) {
          _this.tableList = [];
          _this.tableList = response.data.result;
          
          _this.lookupBlock = new Array(response.data.result.length);
          if (_this.votesTotal == 0) {
            
            for (let i = 0; i < _this.tableList.length; i++) {
              _this.tableList[i].voteRate = "0%"
              // _this.lookupBlockRewardsByIdAjax(_this.tableList[i].account_id, i);
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
            }
            
            _this.$nextTick(function () {
              _this.$refs.loadmore.onBottomLoaded();
            })
            
          }
          _this.queryAccountInfoAjax();
          
        })
        .catch(function(error) {
          console.log("error");
          console.log(error);
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
        function sortId(a, b) {
          return b.votes - a.votes;
        }
        res.data.sort(sortId);
        _this.count = res.data.length;
        // _this.queryVotesList = [];
        _this.votesTotal = 0;
        for (let i = 0; i < res.data.length; i++) {
          _this.votesTotal += Number(res.data[i].votes);
          res.data[i].supporters
            ? (res.data[i].supporters_count = res.data[i].supporters.length)
            : (res.data[i].supporters_count = 0);
          res.data[i].ranking = i + 1;
        }
        // _this.queryVotesList = res.data;
        // let requestQueryVotesList = res.data.slice(
        //   Number(_this.currentPage - 1) * Number(_this.pageSize),
        //   Number(_this.currentPage) * Number(_this.pageSize)
        // );
        

        let currentPageSize = _this.currentPage * _this.pageSize
        if (currentPageSize > res.data.length) {
          currentPageSize = res.data.length
          if (_this.currentPage > 0) {
            _this.currentPage--
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
      this.queryVotesAjax();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom(){
      this.currentPage++
      this.queryVotesAjax();
    }
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
  font-size: 16px;
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
  height: 0.14px;
  line-height: 0.14px;
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
  height: 0.14px;
  line-height: 0.14px;
  padding-left: 0.14rem;
  background: url("../assets/images/ranking-mobile.png") no-repeat center center;
  background-size: 0.08rem;
}
.node-lists .node-main .node .node-message .spec .percentage {
  height: 0.14px;
  line-height: 0.14px;
  padding-left: 0.14rem;
  background: url("../assets/images/percentage-mobile.png") no-repeat center
    center;
  background-size: 0.08rem;
}
.node-lists .node-main .node .node-message .spec .pos {
  height: 0.14px;
  line-height: 0.14px;
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
  left: 0px;
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
.already-voted-list-container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.6rem;
  background: #fff;
  border-radius: 0.15rem 0.15rem 0 0;
  transition: all 0.5s;
}
.already-voted-list-container .drop-btn {
  width: 100%;
  height: 0.42rem;
  line-height: 0.42rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.already-voted-list-container .drop-btn img {
  width: 0.3rem;
  height: 0.12rem;
}
.already-voted-list-container .already-voted-list-container {
    width: 100%;
    height: 2.18rem;
    overflow-y: auto;
}
.already-voted-list-container .already-voted-list-container .already-voted-list {
  width: 3.45rem;
  margin: 0 auto;
}
.already-voted-list-container .already-voted-list-container .already-voted-list li {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.already-voted-list-container .already-voted-list li .info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.already-voted-list-container .already-voted-list li .info img {
  width: 0.36rem;
  height: 0.36rem;
  border: 1px solid rgba(210, 214, 222, 1);
}
.already-voted-list-container .already-voted-list li .info span {
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(38, 42, 51, 1);
  margin-left: 0.08rem;
}
.already-voted-list-container .already-voted-list li .node-choice-btn {
  width: 0.22rem;
  height: 0.22rem;
  border: 1px solid #d5d5d5;
  border-radius: 50%;
}
.already-voted-list-container .already-voted-list li .node-choice-btn img {
  width: 100%;
  height: 100%;
}

.blank55{
    width: 100%;
    height: 0.8rem;
}
</style>

