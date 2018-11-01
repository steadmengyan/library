<template>
    <div class="HeHuoRenYongJinJieSuanXiangQing">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;合伙人佣金结算详情</span>
                  </li>
                  <li class="title_box_right">
                      <span class="shuaxin">
                        <button @click="fanhui()" type="button" class="btn btn-outline btn-default">
                            < 返回
                        </button>
                    </span>
                  </li>
              </ul>
        </header>


        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>修理厂</th> 
                        <th>佣金</th>
                        <th>佣金费率</th>
                        <th>收款时间</th>
                        <th>收款金额（实收金额）</th>
                        <th>收款编号</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.garage_name}} </td>
                        <td> {{list.separamoney}} </td>
                        <td> {{list.close_rate}} % </td>
                        <td> {{list.close_time}} </td>
                        <td> {{list.pay_money}} </td>
                        <td> {{list.order_id}} </td>
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
    name: 'HeHuoRenYongJinJieSuanXiangQing',
    data () {
        return {
            shaixuan_show: false, // 控制筛选的打开和隐藏
            userId: '',
            agent_id: '',
            listsTable: '',
            first_time: '',
            end_time: ''
        }
    },
    created () {
        var this_1 = this
        this_1.userId = sessionStorage.getItem('uid')
        this_1.agent_id = this_1.$route.query.agent_id
        this_1.first_time = this_1.$route.query.first_time
        this_1.end_time = this_1.$route.query.end_time

    },
    methods: {
        init: function (curr) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                pageNum: curr || "1",
                pageSize: "10",
                agent_id: this_1.agent_id,
                first_time: this_1.first_time,
                end_time: this_1.end_time
            }
            // 筛选的条件
            // ajax-post
            var url = 'backStage/financial/selectAgentMoneyDetail' 
            post_ajax(url, aaa, function(json){
                // console.log('合伙人佣金结算页面')
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
        // 查看按钮
        fanhui () {
            var this_1 = this
            this_1.$router.push({
                name: 'HeHuoRenYongJinJieSuan'
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
