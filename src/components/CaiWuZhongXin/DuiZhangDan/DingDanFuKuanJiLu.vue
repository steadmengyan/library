<template>
    <div class="DingDanFuKuanJiLu">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;订单付款记录</span>
                  </li>
                  <li class="title_box_right">
                      <span class="shuaxin">
                        <button @click="refresh_page()" type="button" class="btn btn-outline btn-default">
                            <span class="glyphicon glyphicon-refresh"></span>
                            刷新
                        </button>
                    </span>
                  </li>
              </ul>
        </header>

        <nav class="content_nav">
            <ul class="content_nav_box">
                <li class="content_nav_left">
                    <span class="shujuliebiao">筛选查询</span>
                </li>
                <li class="content_nav_right">
                    <span @click="shaixuan_showBtn">
                        <span v-if="shaixuan_show"> 收起筛选</span>
                        <span v-else>打开筛选</span>
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button @click="init()" type="button" class="btn btn-outline btn-default">
                        查询结果
                    </button>
                </li>
            </ul>
            <ul class="search_ul dingdanjilu_ul">
                <li>
                    订单编号：
                    <input  v-model="order_id" class="form-control line_input " >

                </li>
                <li>
                    创建日期：
                    <input id="first_time"  class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="end_time"  class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">   
                </li>
                <li>
                    结算状态：
                    <select v-model="is_close" class="form-control  tem2 line_input" >
                        <option value="">请选择</option>
                        <option value="0">未结算</option>
                        <option value="1">已结算</option>
                    </select> 
                </li>
                <li>
                    支付方式：
                    <select v-model="pay_line" class="form-control  tem2 line_input" >
                        <option value="">请选择</option>
                        <option value="1">微信</option>
                        <option value="2">支付宝</option>
                    </select>
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>订单编号</th>
                        <th>订单金额</th>
                        <th>付款用户</th>
                        <th>付款日期</th>
                        <th>支付方式</th>
                        <th>实付金额</th>
                        <th>礼品订单</th>
                        <th>订单状态</th>
                        <th>操作</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.order_id}} </td>
                        <td> {{list.order_money}} </td>
                        <td> {{list.user_name}} </td>
                        <td> {{list.pay_time}} </td>
                        <td> {{list.pay_line}} </td>
                        <td> {{list.actually_money}} </td>
                        <td>
                            <span v-if="list.is_gift == 1">是</span>
                            <span v-else-if="list.is_gift == 0">否</span>
                        </td>
                        <td>
                            <span v-if="list.is_close == 0">未结算</span>
                            <span v-else-if="list.is_close == 1">已结算</span>
                        </td>
                        <td class="chakan" @click="see_it()">查看</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12 Top20" >
                <div id="page" style="text-align: center;"></div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'DingDanFuKuanJiLu',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            // 搜索字段
            first_time: '',
            end_time: '',
            order_id: '',
            is_close: '',
            pay_line: ''
            
        }
    },
    created () {
        var this_1 = this
        this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
        init: function (curr) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                pageNum: curr || "1",
                pageSize: "10"
            }
            // 搜索的 字段
            if($("#first_time").val()) aaa.first_time = $("#first_time").val()
            if($("#end_time").val()) aaa.end_time = $("#end_time").val()
            if(this_1.is_close !== '') aaa.is_close = this_1.is_close
            if(this_1.pay_line) aaa.pay_line = this_1.pay_line
            if(this_1.order_id) aaa.order_id = this_1.order_id
            // ajax-post
            var url = 'backStage/financial/selectOrderClose'
            post_ajax(url, aaa, function(json){
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.listsTable = json.data.list
                var pages = json.data.pages
                laypage({
                  cont: 'page',
                  pages: pages,
                  curr: curr || 1,
                  jump: function (e, first) {
                    if (!first) {
                      var curr = e.curr;
                      this_1.init(curr);
                    }
                  }
                })
            })
        },
        // 筛选框的显示隐藏
        shaixuan_showBtn: function () {
            var this_1 = this
            this_1.shaixuan_show = !this_1.shaixuan_show
            $(".search_ul").toggle(300)
        },
        // 刷新按钮
        refresh_page: function () {
            var this_1 = this
            $("#first_time").val('')
            $("#end_time").val('')
            this_1.is_close = ''
            this_1.pay_line = ''
            this_1.order_id = ''
            this_1.init()
        },
        // 查看按钮
        see_it () {
            var this_1 = this

        }
    },
    mounted () {
        var this_1 = this
        this_1.init()

    }
}
</script>
<style scoped>
.line_input{
    width:200px;display:inline-block;
}
.search_ul>li{
    display: inline-block;
    padding: 5px 20px;
}
th,td{ 
    text-align:center; /** 设置水平方向居中 */ 
    vertical-align:middle; /** 设置垂直方向居中 */ 
}
.color_169BD5{
    color: #169BD5;
}
</style>
