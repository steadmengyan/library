<template>
    <div class="KaiTongChengShi">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;加油卡开通城市</span>
                  </li>
                  <li class="title_box_right">
                      <span class="shuaxin">
                        <button @click="refresh_page()" type="button" class="btn btn-outline btn-default">
                            <span class="glyphicon glyphicon-refresh"></span>
                            刷新
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
            <ul class="search_ul dingdanjilu_ul">
                <li>
                    负责人：
                    <input  v-model="order_id" class="form-control line_input " >

                </li>
                <li>
                    开通时间：
                    <input id="first_time"  class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="end_time"  class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">   
                </li>
                <li>
                    开通城市：
                    <div class="bs-chinese-region flat dropdown" data-submit-type="id" data-min-level="1" data-max-level="2">
		<input type="text" class="form-control" name="address" id="address" placeholder="选择你的地区" data-toggle="dropdown" readonly="" value="440103">
		<div class="dropdown-menu" role="menu" aria-labelledby="dLabel">
			<div>
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#province" data-next="city" role="tab" data-toggle="tab">省份</a></li>
					<li role="presentation"><a href="#city" data-next="district" role="tab" data-toggle="tab">城市</a></li>
					<!--<li role="presentation"><a href="#district" data-next="street" role="tab" data-toggle="tab">县区</a></li>-->
				</ul>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane active" id="province">--</div>
					<div role="tabpanel" class="tab-pane" id="city">--</div>
					<!--<div role="tabpanel" class="tab-pane" id="district">--</div>-->
				</div>
			</div>
		</div>
	</div>
                </li>
                <li>
                    启动状态：
                    <select v-model="pay_line" class="form-control  tem2 line_input" >
                        <option value="">请选择</option>
                        <option value="1">待启用</option>
                        <option value="2">已启用</option>
                        <option value="2">关停</option>
                    </select>
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>城市编号</th>
                        <th>省份</th>
                        <th>城市</th>
                        <th>负责人</th>
                        <th>负责人电话</th>
                        <th>开通时间</th>
                        <th>激活数量</th>
                        <th>状态</th>
                        <th>操作</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td> 1 </td>
                        <td> 1 </td>
                        <td>1 </td>
                        <td> 1</td>
                        <td> 1</td>
                        <td>1 </td>
                        <td>1 </td>
                        <td>1</td>
                        <td >
                        	 <span  class="chakan" @click="qiyong()">启用</span>
              				<span   class="chakan"  @click="xiugai()">编辑</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12 Top20" >
                <div id="page" style="text-align: center;"></div>
            </div>
        </div>
        
        
        
        <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 充值详情 </h4>
          </div>
          <div class="modal-body ">
             <h3>基本信息</h3>
             <div class="ml-20">
             	<label>订单编号:</label>&nbsp;&nbsp;12312312            	
             </div>
             <div class="ml-20">
             	<label>充值金额:</label>&nbsp;&nbsp;12312312            	
             </div>
             <div class="ml-20">
             	<label>实付金额:</label>&nbsp;&nbsp;支付宝&nbsp;&nbsp;&nbsp;12312312            	
             </div> 
             <div class="ml-20">
             	<label>支付方式:</label>&nbsp;&nbsp;支付宝&nbsp;&nbsp;&nbsp;12312312            	
             </div>
              <div class="ml-20">
             	<label>提交时间:</label>&nbsp;&nbsp;12312312            	
             </div>
              <div class="ml-20">
             	<label>供货商:</label>&nbsp;&nbsp;12312312            	
             </div> 
             <div class="ml-20">
             	<label>用户信息:</label>&nbsp;&nbsp;鸭蛋&nbsp;&nbsp;12312312            	
             </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button @click="guanbi_post()" type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
        <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 充值详情 </h4>
          </div>
          <div class="modal-body text-center">
             		是否启用此城市？
             
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button @click="guanbi_post()" type="button" class="btn btn-primary">启用</button>
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
    name: 'KaiTongChengShi',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            // 搜索字段
            first_time: '',
            end_time: '',
            order_id: '',
            is_close: '',
            pay_line: ''
            
        }
    },
    created () {
        var this_1 = this
        this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
        init: function (curr) {
            var this_1 = this
            var aaa = {
                userId: this_1.userId,
                pageNum: curr || "1",
                pageSize: "10"
            }
            // 搜索的 字段
            if($("#first_time").val()) aaa.first_time = $("#first_time").val()
            if($("#end_time").val()) aaa.end_time = $("#end_time").val()
            if(this_1.is_close !== '') aaa.is_close = this_1.is_close
            if(this_1.pay_line) aaa.pay_line = this_1.pay_line
            if(this_1.order_id) aaa.order_id = this_1.order_id
            // ajax-post
            var url = 'backStage/financial/selectOrderClose'
            post_ajax(url, aaa, function(json){
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
        // 筛选框的显示隐藏
        shaixuan_showBtn: function () {
            var this_1 = this
            this_1.shaixuan_show = !this_1.shaixuan_show
            $(".search_ul").toggle(300)
        },
        // 刷新按钮
        refresh_page: function () {
            var this_1 = this
            $("#first_time").val('')
            $("#end_time").val('')
            this_1.is_close = ''
            this_1.pay_line = ''
            this_1.order_id = ''
            this_1.init()
        },
        // 查看按钮
        qiyong () {
            var this_1 = this
			$("#myModal_1").modal('show')
        }
    },
    mounted () {
        var this_1 = this
        this_1.init()
        $.getJSON('../../../static/bootstrap-chinese-region-master/src/sql_areas.json',function(data){
		
		/**重定义数据结构**/
		/**
		 * id 键,name 名字,level 层级,parentId 父级
		 */
		for (var i = 0; i < data.length; i++) {
			var area = {id:data[i].id,name:data[i].cname,level:data[i].level,parentId:data[i].upid};
			data[i] = area;
		}

		$('.bs-chinese-region').chineseRegion('source',data);//导入数据并实例化
	});

    }
}
</script>
<style scoped>
.line_input{
    width:200px;display:inline-block;
}
.search_ul>li{
    display: inline-block;
    padding: 5px 20px;
}
th,td{ 
    text-align:center; /** 设置水平方向居中 */ 
    vertical-align:middle; /** 设置垂直方向居中 */ 
}
.color_169BD5{
    color: #169BD5;
}
.ml-20{
	margin-left:20px
}


</style>
