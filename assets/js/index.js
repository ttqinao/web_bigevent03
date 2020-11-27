$(function () {
    //渲染头像
    getUserInof()

    //关闭事件
    $('#btnTuichu').on('click', function () {
        layer.confirm('确定关闭页面?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        
        success: function (res) {
            if(res.status!==0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase();
        $('.text-avatar').html(text).show()
    }
}