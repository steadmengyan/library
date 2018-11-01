<template>
  <div class="YongHuShuXing">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;用户属性</span>
        </li>
      </ul>
    </header>

    <div class="content_body">
      <div id="myChart_sex" style="width: 100%;height:400px;"></div>
      <h1></h1>
      <!-- <div id="myChart_shengfen" style="width:100%;height:400px;"></div> -->
      <div id="main" style="width: 1000px;height:800px;"></div>

      <h1></h1>
      <table class="table table-bordered">
        <caption class="">各省人数情况</caption>
        <thead>
          <tr>
            <th>省份</th>
            <th>人数</th>
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

      <table class="table table-bordered" v-if="listsTable_citys.length > 0">
        <caption> {{province}}各市人数情况</caption>
        <thead>
          <tr>
            <th>城市</th>
            <th>人数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable_citys" :key="index" v-if="listsTable_citys.length > 0">
            <td> {{list.city}} </td>
            <td> {{list.carowner_number}} </td>
          </tr>
        </tbody>
      </table>
      <div class="Top20">
        <div id="pageShi" style="text-align: center;"></div>
      </div>

      <h1></h1>
      <div id="myChart_phone" style="width: 100%;height:400px;"></div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'YongHuShuXing',
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
        // 性别的参数
        woman: '',
        man: '',
        unknown: ''
      }
    },
    created() {
      var this_1 = this
      this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
      // 设置大饼图 zengchang_dabingtu
      set_dabingtu_sex: function (legend_data, series_data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart_sex = echarts.init(document.getElementById('myChart_sex'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '性别分布',
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
        myChart_sex.setOption(option);
      },
      // 设置大饼图 终端分布
      set_dabingtu_phone: function (legend_data, series_data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart_phone = echarts.init(document.getElementById('myChart_phone'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '终端分布',
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
        myChart_phone.setOption(option);
      },
      // 获取大饼图 用户来源的数据
      get_sexsData: function () {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,

        }
        var url = 'backStage/chart/selectSex'
        post_ajax(url, aaa, function (json) {
          // console.log('用户来源的数据')
          // console.log(json)
          if (json.code == 0) {
            // 性别的数据
            var legend_data = ['未知', '女', '男']
            var series_data = [{
              name: '性别分析',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [{
                  value: json.data.sex.unknown,
                  name: '未知'
                },
                {
                  value: json.data.sex.woman,
                  name: '女'
                },
                {
                  value: json.data.sex.man,
                  name: '男'
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
            this_1.set_dabingtu_sex(legend_data, series_data)
            // 手机端的数据
            var legend_data_phone = ['iphone', 'Android']
            var series_data_phone = [{
              name: '终端分布',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [{
                  value: json.data.phone.ios,
                  name: 'iphone'
                },
                {
                  value: json.data.phone.android,
                  name: 'Android'
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
            this_1.set_dabingtu_phone(legend_data_phone, series_data_phone)

          }
        })

      },
      // 省份的分布图
      get_shengData: function (curr) {
        var this_1 = this
        var aaa = {
          pageNum: curr || 1,
          pageSize: '10'
        }
        var url = 'backStage/chart/selectUserProvince'
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
      click_shengBtn: function (list) {
        var this_1 = this
        this_1.province_id = list.provinceid
        this_1.province = list.province
        this_1.get_shiData()
      },
      // 省对应下面的市的数据
      get_shiData: function (curr) {
        var this_1 = this
        var aaa = {
          pageNum: curr || 1,
          pageSize: '10',
          province_id: this_1.province_id
        }
        var url = 'backStage/chart/selectCity'
        post_ajax(url, aaa, function (json) {
          // console.log('省的值的数据')
          // console.log(json)
          if (json.code == 0) {
            this_1.listsTable_citys = json.data.list
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
        var url = 'backStage/chart/selectUserProvince'
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
                text: '各省人数情况',
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
      }

    },
    mounted() {
      var this_1 = this
      this_1.get_sexsData()
      this_1.get_shengData()
      this_1.set_gongji()
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
