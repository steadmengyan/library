<template>
    <div class="XiuLiChangShouKuanJieSuan">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;商城订单结算</span>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;
                
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
                    供货商编号：
                    <input v-model="shop_id" type="text" class="form-control line_input"> 
                </li>
                <li>
                    修理厂：
                    <input v-model="shop_name" type="text" class="form-control line_input"> 
                </li>
                <li>
                    收款日期：
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
                        <th>供货商编号</th>
                        <th>供货商名称</th>
                        <th>订单数量</th>
                        <th>商品数量</th>
                        <th>结算日期</th>
                        <th>操作</th>  
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.shop_id}} </td>
                        <td> {{list.shop_name}} </td>
                        <td> {{list.order_number}} </td>
                        <td> {{list.good_number}} </td>
                        <td> {{list.first_time }} - {{list.end_time}} </td>
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
    name: 'XiuLiChangShouKuanJieSuan',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            // 搜索的字段
            shop_name: '',
            shop_id: ''
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
                pageSize: "10",
                first_time: $("#first_time").val(),
                end_time: $("#end_time").val()
            }
            // 搜索的 字段
            if(this_1.shop_name) aaa.shop_name = this_1.shop_name
            if(this_1.shop_id) aaa.shop_id = this_1.shop_id
            // ajax-post
            var url = 'backStage/financial/selectShoppingOrder'
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
            this_1.shop_name = ''
            this_1.shop_id = ''
            this_1.init()
        },
        // 查看按钮
        see_it () {
            var this_1 = this
            // layer.msg('开发提醒：待原型指定页面')
            // 待原型置顶查看的页面
            // this_1.$router.push({
            //     name: 'XiuLiChangShouKuanJieSuanMingXi'
            // })
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
.color_r{
    color: red;
}
th,td{ 
    text-align:center; /** 设置水平方向居中 */ 
    vertical-align:middle; /** 设置垂直方向居中 */ 
}
</style>
