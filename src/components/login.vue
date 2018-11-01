<template>
  <div class="login">
    <div class="middle-box text-center loginscreen  animated fadeInDown" style="margin:0;padding:0;">
        
            <h3>车盈门运营管理项目</h3>
            <form class="m-t" role="form" action="index.html">
                <div class="form-group">
                    <input type="text"  v-model="username" class="form-control" placeholder="用户名" required="required">
                </div>
                <div class="form-group">
                    <input type="password"  v-model="passWord" @keyup.enter="login_btn()" class="form-control" placeholder="密码" required="required">
                </div>
                <span  @click.stop="login_btn()" class="btn btn-primary ">登 录</span>
            </form>
        
    </div>
  </div>

</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        passWord: ''
      }  
    },
    created () {
      // console.log(window.location.href)
    },
    methods : {
      login_btn: function () {
        var this_1 = this
        var aaa = {
          username: this_1.username,
          passWord: this_1.passWord
        }
        $.ajax({
          type: 'post',
          url: urls + 'backStage/user/login',
          data: aaa,
          success: function (json) {
            // console.log(json)
            if(json.code == 0){
              console.log(window.location.href)
              // sessionStorage.setItem("user_menu_list", JSON.stringify(data.data.user_menu_list))
              sessionStorage.setItem("token", json.data.token); // token
              sessionStorage.setItem("uid", json.data.uid) // 账号
              sessionStorage.setItem("name", json.data.name) // 名称
              sessionStorage.setItem('login_address', window.location.href) // 存储登录地址，令牌失效好跳转
              this_1.$router.push({
                path: '/home'
              })

            }else{
              layer.msg(json.msg)
            }
            
          }
        })
      },
      
    },
    mounted () {
      var this_1 = this
      
    }
  }

</script>

<style scoped>
.login{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
