<template>
  <div class="DingDanLieBiao">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;加油券管理</span>
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

  

    <div class="content_body">
      <table class="table table-bordered">
        <caption class="table_title clearfix">
          <span class="left">数据列表</span>
          <span class="right">
            <button @click="piliang_fahuo()" type="button" class="btn btn-outline btn-default">
              添加
            </button>
          </span>
        </caption>
        <thead>
          <tr>
            <th>加油券名称</th>
            <th>面额</th>
            <th>有效期</th>
            <th>销售数量</th>
            <th>使用数量</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td>  {{list.id}} </td>
            <td> {{list.soc_create}} </td>
            <td> {{list.userName}} </td>
            <td> ￥ {{list.order_money}} </td>
            <td>
              <span v-if="list.pay_type == 1">微信</span>
              <span v-else-if="list.pay_type == 2">支付宝</span>
              <p> {{list.pay_order_number}} </p>
            </td>
            <td> 
              <span v-if="list.state == 1"> 待付款 </span>
              <span v-else-if="list.state == 2">待发货</span>
              <span v-else-if="list.state == 3">待收货</span>
              <span v-else-if="list.state == 4">已完成</span>
              <span v-else-if="list.state == 5">已取消</span>
              <span v-else-if="list.state == 6">已关闭</span>
              <span v-else-if="list.state == 7">删除订单</span>
            </td>
            <td>
              <span  class="chakan">下架</span>
              <span   class="chakan">编辑</span>
              <span  class="chakan"> 删除 </span>
              
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-xs-12 Top20">
        <div id="page" style="text-align: center;"></div>
      </div>
    </div>

    <!-- 模态框（Modal）关闭订单 -->
    <div class="modal fade" id="myModal_guanBi" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 关闭订单 </h4>
          </div>
          <div class="modal-body">
              <ul class="ul_guanbi">
                  <li class="one">
                      <span style="color:red;">*</span>
                      关闭备注：
                  </li>
                  <li  class="two">
                      <textarea v-model="remark" class="form-control" rows="3" name="textarea"></textarea>
                  </li>
              </ul>
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
    name: 'DingDanLieBiao',
    data() {
      return {
        shaixuan_show: true, // 控制筛选的打开和隐藏
        userId: '',
        listsTable: [],
        // 页面顶部的信息
        state_one: '',
        state_two: '',
        state_three: '',
        state_four: '',
        state_five: '',
        state_six: '',
        // 搜索的参数
        order_number: '',
        to_contacts: '',
        firstTime: '',
        endTime: '',
        status: '',
        // 订单发货
        id: '', // 订单发货的id
        express_name: '', // 发货的公司
        express_list: [], // 物流公司
        express_number: '', // 发货号
        fahuo_to_contacts: '', // 发货模块的收货人
        to_province: '',
        to_citys: '',
        to_areas: '',
        // 关闭订单的参数
        remark: '',

      }
    },
    created() {
      var this_1 = this
      this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
      // 得到顶部的信息
      get_msg:  function () {
        var this_1 = this
        var aaa = {
          userId: this_1.userId
        }
        var url = 'backStage/goodsOrderDetail/selectOrderStateCount'
        post_ajax(url, aaa, function(json){
          // console.log('请求页面顶部的信息')
          // console.log(json)
          if(json.code == 0){
            this_1.state_one = json.data.state_one
            this_1.state_two = json.data.state_two
            this_1.state_three = json.data.state_three
            this_1.state_four = json.data.state_four
            this_1.state_five = json.data.state_five
            this_1.state_six = json.data.state_six
          }
        })
      },
      init: function (curr) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          pageNum: curr || "1",
          pageSize: "10"
        }
        // 搜索字段
        if(this_1.order_number) aaa.order_number = this_1.order_number
        if(this_1.to_contacts) aaa.to_contacts = this_1.to_contacts
        if($("#firstTime").val()) aaa.firstTime = $("#firstTime").val()
        if($("#endTime").val()) aaa.endTime = $("#endTime").val()
        if(this_1.status != '0') aaa.status = this_1.status
        // ajax-post
        var url = 'backStage/goodsOrderDetail/findDetail'
        post_ajax(url, aaa, function (json) {
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
      // 点击顶部的信息选择按钮
      orderState_btn: function (num) {
        var this_1 = this
        this_1.status = num
        this_1.init()
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
        // 清空搜索字段
        this_1.order_number = ''
        this_1.to_contacts = ''
        $("#firstTime").val('')
        $("#endTime").val('')
        this_1.status = ''
        this_1.init()
      },

  
    
 
 
    },
    mounted() {
      var this_1 = this
      this_1.get_msg() // 请求头部信息
      this_1.init()
      // 鼠标悬浮到导航栏上让颜色河北边框变换
      $(".dingdanliebiao_nav").children('li').hover(function () {
        $(this).css({
          border: '1px solid #6dc0fe'
        })
      }, function () {
        $(this).css({
          border: '1px solid #e4e4e4'
        })
      })
    }
  }

</script>
<style scoped>
  .line_input {
    width: 200px;
    display: inline-block;
  }

  .search_ul>li {
    display: inline-block;
    margin-right: 20px;
  }

  .search_ul>li:nth-child(1) {
    text-indent: 20px;
  }

  th,
  td {
    text-align: center;
    /** 设置水平方向居中 */
    vertical-align: middle;
    /** 设置垂直方向居中 */
  }

  .dingdanliebiao_nav {
    display: flex;
    border: 0;
  }

  .dingdanliebiao_nav>li {
    margin: 5px 10px;
    padding: 5px 30px;
    border: 1px solid #e4e4e4;
  }

  .left {
    display: inline-block;
    float: left;
  }

  .right {
    display: inline-block;
    float: right;
    padding-right: 20px;
  }
  .ul_guanbi{
      display: flex;
  }
.one{
    width: 30%;
    text-align: right;
}
.two{
    width: 60%;
}
.line_h34{
    line-height: 34px;
}
</style>
