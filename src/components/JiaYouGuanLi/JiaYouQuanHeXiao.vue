<template>
    <div class="JiaYouQuanHeXiao">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;加油券订单</span>
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
                    加油券ID：
                    <input  v-model="order_id" class="form-control line_input " >

                </li>
                <li>
                    持有人手机：
                    <input  v-model="order_id" class="form-control line_input " >

                </li>
               
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>加油卡ID</th>
                        <th>面额</th>
                        <th>持有人</th>
                        <th>持有人电话</th>
                        <th>购买时间</th>
                        <th>使用时间</th>
                        <th>使用油站</th>
                        <th>状态</th>
                        <th>操作</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td> 1 </td>
                        <td> 1 </td>
                        <td>1 </td>
                        <td> 1</td>
                        <td> 1</td>
                        <td>1 </td>
                        <td>
                           1
                        </td>
                        <td>
                            1
                        </td>
                        <td class="chakan" @click="see_it()">查看</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12 Top20" >
                <div id="page" style="text-align: center;"></div>
            </div>
        </div>
        
        
        
        <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 订单详情 </h4>
          </div>
          <div class="modal-body ">
             <h3>持有人信息</h3>
             
              <table class="table table-bordered">
                
                <tbody>
                    <tr >
                        <td style="width:20%">姓名</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                    <tr >
                        <td style="width:20%">电话</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                </tbody>
            </table>
            <h3>加油券信息</h3>
             
              <table class="table table-bordered">
                
                <tbody>
                    <tr >
                        <td style="width:20%">ID</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                    <tr >
                        <td style="width:20%">状态</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                     <tr >
                        <td style="width:20%">面额 </td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                     <tr >
                        <td style="width:20%">支付方式</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                     <tr >
                        <td style="width:20%">支付金额</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                     <tr >
                        <td style="width:20%">有效期</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                     <tr >
                        <td style="width:20%">购买日期</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                     <tr >
                        <td style="width:20%">使用日期</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                </tbody>
            </table>
            <h3>服务商信息</h3>
             
              <table class="table table-bordered">
                
                <tbody>
                    <tr >
                        <td style="width:20%">加油站名称</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                    <tr >
                        <td style="width:20%">加油站地址</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr><tr >
                        <td style="width:20%">联系人</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                    <tr >
                        <td style="width:20%">联系电话</td>
                        <td  style="width:80%"> 1 </td> 
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button @click="guanbi_post()" type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>

    </div>
</template>
<script>
export default {
    name: 'JiaYouQuanHeXiao',
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
			$("#myModal_1").modal('show')
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
.ml-20{
	margin-left:20px
}
</style>
