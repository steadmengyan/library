<template>
  <div class="DingDanPiLiaoFaHuo">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;订单批量发货</span>
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
      <ul class="search_ul" style="display:none;">
        <!-- <li>
          供货商：
          <input class="form-control line_input">
        </li> -->
        <li>
          收货人：
          <input v-model="to_contacts" class="form-control line_input">
        </li>
        <li>
          订单编号：
          <input v-model="order_number" class="form-control line_input">
        </li>
      </ul>
    </nav>

    <div class="content_body">
      <table class="table table-bordered">
        <caption class="table_title">服务单信息</caption>
        <thead>
          <tr>
            <th>订单编号</th>
            <th>收货人</th>
            <th>手机号码</th>
            <th>收货地址</th>
            <th>物流公司</th>
            <th>物流单号</th>
            <!-- <th>状态</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index" >
            <td> {{list.id}} </td>
            <td> {{list.to_contacts}} </td>
            <td> {{list.to_contacts_phone}} </td>
            <td> {{list.to_province}} 
                  {{list.to_citys}}
                  {{list.to_areas}}
                  {{list.to_address}}
            </td>
            <td>
              <select v-model="list.express_name" class="form-control  tem2 line_input">
                <option value="">请选择</option>
                <option :value="item.name" v-for="(item, index1) in express_list" :key="index1">
                  {{item.name}}
                </option>
              </select>
            </td>
            <td>
              <input v-model="list.express_number" class="form-control line_input">
            </td>
            <!-- <td> 
              <span v-if="list.state == 2">待发货</span>
              <span v-else>-</span>
            </td> -->
          </tr>
        </tbody>
      </table>
      <div class="Top20">
        <div id="page" style="text-align: center;"></div>
      </div>
      <div style="text-align:center;margin-top:30px;">
          <button type="button" class="btn btn-default">取消</button>
          <button @click="post_addBtn()" type="button" class="btn btn-primary">确定</button>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'DingDanPiLiaoFaHuo',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        userId: '',
        first_time: '',
        end_time: '',
        listsTable: [],
        express_list: [], // 所有的快递公司
        // 搜索的字段
        to_contacts: '',
        order_number: ''
      }
    },
    created() {
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
          status: '2' // 待发货的参数 目前接口这个参数待后台启用
        }
        if(this_1.to_contacts) aaa.to_contacts = this_1.to_contacts
        if(this_1.order_number) aaa.order_number = this_1.order_number
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
      // 得到物流公司的数据
      get_exrpessMsg: function () {
        var this_1 = this
        post_ajax('supply/goods/freight/findExpress', {}, function (json){
            // console.log('物流公司')
            // console.log(json)
            if(json.code == 0){
              this_1.express_list = json.data.list
            }
        })
      },
      // 提交数据
      post_addBtn: function () {
        var this_1 = this
        var express_info = []
        for(var i in this_1.listsTable){
          if(this_1.listsTable[i].express_name && this_1.listsTable[i].express_number){
              express_info.push({
                id: this_1.listsTable[i].id,
                express_name: this_1.listsTable[i].express_name,
                express_number: this_1.listsTable[i].express_number
              })
          }
        }
        if(express_info.length == 0){
          layer.msg('最少提交一组')
          return
        }
        express_info = JSON.stringify(express_info) 
        var aaa = {
          userId: this_1.userId,
          express_info: express_info
        }
        // console.log(aaa)
        var url = 'backStage/goodsOrderDetail/updateOrderCompany'
        post_ajax(url, aaa, function(json){
          layer.msg(json.msg)
          if(json.code == 0){
            setTimeout(function(){
              this_1.init()
            }, 1000)
          }
        })
      },
      // 筛选框的显示隐藏
      shaixuan_showBtn: function () {
        var this_1 = this
        this_1.shaixuan_show = !this_1.shaixuan_show
        $(".search_ul").toggle(300)
      },
      // 返回按钮
      return_previousPage: function () {
        var this_1 = this
        this_1.$router.push({
          name: 'DingDanLieBiao'
        })
      }
    },
    mounted() {
      var this_1 = this
      this_1.init()
      this_1.get_exrpessMsg() // 得到快递的数据

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

</style>
