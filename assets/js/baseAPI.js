$(function () {
  var url = "http://ajax.frontend.itheima.net";
  $.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = url + options.url;

    //给有权限的接口拼接密钥
    if (options.url.indexOf("/my/") !== -1) {
      options.headers = {
        Authorization: localStorage.getItem("token") || "",
      };
    }

    //给拦截所有相应,判断身份信息
    options.complete = function (res) {
      var obj = res.responseJSON;
      if (obj.status == 1 && obj.message === "身份认证失败！") {
        localStorage.removeItem("token");
        location.href = "/login.html";
      }
    };
  });
});
