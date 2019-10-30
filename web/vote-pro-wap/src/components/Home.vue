<template>
  <div class="home">
    <div class="search-bar">
      <div class="search-main">
        <a href="javascript:void(0);" class="search-btn"></a>
        <input type="text" class="search-input" />
      </div>
    </div>

    <div class="change-btn">
      <a href="javascript:void(0);" class="active">超级节点</a>
      <a href="javascript:void(0);">理事会</a>
    </div>

    <div class="node-lists">
      <div class="node-main">
        <div class="node">
          <img src="../assets/images/test-node-icon.png" class="node-icon" alt />
          <ul class="node-message">
            <li class="name">eoshuobipool</li>
            <li class="author">itokenpocket</li>
            <li class="spec">
              <p>
                <img src="../assets/images/ranking-mobile.png" alt /> No.1
              </p>
              <p>
                <img src="../assets/images/percentage-mobile.png" alt /> 2.8878%
              </p>
              <p>
                <img src="../assets/images/pos-mobile.png" alt /> 中国
              </p>
            </li>
          </ul>
          <!-- ranking percentage pos -->
          <a href="javascript:void(0);" class="node-choice-btn">
            <img src="../assets/images/choice.png" alt />
          </a>
        </div>
      </div>
    </div>

    <div class="bottom-btn-bar">
      <div>已投节点：2</div>
      <!-- <div>投票</div> -->
    </div>
    <div class="mask" v-if="isMask">
      <div class="already-voted-list-container" ref="hideDropDom">
        <p class="drop-btn" @click="hidedrop()" :style="{bottom: dropbtnbottom}">
          <img src="../assets/images/drop.png" alt />
        </p>
        <ul class="already-voted-list">
          <li>
            <p class="info">
              <img src="../assets/images/test-node-icon.png" class="node-icon" alt />
              <span>TokenPocket</span>
            </p>

            <a href="javascript:void(0);" class="node-choice-btn">
              <img src="../assets/images/choice.png" alt />
            </a>
          </li>
        </ul>
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
  publishVotes
} from "../../libs/bcx.api"
export default {
  data() {
    return {
      dropbtnbottom: "0",
      isMask: true,
      
      dynamicTags: ["标签一", "标签二", "标签三"],
      checked: true,
      count: 0,
      currentPage: 1,

      isWitnesses: true,

      // page: 1,
      pageSize: 10,
      queryVotesList: [],
      votesTotal: 0,
      tableList: [],
      lookupBlock: [],
      searchAccountName: "",

      myVotesWitnesses: {},
      myVotesCommittee: {}
    };
  },
  watch: {
    "$refs.hideDropDom.style.bottom": function(val) {
      console.log("---------------");
    }
  },
  mounted() {
    this.queryVotesAjax();
    this.queryAccountInfoAjax();
  },
  methods: {
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
        console.log("--------publishVotes-------------res------");
        console.log(res);

        _this.queryVotesAjax();
        _this.queryAccountInfoAjax();
      });
    },
    changeTpye() {
      let _this = this;
      this.isWitnesses = !this.isWitnesses;
      this.currentPage = 1;
      this.lookupBlock = [];
      this.tableList = [];
      this.queryVotesAjax();
    },

    queryAccountInfoAjax() {
      queryAccountInfo().then(res => {
        let _this = this;
        console.log("---res----");
        console.log(res.data.votes);
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
        console.log("----------myVotesIds-----------");
        console.log(myVotesIds);
        console.log(duplicateRemovalMyVotesIds);
        queryDataByIds(duplicateRemovalMyVotesIds).then(res => {
          console.log("---------queryDataByIds------------");
          console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            if (_this.myVotesWitnesses.hasOwnProperty(res.data[i].id)) {
              _this.myVotesWitnesses[res.data[i].id] = res.data[i].name;
            }
            if (_this.myVotesCommittee.hasOwnProperty(res.data[i].id)) {
              _this.myVotesCommittee[res.data[i].id] = res.data[i].name;
            }
          }
          console.log(_this.myVotesWitnesses);
          console.log(_this.myVotesCommittee);
        });
      });
    },

    witnessesAjax: function(formData) {
      let _this = this;
      //   var formData = new FormData();
      //   formData.append("picture", files);

      let resUrl = "http://localhost:8888/api/v1/witnesses";
      if (this.isWitnesses) {
        resUrl = "http://localhost:8888/api/v1/witnesses";
      } else {
        resUrl = "http://localhost:8888/api/v1/committee";
      }
      this.$axios
        .post(resUrl, formData)
        .then(function(response) {
          _this.tableList = [];
          _this.tableList = response.data.result;
          console.log("_this.tableList");
          console.log(_this.tableList);
          _this.lookupBlock = new Array(response.data.result.length);
          for (let i = 0; i < _this.tableList.length; i++) {
            _this.tableList[i].voteRate =
              Number(
                Number(_this.tableList[i].votes) / Number(_this.votesTotal)
              ).toFixed(4) *
                100 +
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
        queryAccount: "",
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
        _this.witnessesAjax(formData);
      });
    }
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  background: url("../assets/images/change-bg.png") no-repeat bottom center;
}

.node-lists {
  margin-top: 0.12rem;
  background: #fff;
}
.node-lists .node-main {
  margin-left: 0.2rem;
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
.already-voted-list-container .already-voted-list {
  height: 2.18rem;
  width: 3.45rem;
  margin: 0 auto;
}
.already-voted-list-container .already-voted-list li {
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
</style>

