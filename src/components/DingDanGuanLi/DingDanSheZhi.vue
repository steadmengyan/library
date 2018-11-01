<template>
    <div class="DingDanSheZhi">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;订单设置</span>
                  </li>
              </ul>
        </header>

        <div class="content_body">
            <ul class="ul_guanbi Top20">
              <li class="one line_h40">
                订单超过：
              </li>
              <li class="two">
                  <input  v-model="notpay_time" class="form-control line_input centerTxt"> 时 &nbsp;&nbsp;&nbsp;&nbsp;
                  未付款，订单自动关闭
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one line_h40">
                订单发货超过：
              </li>
              <li class="two">
                  <input v-model="notover_time" class="form-control line_input centerTxt"> 天 &nbsp;&nbsp;&nbsp;&nbsp;
                  未确认收货，订单自动完成
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one line_h40">
                订单完成超过：
              </li>
              <li class="two">
                  <input v-model="notreturn_time" class="form-control line_input centerTxt"> 天 &nbsp;&nbsp;&nbsp;&nbsp;
                  自动结束交易，不能进行退货
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one line_h40">
                服务单确认后：
              </li>
              <li class="two">
                  <input v-model="notkuaidi_time" class="form-control line_input centerTxt"> 天 &nbsp;&nbsp;&nbsp;&nbsp;
                  内未录入商品物流返回信息，系统将自动取消本次服务申请。
              </li>
            </ul>
            <p style="text-align:center;margin: 20px;">
                <button @click="post_btn()" type="button" class="btn btn-primary">确定</button>
            </p>
        </div>

    </div>
