import {
  Message
} from 'element-ui';

import './bcx.min.js'
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
// import {
//   Loading
// } from 'element-ui'
import { Loading,Indicator } from 'mint-ui';

let bcx = null



// 浏览器插件链接 当前请求秒数
let requestSeconds = 0

// 浏览器插件链接 请求最大秒数
let requestSecondsMax = 7

let promiseObjArr = []


// bcx对象初始化
export let initBcx = function () {

  var _configParams={ 
      ws_node_list:[
          {url:"ws://test.cocosbcx.net",name:"Cocos - China - Beijing"},   
      ],
      networks:[
          {
              core_asset:"COCOS",
              chain_id:"c1ac4bb7bd7d94874a1cb98b39a8a582421d03d022dfa4be8c70567076e03ad0" 
          }
      ], 
      faucet_url: "http://test-faucet.cocosbcx.net",
      auto_reconnect:true,
      real_sub:true,
      check_cached_nodes_data:false
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
        if (window.BcxWeb) {
          bcx = window.BcxWeb
          clearInterval(currentTimer)
          resolve(true)
          return false
        }
        requestSeconds++
        if (requestSeconds >= requestSecondsMax) {
          clearInterval(currentTimer)

          let tipsMessage = {}
          // if (cacheSession.get(cacheKey.lang) == 'zh') {
          //   tipsMessage = langZh.tipsMessage
          // } else {
          //   tipsMessage = langEn.tipsMessage
          // }
          console.log('-----    window.BcxWeb   Failure ------- ')
          // Message({
          //   duration: 2000,
          //   message: tipsMessage.common.linkFailure,
          //   type: 'error',
          // })
          
          resolve(false)
          return false
        }
      }, 1000)
    }

  })
}


// 登录
export let passwordLogin = function (params) {
  // let loadingInstance = Loading.service();
  Indicator.open({
    // text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return new Promise(async function (resolve, reject) {
    
    bcx.passwordLogin({
      // account: params.account || "syling", //query.loginUserName,
      // password: params.password || "12345678"
      account: params.account, //query.loginUserName,
      password: params.password
    }).then(res => {
      // loadingInstance.close();
      Indicator.close();
      resolve(res)
      // console.info("bcx passwordLogin res", res);
    });
  })

}

// 获取语言
export let walletLanguage = function () {
  
  return new Promise( function (resolve, reject) {
    console.log('****************************')
    bcx.walletLanguage().then( res => {
      console.log('****************************')
      console.log(res)
      resolve(res)
    }).catch( err => {
      console.log(err)
    })
  })
}
// 投票
export let publishVotes = function (params) {
  
  // let loadingInstance = Loading.service();
  Indicator.open({
    // text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return new Promise(async function (resolve, reject) {
    // witnesses committee
    bcx.publishVotes({
      // witnessesIds: params.witnessesIds || null,
      // committee_ids: params.committee_ids || null,
      type: params.type,
      vote_ids: params.vote_ids,
      votes: params.votes
    }).then(res => {
      // loadingInstance.close();
      Indicator.close();
      resolve(res)
      // console.info("bcx passwordLogin res", res);
    }).catch(err => {
      console.log(err)
      Indicator.close();
      resolve(false)
    })
  })
}



// 获取用户信息
export let getAccountInfo = function () {
  // let loadingInstance = Loading.service();
  Indicator.open({
    // text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return new Promise(async function (resolve, reject) {
    let browserConnectResult = await browserConnect()
    if (!browserConnectResult) {
      Indicator.close();
      return false
    }
    bcx.getAccountInfo().then(res => {
      Indicator.close();
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
      
      Indicator.close();
      console.log('----------browserConnectResult------err--------')
      console.log(err)
      reject(err)
    })
  })
}


