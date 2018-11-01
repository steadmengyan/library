<template>
  <div class="YongHuLiuLiang">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;用户流量</span>
        </li>
      </ul>
    </header>

    <!-- 布局 -->
    <div class="content_body">
        <div class="content_up">
          <h4>今日数据总览:</h4>
          <ul class="content_up_uls">
            <li>浏览量</li>
            <li>访客数</li>
            <li>新增用户登陆</li>
            <li>平均访问时长</li>
            <li>最高同时在线人数</li>
          </ul>
          <ul class="content_up_uls1" style="width:150px;">
            <li>今日</li>
            <li>昨日</li>
            <li>日环比</li>
            <li>周同比</li>
          </ul>
          <ul class="content_up_uls1">
            <li>1933</li>
            <li>1876</li>
            <li style="color:red;">10.5%</li>
          </ul>
          <ul class="content_up_uls1">
            <li>1477</li>
            <li>1200</li>
          </ul>
          <ul class="content_up_uls1">
            <li>567</li>
            <li>550</li>
          </ul>
        </div>
        <div class="content_down content_up">
          <h4>流量日数据:</h4>
          <span class="sp">时间：
              <span class="kuang">今日</span>
              <span class="kuang">昨日</span>
              <span class="kuang">最近7天</span>
              <span class="kuang">最近30天</span>
              <input type="date">
          </span>
          <br>
          <span class="sp">指标：
              <span class="bi" style="background:#169BD5;">访客数</span>
              <span class="bi" style="background:#FF0000;">浏览数</span>
              <span class="bi" style="background:#008000;">新增登录用户</span>
          </span>
          <div id="myChart_liuliang">
            <!-- <img src="https://d2v8ggac1o0f6z.cloudfront.net/gsc/NZNGOJ/7f/0b/15/7f0b157306cc49279d9888849db9bd8f/images/%E7%94%A8%E6%88%B7%E6%B5%81%E9%87%8F/%E8%AE%BF%E5%AE%A2%E6%95%B0_u7542.png?token=0510916c0bd2154b40f0f2821e1b20d7" alt="" > -->
          </div>
        </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "YongHuLiuLiang",
  data() {
    return {};
  },
  created() {},
  methods: {
    setZhexian() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart_liuliang"));

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2016/10/11",
            "2016/10/14",
            "2016/10/17",
            "2016/10/20",
            "2016/10/23",
            "2016/10/26",
            "2016/10/29",
            "2016/11/01",
            "2016/11/04",
            "2016/11/07"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              820,
              932,
              1501,
              934,
              2290,
              1330,
              1320,
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320
            ],
            type: "line",
            areaStyle: {},
            color: ["rgba(22, 155, 213, 1)"]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    var this_1 = this;
    this_1.setZhexian();
  }
};
</script>
<style scoped>
.YongHuLiuLiang {
  background-color: rgb(246, 247, 249);
  width: 100%;
  height: 100%;
}
.content_body {
  width: 1300px;
  height: auto;
  margin: 0 auto;
  background-color: rgb(246, 247, 249);
}
.content_up {
  width: 1299px;
  height: 247px;
  background-color: #fff;
  margin: 20px 0 20px 0;
  padding: 0 0 20px 30px;
  box-shadow: 1px 1px 1px rgba(204, 204, 204, 0.349019607843137);
}
.content_up h4 {
  height: 45px;
  line-height: 45px;
}
.content_up_uls {
  height: 30px;
  margin-left: 140px;
}
.content_up_uls li {
  float: left;
  width: calc(1100px / 5);
}

.content_up_uls1 {
  width: 220px;
  float: left;
}
.content_up_uls1 li {
  height: 40px;
}

.content_down {
  width: 1299px;
  height: 505px;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(204, 204, 204, 0.349019607843137);
}

.sp {
  display: inline-block;
  padding: 10px 10px;
}
.sp .kuang {
  display: inline-block;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
}
.bi {
  display: inline-block;
  width: 124px;
  height: 23px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  line-height: 23px;
  color: #fff;
}

#myChart_liuliang {
  width: 90%;
  height: 296px;
  /* background-color: #eeeeee; */
  margin: 0 auto;
}
#myChart_liuliang img {
  width: 90%;
  height: 296px;
  /* background-color: #eeeeee; */
  margin: 0 auto;
}
</style>
