/*!
 * name: @feizheng/next-fetch-with-node-timeout
 * description: Timeout option for node-fetch with abort-controller.
 * homepage: https://github.com/afeiship/next-fetch-with-node-timeout
 * version: 1.0.0
 * date: 2020-06-27T14:14:48.926Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var AbortController = require('abort-controller');
  var DEFAULT_OPTIONS = { timeout: 30 * 1e3 };

  nx.fetchWithNodeTimeout = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      var controller = new AbortController();
      options = nx.mix({ signal: controller.signal }, options);

      var timer = setTimeout(function () {
        controller.abort();
      }, options.timeout);

      return new Promise(function (resolve, reject) {
        inFetch(inUrl, options).
          then(function (res) {
            clearTimeout(timer);
            resolve(res);
          }).catch(function (err) {
            reject(err);
          });
      });
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithNodeTimeout;
  }
})();

//# sourceMappingURL=next-fetch-with-node-timeout.js.map
