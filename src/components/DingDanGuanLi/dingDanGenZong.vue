<template>
    <div class="dingDanGenZong">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;订单跟踪</span>
                  </li>
                  <li class="title_box_right">
                      <span class="shuaxin">
                        <button @click="return_previousPage()" type="button" class="btn btn-outline btn-default">
                            < 返回
                        </button>
                    </span>
                  </li>
              </ul>
        </header>

        <div class="content_body" style="padding:20px;">
            <ul v-for="(list, index) in express_info" :key="index" class="top10">
                <li class="top10"> {{list.AcceptTime}} </li>
                <li class="top10"> {{list.AcceptStation}} </li>
                <li v-if="index < express_info.length -1" class="top10" style="padding-left:20px;">
                    <span class="glyphicon glyphicon-arrow-down down_style"></span>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
export default {
    name: 'dingDanGenZong',
    data () {
        return {
            shaixuan_show: false, // 控制筛选的打开和隐藏
            userId: '',
            first_time: '',
            end_time: '',
            express_info: [], // 物流详细数据
            order_id: ''
        }
    },
    created () {
        var this_1 = this
        this_1.userId = sessionStorage.getItem('uid')
        this_1.order_id = this_1.$route.query.order_id
    },
    methods: {
        init: function () {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                order_id: this_1.order_id,
                type: '1'
            }
            // ajax-post
            var url = 'backStage/goodsOrderDetail/express'
            post_ajax(url, aaa, function(json){
                // console.log('请求的页面的初始数据')
                // console.log(json)
                if(json.code == 0){
                    this_1.express_info = json.data.express_info
                }
            })
        },
        // 筛选框的显示隐藏
        shaixuan_showBtn: function () {
            var this_1 = this
            this_1.shaixuan_show = !this_1.shaixuan_show
            $(".search_ul").toggle(300)
        },
        // 查看按钮
        return_previousPage: function () {
            var this_1 = this
            this_1.$router.push({
                name: 'DingDanLieBiao'
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
.down_style{
    font-size: 20px;
}
.top10{
    margin-top: 10px;
}
</style>
