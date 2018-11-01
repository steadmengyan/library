
function baiduupload(xianzhi, fn){
    console.log('限制')
    console.log(xianzhi)
    var size = xianzhi.size || false
    var ww = xianzhi.ww || false
    var hh = xianzhi.hh || false
    if($("#myModal_uploadBox").length != 1){
        $("<div class='modal fade' id='myModal_uploadBox' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'> <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button> <h4 class='modal-title' id='myModalLabel'>图片上传</h4></div><div class='modal-body'>  <div class='div_imgall'><input type='file' class='input_flie' ref='file'><div class='div_shuline'></div><div class='div_hengline'></div></div><p id='ProgressEvent'></p>  </div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary'>开始上传</button></div></div></div></div>").appendTo('body')
        
    }
    $('#myModal_uploadBox').modal('show')
    $("#ProgressEvent").text('')
    $(".input_flie").on('change', function(event){
        // console.log(event)
        // 获取照片 必须给[0] 单张上传
        var img_file = event.target.files[0]
        if(size == true){
          var size_img = img_file.size
          if(size_img > size*1024){
            layer.msg('图片不能超过' + size + 'k')
            return
          }
        }
        // console.log(img_file)
        // 获取文件名字的后段
        var val = event.target.value
        var index = val.indexOf('.')
        var name_end = val.substr(index)
        let reader = new FileReader()
        reader.readAsDataURL(img_file)
        reader.onload = function(e){
            let imgs = new Image()
            imgs.src = e.target.result
            imgs.onload = function(){
                var height = this.height
                var width = this.width
                console.log('height: ' + height)
                console.log('width: ' + width)
                console.log('canshu')
                console.log(ww)
                console.log(hh)
                // 判断宽高有值，并且不相等
                if(ww !== false){
                    if(width != ww){
                        console.log('宽')
                        layer.msg('图片宽必须为: ' + ww + 'px')
                        return
                      }
                }
                if(hh !== false){
                    if(height != hh){
                        console.log('高')
                        layer.msg('图片高必须为： ' + hh + 'px')
                        return
                      }
                }
                
                // 获取oss签名
                $.ajax({
                    type: 'post',
                    url:  urls + 'backStage/oss/find',
                    data: '',
                    success: function(oss){
                        var name_start = new Date().getTime() + '' + Math.ceil(Math.random()*100)
                        var name = '/' + name_start + name_end
                        // console.log('文件名')
                        var get_url = oss.data.host + '/' + oss.data.dir  + name
                        var ossData = new FormData()
                        ossData.append('OSSAccessKeyId', oss.data.accessid);
                        ossData.append('policy', oss.data.policy);
                        ossData.append('Signature', oss.data.signature);
                        ossData.append('keys', oss.data.dir)
                        ossData.append('key', oss.data.dir + name);
                        ossData.append('success_action_status', 200); // 指定返回的状态码 
                        ossData.append('type', 'image/jpeg')
                        ossData.append("file", img_file);
                        //上传+进度条
                        var xhrOnProgress=function(fun) {
                            xhrOnProgress.onprogress = fun; 
                            return function() {
                                var xhr = $.ajaxSettings.xhr();
                                if (typeof xhrOnProgress.onprogress !== 'function')
                                  return xhr;
                                if (xhrOnProgress.onprogress && xhr.upload) {
                                  xhr.upload.onprogress = xhrOnProgress.onprogress;
                            }
                            return xhr;
                          }
                        };
                        // 开始上传 
                        $.ajax({
                            type: 'post',
                            url: oss.data.host,
                            data: ossData,
                            dataType: 'xml', // 这里加个对返回内容的类型指定
                            processData: false, //不需要进行序列化处理 
                            async: true, //发送同步请求 
                            contentType: false, //避免服务器不能正常解析文件 
                            xhr:xhrOnProgress(function(e){
                                var percent=parseInt(e.loaded / e.total*100);
                                console.log('进度')
                                console.log(percent)
                                $("#ProgressEvent").text(percent + '%')
                                if(percent>=100){
                                    $("#ProgressEvent").text('服务器处理中')
                                }
                            }),
                            success: function(){
                                fn(get_url)
                                $(".input_flie").off('change')
                                $("#myModal_uploadBox").modal('hide')
                            },
                            error: function(err){
                                console.log('err')
                                console.log(err)
                            }
                        })
                    }
                })
            }
        }
    })
}
