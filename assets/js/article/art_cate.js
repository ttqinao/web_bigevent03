$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }

    //显示添加文章分类列表
    var layer = layui.layer;
    var form=layui.form
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area:['500px','260px'],
            content: $('#dialog-add').html()
          });     
            
    })

    var indexAdd = null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList();
                layer.msg('恭喜您，文章类别添加成功!')
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit=layer.open({
            type: 1,
            title: '修改文章分类',
            area:['500px','260px'],
            content: $('#dialog-edit').html()
        });
        
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if(res.status!==0) return layer.msg(res.message)
                form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status!==0) return layer.msg(res.message)
                initArtCateList();
                layer.msg('恭喜您，文章类别添加成功!')
                layer.close(indexEdit)
            }
            
        })
    })
    
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if(res.status!==0) return layer.msg(res.message)
                    initArtCateList();
                    layer.msg('恭喜您，文章类别添加成功!')
                    layer.close(index);
                }
            })
            
            
          });
    })
})