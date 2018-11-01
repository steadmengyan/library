<template>
  <div class="fuKuanBiShu">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;付款笔数</span>
        </li>
        <li class="title_box_right">
          <!-- <span class="shuaxin">
            <button @click="refresh_page()" type="button" class="btn btn-outline btn-default">
              <span class="glyphicon glyphicon-refresh"></span>
              刷新
            </button>
          </span> -->
        </li>
      </ul>
    </header>

    <div class="content_body">

      <p class="clearfix">
        <span @click="get_usersData(1)" class="search_title chakan"> 最近30天 </span>
        <span @click="get_usersData(2)" class="search_title chakan">今日</span>
        <span class="search_title">
          <input id="first_time_users" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"> -
          <input id="end_time_users" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
        </span>
        <span @click="get_usersData(3)" class="search_title chakan">搜索时间段</span>
      </p>
      <div id="myChart_dabingtu" style="width: 100%;height:400px;"></div>
      <h1></h1>
      <p class="clearfix">
        <span @click="get_qushituData(2)" class="search_title chakan">最近30天</span>
        <span @click="get_qushituData(1)" class="search_title chakan">今日</span>
        <span class="search_title">
          <input id="first_time" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"> -
          <input id="end_time" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
        </span>
        <span @click="get_qushituData(3)" class="search_title chakan">搜索时间段</span>
        <span class="search_title search_title_right "> 按时间对比 </span>
      </p>
      <p style="padding-left:12px;">付款笔数</p>
      <div id="zengchang_qushitu" style="width: 100%;height:400px;"></div>

      <h1></h1>
      <div id="main" style="width: 1000px;height:800px;"></div>

      <h1></h1>
      <table class="table table-bordered">
        <caption class="">各省支付情况</caption>
        <thead>
          <tr>
            <th>省份</th>
            <th>交易笔数</th>
            <th>城市数据</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td> {{list.province}} </td>
            <td> {{list.caronwer_number}} </td>
            <td @click="click_shengBtn(list)" class="chakan"> 查看 </td>
          </tr>
        </tbody>
      </table>
      <div class="Top20">
        <div id="page" style="text-align: center;"></div>
      </div>

      <h1></h1>

      <table class="table table-bordered" v-if="city_show">
        <caption> {{province}}支付情况</caption>
        <thead>
          <tr>
            <th>城市</th>
            <th>交易笔数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable_citys" :key="index" v-if="listsTable_citys.length > 0">
            <td> {{list.city}} </td>
            <td> {{list.carowner_number}} </td>
          </tr>
        </tbody>
      </table>
      <div class="Top20" v-if="city_show">
        <div  id="pageShi" style="text-align: center;"></div>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    name: 'fuKuanBiShu',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        userId: '',
        first_time: '',
        end_time: '',
        listsTable: [],
        listsTable_citys: [],
        province_id: '',
        province: '',
        // 得到昨日关键数据
        carowner_count: '',
        today_user: '',
        yesterday_user: '',
        // 是否显示城市的table
        city_show: false
      }
    },
    created() {
      var this_1 = this
      this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
      get_yesterDayMsg: function (curr) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          pageNum: curr || "1",
          pageSize: "10"
        }
        // ajax-post
        var url = 'backStage/chart/selectUser'
        post_ajax(url, aaa, function (json) {
          // console.log('请求的页面的初始数据')
          // console.log(json)
          if (json.code == 0) {
            this_1.carowner_count = json.data.carowner_count
            this_1.today_user = json.data.today_user
            this_1.yesterday_user = json.data.yesterday_user
          }
        })
      },
      get_qushituData: function (num) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          pageSize: '1000'
        }
        if (num == 1) {
          // 清空数据缓存
          $("#first_time").val('')
          $("#end_time").val('')
          aaa.type = '1'
        } else if (num == 2) {
          // 清空数据缓存
          $("#first_time").val('')
          $("#end_time").val('')

          aaa.type = '2'
          var end_time = new Date().getTime()
          var first_time = new Date().getTime() - 1000 * 60 * 60 * 24 * 30
          first_time = get_str_time(first_time)
          end_time = get_str_time(end_time)
          // console.log('30天前')
          // console.log(first_time)
          aaa.first_time = first_time
          aaa.end_time = end_time
        } else if (num == 3) {
          aaa.type = '2'
          if ($("#first_time").val() == '') {
            layer.msg('请选择开始时间')
            return
          }
          if ($("#end_time").val() == '') {
            layer.msg('请选择结束时间')
            return
          }
          aaa.first_time = $("#first_time").val()
          aaa.end_time = $("#end_time").val()
        }
        var url = 'backStage/chart/selectGarageChart'
        post_ajax(url, aaa, function (json) {
          // console.log('用户增长趋势图的数据')
          // console.log(json)
          if (json.code == 0) {
            var x_data = []
            var series_data = []
            for (var i in json.data.list) {
              x_data.push(json.data.list[i].day_time)
              series_data.push(json.data.list[i].carowner_number)
            }
            this_1.set_qushitu(x_data, series_data)
          }
        })

      },
      // 设置增长趋势图
      set_qushitu: function (x_data, series_data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart_qushitu = echarts.init(document.getElementById('zengchang_qushitu'));

        // 指定图表的配置项和数据
        var option = {
          xAxis: {
            type: 'category',
            data: x_data
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: series_data,
            type: 'line',
            smooth: true
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart_qushitu.setOption(option);
      },
      // 设置大饼图 zengchang_dabingtu
      set_dabingtu: function (legend_data, series_data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart_dabingtu = echarts.init(document.getElementById('myChart_dabingtu'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '用户来源',
            subtext: '西安卡门',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: legend_data || []
          },
          series: series_data || []
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart_dabingtu.setOption(option);
      },
      // 获取大饼图 用户来源的数据
      get_usersData: function (num) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId
        }
        if (num == 1) {
          // 清空数据缓存
          $("#first_time_users").val('')
          $("#end_time_users").val('')

          var first_time = new Date()
          first_time = first_time - 30 * 24 * 60 * 60 * 1000
          first_time = get_str_time(first_time)
          // console.log(first_time)
          var end_time = new Date()
          end_time = get_str_time(end_time)
          // console.log(end_time)
          aaa.first_time = first_time
          aaa.end_time = end_time
        } else if (num == 2) {
          // 清空数据缓存
          $("#first_time_users").val('')
          $("#end_time_users").val('')

          var first_time = new Date()
          first_time.setHours(0)
          first_time.setMinutes(0)
          first_time.setSeconds(0)
          first_time.setMilliseconds(0)
          first_time = get_str_time(first_time)
          // console.log(first_time)
          var end_time = new Date()
          aaa.first_time = first_time
          aaa.end_time = end_time
        } else if (num == 3) {
          if ($("#first_time_users").val() == '') {
            layer.msg('请选择开始时间')
            return
          }
          if ($("#end_time_users").val() == '') {
            layer.msg('请选择结束时间')
            return
          }
          aaa.first_time = $("#first_time_users").val()
          aaa.end_time = $("#end_time_users").val()
        }
        var url = 'backStage/chart/selectGarageOrder'
        post_ajax(url, aaa, function (json) {
          // console.log('用户来源的数据')
          // console.log(json)
          if (json.code == 0) {
            var legend_data = ['微信', '支付宝']
            var series_data = [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [{
                  value: json.data.wx,
                  name: '微信'
                },
                {
                  value: json.data.zfb,
                  name: '支付宝'
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]

            this_1.set_dabingtu(legend_data, series_data)

          }
        })

      },
      get_shengData: function (curr) {
        var this_1 = this
        var aaa = {
          pageNum: curr || 1,
          pageSize: '10'
        }
        var url = 'backStage/chart/selectGarageProvince'
        post_ajax(url, aaa, function (json) {
          // console.log('省的值的数据')
          // console.log(json)
          if (json.code == 0) {
            this_1.listsTable = json.data.list
            // page
            var pages = json.data.pages
            laypage({
              cont: 'page',
              pages: pages,
              curr: curr || 1,
              jump: function (e, first) {
                if (!first) {
                  var curr = e.curr;
                  this_1.get_shengData(curr);
                }
              }
            })
          }
        })
      },
      // 点击省得到省的id
      click_shengBtn: function (list) {
        var this_1 = this
        this_1.province_id = list.provinceid
        this_1.province = list.province
        this_1.get_shiData()
      },
      // 省对应下面的市的数据
      get_shiData: function (curr) {
        var this_1 = this
        this_1.city_show = true
        var aaa = {
          pageNum: curr || 1,
          pageSize: '10',
          province_id: this_1.province_id
        }
        var url = 'backStage/chart/selectGarageCity'
        post_ajax(url, aaa, function (json) {
          // console.log('省的值的数据')
          // console.log(json)
          // 判断对象是否为空的方法
          function isEmptyObject(obj) {
            for (var key in obj) {
              return false;
            }
            return true;
          }
          if (json.code == 0) {
            this_1.listsTable_citys = json.data.list
            // 空就不显示城市
            if (isEmptyObject(json.data)) {
              this_1.city_show = false
            } else {
              this_1.city_show = true
            }
            // page
            var pages = json.data.pages
            laypage({
              cont: 'pageShi',
              pages: pages,
              curr: curr || 1,
              jump: function (e, first) {
                if (!first) {
                  var curr = e.curr;
                  this_1.get_shiData(curr);
                }
              }
            })
          }
        })
      },
      // 全国的公鸡图
      set_gongji: function () {
        var this_1 = this
        var aaa = {
          pageNum: 1,
          pageSize: '100'
        }
        var url = 'backStage/chart/selectGarageProvince'
        post_ajax(url, aaa, function (json) {
          // console.log('公鸡图省的值的数据')
          // console.log(json)
          if (json.code == 0) {
            var arrData = []
            for (var i in json.data.list) {
              if (json.data.list[i].province == '黑龙江省' || json.data.list[i].province == '内蒙古自治区') {
                arrData.push({
                  name: json.data.list[i].province.slice(0, 3),
                  value: json.data.list[i].caronwer_number
                })
              } else {
                arrData.push({
                  name: json.data.list[i].province.slice(0, 2),
                  value: json.data.list[i].caronwer_number
                })
              }

            }
            // console.log(arrData)

            // 大公鸡图
            var myChart = echarts.init(document.getElementById('main'), 'shine');

            function randomData() {
              return Math.round(Math.random() * 1000);
            }
            var option = {
              title: {
                text: '各省支付情况',
                subtext: '西安卡门',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['iphone3', 'iphone4', 'iphone5']
              },
              visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true
              },
              toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                  dataView: {
                    readOnly: false
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              series: [{
                itemStyle: {
                  normal: {
                    color: function (params) {
                      var colorList = [
                        '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                      ];
                      return colorList[params.dataIndex]
                    },

                  }
                },
                name: '数据来源：西安卡门',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: arrData

              }]
            };
            myChart.setOption(option);

          }
        })
      },
      // 刷新按钮
      refresh_page: function () {
        var this_1 = this
        // 重置为默认的状态
        this_1.get_yesterDayMsg() // 得到昨日的关键指标数据
        this_1.get_qushituData(2) // 默认得到趋势图今日的数据
        this_1.get_usersData(1)

        this_1.get_shengData() // 获取省的数据
        this_1.city_show = false // 让城市隐藏
        
        this_1.set_gongji() // 公鸡图
      }

    },
    mounted() {
      var this_1 = this
      this_1.get_yesterDayMsg() // 得到昨日的关键指标数据
      this_1.get_qushituData(2) // 默认得到趋势图今日的数据
      this_1.get_usersData(1)

      this_1.get_shengData() // 获取省的数据
      // this_1.get_shiData() // 获取市的数据

      this_1.set_gongji() // 公鸡图

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

  .flex_ul {
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 10px 0;
  }

  .flex_ul>li {
    width: 30%;

  }

  .num {
    font-size: 25px;
    font-weight: 700;
  }

  .search_title {
    display: inline-block;
    margin: 0 10px;
  }

  .search_title_right {
    float: right;
  }

  .color_lan {
    color: #00CCFF;
  }

</style>
