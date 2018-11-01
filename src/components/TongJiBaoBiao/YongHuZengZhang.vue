<template>
  <div class="YongHuZengZhang">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;用户增长</span>
        </li>
      </ul>
    </header>

    <div class="content_body">
      <p>昨日关键指标</p>
      <ul class="flex_ul">
        <li>
          <p>昨日新增</p>
          <p class="num"> {{yesterday_user}} </p>
        </li>
        <li>
          <p>今日新增</p>
          <p class="num"> {{today_user}} </p>
        </li>
        <li>
          <p>累积人数</p>
          <p class="num"> {{carowner_count}} </p>
        </li>
      </ul>
      <p class="clearfix">
        <span @click="get_qushituData(1)" class="search_title color_lan">今日</span>
        <span @click="get_qushituData(2)" class="search_title color_lan">最近30天</span>
        <span class="search_title">
          <input id="first_time" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"> -
          <input id="end_time" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
        </span>
        <span @click="get_qushituData(3)" class="search_title color_lan">搜索时间段</span>
        <span class="search_title search_title_right "> 按时间对比 </span>
      </p>
      <p>趋势图</p>
      <div id="zengchang_qushitu" style="width: 100%;height:400px;"></div>

      <h1></h1>

      <p class="clearfix">
        <span @click="get_usersData(1)" class="search_title color_lan">全部</span>
        <span @click="get_usersData(2)" class="search_title color_lan">今日</span>
        <span class="search_title">
          <input id="first_time_users" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"> -
          <input id="end_time_users" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
        </span>
        <span @click="get_usersData(3)" class="search_title color_lan">搜索时间段</span>
      </p>
      <div id="myChart_dabingtu" style="width: 100%;height:400px;"></div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'YongHuZengZhang',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        userId: '',
        first_time: '',
        end_time: '',
        listsTable: [],
        // 得到昨日关键数据
        carowner_count: '',
        today_user: '',
        yesterday_user: ''
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
          userId: this_1.userId
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
          if (!$("#first_time").val()) {
            layer.msg('请选择开始时间')
            return
          }
          if (!$("#end_time").val()) {
            layer.msg('请选择结束时间')
            return
          }
          aaa.first_time = $("#first_time").val()
          aaa.end_time = $("#end_time").val()
        }
        var url = 'backStage/chart/selectTrendChart'
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
          first_time.setFullYear(2018)
          first_time.setMonth(0)
          first_time.setDate(1)
          first_time.setHours(0)
          first_time.setMinutes(0)
          first_time.setSeconds(0)
          first_time.setMilliseconds(0)
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
          if (!$("#first_time_users")) {
            layer.msg('请选择开始时间')
            return
          }
          if (!$("#end_time_users")) {
            layer.msg('请选择结束时间')
            return
          }
          aaa.first_time = $("#first_time_users").val()
          aaa.end_time = $("#end_time_users").val()
        }
        var url = 'backStage/chart/selectUserSource'
        post_ajax(url, aaa, function (json) {
          // console.log('用户来源的数据')
          // console.log(json)
          if (json.code == 0) {
            var legend_data = ['应用市场', '修理厂邀约']
            var series_data = [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [{
                  value: json.data.market_carowner_count,
                  name: '应用市场'
                },
                {
                  value: json.data.garage_user,
                  name: '修理厂邀约'
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

      }

    },
    mounted() {
      var this_1 = this
      this_1.get_yesterDayMsg() // 得到昨日的关键指标数据
      this_1.get_qushituData(1) // 默认得到趋势图今日的数据
      this_1.get_usersData(1)

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
    cursor: pointer;
  }

</style>
