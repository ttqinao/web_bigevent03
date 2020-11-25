$(function () {
  $("#reg_link").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#login_link").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 表单验证
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) return "俩次输入密码不一致";
    },
  });

  //注册表单提交ajax请求
  var layer = layui.layer;
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        //弹出消息，清空表单，跳转到登录框
        layer.msg(res.message);
        $("#form_reg")[0].reset();
        $("#login_link").click();
      },
    });
  });

  //登陆表单提交ajax请求
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/api/login",
      data: $("#form_login").serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        //弹出消息，保存token，跳转页面
        layer.msg(res.message);
          localStorage.setItem('token', res.token)
          location.href='/index.html'
      },
    });
  });
});
