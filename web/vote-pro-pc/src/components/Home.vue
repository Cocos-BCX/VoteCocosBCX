<template>
  <div class="center-container">
    <div class="login-bar">
      <p class="install-tips">
        请确认您已安装
        <a
          href="https://chrome.google.com/webstore/detail/cocospay/ffbhaeoepdfapfjhcihbbhlaigejfack?utm_source=chrome-ntp-icon"
          target="_blank"
        >CocosPay</a>
        <!-- <span>CocosPay</span> -->

        <!-- /<span>MathWallet</span> -->
      </p>

      <a v-if="!currentLoginAccount" href="javascript:void(0);" class="login-btn" @click="showLogin()">
        <img src="../assets/images/login-user.png" alt />
        <span>登录</span>
      </a>
      <p class="currentLoginAccount" v-if="currentLoginAccount">
        <label>hi~ {{currentLoginAccount}}</label>
        <a href="javascript:void(0);" class="login-btn" @click="logout()">
          <img src="../assets/images/login-user.png" alt />
          <span>退出登录</span>
        </a>
      </p>
    </div>

    <div class="node-container">
      <div class="title">
        <img src="../assets/images/node-title-icon.png" alt />
        <span>投票给节点</span>
      </div>

      <div class="tag-container">
        <p
          class="selected-node-title"
          v-show="isWitnesses"  
        >已选节点（{{Object.keys(myVotesWitnesses).length}}/11）</p>
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
        >已选节点（{{Object.keys(myVotesCommittee).length}}/11）</p>
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

      <a href="javascript:void(0);" class="vote-btn-bar" @click="vote()">投票</a>
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
          <span>超级节点</span>
        </a>
        <a
          href="javascript:void(0);"
          class="change-btn"
          :class="{active: !isWitnesses}"
          @click="changeTpye(false)"
        >
          <img src="../assets/images/council-change.png" alt />
          <span>理事会</span>
        </a>
      </div>

      <div class="table-container">
        <div class="search-bar">
          <ul class="screen">
            <p>Top 11</p>
            <p>Standby</p>
            <p>总计：{{count}}个</p>
          </ul>
          <div class="search-input">
            <input type="text" placeholder="请输入节点名称" @keyup="searchKeyboard($event)" v-model="searchAccountName" />
            <a href="javascript:void(0);" class="search-btn" @click="searchBtn()"></a>
          </div>
        </div>

        <table class="table-main" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>选择</td>
            <td>排名</td>
            <td>名称</td>
            <td>国家/地区</td>
            <td>得票率</td>
            <td>投票账户数</td>
            <td v-if="isWitnesses">已生产区块数</td>
            <td>待申领奖励(COCOS)</td>
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

    <div class="mask" v-if="isShowLogin" @click.stop="hideLogin()">
      
    </div>
    <div class="login-Popup" v-if="isShowLogin">
        <p class="title">登录</p>

        <div class="input-bar">
          <span class="head">账户：</span>
          <input type="text" class="form-input" v-model="account">
        </div>

        <div class="input-bar">
          <span class="head">密码：</span>
          <input type="text" class="form-input" v-model="password">
        </div>
        <input type="button" class="form-login-btn" @click="passwordLoginAjax()" value="登录">
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
  passwordLogin,
  logout
} from "../../libs/bcx.api";
import { cacheSession, cacheKey } from '../../libs/Utils'
import { Message } from 'element-ui';
export default {
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      checked: true,
      count: 0,
      currentPage: 1,

      isWitnesses: false,

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
      password: '',
      isShowLogin: false,

      isLogin: false,
      currentLoginAccount: ''
    };
  },
  watch: {},
  mounted() {
      let _this = this;
    if (cacheSession.get(cacheKey.accountName)) {
      // this.isLogin = true
      this.currentLoginAccount = cacheSession.get(cacheKey.accountName)
    }
    
    _this.queryVotesAjax();
    _this.queryAccountInfoAjax();
  },
  methods: {
    logout(){
      let _this = this;
      cacheSession.remove(cacheKey.accountName)
      logout().then(res => {
        
          Message({
            duration: 2000,
            message: '已退出登录',
            type: 'success',
          })
          location.reload()
      })
    },
    hideLogin(){
      this.isShowLogin = false
    },
    showLogin(){
      this.isShowLogin = true
    },
    passwordLoginAjax(){
      let _this = this;
      passwordLogin({
        account: _this.account,
        password: _this.password
      }).then( res=>{
        if (res.code == 1) {
          _this.account = ''
          _this.password = ''
          _this.isShowLogin = false
          Message({
            duration: 2000,
            message: '登录成功',
            type: 'success',
          })
          cacheSession.set(cacheKey.accountName, res.data.account_name)
          _this.currentLoginAccount = res.data.account_name
          _this.queryVotesAjax();
          _this.queryAccountInfoAjax();
        } else {
          
          Message({
            duration: 2000,
            message: '登录失败',
            type: 'error',
          })
          return false
        }
      })
    },
    searchKeyboard(ev){
      
      if (ev.keyCode==13) {
        this.searchBtn();
      }
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
    vote() {
      let _this = this;
      let params = {};

      if (!cacheSession.get(cacheKey.accountName)) {
          Message({
            duration: 2000,
            message: _this.$t('interFaceMessage.common[114]'),
            type: 'error',
          })
          return false
      }
      if (this.isWitnesses) {
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
          
             
            Message({
              duration: 2000,
              message: '投票成功',
              type: 'success',
            })
        _this.queryVotesAjax();
        _this.queryAccountInfoAjax();
        } else {
          
          if (res.message.indexOf('Account is locked or not logged in') > -1) {
            
            Message({
              duration: 2000,
              message: _this.$t('interFaceMessage.common[114]'),
              type: 'error',
            })
          } else {
             
            Message({
              duration: 2000,
              message: '投票失败',
              type: 'error',
            })
          }
        }

      });
    },
    changeTpye(val) {
      if (this.isWitnesses == val) return false
      let _this = this;
      this.isWitnesses = val;
      this.currentPage = 1;
      this.lookupBlock = [];
      this.tableList = [];
      this.queryVotesAjax();
      this.queryAccountInfoAjax();
    },

    queryAccountInfoAjax() {
      let _this = this;
      queryAccountInfo().then(res => {
        console.log("---res----");
        console.log(res.data.votes);
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
      });
    },

    witnessesAjax: function(formData) {
      let _this = this;
      //   var formData = new FormData();
      //   formData.append("picture", files);

      
      let resUrl = "http://vote.test.cjfan.net/api/api/v1/witnesses";
      if (this.isWitnesses) {
        resUrl = "http://vote.test.cjfan.net/api/api/v1/witnesses?lang=en";
      } else {
        resUrl = "http://vote.test.cjfan.net/api/api/v1/committee?lang=en";
      }
      this.$axios
        .post(resUrl, formData)
        .then(function(response) {
          _this.tableList= ''
          _this.tableList = response.data.result;
          _this.lookupBlock = new Array(response.data.result.length);
          for (let i = 0; i < _this.tableList.length; i++) {
            _this.tableList[i].voteRate = Number(_this.votesTotal) == 0 ? "0%":Number(Number(
                Number(_this.tableList[i].votes) / Number(_this.votesTotal)
              ).toFixed(4) *
                100).toFixed(2) +
              "%";
            _this.lookupBlockRewardsByIdAjax(_this.tableList[i].account_id, i);
          }
        })
        .catch(function(error) {
          console.log("error");
          console.log(error);
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
        let requestQueryVotesList = res.data.slice(
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
            message: '已到达票数上限',
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
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-bar {
  height: 64px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(230, 230, 230, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}
.install-tips {
  margin-left: 30px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
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
.node-container-tag {
  width: 100%;
  margin-top: 10px;
}
.node-container-tag .tag {
  margin-right: 10px;
  border-radius: 14px;
  margin-top: 6px;
}

.selected-node-title {
  margin-top: 30px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.vote-btn-bar {
  width: 130px;
  height: 44px;
  line-height: 44px;
  margin: 20px auto 0;
  background: #3e9aff;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  display: block;
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
.login-Popup{
  width: 500px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -250px;
  background: #fff;
  border-radius: 4px;
  z-index: 1100;
}
.login-Popup .title{
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 24px;
}
.login-Popup .input-bar{
  width: 400px;
  height: 60px;
  line-height: 60px;
  margin: 10px auto 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.login-Popup .input-bar .head{
  font-size: 16px;
  width: 20%;
  font-size: 16px;
  text-align: right;
}
.login-Popup .input-bar .form-input{
  font-size: 16px;
  width: 80%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #ccc;
  text-indent: 10px;
}
.login-Popup .form-login-btn{
  width: 200px;
  height: 40px;
  line-height: 40px;
  margin: 10px auto 0;
  display: block;
  background: #3e9aff;
  border: none;
  color: #fff;
  font-size: 16px;
}
.currentLoginAccount{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 30px;
}
.currentLoginAccount label{
  color: rgba(100, 103, 207, 1);
  font-size: 16px;
  margin-right: 20px;
}
</style>

