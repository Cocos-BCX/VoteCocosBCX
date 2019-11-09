import {
  Message
} from 'element-ui';

// import BCX from 'bcx-api'
import './bcx.min'
import {
  cacheSession,
  cacheKey
} from './Utils'
import {
  langEn
} from '../src/common/lang/en.js'
import {
  langZh
} from '../src/common/lang/zh.js'
import {
  Loading
} from 'element-ui'


let bcx = null



// 浏览器插件链接 当前请求秒数
let requestSeconds = 0

// 浏览器插件链接 请求最大秒数
let requestSecondsMax = 5

let promiseObjArr = []


// bcx对象初始化
export let initBcx = function () {


  var _configParams = {
    // default_ws_node:"",
    default_ws_node: "ws://123.57.19.148:9049",
    ws_node_list: [{
      url: "ws://123.57.19.148:9049",
      name: "Cocos - China - Beijing"
    }, ],
    networks: [{
      core_asset: "COCOS",
      chain_id: "9e0ef9444fc780fa91aaef2e63c18532634ad67dcc436a4b4915d3adeef62c62"
    }],
    faucet_url: "http://xx.xx.xx.xx:xxxxx",
    auto_reconnect: true,
    real_sub: true,
    check_cached_nodes_data: false
  };
  bcx = new BCX(_configParams);
}


// 浏览器插件链接
export let browserConnect = function () {
  let currentTimer = null
  return new Promise(async function (resolve, reject) {
    if (window.BcxWeb) {
      bcx = window.BcxWeb
      resolve(true)
      return false
    } else {
      currentTimer = setInterval(() => {
        requestSeconds++
        if (requestSeconds >= requestSecondsMax) {
          clearInterval(currentTimer)

          let tipsMessage = {}
          if (cacheSession.get(cacheKey.lang) == 'zh') {
            tipsMessage = langZh.tipsMessage
          } else {
            tipsMessage = langEn.tipsMessage
          }
          Message({
            duration: 2000,
            message: tipsMessage.common.linkFailure,
            type: 'error',
          })
          return false
        }
        if (window.BcxWeb) {
          bcx = window.BcxWeb
          clearInterval(currentTimer)
          resolve(true)
          return false
        }
      }, 1000)
    }

  })
}


// 登录
export let passwordLogin = function (params) {
  let loadingInstance = Loading.service();
  return new Promise(async function (resolve, reject) {
    
    // account: params.account || "syling", //query.loginUserName,
    // password: params.password || "12345678"
    bcx.passwordLogin({
      account: params.account, //query.loginUserName,
      password: params.password
    }).then(res => {
      loadingInstance.close();
      resolve(res)
      // console.info("bcx passwordLogin res", res);
    });
  })

}



// 获取用户信息
export let getAccountInfo = function () {
  let loadingInstance = Loading.service();
  return new Promise(async function (resolve, reject) {
    await browserConnect()
    bcx.getAccountInfo().then(res => {
      console.log('---------getAccountInfo------------')
      console.log(res)
      loadingInstance.close();
      if (res.locked) {
        let tipsMessage = {}
        if (cacheSession.get(cacheKey.lang) == 'zh') {
          tipsMessage = langZh.tipsMessage
        } else {
          tipsMessage = langEn.tipsMessage
        }
        Message({
          duration: 2000,
          message: tipsMessage.common.accountLocked,
          type: 'error',
        })
        resolve(false)
        return false
      } else {
        cacheSession.set(cacheKey.accountName, res.account_name)
        cacheSession.remove(cacheKey.myWorldView)
        resolve(res)
        return false
      }
    }).catch(err => {
      console.log('----------browserConnectResult------err--------')
      console.log(err)
      reject(err)
    })
  })
}



// 投票
export let publishVotes = function (params) {
  
  let loadingInstance = Loading.service();
  return new Promise(async function (resolve, reject) {
    // witnesses committee
    await browserConnect()
    bcx.publishVotes({
      // witnessesIds: params.witnessesIds || null,
      // committee_ids: params.committee_ids || null,
      type: params.type,
      vote_ids: params.vote_ids,
      votes: params.votes
    }).then(res => {
      loadingInstance.close();
      resolve(res)
      // console.info("bcx passwordLogin res", res);
    }).catch(err=>{
      loadingInstance.close();
      console.log(err)
      resolve(false)
      
    });
  })
}







// 查询账户信息
export let queryAccountInfo = function () {
  let loadingInstance = Loading.service();
  return new Promise(async function (resolve, reject) {
    
    await getAccountInfo()
    // account: 'syling'
    bcx.queryAccountInfo({
      account: cacheSession.get(cacheKey.accountName)
    }).then(res=>{
      loadingInstance.close();
      resolve(res)
    }).catch(err=>{
      loadingInstance.close();
      console.log('--------err-------')
      console.log(err)
    })
  })
}

// 查询数据通过id
export let queryDataByIds = function (ids) {
  let loadingInstance = Loading.service();
  return new Promise(async function (resolve, reject) {
    await browserConnect()
    bcx.queryDataByIds({
        ids: ids
    }).then(res=>{
      loadingInstance.close();
      resolve(res)
    }).catch(err=>{
      loadingInstance.close();
      console.log('--------err-------')
      console.log(err)
    })
  })

}



// 查询账户
export let queryVestingBalance = function (account) {
  let loadingInstance = Loading.service();
  return new Promise(async function (resolve, reject) {
    await browserConnect()
    bcx.queryVestingBalance({
      account: account
    }).then(res => {
      loadingInstance.close();
      resolve(res)
    }).catch(err=>{
      loadingInstance.close();
      console.log('--------err-------')
      console.log(err)
    })
  })
}




// 查询账户指定资产余额
export let queryAccountBalances = function () {
  
  
  let loadingInstance = Loading.service();
  return new Promise( function (resolve, reject) {
    getAccountInfo().then( (getAccountInfoResult) => {
      if (!getAccountInfoResult) return false
      console.log('getAccountInfoResult')
      console.log(getAccountInfoResult)
      bcx.queryAccountBalances({
        account: getAccountInfoResult[cacheKey.accountName] || ''
        // account: 'syling'
      }).then(res => {
        console.log('-----syling------')
        console.log(res)
      loadingInstance.close();
        resolve(res)
      }).catch(err => {
        console.log('-----syling------')
        console.log(err)
        loadingInstance.close();
        resolve(false)
      })
    })
    
  })
}


// 投票列表
export let queryVotes = function (params) {
  let loadingInstance = Loading.service();
  return new Promise(async function (resolve, reject) {
    await browserConnect()
    let param = {
      // type: witnesses 见证人    committee 理事会
      queryAccount: params.queryAccount,
      type: params.type || ''
    }
    bcx.queryVotes(param).then(res => {
      loadingInstance.close();
      resolve(res)
    })
  })
}


// 退出登录
export let logout = function (params) {
  let loadingInstance = Loading.service();
  return new Promise(function (resolve, reject) {
    bcx.logout().then(res=>{
      loadingInstance.close();
      resolve(res)
    })
  })

}
