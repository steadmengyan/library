<template>
    <div class="XiuLiChangShouKuanJieSuan">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;运费对账</span>
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
            <ul class="search_ul">
                <li>
                    订单编号：
                    <input v-model="order_id" type="text" class="form-control line_input"> 
                </li>
                <li>
                    供货商：
                    <input v-model="shop_name" type="text" class="form-control line_input"> 
                </li>
                <li>
                    结算时间：
                    <input id="first_time"  class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="end_time"  class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">   
                </li>
                
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>订单编号</th>
                        <th>供货商名称</th>
                        <th>快递公司</th>
                        <th>快递单号</th>
                        <th>运费</th>
                        <th>结算时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.order_id}} </td>
                        <td> {{list.shop_name}} </td>
                        <td> {{list.logistics_name}} </td>
                        <td> {{list.logistics_number}} </td>
                        <td> {{list.express_money}} </td>
                        <td> {{list.close_time}} </td>
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
    name: 'YunFeiDuiZhang',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            listsTable: [],
            userId: '',
            // 搜索的字段
            order_id: '',
            shop_name: ''
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
            if(this_1.order_id) aaa.order_id = this_1.order_id
            if(this_1.shop_name) aaa.shop_name = this_1.shop_name
            if($("#first_time").val()) aaa.first_time = $("#first_time").val()
            if($("#end_time").val()) aaa.end_time = $("#end_time").val()
            // 筛选的条件
            // ajax-post
            var url = 'backStage/financial/selectFreight' 
            post_ajax(url, aaa, function(json){
                // console.log('对账单运费页面')
                // console.log(json)
                this_1.listsTable = json.data.list
                for(var i in this_1.listsTable){
                    if(this_1.listsTable[i].close_time){
                        this_1.listsTable[i].close_time = get_str_time(this_1.listsTable[i].close_time)
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
        // 筛选框的显示隐藏
        shaixuan_showBtn: function () {
            var this_1 = this
            this_1.shaixuan_show = !this_1.shaixuan_show
            $(".search_ul").toggle(300)
        },
        // 刷新按钮
        refresh_page: function () {
            var this_1 = this
            // 刷新，清空搜索数据
            this_1.order_id = ''
            this_1.shop_name = ''
            $("#first_time").val('')
            $("#end_time").val('')
            this_1.init()
        },
        // 查看按钮
        see_it () {
            var this_1 = this
            this_1.$router.push({
                name: 'XiuLiChangShouKuanJieSuanMingXi'
            })
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
    margin-right: 20px;
}
.search_ul>li:nth-child(1){
    text-indent: 20px;
}
th,td{ 
    text-align:center; /** 设置水平方向居中 */ 
    vertical-align:middle; /** 设置垂直方向居中 */ 
}
</style>
