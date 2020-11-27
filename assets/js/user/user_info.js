$(function () {
    var form = layui.form
    var layer=layui.layer
    form.verify({
        nickname: function (value) {
            if(value.length>6) return '昵称必须在1~6位之间'
        }
    })

    // 渲染输入框里默认的文本
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                form.val('formUser',res.data)
            }
        })
    }

    //重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //提交修改
    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInof()
            }
        })
    })
})