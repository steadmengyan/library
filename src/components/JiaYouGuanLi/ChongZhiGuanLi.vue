


<template>
  <div class="ChongZhiGuanLi">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;充值管理</span>
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

  

    <div class="content_body">
      <table class="table table-bordered">
        <caption class="table_title clearfix">
          <span class="left">数据列表</span>
          <span class="right">
            <button @click="tianjia()" type="button" class="btn btn-outline btn-default" >
              添加
            </button>
          </span>
        </caption>
        <thead>
          <tr>
            <th>充值金额</th>
            <th>折扣比例</th>
            <th>实付金额</th>
            <th>销售数量</th>          
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td>  {{list.id}} </td>
            <td> {{list.soc_create}} </td>
            <td> {{list.userName}} </td>
            <td> ￥ {{list.order_money}} </td>
          
            <td> 
              <span v-if="list.state == 1"> 待付款 </span>
              <span v-else-if="list.state == 2">待发货</span>
              <span v-else-if="list.state == 3">待收货</span>
              <span v-else-if="list.state == 4">已完成</span>
              <span v-else-if="list.state == 5">已取消</span>
              <span v-else-if="list.state == 6">已关闭</span>
              <span v-else-if="list.state == 7">删除订单</span>
            </td>
            <td>
              <span  class="chakan" @click="xiajia()">停用</span>
              <span   class="chakan"  @click="xiugai()">编辑</span>

              
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-xs-12 Top20">
        <div id="page" style="text-align: center;"></div>
      </div>
    </div>

    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 添加充值方案 </h4>
          </div>
          <div class="modal-body">
          	<ul class="ul_guanbi">
                <li class="one">
                      <span style="color:red;">*</span>
                    			充值金额：
                  </li>
                  <li  class="two">
                      <div class="input-group w_200">
			            <input type="text" class="form-control">
			            <span class="input-group-addon">元</span>
			        </div>
                  </li>
              </ul>
              <ul class="ul_guanbi">
                  <li class="one">
                      <span style="color:red;">*</span>
                    			折扣比例：
                  </li>
                   <li  class="two">
                      <div class="input-group">
			            <input type="text" class="form-control w_200" >
			        </div>
                  </li>
                 
                
              </ul>
              
              <ul class="ul_guanbi">
                <li class="one">
                      <span style="color:red;">*</span>
                    			实付金额：
                  </li>
                  <li  class="two">
                      <div class="input-group w_200">
			            <input type="text" class="form-control">
			            <span class="input-group-addon">元</span>
			        </div>
                  </li>
              </ul>
              <ul class="ul_guanbi">
                  <li class="one">
                      <span style="color:red;">*</span>
                    			销售数量：
                  </li>
                   <li  class="two">
                      <div class="input-group  w_200">
			            <input type="text" class="form-control " >
			        </div>
                  </li>
                 
                
              </ul>
               <ul class="ul_guanbi">
                  <li class="one">
                      <span style="color:red;">*</span>
                    			状态：
                  </li>
                   <li  class="two">
                      <div class="input-group  w_200">
			            <select  class="form-control">
						      <option>请选择</option>
						      <option>待打款</option>
						      <option>已打款</option>
						      <option>拒绝打款</option>
						    </select>
			        </div>
                  </li>
                 
                
              </ul>
               
            
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
    <div class="modal fade" id="myModal_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 修改充值方案 </h4>
          </div>
          <div class="modal-body">
             <ul class="ul_guanbi">
                <li class="one">
                      <span style="color:red;">*</span>
                    			充值金额：
                  </li>
                  <li  class="two">
                      <div class="input-group w_200">
			            <input type="text" class="form-control">
			            <span class="input-group-addon">元</span>
			        </div>
                  </li>
              </ul>
              <ul class="ul_guanbi">
                  <li class="one">
                      <span style="color:red;">*</span>
                    			折扣比例：
                  </li>
                   <li  class="two">
                      <div class="input-group">
			            <input type="text" class="form-control w_200" >
			        </div>
                  </li>
                 
                
              </ul>
              
              <ul class="ul_guanbi">
                <li class="one">
                      <span style="color:red;">*</span>
                    			实付金额：
                  </li>
                  <li  class="two">
                      <div class="input-group w_200">
			            <input type="text" class="form-control">
			            <span class="input-group-addon">元</span>
			        </div>
                  </li>
              </ul>
              <ul class="ul_guanbi">
                  <li class="one">
                      <span style="color:red;">*</span>
                    			销售数量：
                  </li>
                   <li  class="two">
                      <div class="input-group  w_200">
			            <input type="text" class="form-control " >
			        </div>
                  </li>
                 
                
              </ul>
               <ul class="ul_guanbi">
                  <li class="one">
                      <span style="color:red;">*</span>
                    			状态：
                  </li>
                   <li  class="two">
                      <div class="input-group  w_200">
			            <select  class="form-control">
						      <option>请选择</option>
						      <option>待打款</option>
						      <option>已打款</option>
						      <option>拒绝打款</option>
						    </select>
			        </div>
                  </li>
                 
                
              </ul>
               
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
    <div class="modal fade" id="myModal_3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 充值方案停用 </h4>
          </div>
          <div class="modal-body text-center" >
             是否停用此充值方案？
              
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
    
   

  </div>
