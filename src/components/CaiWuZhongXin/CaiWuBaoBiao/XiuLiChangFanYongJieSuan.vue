<template>
    <div class="XiuLiChangFanYongJieSuan">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;修理厂安装费用结算</span>
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
                <li >
                    &nbsp;&nbsp;
                    收款日期：
                    <input id="first_time"  class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                     - 
                    <input id="end_time"  class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">   
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>修理厂编号</th>
                        <th>修理厂名称</th>
                        <th>实收金额</th>
                        <th>结算日期</th>
                        <th>交易数量</th>
                        <th>操作</th>   
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.garage_id}} </td>
                        <td> {{list.service_shop}} </td>
                        <td> {{list.money}} </td>
                        <td> {{list.first_time}} - {{list.end_time}} </td>
                        <td> {{list.order_count}} </td>
                        <td class="chakan" @click="see_it(list)">查看</td>
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
    name: 'XiuLiChangFanYongJieSuan',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            listsTable: []
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

            // ajax-post
            var url = 'backStage/financial/selectBackClose'
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
            this_1.init()
        },
        // 查看按钮
        see_it (list) {
            var this_1 = this
            this_1.$router.push({
                name: 'XiuLiChangAnZhuangJieSuanMingXi',
                query: {
                    garage_id: list.garage_id,
                    first_time: list.first_time,
                    end_time: list.end_time
                }
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
th,td{ 
    text-align:center; /** 设置水平方向居中 */ 
    vertical-align:middle; /** 设置垂直方向居中 */ 
}
</style>

