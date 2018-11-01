// 1.服务器地址
// var urls="http://interface.carmanclub.com.cn/cym_back/"//车赢门服务器
// var urls = "http://192.168.199.34:8080/" // 许星本地服务器06.19
var urls = "http://test.interface.carmanclub.com.cn/cym_back/" // 测试服务器06.19

// 2.时间转化
function get_str_time(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

// 3.post请求
/*-----------------ajax-post请求: 地址，参数，返回函数-------------------*/
function post_ajax(url,args,fn){
    $.ajax({
        type: 'post',
        url: urls + url,
        data: args,
        success: function (json){
            fn(json)
        },
        error: function (err){
            try {
                if(err.responseJSON.code == 4){
                    layer.msg('令牌失效，请从新登录')
                    setTimeout(function(){
                        var login_address = sessionStorage.getItem('login_address')
                        if(login_address){
                            window.location.href = login_address // 令牌token失效，跳回登录页面
                        }
                    }, 1000)
                }else{
                    layer.msg("异常错误请联网后重试");
                }
            }
            catch(err) {
                layer.msg("异常错误请联网后重试");
            }

            
            
        }
    })
}


