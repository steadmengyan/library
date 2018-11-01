<template>
  <div class="tuiHuanHuoShenQingChuLi">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;退换货申请处理</span>
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

    <ul class="content_nav dingdanliebiao_nav">
      <li @click="click_status(0)">全部订单</li>
      <li @click="click_status(1)">待处理 ( {{one}} ) </li>
      <li @click="click_status(2)">处理中 ( {{two}} ) </li>
      <li @click="click_status(3)">已完成 ( {{three}} ) </li>
      <li @click="click_status(4)">已拒绝 ( {{four}} ) </li>
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
      <ul class="search_ul">
        <li>
          服务单号：
          <input v-model="order_number" class="form-control line_input">
        </li>
        <li>
          收货人：
          <input v-model="link_man" class="form-control line_input" placeholder="姓名/手机号">
        </li>
        <li>
          申请时间：
          <input id="first_time" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"> &nbsp;&nbsp; - &nbsp;&nbsp;
          <input id="end_time" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
        </li>
      </ul>
    </nav>

    <div class="content_body">
      <table class="table table-bordered">
        <caption class="table_title clearfix">
          <span class="left">数据列表</span>
          <span class="right">
            <button @click="piliang_fahuo()" type="button" class="btn btn-outline btn-default">
              批量发货
            </button>
          </span>
        </caption>
        <thead>
          <tr>
            <th>服务单号</th>
            <th>申请时间</th>
            <th>用户名称</th>
            <th>退款金额</th>
            <th>联系人</th>
            <th>服务类别</th>
            <th>申请状态</th>
            <th>处理时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
              <td> {{list.id}} </td>
              <td> {{list.add_time}} </td>
              <td> {{list.userName}} </td>
              <td> ￥{{list.money}} </td>
              <td>
                <span> {{list.to_concat}} </span>
                <p> {{list.to_concat_phone}} </p>
              </td>
              <td>
                <span v-if="list.type == 1">仅退款</span>
                <span v-else-if="list.type == 2">退货退款</span>
                <span v-else-if="list.typ == 3">换货</span>
              </td>
              <td>
                <!-- <span v-if="list.return_status == 1">待商家处理</span>
                <span v-else-if="list.return_status == 2">退款已成功</span>
                <span v-else-if="list.return_status == 4">买家待发货</span>
                <span v-else-if="list.return_status == 5">买家已发货</span>
                <span v-else-if="list.return_status == 6">商家已收货</span>
                <span v-else-if="list.return_status == 7">退货退款完成</span>
                <span v-else-if="list.return_status == 8">商家已重新发货</span>
                <span v-else-if="list.return_status == 9">换货结束</span>
                <span v-else-if="list.return_status == 10">审核不通过</span>
                <span v-else-if="list.return_status == 11">取消</span> -->
                <span v-if="list.status == 1">未审核</span>
                <span v-else-if="list.status == 2">同意</span>
                <span v-else-if="list.status == 3">驳回</span>
              </td>
              <td> {{list.audit_time}} </td>
              <td> 
                <span @click="see_it(list.id)" class="chakan">查看详情</span>
              </td>
          </tr>
        </tbody>
      </table>
      <div class="col-xs-12 Top20">
        <div id="page" style="text-align: center;"></div>
      </div>
    </div>





  </div>
</template>
<script>
  export default {
    name: 'tuiHuanHuoShenQingChuLi',
    data() {
      return {
        shaixuan_show: true, // 控制筛选的打开和隐藏
        userId: '',
        first_time: '',
        end_time: '',
        listsTable: [],
        // 头部信息的参数
        one: '',
        two: '',
        three: '',
        four: '',
        // 搜索的字段
        order_number: '',
        link_man: '',
        first_time: '',
        end_time: '',
        // 处理头部点击的参数
        return_state: '',
        finish_state: '',
        being: ''
      }
    },
    created() {
      var this_1 = this
      this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
      // 请求头部的数据
      get_headerMsg: function () {
        var this_1 = this
        var aaa = {
          userId: this_1.userId
        }
        post_ajax('backStage/backOrderInformation/selectCount', aaa, function (json) {
          // console.log('头部的信息')
          if(json.code == 0){
            this_1.one = json.data.one
            this_1.two = json.data.two
            this_1.three = json.data. three
            this_1.four = json.data.four
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
        // 筛选框的筛选
        if(this_1.order_number) aaa.order_number = this_1.order_number
        if(this_1.link_man) aaa.link_man = this_1.link_man
        if($("#first_time").val()) aaa.first_time = $("#first_time").val()
        if($("#end_time").val()) aaa.end_time = $("#end_time").val()
        // 头部的筛选
        if(this_1.return_state) aaa.return_state = this_1.return_state
        if(this_1.finish_state) aaa.finish_state = this_1.finish_state
        if(this_1.being) aaa.being = this_1.being
        // console.log(aaa)
        // ajax-post
        var url = 'backStage/backOrderInformation/findBackOrder'
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
      // 点击头的赛选的
      click_status: function (status) {
        var this_1 = this
        // console.log(status)
        // 清空默认值
          this_1.return_state = ''
          this_1.finish_state = ''
          this_1.being = ''
        if(status == 0){

        }else if (status == 1){
          this_1.return_state = '1'
        }else if (status == 2){
          this_1.being = '1'
        }else if (status == 3){
          this_1.finish_state = '1'
        }else if (status == 4){
          this_1.return_state = '3'
        }

        this_1.init()
      },
      // 筛选框的显示隐藏
      shaixuan_showBtn: function () {
        var this_1 = this
        this_1.shaixuan_show = !this_1.shaixuan_show
        $(".search_ul").toggle(300)
      },
      // 查看按钮
      see_it: function (id) {
        var this_1 = this
        this_1.$router.push({
          name: 'tuiHuanHuoXiangQing',
          query: {
            id: id
          }
        })
      },
      // 批量发货
      piliang_fahuo: function(){
        var this_1 = this
        this_1.$router.push({
          path: '/DingDanPiLiaoFaHuo'
        })
      },
      // 刷新按钮
      refresh_page: function () {
        var this_1 = this
        // 筛选框的筛选清除
        this_1.order_number = ''
        this_1.link_man = ''
        $("#first_time").val('')
        $("#end_time").val('')
        // 头部的筛选
        this_1.return_state = ''
        this_1.finish_state = ''
        this_1.being = ''

        this_1.init()
      }
    },
    mounted() {
      var this_1 = this
      this_1.get_headerMsg() // 请求头部信息
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
