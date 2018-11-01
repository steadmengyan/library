<template>
    <div class="xiulichangshoukuanjiesuanmingxi">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;修理厂安装结算明细</span>
                  </li>
                  <li class="title_box_right">
                      <span class="shuaxin">
                        <button @click="fanhui" type="button" class="btn btn-outline btn-default">
                            <
                            返回
                        </button>
                    </span>
                  </li>
              </ul>
        </header>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="chakan table_title">结算金额合计：￥999999</caption>
                <thead>
                    <tr>
                        <th>作业编号</th>
                        <th>作业时间</th>
                        <th>客户名称</th>
                        <th>联系电话</th>
                        <th>返佣金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.task_show_id}} </td>
                        <td> {{list.install_time}} </td>
                        <td> {{list.user_phone}} </td>
                        <td> {{list.user_phone}} </td>
                        <td> ￥ {{list.money}} </td>
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
    name: 'XiuLiChangShouKuanJieSuanMingXi',
    data () {
        return {
            shaixuan_show: false, // 控制筛选的打开和隐藏
            listsTable: [],
            garage_id: '',
            first_time: '',
            end_time: ''
        }
    },
    created () {
        var this_1 = this
        this_1.userId = sessionStorage.getItem('uid')
        this_1.garage_id = this_1.$route.query.garage_id
        this_1.first_time = this_1.$route.query.first_time
        this_1.end_time = this_1.$route.query.end_time
    },
    methods: {
        init: function (curr) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                garage_id: this_1.garage_id,
                pageNum: curr || "1",
                pageSize: "10",
                first_time: this_1.first_time,
                end_time: this_1.end_time
            }
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
        // 查看按钮
        see_it () {
            var this_1 = this
            this_1.$router.push({
                name: 'XiuLiChangShouKuanJieSuanXiangDan'
            })
        },
        fanhui () {
            var this_1 = this
            this_1.$router.push({
                name: 'XiuLiChangShouKuanJieSuan'
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
