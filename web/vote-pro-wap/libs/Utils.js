// 网页缓存  当前项目使用session

export const cacheKey = {
  accountName: "account_name",
  accountId: "account_id",
  myWorldView: "world_view",
  lang: "lang"
}

export let cacheSession = {
  set: function (key, value) {
    sessionStorage.setItem(key, value);
  },
  get: function (key) {
    var data = sessionStorage.getItem(key);
    return data
  },
  remove: function (key) {
    sessionStorage.removeItem(key);
  },
  clear: function () {
    sessionStorage.clear();
  }
}



export const initRootFontSize = function(doc_01 = document, win_01 = window) {
  var docEl_01 = doc_01.documentElement;
  var resizeEvt_01 = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc_01 = function() {
    var clientWidth_01 = docEl_01.clientWidth;
    var clientheight_01 = docEl_01.clientHeight;
    if (!clientWidth_01) return;
    if (clientWidth_01 < 375) {
      docEl_01.style.fontSize = (clientWidth_01 / 375 * 100).toFixed(1) + 'px';
    } else {
      docEl_01.style.fontSize = 100 + 'px';
    }
  };
  recalc_01();
  if (!doc_01.addEventListener) return;
  win_01.addEventListener(resizeEvt_01, recalc_01, false);
};



export let handleCOCOS = function (COCOS) {
  return COCOS/Math.pow(10,8)
}