</template>
<script>
  export default {
    name: 'ChongZhiGuanLi',
    data() {
      return {
        shaixuan_show: true, // 控制筛选的打开和隐藏
        userId: '',
        listsTable: [],
       

      }
    },
    created() {
      var this_1 = this
      this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
      // 得到顶部的信息
      get_msg:  function () {
        var this_1 = this
        var aaa = {
          userId: this_1.userId
        }
        var url = 'backStage/goodsOrderDetail/selectOrderStateCount'
        post_ajax(url, aaa, function(json){
          // console.log('请求页面顶部的信息')
          // console.log(json)
          if(json.code == 0){
            this_1.state_one = json.data.state_one
            this_1.state_two = json.data.state_two
            this_1.state_three = json.data.state_three
            this_1.state_four = json.data.state_four
            this_1.state_five = json.data.state_five
            this_1.state_six = json.data.state_six
          }
        })
      },
      init: function (curr) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          pageNum: curr || "1",
          pageSize: "10"
        }
      
        var url = 'backStage/goodsOrderDetail/findDetail'
        post_ajax(url, aaa, function (json) {
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
     
      // 刷新按钮
      refresh_page: function () {
        var this_1 = this
    
        this_1.init()
      },
      
      tianjia:function(){
      	 $("#myModal_1").modal('show')
      },
      xiugai:function(){
      	 $("#myModal_2").modal('show')
      },
      xiajia:function(){
      	 $("#myModal_3").modal('show')
      },
   
  
    
 
 
    },
    mounted() {
      var this_1 = this
      this_1.get_msg() // 请求头部信息
      this_1.init()
      // 鼠标悬浮到导航栏上让颜色河北边框变换
      $(".dingdanliebiao_nav").children('li').hover(function () {
        $(this).css({
          border: '1px solid #6dc0fe'
        })
      }, function () {
        $(this).css({
          border: '1px solid #e4e4e4'
        })
      })
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

  .dingdanliebiao_nav {
    display: flex;
    border: 0;
  }

  .dingdanliebiao_nav>li {
    margin: 5px 10px;
    padding: 5px 30px;
    border: 1px solid #e4e4e4;
  }

  .left {
    display: inline-block;
    float: left;
  }

  .right {
    display: inline-block;
    float: right;
    padding-right: 20px;
  }
  .ul_guanbi{
      display: flex;
  }
.one{
    width: 30%;
    text-align: right;
}
.two{
    width: 60%;
}
.line_h34{
    line-height: 34px;
}

.w_100{
	width:100px
}
.w_200{
	width:200px
}
</style>
