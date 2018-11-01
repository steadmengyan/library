<template>
  <div class="DingDanXiangQing">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;订单详情</span>
        </li>
        <li class="title_box_right">
          <span class="shuaxin">
            <button @click="return_previousPage()" type="button" class="btn btn-outline btn-default">
              < 返回 </button>
          </span>
        </li>
      </ul>
    </header>

    <ul v-if="show_msg" class="content_nav ul_dingdanxiangqing">
      <li :class="{'redTxt': (order_detail.state >= 1 && order_detail.state <= 4)}">
        <i class="iconfont icon-tijiaodingdan bigSize"></i>
        <p>
          <span>提交订单</span>
          <br>
        </p>
      </li>
      <p class="line_line"></p>
      <li :class="{'redTxt': (order_detail.state >= 2 && order_detail.state <= 4)}">
        <i class="iconfont icon-dingdan-zhifu-chenggong bigSize"></i>
        <p>
          <span>订单支付</span>
          <br>
        </p>
      </li>
      <p class="line_line"></p>
      <li :class="{'redTxt': (order_detail.state >= 3 && order_detail.state <= 4)}">
        <i class="iconfont icon-dingdanfahuo bigSize"></i>
        <p>
          <span>订单发货</span>
          <br>
        </p>
      </li>
      <p class="line_line"></p>
      <li :class="{'redTxt': (order_detail.state == 4)}">
        <i class="iconfont icon-querenshouhuo bigSize"></i>
        <p>
          <span>确认收货</span>
          <br>
        </p>
      </li>
    </ul>

    <div class="content_nav">
      <ul class="content_nav_box">
        <li class="content_nav_left">
          <span class="shujuliebiao">
            订单状态： 
            <span v-if="order_detail.state == 1"> 待付款 </span>
              <span v-else-if="order_detail.state == 2">待发货</span>
              <span v-else-if="order_detail.state == 3">待收货</span>
              <span v-else-if="order_detail.state == 4">已完成</span>
              <span v-else-if="order_detail.state == 5">已取消</span>
              <span v-else-if="order_detail.state == 6">已关闭</span>
              <span v-else-if="order_detail.state == 7">删除订单</span>
          </span>
        </li>
        <li class="content_nav_right">
          <span v-if="order_detail.state == 1">
            <button @click="guanbi_btn(1)" type="button" class="btn btn-outline btn-default">
              订单关闭
            </button>
            <button @click="guanbi_btn(2)" type="button" class="btn btn-outline btn-default">
              订单备注
            </button>
          </span>
        </li>
      </ul>
      <div class="search_ul ">
        <h3>基本信息</h3>
        <div>
          <p> 订单编号：{{order_detail.id}} </p>
          <p> 用户账号：{{order_detail.phone}} </p>
          <p> 支付方式：
              <span v-if="order_detail.pay_type == 1">微信</span>
              <span v-else-if="order_detail.pay_type == 2">支付宝</span>
              {{order_detail.pay_order_number}} 
          </p>
          <p> 提交时间：{{order_detail.soc_create}} </p>
          <p> 供货商：{{order_detail.company_name}} </p>
          <p> 物流单号：{{order_detail.logistics_number || '未发货'}} </p>
          <p> 收货人信息：{{order_detail.to_contacts}} {{order_detail.to_contacts_phone}} </p>
          <p> 收货地址：{{order_detail.to_province}} {{order_detail.to_citys}}
              {{order_detail.to_areas}} {{order_detail.to_address}}
          </p>
        </div>

        <h3> 商品信息 </h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>商品图片</th>
              <th>商品名称</th>
              <th>商品价格</th>
              <th>规格属性</th>
              <th>数量</th>
              <th>实付金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in goods_list" :key="index">
              <td>
                <img :src="list.image" alt="img" height="100">
              </td>
              <td> {{list.good_spec}} </td>
              <td> ¥ {{list.good_price}} </td>
              <td> 1*16 </td>
              <td> {{list.good_spec}} </td>
              <td> ￥ {{list.actually_money}} </td>
            </tr>
          </tbody>
        </table>

        <h3> 结算费用 </h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>商品合计</th>
              <th>运费</th>
              <th>奖励币</th>
              <th>优惠券</th>
              <th>活动优惠</th>
              <th>订单费用总额</th>
              <th>订单实付金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in 1" :key="index">
              <td> ￥ {{ order_detail.goods_money }} </td>
              <td> ￥{{order_detail.express_money}} </td>
              <td> ￥{{order_detail.award_num}} </td>
              <td> ￥{{order_detail.coupon_num}} </td>
              <td> -￥{{order_detail.coupon_num}} </td>
              <td> ￥{{order_detail.order_count_price}} </td>
              <td> ￥{{order_detail.actually_money}} </td>
            </tr>
          </tbody>
        </table>

        <h5>操作日志</h5>
        <p v-for="(list, index) in logging" :key="index" style="margin-top:10px;"> 
          {{list.create_time}} &nbsp;&nbsp;&nbsp;&nbsp;
           {{list.content}}
        </p>

      </div>
    </div>

    <!-- 模态框（Modal）关闭订单 -->
    <div class="modal fade" id="myModal_guanBi" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 v-if="colse_state" class="modal-title" id="myModalLabel"> 关闭订单 </h4>
            <h4 v-else class="modal-title" id="myModalLabel"> 订单备注 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                备注：
              </li>
              <li class="two">
                <textarea v-model="remark" class="form-control" rows="3" name=textarea></textarea>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button v-if="colse_state" @click="closeOrder_btn('1')" type="button" class="btn btn-primary">确定</button>
            <button v-else @click="closeOrder_btn('2')" type="button" class="btn btn-primary">确定</button>
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
    name: 'DingDanXiangQing',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        userId: '',
        first_time: '',
        end_time: '',
        listsTable: [],
        order_number: '', // 上一页传过来的订单id
        goods_list: [], // 商品信息
        logging: [], // 日志
        order_detail: {}, // 
        show_msg: false, // 头部的显示信息
        // 订单关闭
        remark: '',
        colse_state: true, // true 是关闭备注 false是修改备注
      }
    },
    created() {
      var this_1 = this
      this_1.userId = sessionStorage.getItem('uid')
      this_1.order_number = this_1.$route.query.order_number
    },
    methods: {
      init: function (curr) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          order_number: this_1.order_number
        }
        // ajax-post
        var url = 'backStage/goodsOrderDetail/findOrderDetails'
        post_ajax(url, aaa, function (json) {
          // console.log('请求的页面的初始数据')
          // console.log(json)
          if(json.code == 0){
            this_1.goods_list = json.data.goods_list
            this_1.logging = json.data.logging
            this_1.order_detail = json.data.order_detail
            for(var i in this_1.logging){
              if(this_1.logging[i].create_time){
                this_1.logging[i].create_time = get_str_time(this_1.logging[i].create_time)
              }
            }
            // 如果是已取消，已关闭，已删除，就不显示
            var state = this_1.order_detail.state
            console.log(state)
            if(state == 5 || state == 6 || state == 7){
              this_1.show_msg = false
            }else{
              this_1.show_msg = true
            }
            console.log(state)
          }
        })
      },
      // 查询订单物流信息
      get_expressMsg: function () {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          order_id: this_1.order_number,
          type: '1'
        }
        var url = 'backStage/goodsOrderDetail/express'
        post_ajax(url, aaa, function(json){
          // console.log('物流信息')
          // console.log(json)
        })
      },
      // 订单关闭
      guanbi_btn: function (num) {
        var this_1 = this
        $("#myModal_guanBi").modal('show')
        if(num == 1){
          this_1.colse_state = true
        }else if (num == 2){
          this_1.colse_state = false
        }
      },
      // 订单关闭发送的数据
      closeOrder_btn: function(type){
        var this_1 = this
        if(!this_1.remark){
          layer.msg('备注不能为空')
          return
        }
        var aaa = {
          userId: this_1.userId,
          order_id: this_1.order_number,
          remark: this_1.remark,
          type: type // 1是关闭订单备注 2是修改订单备注
        }
        $("#myModal_guanBi").modal('hide')
        var url = 'backStage/goodsOrderDetail/updateOrderInfo'
        post_ajax(url, aaa, function(json){
          layer.msg(json.msg)
          if(json.code == 0){
            this_1.init()
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
          path: '/DingDanLieBiao'
        })
      }
    },
    mounted() {
      var this_1 = this
      this_1.get_expressMsg() // 查询物流信息
      this_1.init() 

    }
  }

</script>
<style scoped>
  .line_input {
    width: 200px;
    display: inline-block;
  }

  .search_ul {
    padding: 0 20px;
  }

  th,
  td {
    text-align: center;
    /** 设置水平方向居中 */
    vertical-align: middle;
    /** 设置垂直方向居中 */
  }

  .ul_dingdanxiangqing {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }

  .ul_dingdanxiangqing>li {
    text-align: center;
  }

  .bigSize {
    font-size: 50px;
  }

  .line_line {
    width: 10%;
    height: 0;
    border-top: 5px solid #aed8e6;
    margin-top: 30px;
  }

  .ul_guanbi {
    display: flex;
  }

  .one {
    width: 30%;
    text-align: right;
  }

  .two {
    width: 60%;
  }
  .redTxt{
    color: red;
  }

</style>
