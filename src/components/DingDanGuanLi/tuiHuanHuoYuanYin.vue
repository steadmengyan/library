<template>
  <div class="tuiHuanHuoYuanYin">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;退换货原因设置</span>
        </li>
        <li class="title_box_right">
          <span class="shuaxin">
            <button @click="refresh_btn()" type="button" class="btn btn-outline btn-default">
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
          <span class="left">退换货原因列表</span>
          <span class="right">
            <button @click="add_btn()" type="button" class="btn btn-outline btn-default">
              添加
            </button>
          </span>
        </caption>
        <thead>
          <tr>
            <th>原因类型</th>
            <th>添加时间</th>
            <th>排序</th>
            <th>是否启用</th>
            <th>原因内容</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td> 
              <span v-if="list.reason_type == 1">退货</span>
              <span v-else-if="list.reason_type == 2">换货</span>
            </td>
            <td> {{list.create_time}} </td>
            <td> 
              <span @click="remove_btn(list.id, 1)" class="glyphicon glyphicon-arrow-up"></span>
              &nbsp;&nbsp;
              <span @click="remove_btn(list.id, 2)" class="glyphicon glyphicon-arrow-down"></span>
            </td>
            <td> 
              <span v-if="list.is_use == 1">启用</span>
              <span v-else-if="list.is_use == 0">未启用</span>
            </td>
            <td> {{list.reason_content}} </td>
            <td>
              <span v-if="list.is_use == 0" @click="bianji_btn(list)" class="chakan">编辑</span>
              <span v-if="list.is_use == 0" @click="del_open(list, 1)" class="chakan">删除</span>
              <span v-if="list.is_use == 0" @click="del_open(list, 2)" class="chakan">启用</span>
              <span v-if="list.is_use == 1" @click="del_open(list, 3)" class="chakan">禁用</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-xs-12 Top20">
        <div id="page" style="text-align: center;"></div>
      </div>
    </div>

    <!-- 模态框（Modal）添加退货原因 -->
    <div class="modal fade" id="myModal_add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 v-if="add_status" class="modal-title" id="myModalLabel">添加订单退换货原因</h4>
            <h4 v-else class="modal-title" id="myModalLabel">修改订单退换货原因</h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi Top20">
              <li class="one line_h34">
                原因类型：
              </li>
              <li class="two">
                <select v-model="reason_type" class="form-control  tem2 line_input">
                  <option value="">请选择</option>
                  <option value="1">退货</option>
                  <option value="2">换货</option>
                </select>
              </li>
            </ul>
            <ul class="ul_guanbi Top20">
              <li class="one line_h34">
                原因内容：
              </li>
              <li class="two">
                <textarea v-model="reason_content" class="form-control" rows="3" name=textarea></textarea>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button v-if="add_status" @click="post_addBtn(1)" type="button" class="btn btn-primary">确定添加</button>
            <button v-else @click="post_addBtn(2)" type="button" class="btn btn-primary">确定修改</button>
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
    name: 'tuiHuanHuoYuanYin',
    data() {
      return {
        shaixuan_show: false, // 控制筛选的打开和隐藏
        userId: '',
        listsTable: [],
        add_status: true, // 切换添加和修改的状态切换
        reason_type: '',
        reason_content: '',
        id: '', // 修改的id
      }
    },
    created() {
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
        // ajax-post
        var url = 'backStage/reason/select'
        post_ajax(url, aaa, function (json) {
          // console.log('请求的页面的初始数据')
          // console.log(json)
          this_1.listsTable = json.data.list
          for(var i in this_1.listsTable){
            if(this_1.listsTable[i].create_time){
              this_1.listsTable[i].create_time = get_str_time(this_1.listsTable[i].create_time)
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
        })
      },
      // 添加的按钮
      add_btn: function () {
        var this_1 = this
        this_1.add_status = true
        this_1.reason_type = ''
        this_1.reason_content = ''
        $("#myModal_add").modal('show')
      },
      // 修改的按钮
      bianji_btn: function (list) {
        var this_1 = this
        this_1.add_status = false
        this_1.id = list.id
        this_1.reason_type = list.reason_type
        this_1.reason_content = list.reason_content
        $("#myModal_add").modal('show')
      },
      // 发送数据
      post_addBtn: function (num) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          reason_type: this_1.reason_type,
          reason_content: this_1.reason_content
        }
        var url = null
        if(num == 1){
          url = 'backStage/reason/insert'
        }else if (num == 2){
          url = 'backStage/reason/update'
          aaa.id = this_1.id
          aaa.type = '1'
        }
        $("#myModal_add").modal('hide')
        post_ajax(url, aaa, function (json) {
          layer.msg(json.msg)
          if(json.code == 0) {
            setTimeout(function(){
              this_1.init()
            }, 1000)
          }
        })
      },
      // 删除和启用的按钮
      del_open: function (list, num) {
        var this_1 = this
        var aaa = {
          userId: this_1.userId,
          id: list.id,
        }
        var msg = null
        if(num == 1){ // 删除
          aaa.type = '3'
          msg = '是否删除'
        }else if (num == 2){ // 启用
          aaa.type = '2'
          aaa.is_use = '1'
          msg = '是否启用'
        }else if (num == 3){ // 禁用
          aaa.type = '2'
          aaa.is_use = '0'
          msg = '是否禁用'
        }
        // 小弹框
        layer.confirm(msg, function(index){
          //do something
          post_ajax('backStage/reason/update', aaa, function(json){
            layer.close(index);
            layer.msg(json.msg)
            if(json.code == 0) {
              setTimeout(function(){
                this_1.init()
              }, 1000)
            }
          })
        });       
      },
      // 移动的按钮
      remove_btn: function (id, num) {
        var this_1 = this
        var exchange_id = null
        var index = null
        if(num == 1){ // 上移
          for(var i in this_1.listsTable){
            if(this_1.listsTable[i].id == id){
              // console.log(i)
              index = parseInt(i) - 1
              if(index < 0){
                index = this_1.listsTable.length - 1
              }
              // console.log(index)
              exchange_id = this_1.listsTable[index].id
            }
          }

        }else if (num == 2){ // 下移
        for(var i in this_1.listsTable){
            if(this_1.listsTable[i].id == id){
              // console.log(i)
              index = parseInt(i) + 1
              if(index > this_1.listsTable.length - 1){
                index = 0
              }
              // console.log(index)
              exchange_id = this_1.listsTable[index].id
            }
          }

        } 
        var aaa = {
          userId: this_1.userId,
          id: id,
          exchange_id: exchange_id
        }
        post_ajax('backStage/reason/exchange', aaa, function(json){
          layer.msg(json.msg)
          if(json.code == 0){
            setTimeout(function(){
              this_1.init()
            }, 1000)
          }
        })
      },
      // 查看按钮
      refresh_btn: function () {
        var this_1 = this
        this_1.init()
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

  .left {
    float: left;
  }

  .right {
    float: right;
    margin-right: 20px;
  }

  .ul_guanbi {
    display: flex;
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
