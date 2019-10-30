// 网页缓存  当前项目使用session

export const cacheKey = {
  accountName: 'account_name',
  myWorldView: 'world_view',
  lang: 'lang'
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