</template>
<script>
export default {
    name: 'DingDanSheZhi',
    data () {
        return {
            shaixuan_show: false, // 控制筛选的打开和隐藏
            userId: '',
            first_time: '',
            end_time: '',
            listsTable: [],
            notpay_time: '', // 付款超时
            id_notpay_time: '', // 付款超时的id
            notover_time: '', // 收货超时
            id_notover_time: '', // 收货超时id
            notreturn_time: '', // 结束超时
            id_notreturn_time: '', // 结束订单id
            notkuaidi_time: '', // 取消服务的时间
            id_notkuaidi_time: '', // 取消服务时间的id
        }
    },
    created () {
        var this_1 = this
        this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
        // 获取付款超时的默认值
        get_notpay_time: function (curr) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId
            }
            // ajax-post
            var url = 'backStage/cf/carownerCfOrderNotpay/findInfo'
            post_ajax(url, aaa, function(json){
                // console.log('请求付款超时的值')
                // console.log(json)
                if(json.code == 0){
                    this_1.notpay_time = json.data.list[0].notpay_time
                    this_1.id_notpay_time = json.data.list[0].id
                }
            })
        },
        // 获取收货超时的默认值
        get_notover_time: function () {
            var this_1 = this
            var aaa = {
                userId: this_1.userId
            }
            // ajax-post
            var url = 'backStage/cf/carownerCfOrderNotover/findInfo'
            post_ajax(url, aaa, function(json){
                // console.log('请求收货超时的值')
                // console.log(json)
                if(json.code == 0){
                    this_1.notover_time = json.data.list[0].notover_time
                    this_1.id_notover_time = json.data.list[0].id
                }
            })
        },
         // 获取交易结束超时的默认值
        get_notreturn_time: function () {
            var this_1 = this
            var aaa = {
                userId: this_1.userId
            }
            // ajax-post
            var url = 'backStage/cf/carownerCfOrderNotreturn/findInfo'
            post_ajax(url, aaa, function(json){
                // console.log('请求付款超时的值')
                // console.log(json)
                if(json.code == 0){
                    this_1.notreturn_time = json.data.list[0].notreturn_time
                    this_1.id_notreturn_time = json.data.list[0].id
                }
            })
        },
        // 获取取消售后的
        get_notkuaidi_time: function () {
            var this_1 = this
            var aaa = {
                userId: this_1.userId
            }
            // ajax-post
            var url = 'backStage/cf/carownerCfOrderNotkuaidi/findInfo'
            post_ajax(url, aaa, function(json){
                // console.log('请求付款超时的值')
                // console.log(json)
                if(json.code == 0){
                    this_1.notkuaidi_time = json.data.list[0].notkuaidi_time
                    this_1.id_notkuaidi_time = json.data.list[0].id
                }
            })
        },

        // 提交数据的按钮
        post_btn: function () {
            var this_1 = this
            // 定义4个人变量接收回调 方便判断 
            var one = false
            var two = false
            var three = false 
            var four = false
            // 提交付款超时的设置
            this_1.post_notepayTime(function(ok_one){
                // console.log(111)
                // console.log(ok_one)
                one = ok_one
            })
            // 提交发货超时的设置
            this_1.post_notover_time(function(ok_one){
                // console.log(222)
                // console.log(ok_one)
                two = ok_one
            })
            // 结束的
            this_1.post_notreturn_time(function(ok_one){
                // console.log(333)
                // console.log(ok_one)
                three = ok_one
            })
            // 取消申请的
            this_1.post_notkuaidi_time(function(ok_one){
                // console.log(44)
                // console.log(ok_one)
                four = ok_one
            })
            layer.msg('修改成功')
            setTimeout(function(){
                    this_1.get_notpay_time() // 请求付款超时的设置数据
                    this_1.get_notover_time() // 请求收货超时的数据
                    this_1.get_notreturn_time() // 请求结束超时的数据
                    this_1.get_notkuaidi_time() // 取消服务申请的
            }, 1000)
        },
        // 提交1 付款超时
        post_notepayTime: function (fn) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                id: this_1.id_notpay_time,
                day: this_1.notpay_time
            }
            var url = 'backStage/cf/carownerCfOrderNotpay/insert'
            post_ajax(url, aaa, function (json) {
                // console.log(json)
                if(json.code == 0){
                    fn(true)
                }
            })
        },
        // 提交2 收货超时
        post_notover_time: function (fn) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                id: this_1.id_notover_time,
                day: this_1.notover_time
            }
            var url = 'backStage/cf/carownerCfOrderNotover/insert'
            post_ajax(url, aaa, function (json) {
                // console.log(json)
                if(json.code == 0){
                    fn(true)
                }
            })
        },
        // 提交3 结束超时
        post_notreturn_time: function (fn) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                id: this_1.id_notreturn_time,
                day: this_1.notreturn_time
            }
            var url = 'backStage/cf/carownerCfOrderNotreturn/insert'
            post_ajax(url, aaa, function (json) {
                // console.log(json)
                if(json.code == 0){
                    fn(true)
                }
            })
        },
        // 提交4 取消服务
        post_notkuaidi_time: function (fn) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                id: this_1.id_notkuaidi_time,
                day: this_1.notkuaidi_time
            }
            var url = 'backStage/cf/carownerCfOrderNotkuaidi/insert'
            post_ajax(url, aaa, function (json) {
                // console.log(json)
                if(json.code == 0){
                    fn(true)
                }
            })
        }
    },
    mounted () {
        var this_1 = this
        this_1.get_notpay_time() // 请求付款超时的设置数据
        this_1.get_notover_time() // 请求收货超时的数据
        this_1.get_notreturn_time() // 请求结束超时的数据
        this_1.get_notkuaidi_time() // 取消服务申请的
    }
}
</script>
<style scoped>
.line_input{
    width:200px;display:inline-block;
}
.search_ul>li{
    display: inline-block;
    margin-right: 20px;
}
.search_ul>li:nth-child(1){
    text-indent: 20px;
}
th,td{ 
    text-align:center; /** 设置水平方向居中 */ 
    vertical-align:middle; /** 设置垂直方向居中 */ 
}
  .ul_guanbi {
    display: flex;
  }

  .one {
    width: 30%;
    text-align: right;
  }

  .two {
    width: 60%;
  }
  .line_h40{
      line-height: 34px;
  }
  .centerTxt{
      text-align: center;
  }
</style>
