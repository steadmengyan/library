<template>
    <div class="HeHuoRenTiXian">
        <header class="content_title">
              <ul class="title_box">
                  <li class="title_box_left">
                      <span class="line_title"></span>
                        <span class="name_title"> &nbsp;合伙人提现</span>
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
            <ul class="search_ul" >
                <li>
                    合伙人名称：
                    <input class="form-control line_input">   
                </li>
                <li>
                    合伙人手机：
                    <input class="form-control line_input">   
                </li>
                <li>
                    状态：
                    <select v-model="auditState" class="form-control line_input" >
                        <option value="">请选择</option>
                        <option value="1">未审核</option>
                        <option value="2">审核通过</option>
                    </select> 
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>提现编号</th>
                        <th>合伙人姓名</th>
                        <th>联系电话</th>
                        <th>申请时间</th>
                        <th>提现金额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.id}} </td>
                        <td> {{list.companyName}} </td>
                        <td> - </td>
                        <td> {{list.apply_time}} </td>
                        <td> {{list.plusMoney}} </td>
                        <td>
                            <span v-if="list.audit_state == 1">未审核</span>
                            <span v-else-if="list.audit_state == 2">审核通过</span>
                        </td>
                        <td>
                            <span @click="dakuan_btn(list, 1)" v-if="list.audit_state ">打款</span>
                            <span @click="dakuan_btn(list, 2)" v-if="list.audit_state ">拒绝</span>
                            <span @click="dakuan_btn(list.audit_state)">查看</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12 Top20" >
                <div id="page" style="text-align: center;"></div>
            </div>
        </div>
        
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal_dakuan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style="width:800px;">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="dakuang_status" class="modal-title" id="myModalLabel">提现打款</h4>
                        <h4 v-else class="modal-title" id="myModalLabel">拒绝打款</h4>
                    </div>
                    <div class="modal-body">
                        <ul class="box_dakuan Top20">
                            <li class="one">
                                收款用户名：
                            </li>
                            <li class="two">
                                {{companyName}}
                            </li>
                        </ul>
                        <ul class="box_dakuan Top20">
                            <li class="one">
                                开户行：
                            </li>
                            <li class="two">
                                {{openBank}}
                            </li>
                        </ul>
                        <ul class="box_dakuan Top20">
                            <li class="one">
                                帐号：
                            </li>
                            <li class="two">
                                {{bankNumber}}
                            </li>
                        </ul>
                        <ul class="box_dakuan Top20">
                            <li class="one">
                                <span v-if="dakuang_status">银行回执单：</span>
                                <span v-else>拒绝理由：</span>
                            </li>
                            <li  class="two">
                                
                                <div v-if="dakuang_status" @click="img_addBtn()">
                                    <img v-if="huizhi_img" :src="huizhi_img" style="max-width:300px;">
                                <span class="jiahao" v-else>+</span>
                                </div>
                                <div v-else>
                                    <textarea v-model="rejectReason" class="form-control" rows="3" name=textarea style="max-width:300px;"></textarea>
                                </div>
                            </li>
                        </ul>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="post_dakuan(1)" v-if="dakuang_status" type="button" class="btn btn-primary">确定打款</button>
                        <button @click="post_dakuan(2)"  v-else type="button" class="btn btn-primary">拒绝打款</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

    </div>
</template>
<script>
export default {
    name: 'HeHuoRenTiXian',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            listsTable: [],
            userId: '',
            // 打款的参数
            openBank: '',
            bankNumber: '',
            companyName: '',
            huizhi_img: '', // 回执单
            dakuang_status: true,
            rejectReason: '', // 拒绝理由
            // 审核提交
            id: '',
            // 搜索的字段
            auditState: ''


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
                pageSize: "10",
                auditType: '2'
            }
            // 筛选的条件
            if(this_1.auditState) aaa.auditState = this_1.auditState
            // ajax-post
            var url = 'backStage/fundExFund/findFund' 
            post_ajax(url, aaa, function(json){
                // console.log('合伙人提现')
                // console.log(json)
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
            })
        },
        // 打款的按钮
        dakuan_btn: function(list, num){
            var this_1 = this
            if(num == 1){
                this_1.dakuang_status = true
            }else if (num == 2){
                this_1.dakuang_status = false
            }
            $("#myModal_dakuan").modal('show')
            this_1.openBank = list.openBank
            this_1.bankNumber = list.bankNumber
            this_1.companyName = list.companyName
            this_1.id = list.id
        },
        // 上传回执的按钮
        img_addBtn: function(){
            var this_1 = this
            baiduupload({}, function(url){
                // console.log(url)
                this_1.huizhi_img = url
            })
        },  
        post_dakuan: function(num){
            var this_1 = this
            var aaa = {
                id: this_1.id,
                userId: this_1.userId,
            }
            if(num == 1){
                aaa.state = '2' // 审核通过
                // 差一个回执照片的参数
            }else if(num == 2){
                aaa.state = '3' // 驳回
                aaa.rejectReason = this_1.rejectReason
            }
            var url = 'backStage/fundExFund/updateState'
            post_ajax(url, aaa, function(json){
                layer.msg(json.msg)
                if(json.code == 0){
                    setTimeout(function(){
                        this_1.init()
                    }, 1000)
                }
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
            this_1.auditState = ''
            this_1.init()
        },
        // 查看按钮
        see_it () {
            var this_1 = this
            this_1.$router.push({
                name: 'XiuLiChangShouKuanJieSuanMingXi'
            })
        }
    },
    mounted () {
        var this_1 = this
        this_1.init()

    }
}
</script>
<style scoped>
.line_input{
    width:200px;display:inline-block;
}
.search_ul>li{
    display: inline-block;
    margin-right: 20px;
}
.search_ul>li:nth-child(1){
    text-indent: 20px;
}
th,td{ 
    text-align:center; /** 设置水平方向居中 */ 
    vertical-align:middle; /** 设置垂直方向居中 */ 
} 
.box_dakuan{
    display: flex;
}
.one{
    width:40%;
    text-align: right;
}
.two{
    width: 60%;
}
.jiahao{
    display: block;
    font-size: 50px;
    line-height: 170px;
    text-align: center;
    border:1px solid black;
    width: 300px;
    height:170px;
    cursor: pointer;
}
</style>
