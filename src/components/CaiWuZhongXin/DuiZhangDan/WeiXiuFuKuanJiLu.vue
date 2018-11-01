<template>
    <div class="WeiXiuFuKuanJiLu">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;维修付款记录</span>
                  </li>
                  <li class="title_box_right">
                      <span class="shuaxin">
                        <button @click="shuaxin()" type="button" class="btn btn-outline btn-default">
                            <span class="glyphicon glyphicon-refresh"></span>
                            刷新
                        </button>
                    </span>
                  </li>
              </ul>
        </header>

        <ul class="content_body shoukuanjilu_title">
            <li>
                <p>今日收款次数</p>
                <p>  
                    <span class="redTxtBig"> {{count_number}} </span> 次
                </p>
            </li>
            <li>
                <p>今日收款金额</p>
                <p>  
                    ￥ <span class="redTxtBig"> {{money}} </span> 
                </p>
            </li>
        </ul>

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
            <ul class="search_ul" >
                <li>
                    收款日期：
                    <input id="firstTime"  class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="endTime"  class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">   
                </li>
                <li>
                    <div class="btn-group" >
                        <button type="button" @click="day_btn(1)" class="btn btn-default whiteBlack">今天</button>
                        <button type="button" @click="day_btn(2)" class="btn btn-default whiteBlack">昨天</button>
                        <button type="button" @click="day_btn(3)" class="btn btn-default whiteBlack">本月</button>
                    </div>
                </li>
                <li>
                    收款编号：
                    <input v-model="order_id"  class="form-control line_input " >   
                </li>
                <li>
                    修理厂：
                    <select v-model="garageId" class="form-control  tem2 line_input" >
                        <option value="">全部</option>
                        <option :value="list.garageId" v-for="(list, index) in garage_arr" :key="index"> {{list.companyName}} </option>
                    </select> 
                </li>
                <li>
                    支付渠道：
                    <select v-model="pay_line" class="form-control  tem2 line_input" >
                        <option value="">全部</option>
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
                          <th>收款编号</th>
                          <th>付款时间</th>
                          <th>付款用户</th>
                          <th>修理厂编号</th>
                          <th>订单金额</th>
                          <th>参与送礼</th>
                          <th>支付渠道</th>
                          <th>结算状态</th>
                          <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.order_id}} </td>
                        <td> {{list.pay_time}} </td>
                        <td> {{list.member_name}} </td>
                        <td> {{list.companyId}} </td>
                        <td> {{list.money}} </td>
                        <td>
                            <span v-if="list.is_activity == 1">参与</span>
                            <span v-else-if="list.is_activity == 0">不参与</span>
                            <p v-if="list.is_activity == 1">{{list.policy_number}}</p>
                        </td>
                        <td>
                            <span v-if="list.pay_line == 1">微信</span>
                            <span v-else-if="list.pay_line == 2">支付宝</span>
                            <p>{{ list.pay_order_number}}</p>
                        </td>
                        <td>
                            <span v-if="list.close_state == 1">未结算</span>
                            <span v-else-if="list.close_state == 2">已结算</span>
                        </td>
                        <td class="chakan" @click="see_it(list)">查看详情</td>
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
    name: 'WeiXiuFuKuanJiLu',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            // 顶部的信息
            count_number: '',
            money: '',
            // 搜索的字段
            firstTime: '',
            firstTime: '',
            pay_line: '',
            order_id: '',
            garage_arr: [],
            garageId: ''
            
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
                // userId: this_1.userId,
                pageNum: curr || "1",
                pageSize: "10"
            }
            // 搜索条件
            if($("#firstTime").val()) aaa.firstTime = $("#firstTime").val()
            if($("#endTime").val()) aaa.endTime = $("#endTime").val()
            if(this_1.firstTime) aaa.firstTime = this_1.firstTime
            if(this_1.endTime) aaa.endTime = this_1.endTime
            if(this_1.pay_line) aaa.pay_line = this_1.pay_line
            if(this_1.order_id) aaa.order_id = this_1.order_id
            if(this_1.garageId) aaa.garageId = this_1.garageId
            // ajax-post
            var url = 'backStage/financial/garagePay' 
            post_ajax(url, aaa, function(json){
                // console.log('请求的维修付款页面的初始数据')
                // console.log(json)
                this_1.listsTable = json.data.list
                for(var i in this_1.listsTable){
                    if(this_1.listsTable[i].pay_time){
                      this_1.listsTable[i].pay_time = get_str_time(this_1.listsTable[i].pay_time)  
                    }
                }
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
        get_title: function(){
            var this_1 = this
            var url = 'backStage/financial/selectToday'
            var aaa = {}
            post_ajax(url, aaa, function(json){
                // console.log(json)
                if(json.code == 0){
                    this_1.count_number = json.data.count_number
                    this_1.money = json.data.money
                }
            })
        },
        // 请求已经使用的维修厂
        get_garage: function(){
            var this_1 = this
            var aaa = {}
            var url = 'backStage/financial/selectGarageName'
            post_ajax(url, aaa, function(json){
                // console.log('请求已经使用的维修厂')
                // console.log(json)
                if(json.code == 0){
                    this_1.garage_arr = json.data.list
                }
            })
        },
        // 筛选框的显示隐藏
        shaixuan_showBtn: function () {
            var this_1 = this
            this_1.shaixuan_show = !this_1.shaixuan_show
            $(".search_ul").toggle(300)
        },
                // 点击今天，昨天，本月的
        day_btn: function (num) {
            var this_1 = this
            if(num == 1){
                // 今天的现在的时间
                var endTime = new Date()
                this_1.endTime = get_str_time(endTime)
                // console.log('今天的现在时间')
                // console.log(this_1.endTime)
                // 获取今天的零点的时间戳
                var firstTime = new Date()
                firstTime.setHours(0)
                firstTime.setMinutes(0)
                firstTime.setSeconds(0)
                firstTime.setMilliseconds(0)
                firstTime = firstTime.getTime()
                firstTime = get_str_time(firstTime)
                // console.log('今天的0点的时间戳')
                // console.log(firstTime) 
                this_1.firstTime = firstTime   
            }else if (num == 2){
                
                // 获取昨天的零点的时间戳
                var firstTime = new Date()
                firstTime.setHours(24)
                firstTime.setMinutes(0)
                firstTime.setSeconds(0)
                firstTime.setMilliseconds(0)
                firstTime = firstTime.getTime()
                firstTime = firstTime - 24*60*60*1000*2
                firstTime = get_str_time(firstTime)
                // console.log('昨天的0点的时间戳')
                // console.log(firstTime) 
                this_1.firstTime = firstTime   

                // 昨天的24点的时间
                var endTime = new Date()
                endTime.setHours(24)
                endTime.setMinutes(0)
                endTime.setSeconds(0)
                endTime.setMilliseconds(0)
                endTime = endTime.getTime()
                endTime = endTime - 24*60*60*1000
                endTime = get_str_time(endTime)
                // console.log('昨天的24点的时间戳')
                // console.log(endTime) 
                this_1.endTime = endTime 

            }else if (num == 3){
                // 获取本月第一天的零点的时间戳 开始时间
                var firstTime = new Date()
                firstTime.setDate(1)
                firstTime.setHours(0)
                firstTime.setMinutes(0)
                firstTime.setSeconds(0)
                firstTime.setMilliseconds(0)
                firstTime = firstTime.getTime()
                firstTime = get_str_time(firstTime)
                // console.log('本月第一天的0点的时间戳')
                // console.log(firstTime) 
                this_1.firstTime = firstTime   

                // 本月里现在的时间 结束时间
                var endTime = new Date()
                this_1.endTime = get_str_time(endTime)
                // console.log('本月里今天的现在时间')
                // console.log(this_1.endTime)
            }
            this_1.init()
        },
        // 查看按钮
        see_it: function (list) {
            var this_1 = this
            // XiuLiChangShouKuanJieSuanXiangDan?order_id=G153509149885617&garage_id=1002
            this_1.$router.push({
                path: '/XiuLiChangShouKuanJieSuanXiangDan',
                query: {
                    order_id: list.order_id,
                    garage_id: list.companyId,
                    num: '1' // 方便回跳的参数
                }
            })
        },
        // 刷新
        shuaxin: function(){
            var this_1 = this
            // 刷新时清空数据
            $("#firstTime").val('')
            $("#endTime").val('')
            this_1.firstTime = ''
            this_1.endTime = ''
            this_1.pay_line = ''
            this_1.order_id = ''
            this_1.garageId = ''
            this_1.init()
            this_1.get_title()
        }
    },
    mounted () {
        var this_1 = this
        this_1.init()
        this_1.get_title()
        this_1.get_garage()

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
.whiteBlack{
    background-color: white;
    color: black;
}
.color_169BD5{
    color: #169BD5;
}
.shoukuanjilu_title{
    border: 1px solid #e4e4e4;
    display: flex;
    text-align: center;
    padding: 20px 0;
}
.shoukuanjilu_title>li{
    width: 50%;
    
}
.shoukuanjilu_title>li:nth-child(1){
    border-right: 5px solid #bbe2f0;
}
.redTxtBig{
    color: red;
    font-size: 30px;
    font-weight: 700;
}
</style>
