<template>
  <div class="home_body clearfix">
    <div class="home_left ">
      <nav style="width:100%;" class="navbar-default navbar-static-side" role="navigation">
        <div class="nav-close">
          <i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse">
          <ul class="nav nav_click" id="side-menu" >
            <li class="nav-header">
              <div class="dropdown profile-element">
                <span>
                  <img alt="image" class="img-circle" src="static/img/profile_small.jpg" />
                </span>
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                  <span class="clear">
                    <span class="block m-t-xs">
                      <strong class="font-bold">{{name}}</strong>
                    </span>
                    <span class="text-muted text-xs block">管理员
                      <b class="caret"></b>
                    </span>
                  </span>
                </a>
                <ul class="dropdown-menu animated fadeInRight m-t-xs">
                  <!-- <li>
                    <a class="J_menuItem" >修改头像</a>
                  </li> -->
                  <!-- <li>
                    <a class="J_menuItem" >个人资料</a>
                  </li> -->
                  <!-- <li>
                    <a class="J_menuItem" >联系我们</a>
                  </li> -->
                  <!-- <li class="divider"></li> -->
                  <li>
                    <a @click="tuichu_logo()">安全退出</a>
                  </li>
                </ul>
              </div>
              <div class="logo-element">

              </div>
            </li>
            
            <li v-for="(list2,index2) in menu_list_two" :key="index2">
              <a href="#" class="leftNav_click">
                <i class="fa fa-home"></i>
                <span class="">{{list2.name}}</span>
              </a>
              <ul class="nav nav-second-level" style="display:none;">
                <li v-for="(list3,index3) in list2.menu_lv3" :key="index3">
                  <router-link  :to="{path: list3.path}">
                    {{list3.name}}
                  </router-link>
                </li>
              </ul>

            </li>


          </ul>
        </div>
      </nav>
    </div>
    <div class="home_right">
      <div class="right_top">
        <ul class="clearfix" id="topNav_click">
          <li v-for="(list, index) in menu_list" :key="index" @click="click_menuTwo(list.menu_lv2)" class="col-xs-1">
            {{list.name}}
          </li>
        </ul>
      </div>
      <div class="right_content">
        <router-view></router-view>
      </div>
    </div>



  </div>

</template>

