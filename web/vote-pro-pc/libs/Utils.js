// 网页缓存  当前项目使用session

export const cacheKey = {
  accountName: 'account_name',
  myWorldView: 'world_view',
  lang: 'lang'
}

export let cacheSession = {
  set: function (key, value) {
    localStorage.setItem(key, value);
  },
  get: function (key) {
    var data = localStorage.getItem(key);
    return data
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
  clear: function () {
    localStorage.clear();
  }
}


export let handleCOCOS = function (COCOS) {
  return COCOS/Math.pow(10,5)
}

