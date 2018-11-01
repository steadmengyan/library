<template>
  <div class="tuiHuanHuoXiangQing">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;退换货详情</span>
        </li>
        <li class="title_box_right">
          <span class="shuaxin">
            <button @click="return_previousPage()" type="button" class="btn btn-outline btn-default">
              < 返回 </button>
          </span>
        </li>
      </ul>
    </header>

    <div class="content_body">
      <table class="table table-bordered">
        <caption class="table_title">退换货商品</caption>
        <thead>
          <tr>
            <th>商品图片</th>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>规格属性</th>
            <th>供货商</th>
            <th>品牌名称</th>
            <th>数量</th>
            <th>实付金额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in goods_list" :key="index">
            <td>
              <img :src="list.image" alt="img" height="100">
            </td>
            <td> {{list.good_name}} </td>
            <td> ¥ {{list.good_price}} </td>
            <td> {{list.good_spec}} </td>
            <td> {{list.shop_name}} </td>
            <td> {{list.brand_name}} </td>
            <td> {{list.good_num}} </td>
            <td> ￥ {{list.actually_money}} </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content_body">
      <h4 style="padding-left:20px;">账单信息</h4>
      <p style="padding-left:20px;">
        <ul class="ul_guanbi Top20">
          <li class="one20">
            服务单号：
          </li>
          <li class="two30">
            {{order_info.id}}
          </li>
          <li class="one20">
            用户帐号：
          </li>
          <li class="two30">
            {{order_info.userName}}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20">
            售后类型：
          </li>
          <li class="two30">
            <span v-if="order_info.type == 1">仅退款</span>
            <span v-else-if="order_info.type == 2">退款退货</span>
            <span v-else-if="order_info.type == 3">换货</span>
          </li>
          <li class="one20">
            联系人：
          </li>
          <li class="two30">
            {{order_info.to_concat}}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20">
            申请状态：
          </li>
          <li class="two30">
            <span v-if="order_info.return_status == 1">待商家处理</span>
            <span v-else-if="order_info.return_status == 2">退款已成功</span>
            <span v-else-if="order_info.return_status == 3">买家待发货</span>
            <span v-else-if="order_info.return_status == 4">买家待发货</span>
            <span v-else-if="order_info.return_status == 5">买家已发货</span>
            <span v-else-if="order_info.return_status == 6">商家已收货</span>
            <span v-else-if="order_info.return_status == 7">退货退款完成</span>
            <span v-else-if="order_info.return_status == 8">商家已重新发货</span>
            <span v-else-if="order_info.return_status == 9">换货结束</span>
            <span v-else-if="order_info.return_status == 10">审核不通过</span>
            <span v-else-if="order_info.return_status == 11">取消</span>
          </li>
          <li class="one20">
            联系人：
          </li>
          <li class="two30">
            {{order_info.to_concat}}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20">
            申请时间：
          </li>
          <li class="two30">
            {{order_info.add_time}}
          </li>
          <li class="one20">
            售后原因：
          </li>
          <li class="two30">
            {{order_info.cause}}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20">
            订单编号：
          </li>
          <li class="two30">
            {{order_info.orderId}}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20">
            问题描述：
          </li>
          <li class="two">
            {{order_info.explains}}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20">
            凭证照片：
          </li>
          <li class="two">
            <img :src="imgOne" v-for="(imgOne, index) in order_info.img" :key="index">
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20">
            申请退款金额：
          </li>
          <li class="two">
            ￥ {{order_info.money}}
          </li>
        </ul>

        <ul class="ul_guanbi Top20">
          <li class="one20 line_h34">
            确认退款金额：
          </li>
          <li class="two">
            <input v-model="return_money" id="refund_sure" class="form-control line_input">
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20 line_h34">
            是否需要退货：
          </li>
          <li class="two">
            <input v-model="is_back" :checked="is_back" id="retutnGood_btn" type="checkbox" class="form-control " style="height:30px;width:30px;">
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20 line_h34">
            选择收货地址：
          </li>
          <li class="two">
            <select @change="select_address()" v-model="shop_index" id="select_address" class="form-control " style="width:500px">
              <option value="">请选择地址</option>
              <option :value="index" v-for="(list, index) in shopMsg_arr" :key="index"> {{list.province}} {{list.city}} {{list.area}} {{list.location}} </option>
            </select>
            <span id="address_txt" class="line_h34">
              {{to_province}} {{to_city}} {{to_area}} {{to_address}}

            </span>
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20 ">
            收货人姓名：
          </li>
          <li class="two">
            {{link_man}}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20 ">
            联系电话：
          </li>
          <li class="two">
            {{ link_phone }}
          </li>
        </ul>
        <ul class="ul_guanbi Top20">
          <li class="one20 ">
            处理备注：
          </li>
          <li class="two">
            <textarea v-model="turn_down" class="form-control" rows="3" name=textarea></textarea>
          </li>
        </ul>
      </p>
      <div v-if="order_info.return_status == 1" style="text-align:center;padding-bottom:50px;">
        <button type="button" @click="audit_btn(1)" class="btn btn-w-m btn-success">审核通过</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" @click="audit_btn(2)" class="btn btn-w-m btn-warning"> 拒绝申请 </button>
      </div>
      <div style="text-align:center;padding-bottom:50px;">
        <button @click="shopGetGood_sure(order_info.id)" v-if="order_info.return_status == 5" type="button" class="btn btn-w-m btn-success">退单确认收货</button>
        <button @click="fahuo_btn(order_info)" v-if="order_info.return_status == 6 && order_info.type == 3" type="button" class="btn btn-w-m btn-success">换货物流确认发货</button>
      </div>
    </div>

    <!-- 模态框（Modal）订单发货 -->
    <div class="modal fade" id="myModal_faHuo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 订单发货 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi Top20">
              <li class="one">
                订单编号：
              </li>
              <li class="two">
                {{id}}
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one">
                收货人：
              </li>
              <li class="two">
                {{fahuo_to_contacts}}
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one">
                收货地址：
              </li>
              <li class="two">
                {{to_province}} {{to_citys}} {{to_areas}}
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one line_h34">
                <span style="color:red;">*</span>
                物流公司：
              </li>
              <li class="two">
                <select v-model="express_name" class="form-control  tem2 line_input">
                  <option value="">请选择物流公司</option>
                  <option :value="list.name" v-for="(list, index) in express_list" :key="index">
                    {{list.name}}
                  </option>
                </select>
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one line_h34">
                <span style="color:red;">*</span>
                物流单号：
              </li>
              <li class="two">
                <input v-model="express_number" class="form-control line_input" placeholder="物流单号">
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button @click="fahuo_post()" type="button" class="btn btn-primary">确定</button>
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
    name: 'tuiHuanHuoXiangQing',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        userId: '',
        first_time: '',
        end_time: '',
        listsTable: [],
        id: '',
        // 得到退货的基本信息
        goods_list: [],
        order_info: {},
        shop_id: '',
        // 商家信息
        shopMsg_arr: [],
        shop_index: '',
        link_man: '',
        link_phone: '',
        to_province: '',
        to_province_id: '',
        to_city: '',
        to_city_id: '',
        to_area: '',
        to_area_id: '',
        to_address: '',
        return_money: '',
        is_back: false,
        turn_down: '',
        status: '', // 审核状态（1.未审核2.同意3.驳回）
        // 订单发货
        id: '', // 订单发货的id
        express_name: '', // 发货的公司
        express_list: [], // 物流公司
        express_number: '', // 发货号
        fahuo_to_contacts: '', // 发货模块的收货人
        to_province: '',
        to_citys: '',
        to_areas: '',
      }
    },
    created() {
      var this_1 = this
      this_1.userId = sessionStorage.getItem('uid')
      this_1.id = this_1.$route.query.id
    },
    methods: {
      init: function (curr) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          id: this_1.id
        }
        // ajax-post
        var url = 'backStage/backOrderInformation/findReturnDetail'
        post_ajax(url, aaa, function (json) {
          // console.log('请求的页面的初始数据')
          // console.log(json)
          if (json.code == 0) {
            this_1.goods_list = json.data.goods_list
            this_1.order_info = json.data.order_info
            if (this_1.order_info.img) {
              this_1.order_info.img = this_1.order_info.img.split(',')
            } else {
              this_1.order_info.img = []
            }
            this_1.return_money = this_1.order_info.money
            this_1.shop_id = this_1.order_info.shop_id
            // 判定status 1 是待审核 2是通过
            if (this_1.order_info.status == 1) {
              console.log('未审核')
              this_1.getShop_msg() // 获取店铺Id后请求店铺信息
              $("#address_txt").hide()
            } else if (this_1.order_info.status == 2) {
              console.log('审核通过')
              // 是否需要退货
              if (this_1.order_info.type == 2 || this_1.order_info.type == 3) {
                $("#retutnGood_btn").attr('disabled', true)
                this_1.is_back = true
                $("#select_address").hide()
                $("#refund_sure").attr('disabled', true)
                this_1.to_province = this_1.order_info.to_province
                this_1.to_city = this_1.order_info.to_city
                this_1.to_area = this_1.order_info.to_area
                this_1.to_address = this_1.order_info.to_address
                this_1.link_man = this_1.order_info.to_concat
                this_1.link_phone = this_1.order_info.to_concat_phone
                this_1.turn_down = this_1.order_info.turn_down
              }
            }


          }
        })
      },
      getShop_msg: function () {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          shop_id: this_1.shop_id
        }
        post_ajax('backStage/backOrderInformation/selectShop', aaa, function (json) {
          // console.log('请求的店家信息')
          // console.log(json)
          if (json.code == 0) {
            this_1.shopMsg_arr = json.data.list
          }
        })
      },
      // 点击选择地址
      select_address: function () {
        var this_1 = this
        for (var i in this_1.shopMsg_arr) {
          if (this_1.shop_index == i) {
            this_1.link_man = this_1.shopMsg_arr[i].link_man
            this_1.link_phone = this_1.shopMsg_arr[i].link_phone
            // 获取省市区的id
            this_1.to_province = this_1.shopMsg_arr[i].province
            this_1.to_province_id = this_1.shopMsg_arr[i].provinceid
            this_1.to_city = this_1.shopMsg_arr[i].city
            this_1.to_city_id = this_1.shopMsg_arr[i].cityid
            this_1.to_area = this_1.shopMsg_arr[i].area
            this_1.to_area_id = this_1.shopMsg_arr[i].areaid
            this_1.to_address = this_1.shopMsg_arr[i].location
          }
        }
      },
      // 审核
      audit_btn: function (num) {
        var this_1 = this
        // 处理是否退货
        var is_back = null
        if (this_1.is_back) {
          is_back = '1'
        } else {
          is_back = '0'
        }
        // 处理是通过还是驳回
        if (num == 1) {
          this_1.status = '2' // 通过
        } else if (num == 2) {
          this_1.status = '3' // 驳回
        }
        var aaa = {
          userId: this_1.userId,
          id: this_1.id,
          to_concat: this_1.link_man,
          to_contat_phone: this_1.link_phone,
          to_province: this_1.to_province,
          to_province_id: this_1.to_province_id,
          to_city: this_1.to_city,
          to_city_id: this_1.to_city_id,
          to_city: this_1.to_city,
          to_area: this_1.to_area,
          to_area_id: this_1.to_area_id,
          to_address: this_1.to_address,
          return_money: this_1.return_money,
          is_back: is_back,
          turn_down: this_1.turn_down, // 驳回原因，可选 
          status: this_1.status, // 审核或驳回
        }
        // console.log(aaa)
        post_ajax('backStage/backOrderInformation/updateReturnCause', aaa, function (json) {
          // console.log(json)
          layer.msg(json.msg)
          if (json.code == 0) {
            setTimeout(function () {
              this_1.init()
            }, 1000)
          }
        })

      },
      // 审核通过后 确认收到退货
      shopGetGood_sure: function (id) {
        var this_1 = this
        layer.confirm('是否确认收到货物', function (index) {
          //do something
          var aaa = {
            userId: this_1.userId,
            id: id
          }
          post_ajax('backStage/backOrderInformation/updateAffirm', aaa, function (json) {
            layer.msg(json.msg)
            if (json.code == 0) {
              setTimeout(function () {
                this_1.init()
              }, 1000)
            }
          })
          layer.close(index);
        });
      },
      // 商家收到换货后再次发货的按钮
      fahuo_btn: function (order_info) {
        var this_1 = this
        this_1.id = order_info.id
        this_1.to_province = this_1.order_info.to_province
        this_1.to_citys = this_1.order_info.to_citys
        this_1.to_areas = this_1.order_info.to_areas
        this_1.to_address = this_1.order_info.to_address
        this_1.to_concat = this_1.order_info.to_concat
        this_1.fahuo_to_contacts = this_1.order_info.to_concat
        $("#myModal_faHuo").modal('show')
        // 查询物流公司
        post_ajax('supply/goods/freight/findExpress', {}, function (json) {
          // console.log('物流公司')
          // console.log(json)
          if (json.code == 0) {
            this_1.express_list = json.data.list
          }
        })
      },
      // 商家收到换货后再次发货的数据
      fahuo_post: function () {
        var this_1 = this
        if (!this_1.express_name) {
          layer.msg('请选择 物流公司')
          return
        }
        if (!this_1.express_number) {
          layer.msg('请输入物流单号')
          return
        }
        var express_info = [{
          id: this_1.id,
          express_name: this_1.express_name,
          express_number: this_1.express_number
        }]
        express_info = JSON.stringify(express_info)
        var aaa = {
          express_info: express_info
        }
        $("#myModal_faHuo").modal('hide')
        var url = 'backStage/backOrderInformation/updateSendInfo'
        post_ajax(url, aaa, function (json) {
          layer.msg(json.msg)
          if (json.code == 0) {
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
          path: '/tuiHuanHuoShenQingChuLi'
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

  .ul_guanbi {
    display: flex;
  }

  .one20 {
    width: 20%;
    text-align: right;
  }

  .two30 {
    width: 30%;
  }

  .line_h34 {
    line-height: 34px;
  }

  .one {
    width: 30%;
    text-align: right;
  }

  .two {
    width: 70%;
  }

</style>
