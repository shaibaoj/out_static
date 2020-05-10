$(function () {

    $("#clearBtn").click(function (e) {
        $('#linkQuery').val('');
    });

    $("#wenanbtn").click(function (e) {
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('文案生成中,请稍候...');
        var linkQuery = $('#linkQuery').val();
        var pidnumin = $('#pidnumin').val();

        if (pidnumin != '0' && pidnumin != '' && pidnumin != null) {
            $.ajax({
                url: '/api/user/tools/tools/transform',
                type: 'POST',
                data: {
                    ajax: 1,
                    content: linkQuery,
                    pid: pidnumin,
                    times:URLPrefix.times,
                    url_sign:URLPrefix.url_sign,
                    member_token:URLPrefix.token,
                },
                dataType: 'json',
                success: function (data) {
                    if(data.info.status==0){
                        var toolimg = '';
                        for (i = 0; i < data.data.goods.goods.pic_list.length; i++) {
                            toolimg = toolimg + '<li class="fadein" id="liact' + i +
                                '"><a href="javascript:;" rel="nofollow"><img src="' + data.data.goods.goods.pic_list[i] + '" id="itempic' + i +
                                '"></a></li>';
                        };
                        $("#tool-itempic").html(toolimg);
                        $('#result').html(data.data.content);
                        layer.msg('恭喜，生成已成功！', {
                            icon: 1
                        });
                    }else{
                        layer.msg(data.info.status_err, {
                            icon: 2
                        });
                    }
                    $('#wenanbtn').removeAttr('disabled');
                    $('#wenanbtn').text('生成文案');
                }
            });
        } else {
            layer.msg('抱歉，未检测到PID,请先设置PID！', {
                icon: 2
            });
            $('#wenanbtn').removeAttr('disabled');
            $('#wenanbtn').text('生成文案');
        }
    });

    queryPids();
    function queryPids(){
        $("#pidnumin").html('');
        $("tbody",$('.table-pid')).html('');
        $.ajax({
            url: '/api/user/user/pid/list',
            type: 'POST',
            data: {
                times:URLPrefix.times,
                url_sign:URLPrefix.url_sign,
                member_token:URLPrefix.token,
            },
            dataType: 'json',
            success: function (data) {
                if(data.info.status==0){
                    var html="",tableHtml="";
                    if(data.data.items&&data.data.items.length>0){
                        $("#pidnumin").show();
                        $.each(data.data.items, function(i,item){
                            html = html+'<option value="'+(item.pid!=null?item.pid:'')+'" '+(item.selected!=null&&item.selected=='1'?' selected':'')+'>'+(item.pid_name!=null?item.pid_name:'')+'</option>';
                            tableHtml = tableHtml +'<tr><td>'+item.pid_name+'</td><td>'+item.pid+'</td><td><a data-id="'+item.user_pid_id+'" class="btn btn-outline-secondary btn-sm btn-del-pid">删除</a></td></tr>';
                        });
                        $("#pidnumin").html(html);
                        $("tbody",$('.table-pid')).html(tableHtml);
                    }else{
                        $("#pidnumin").hide();
                    }
                }else{
                    // layer.msg(data.info.status_err, {
                    //     icon: 2
                    // });
                }
            }
        });
    }

    $(".tool-copy").click(function (e) {
        var clipboardBtn = new ClipboardJS('.tool-copy',{
            target: function(trigger) {
                return document.querySelector('#result');
            }
        });

        clipboardBtn.on('success', (e) => {
            e.clearSelection();
            clipboardBtn.destroy();
            layer.msg('复制成功', {time: 2000});
        });
        clipboardBtn.on('error', function(e) {
            return layer.msg('您的浏览器不支持一键复制，请升级浏览器或更换浏览器', {
                icon: 2
            });
        });
    });

    $("#tool-itempic").click(function (event) {
        var $this = $(this);
        $this.find("li").removeClass("active");
        var $target = $(event.target);
        if( $target.is("img") ) {
            $target.closest("li").addClass("active");
            $("img",$("#result")).attr("src",$target.attr("src"));
        }
    });

    $(".generate-taoken").click(function (e) {
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('解析口令中.....');
        $(".token_result").hide();
        var taoken = $('#taoken').val();
        var captcha = $('#captcha').val();

        if (taoken != '0' && taoken != '' && taoken != null) {
            $.ajax({
                url: '/api/user/tools/tools/token',
                type: 'POST',
                data: {
                    content: taoken,
                    captcha: captcha,
                    times:URLPrefix.times,
                    url_sign:URLPrefix.url_sign,
                    member_token:URLPrefix.token,
                },
                dataType: 'json',
                success: function (data) {
                    if(data.info.status==0){
                        $("#url").val(data.data.token.url);
                        $('#content').val(data.data.token.content);
                        $('#pic_url').val(data.data.token.pic_url);
                        $(".token_result").show();
                        layer.msg('恭喜，生成已成功！', {
                            icon: 1
                        });
                    }else{
                        layer.msg(data.info.status_err, {
                            icon: 2
                        });
                    }
                    $("img",$(".verification-captcha")).attr("src",'/showpic?a='+Math.random());
                    $this.removeAttr('disabled');
                    $this.text('解析口令');
                }
            });
        } else {
            layer.msg('请先输入要解析的口令！', {
                icon: 2
            });
            $this.removeAttr('disabled');
            $this.text('解析口令');
        }
    });

    $(".add_pid").click(function (e) {
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $this.text('添加中...');
        var pid_name = $('#pid_name').val();
        var pid_pid = $('#pid_pid').val();

        if (pid_pid != '0' && pid_pid != '' && pid_pid != null) {
            $.ajax({
                url: '/api/user/user/pid/update',
                type: 'POST',
                data: {
                    name: pid_name,
                    pid: pid_pid,
                    times:URLPrefix.times,
                    url_sign:URLPrefix.url_sign,
                    member_token:URLPrefix.token,
                },
                dataType: 'json',
                success: function (data) {
                    if(data.info.status==0){
                        queryPids();
                        $('#pid_name').val('');
                        $('#pid_pid').val('');
                        layer.msg('恭喜，生成已成功！', {
                            icon: 1
                        });
                    }else{
                        layer.msg(data.info.status_err, {
                            icon: 2
                        });
                    }
                    $this.removeAttr('disabled');
                    $this.text('添加');
                }
            });
        } else {
            layer.msg('抱歉，pid不能为空！', {
                icon: 2
            });
            $this.removeAttr('disabled');
            $$this.text('添加');
        }
    });

    $(".table-pid").click(function (event) {
        var $this = $(this);
        var $target = $(event.target);
        if( $target.is(".btn-del-pid") ) {
            var user_pid_id = $target.data("id");
            if (user_pid_id != '0' && user_pid_id != '' && user_pid_id != null) {
                $.ajax({
                    url: '/api/user/user/pid/delete',
                    type: 'POST',
                    data: {
                        id: user_pid_id,
                        times:URLPrefix.times,
                        url_sign:URLPrefix.url_sign,
                        member_token:URLPrefix.token,
                    },
                    dataType: 'json',
                    success: function (data) {
                        queryPids();
                    }
                });
            }
        }
    });

});