<script>
export default {
  name: "home",
  data() {
    return {
      name: "",
      uid: "",
      token: "",
      menu_list: [
        {
          name: "财务中心",
          menu_lv2: [
            {
              name: "对账单",
              menu_lv3: [
                {
                  name: "维修付款记录",
                  path: "/WeiXiuFuKuanJiLu"
                },
                {
                  name: "订单付款记录",
                  path: "/DingDanFuKuanJiLu"
                }
              ]
            },
            {
              name: "财务报表",
              menu_lv3: [
                {
                  name: "修理厂收款结算",
                  path: "/xiulichangshoukuanjiesuan"
                },
                {
                  name: "修理厂安装费用结算",
                  path: "/xiulichangfanyongjiesuan"
                },
                {
                  name: "商城订单结算",
                  path: "/ShangChengDingDanJieSuan"
                },
                {
                  name: "合伙人佣金结算",
                  path: "/HeHuoRenYongJinJieSuan"
                }
              ]
            },
            {
              name: "提现管理",
              menu_lv3: [
                {
                  name: "修理厂提现",
                  path: "/XiuLiChangTiXian"
                },
                {
                  name: "合伙人提现",
                  path: "/HeHuoRenTiXian"
                },
                {
                  name: "加油站提现",
                  path: "/JiaYouZhanTiXian"
                }
              ]
            },
            {
              name: "对账管理",
              menu_lv3: [
                {
                  name: "商品对账",
                  path: "/ShangPinDuiZhang"
                },
                {
                  name: "运费对账",
                  path: "/YunFeiDuiZhang"
                }
              ]
            }
          ]
        },
        {
          name: "统计报表",
          menu_lv2: [
            {
              name: "用户数据",
              menu_lv3: [
                {
                  name: "用户增长",
                  path: "/YongHuZengZhang"
                },
                {
                  name: "用户属性",
                  path: "/YongHuShuXing"
                },
                {
                  name: "用户流量",
                  path: "/YongHuLiuLiang"
                }
              ]
            },
            {
              name: "维修付款",
              menu_lv3: [
                {
                  name: "付款笔数",
                  path: "/fuKuanBiShu"
                }
              ]
            }
          ]
        },
        {
          name: "订单管理",
          menu_lv2: [
            {
              name: "销售订单",
              menu_lv3: [
                {
                  name: "订单列表",
                  path: "/DingDanLieBiao"
                },
                {
                  name: "订单设置",
                  path: "/DingDanSheZhi"
                }
              ]
            },
            {
              name: "售后订单",
              menu_lv3: [
                {
                  name: "退换货申请处理",
                  path: "/tuiHuanHuoShenQingChuLi"
                },
                {
                  name: "退换货原因设置",
                  path: "/tuiHuanHuoYuanYin"
                }
              ]
            }
          ]
        },
        {
          name: "加油业务管理",
          menu_lv2: [
            {
              name: "加油券管理",
              menu_lv3: [
                {
                  name: "加油券列表",
                  path: "/JiaYouQuanLieBiao"
                },
                {
                  name: "充值记录",
                  path: "/JiaYouQuanDingDan"
                },
                {
                  name: "加油券核销",
                  path: "/JiaYouQuanHeXiao"
                }
              ]
            },
            {
              name: "加油卡管理",
              menu_lv3: [
                {
                  name: "加油卡列表",
                  path: "/JiaYouKaLieBiao"
                },
                {
                  name: "充值管理",
                  path: "/ChongZhiGuanLi"
                },
                {
                  name: "充值记录",
                  path: "/ChongZhiJiLu"
                },
                {
                  name: "加油卡开通城市",
                  path: "/KaiTongChengShi"
                }
              ]
            }
          ]
        }
      ], // 一级菜单
      menu_list_two: [] // 二级菜单
    };
  },
  created() {
    var this_1 = this;
    this_1.name = sessionStorage.getItem("name");
    this_1.uid = sessionStorage.getItem("uid");
    this_1.token = sessionStorage.getItem("token");
  },
  methods: {
    init: function() {
      var this_1 = this;
    },
    // 点击一级分类， 产生二级分类
    click_menuTwo: function(list) {
      var this_1 = this;
      this_1.menu_list_two = list;
      // console.log(this_1.menu_list_two)
    },
    // 安全退出
    tuichu_logo: function() {
      var this_1 = this;
      // 必须要移出事件，负责会有点击执行两次的问题
      $("#side-menu").off("click", ".leftNav_click");
      this_1.$router.push({
        name: "login"
      });
    }
  },
  mounted() {
    var this_1 = this;
    // this_1.init()
    // 点击显示隐藏左侧的菜单栏,退出的时候，必须移除事件
    $("#side-menu").on("click", ".leftNav_click", function() {
      $(this)
        .siblings("ul")
        .toggle(300);
    });
    // 点击顶部第一个打开
    // $("#topNav_click").children('li').eq(0).click()
  }
};
</script>

<style scoped>
.home_body {
  width: 100%;
  height: 100%;
}

.home_left {
  width: 15%;
  height: 100%;
  float: left;
  border: 1px solid #2f4050;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: #2f4050;
}

.home_right {
  width: 85%;
  height: 100%;
  float: left;
  /* border: 1px solid green; */
  box-sizing: border-box;
  overflow-y: scroll;
}
.right_top {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgba(52, 152, 219, 1);
  color: #ffffff;
  text-align: center;
  cursor: pointer;
}

.right_content {
  width: 100%;
}
</style>
