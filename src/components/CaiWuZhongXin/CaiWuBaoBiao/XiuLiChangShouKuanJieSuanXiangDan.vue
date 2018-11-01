<template>
  <div class="XiuLiChangShouKuanJieSuanXiangDan">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;结算详单</span>
        </li>
        <li class="title_box_right">
          <span class="shuaxin">
            <button @click="fanhui()" type="button" class="btn btn-outline btn-default">
              < 返回 </button>
          </span>
        </li>
      </ul>
    </header>

    <nav class="content_nav">
      <ul class="content_nav_box">
        <li class="content_nav_left">
          <span class="shujuliebiao">维修收款</span>
        </li>
        <li class="content_nav_right">
          <span v-if="close_state == 1" class="red700">未结算</span>
          <span class="red700" v-else-if="close_state == 2">已结算</span>
        </li>
      </ul>
    </nav>

    <div class="content_body jiesuan_content">
      <h5 class="line_b_1">订单信息</h5>
      <div class="col-xs-12 Top20">
        <div class="col-xs-2 right_text">
          支付编号：
        </div>
        <div class="col-xs-3 ">
            {{order_id}}
        </div>
        <div class="col-xs-2 right_text">
          付款金额：
        </div>
        <div class="col-xs-3 ">
            {{money}}
        </div>
      </div>
      <div class="col-xs-12 Top20">
        <div class="col-xs-2 right_text">
          付款时间：
        </div>
        <div class="col-xs-3 ">
            {{pay_time}}
        </div>
        <div class="col-xs-2 right_text">
          支付方式：
        </div>
        <div class="col-xs-3 ">
            <span v-if="pay_line == 1">微信</span>
            <span v-else-if="pay_line == 2">支付宝</span>
        </div>
      </div>
      <div class="col-xs-12 Top20">
        <div class="col-xs-2 right_text">
          支付用户：
        </div>
        <div class="col-xs-3 ">
            {{user_name}}
        </div>
        <div class="col-xs-2 right_text">
          付款单号：
        </div>
        <div class="col-xs-3 ">
            {{pay_order_number}}
        </div>
      </div>
      <div class="col-xs-12 Top20">
        <div class="col-xs-2 right_text">
          维修企业：
        </div>
        <div class="col-xs-3 ">
            {{garage_name}}
        </div>
        <div class="col-xs-2 right_text">
          结算费率：
        </div>
        <div class="col-xs-3 ">
            {{poundage_rate}} %
        </div>
      </div>
      <div class="col-xs-12 Top20">
        <div class="col-xs-2 right_text">
          结算时间：
        </div>
        <div class="col-xs-3 ">
            {{close_time}}
        </div>
      </div>

      <h5 class="line_b_1">结算信息</h5>
      <div class="col-xs-12 Top20">
        <div class="col-xs-6 center_text font900">
          平台佣金：
        </div>
        <div class="col-xs-6 center_text">
           ￥ {{poundage}}
        </div>
      </div>
      <div class="col-xs-12 Top20">
        <div class="col-xs-6 center_text font900">
          合伙人佣金：
        </div>
        <div class="col-xs-6 center_text">
           ￥ {{agent_money}}
        </div>
      </div>
      <div class="col-xs-12 Top20">
        <div class="col-xs-6 center_text font900">
          修理厂实际到账：
        </div>
        <div class="col-xs-6 center_text">
           ￥ {{close_money}}
        </div>
      </div>
      <div class="col-xs-12 Top20">
        <div class="col-xs-6 center_text font900">
          用户返现：
        </div>
        <div class="col-xs-6 center_text">
           ￥ {{arrive_award}}
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    name: 'XiuLiChangShouKuanJieSuanXiangDan',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        // 请求数据的字段
        garage_id: '',
        userId: '',
        order_id: '',
        // 页面的参数
        close_state: '',
        money: '',
        close_time: '',
        pay_time: '',
        pay_line: '',
        user_name: '',
        pay_line: '',
        pay_order_number: '',
        garage_name: '',
        poundage_rate: '',
        poundage: '',
        close_money: '',
        arrive_award: '',
        agent_money: '',
        num: '', // 判断从哪个页面调过来的，方便返回
      }
    },
    created () {
        var this_1 = this
        this_1.order_id = this_1.$route.query.order_id
        this_1.userId = sessionStorage.getItem('uid')
        this_1.garage_id = this_1.$route.query.garage_id
        this_1.num = this_1.$route.query.num
    },
    methods: {
      init: function (curr) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          order_id: this_1.order_id
        }
        var url = 'backStage/financial/selectDetail'
        post_ajax(url, aaa, function (json) {
          // console.log(json)
          if (json.code == 0) {
            this_1.close_state = json.data.close_state
            this_1.money = json.data.money
            this_1.close_time = json.data.close_time
            this_1.pay_time = json.data.pay_time
            this_1.pay_line = json.data.pay_line
            this_1.user_name = json.data.user_name
            this_1.pay_line = json.data.pay_line
            this_1.pay_order_number = json.data.pay_order_number
            this_1.garage_name = json.data.garage_name
            this_1.poundage_rate = json.data.poundage_rate
            this_1.poundage = json.data.poundage
            this_1.close_money = json.data.close_money
            this_1.arrive_award = json.data.arrive_award
            this_1.agent_money = json.data.agent_money
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
      fanhui: function () {
        var this_1 = this
        if(this_1.num == 1){
          this_1.$router.push({
            name: 'WeiXiuFuKuanJiLu',
            query: {
                garage_id: this_1.garage_id
            }
          })
        }else if (this_1.num == 2){
          this_1.$router.push({
            name: 'XiuLiChangShouKuanJieSuanMingXi',
            query: {
                garage_id: this_1.garage_id
            }
          })
        }
        
      }
    },
    mounted() {
        var this_1 = this
        this_1.init()

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

  .red700 {
    color: red;
    font-weight: 700;
    font-size: 18px;
  }

  .font900 {
    font-weight: 900;
  }

  .jiesuan_content {
    padding: 0px 10px;
  }

  .line_b_1 {
    border-bottom: 1px solid #e4e4e4;
    padding: 5px;
  }

  th,
  td {
    text-align: center;
    /** 设置水平方向居中 */
    vertical-align: middle;
    /** 设置垂直方向居中 */
  }

</style>