// 桌面钱包链接
export let desktopConnect = function () {
  Cocosjs.plugins(new CocosBCX())
  Cocosjs.cocos.connect('My-App').then(connected => {
    let tipsMessage = {}
    if (cacheSession.get(cacheKey.lang) == 'zh') {
      tipsMessage = langZh.tipsMessage
    } else {
      tipsMessage = langEn.tipsMessage
    }
    if (!connected) {
      Message({
        duration: 2000,
        message: tipsMessage.interFaceMessage.common[0],
        type: 'error',
      })
      return
    } else {
      const cocos = Cocosjs.cocos
      bcx = cocos.cocosBcx(bcx)
      bcx.getAccountInfo().then(res => {
        // cacheSession.set(cacheKey.accountName, res[cacheKey.accountName])
        // cacheSession.remove(cacheKey.myWorldView)
      }).catch(function (err) {})
    }

  }).catch(function (err) {})
}



// 查询账户信息
export let queryAccountInfo = function () {
  return new Promise(async function (resolve, reject) {
    Indicator.open({
      // text: '加载中...',
      spinnerType: 'fading-circle'
    });
    let getAccountInfoResult = await getAccountInfo()
    if (!getAccountInfoResult) return false
    bcx.queryAccountInfo({
      account: getAccountInfoResult[cacheKey.accountName] || ''
      // account: 'syling'
    }).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(err=>{
      Indicator.close();
      console.log('--------err-------')
      console.log(err)
    })
  })
}

// 查询数据通过id
export let queryDataByIds = function (ids) {
  Indicator.open({
    // text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return new Promise(function (resolve, reject) {
    bcx.queryDataByIds({
        ids: ids
    }).then(res=>{
      Indicator.close();
      resolve(res)
    }).catch(err=>{
      Indicator.close();
      console.log('--------err-------')
      console.log(err)
    })
  })

}




// 查询账户指定资产余额
export let queryAccountBalances = function () {
  Indicator.open({
    spinnerType: 'fading-circle'
  });
  return new Promise(function (resolve, reject) {
    getAccountInfo().then( (getAccountInfoResult) => {
      if (!getAccountInfoResult) return false
      
      bcx.queryAccountBalances({
        account: getAccountInfoResult[cacheKey.accountName] || ''
      }).then(res => {
        Indicator.close();
        resolve(res)
      }).catch(err => {
        console.log(err)
        Indicator.close();
        resolve(false)
      })
    })
    
  })
}


// export let lookupBlockRewardsById = async function (account_id) {
//   // let loadingInstance = Loading.service();
//   // await passwordLogin({
//   //   account: 'syling',
//   //   password: '12345678'
//   // })
//   return new Promise(function (resolve, reject) {
//     bcx.lookupBlockRewardsById({
//       account_id: account_id
//     }).then(res => {
//       // loadingInstance.close();
//       resolve(res)
//     }).catch(err=>{
//       // loadingInstance.close();
//       console.log('--------err-------')
//       console.log(err)
//     })
//   })
// }



// 投票列表
export let queryVotes = function (params) {
  Indicator.open({
    spinnerType: 'fading-circle'
  });
  return new Promise(async function (resolve, reject) {
    let getAccountInfoResult = await getAccountInfo()
    if (!getAccountInfoResult) return false
    let param = {
      // type: witnesses 见证人    committee 理事会
      queryAccount: getAccountInfoResult[cacheKey.accountName] || '',
      type: params.type || ''
    }
    console.log('------queryVotes------param----------------')
    console.log(param)
    bcx.queryVotes(param).then(res => {
      console.log('------queryVotes----------res--------')
      console.log(res)
      Indicator.close();
      resolve(res)
    })
  })
}



// 查询账户
export let queryVestingBalance = function (account) {
  Indicator.open({
    spinnerType: 'fading-circle'
  });
  return new Promise(function (resolve, reject) {
    bcx.queryVestingBalance({
      account: account
    }).then(res => {
      Indicator.close();
      resolve(res)
    }).catch(err=>{
      Indicator.close();
      console.log('--------err-------')
      console.log(err)
    })
  })
}
