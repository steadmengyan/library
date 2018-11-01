<template>
  <div class="xiulichangshoukuanjiesuanmingxi">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;修理厂收款结算明细</span>
        </li>
        <li class="title_box_right">
          <span class="shuaxin">
            <button @click="fanhui" type="button" class="btn btn-outline btn-default">
              < 返回 </button>
          </span>
        </li>
      </ul>
    </header>

    <div class="content_body">
      <table class="table table-bordered">
        <caption class="chakan table_title">结算金额合计：￥999999</caption>
        <thead>
          <tr>
            <th>收款编号</th>
            <th>收款时间</th>
            <th>付款用户</th>
            <th>支付金额</th>
            <th>优惠券抵用</th>
            <th>实收金额</th>
            <th>结算状态</th>
            <th>结算金额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td> {{list.order_id}} </td>
            <td> {{list.close_time}} </td>
            <td> {{list.member_name}} </td>
            <td> {{list.money}} </td>
            <td> - </td>
            <td> {{list.close_money}} </td>
            <td>
              <span v-if="list.close_state == 1">未结算</span>
              <span v-else-if="list.close_state == 2">已结算</span>
            </td>
            <td>
              {{list.close_money}}
            </td>
            <td class="chakan" @click="see_it(list)">查看</td>
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
    name: 'XiuLiChangShouKuanJieSuanMingXi',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        garageId: '',
        listsTable: []
      }
    },
    created() {
      var this_1 = this
      this_1.garageId = this_1.$route.query.garage_id
    },
    methods: {
      init: function (curr) {
        var this_1 = this
        var aaa = {
          garageId: this_1.garageId,
          pageSize: '10',
          pageNum: curr || '1'
        }
        var url = 'backStage/financial/selectGarageTwo'
        post_ajax(url, aaa, function (json) {
          // console.log(json)
          if (json.code == 0) {
            this_1.listsTable = json.data.list
            for(var i in this_1.listsTable){
              if(this_1.listsTable[i].close_time){
                this_1.listsTable[i].close_time = get_str_time(this_1.listsTable[i].close_time)
              }
            }
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
      see_it(list) {
        var this_1 = this
        this_1.$router.push({
          name: 'XiuLiChangShouKuanJieSuanXiangDan',
          query: {
              order_id: list.order_id,
              garage_id: list.garageId,
              num: '2' // 方便回跳的参数 1是跳回 维修付款记录  2是跳回 修理厂收款结算明细
          }
        })
      },
      fanhui() {
        var this_1 = this
        this_1.$router.push({
          name: 'XiuLiChangShouKuanJieSuan'
        })
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

  th,
  td {
    text-align: center;
    /** 设置水平方向居中 */
    vertical-align: middle;
    /** 设置垂直方向居中 */
  }

</style>
