<template>
  <div class="box">
    <div class="content" :class="{ 'add-class-content': !isShow }">
      <img
        class="login-img images"
        src="../assets/login.png"
        alt="登录"
        :class="{ 'add-class-login-img': !isShow, 'add-class-login-img-show': isShow }"
      />
      <img
        class="register-img images"
        src="../assets/register.png"
        alt="注册"
        :class="{ 'add-class-register-img': !isShow }"
      />
      <div class="login-wrapper" :class="{ 'add-class-login-wrapper': !isShow }">
        <div class="top-tips">
          <span>智慧养老系统</span>
          <span class="top-tips-span" @click="toggleForm">{{ isShow ? '注册' : '登录' }}</span>
        </div>

        <h1 class="h1-text">{{ isShow ? '登录' : '注册' }}</h1>

        <!-- 登录表单 -->
        <div class="login-form" v-if="isShow">
          <div class="user-form form-item">
            <div class="text-tips">
              <span>账号</span>
            </div>
            <el-input class="username" v-model="loginForm.username" placeholder="用户名"></el-input>
          </div>
          <div class="password-form form-item">
            <div class="text-tips">
              <span>密码</span>
              <span class="forgot-password">忘记密码?</span>
            </div>
            <el-input placeholder="密码" v-model="loginForm.password" show-password></el-input>
          </div>
          <el-button class="btn" @click="UserLogin">登录</el-button>
        </div>
        <!-- 注册表单 -->
        <div class="register-form" v-if="!isShow">
          <div class="register-scroll">
            <div class="user-form form-item">
              <div class="text-tips">
                <span>账号</span>
              </div>
              <el-input placeholder="请输入用户名" v-model="regUser.regUsername" clearable></el-input>
            </div>
            <div class="password-form form-item">
              <div class="text-tips">
                <span>密码</span>
              </div>
              <el-input placeholder="请输入密码" v-model="regUser.regPwd" show-password></el-input>
            </div>
            <div class="password-form form-item">
              <div class="text-tips">
                <span>确认密码</span>
              </div>
              <el-input placeholder="请再次输入密码" v-model="regUser.regRePwd" show-password></el-input>
            </div>
            <div class="email-form form-item">
              <div class="text-tips">
                <span>邮箱</span>
              </div>
              <el-input placeholder="请输入邮箱" v-model="regUser.email" clearable></el-input>
            </div>
            <div class="gender-form form-item">
              <div class="text-tips">
                <span>性别</span>
              </div>
              <el-select v-model="regUser.gender" placeholder="请选择性别">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </div>
            <div class="phone-form form-item">
              <div class="text-tips">
                <span>手机号</span>
              </div>
              <el-input placeholder="请输入手机号" v-model="regUser.phone" clearable></el-input>
            </div>
            <div class="nickname-form form-item">
              <div class="text-tips">
                <span>昵称</span>
              </div>
              <el-input placeholder="请输入昵称" v-model="regUser.nickname" clearable></el-input>
            </div>
            <div class="realname-form form-item">
              <div class="text-tips">
                <span>真实姓名</span>
              </div>
              <el-input placeholder="请输入真实姓名" v-model="regUser.realname" clearable></el-input>
            </div>
            <el-button class="btn" @click="userRegister">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="box">
    <div class="content" :class="{ 'add-class-content': !isShow }">
      <img
        class="login-img images"
        src="../assets/login.png"
        alt="登录"
        :class="{ 'add-class-login-img': !isShow, 'add-class-login-img-show': isShow }"
      />
      <img
        class="register-img images"
        src="../assets/register.png"
        alt="注册"
        :class="{ 'add-class-register-img': !isShow }"
      />
      <div class="login-wrapper" :class="{ 'add-class-login-wrapper': !isShow }">
        <div class="top-tips">
          <span>智慧养老系统</span>
          <span class="top-tips-span" @click="toggleForm">{{ isShow ? '注册' : '登录' }}</span>
        </div>

        <h1 class="h1-text">{{ isShow ? '登录' : '注册' }}</h1>

        <!-- 登录表单 -->
        <div class="login-form" v-if="isShow">
          <div class="user-form form-item">
            <div class="text-tips">
              <span>账号</span>
            </div>
            <el-input class="username" v-model="loginForm.username" placeholder="用户名"></el-input>
          </div>
          <div class="password-form form-item">
            <div class="text-tips">
              <span>密码</span>
              <span class="forgot-password">忘记密码?</span>
            </div>
            <el-input placeholder="密码" v-model="loginForm.password" show-password></el-input>
          </div>
          <el-button class="btn" @click="UserLogin">登录</el-button>
        </div>
        <!-- 注册表单 -->
        <div class="register-form" v-if="!isShow">
          <div class="register-scroll">
            <div class="user-form form-item">
              <div class="text-tips">
                <span>账号</span>
              </div>
              <el-input placeholder="请输入用户名" v-model="regUser.regUsername" clearable></el-input>
            </div>
            <div class="password-form form-item">
              <div class="text-tips">
                <span>密码</span>
              </div>
              <el-input placeholder="请输入密码" v-model="regUser.regPwd" show-password></el-input>
            </div>
            <div class="password-form form-item">
              <div class="text-tips">
                <span>确认密码</span>
              </div>
              <el-input placeholder="请再次输入密码" v-model="regUser.regRePwd" show-password></el-input>
            </div>
            <div class="email-form form-item">
              <div class="text-tips">
                <span>邮箱</span>
              </div>
              <el-input placeholder="请输入邮箱" v-model="regUser.email" clearable></el-input>
            </div>
            <div class="gender-form form-item">
              <div class="text-tips">
                <span>性别</span>
              </div>
              <el-select v-model="regUser.gender" placeholder="请选择性别">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </div>
            <div class="phone-form form-item">
              <div class="text-tips">
                <span>手机号</span>
              </div>
              <el-input placeholder="请输入手机号" v-model="regUser.phone" clearable></el-input>
            </div>
            <div class="nickname-form form-item">
              <div class="text-tips">
                <span>昵称</span>
              </div>
              <el-input placeholder="请输入昵称" v-model="regUser.nickname" clearable></el-input>
            </div>
            <div class="realname-form form-item">
              <div class="text-tips">
                <span>真实姓名</span>
              </div>
              <el-input placeholder="请输入真实姓名" v-model="regUser.realname" clearable></el-input>
            </div>
            <el-button class="btn" @click="userRegister">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      admins: [],
      regUser: {
        regUsername: "",
        regRePwd: "",
        regPwd: "",
        email: "",
        gender: "",
        phone: "",
        nickname: "",
        realname: "",
        selectValue: ""
      },
      isShow: true
    };
  },
  created() {
    this.loadInfoOfAdmin();
  },
  methods: {
    toggleForm() {
      this.isShow = !this.isShow;
    },
    UserLogin() {
      this.$http
        .post("/user/login", {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            localStorage.setItem("username", this.loginForm.username);
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.data.token)
            );
            this.$webSocket.connect();
            this.$router.push("/index");
          } else {
            this.$message({
              type: "error",
              message: "登录失败"
            });
          }
        });
    },
    userRegister() {
      if (this.regUser.regUsername === "") {
        this.$message.error("用户名不能为空！");
        return false;
      } else if (this.regUser.regPwd !== this.regUser.regRePwd) {
        this.$message.error("两次密码输入不同，请检查后重新注册！");
        return false;
      } else {
        const user = {
          username: this.regUser.regUsername,
          password: this.regUser.regPwd,
          email: this.regUser.email,
          gender: this.regUser.gender,
          phone: this.regUser.phone,
          nickname: this.regUser.nickname,
          realname: this.regUser.realname,
          auditor: this.regUser.selectValu
        };
        this.$http
          .post("http://localhost:8088/api/v1/user/register", user)
          .then(res => {
            console.log(user);
            console.log(res.data.code);
            if (res.data.code == "1") {
              this.$message.success("注册成功！");
              this.$router.push("/");
              this.regUser = {
                username: "",
                password: "",
                email: "",
                gender: "",
                phone: "",
                nickname: "",
                realname: "",
                auditor: ""
              };
              this.toggleForm(); // 跳转到登录界面的方法
            } else {
              this.$message.error(res.data.msg || "注册失败！");
            }
          })
          .catch(err => {
            console.error(err);
            this.$message.error("注册失败，请稍后再试！");
          });
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.box {
  background-color: rgb(51, 32, 108);
  width: 100vw;
  height: 100vh;
}
.box .content {
  width: 90vw;
  height: 85vh;
  background-color: rgb(228, 218, 232);
  border-radius: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 1s;
}
.box .content .images {
  margin-left: -150px;
  margin-right: 100px;
  position: absolute;
  left: 15%;
}
.box .content .login-img {
  width: 55%;
  height: 90%;
  border-radius: 15%;
  object-fit: contain;
}
.box .content .register-img {
  width: 50%;
  opacity: 0;
  border-radius: 15%;
  object-fit: contain;
}
.box .content .login-wrapper {
  width: 30vw;
  height: 70vh;
  border-radius: 40px;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  background: rgba(244, 240, 245, 0.6);
  padding: 60px;
  box-sizing: border-box;
  position: absolute;
  right: 10%;
  transition: 1s;
  overflow: hidden;
}
.add-class-login-wrapper {
  height: 80vh !important;
  right: 0 !important;
}
.box .content .login-wrapper .top-tips span:nth-child(1) {
  font-size: 40px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
}
.box .content .login-wrapper .top-tips .top-tips-span {
  font-size: 20px;
  font-weight: bolder;
  font-family: "Microsoft YaHei", sans-serif;
  color: rgb(79, 133, 226);
  border-bottom: 1px solid rgb(79, 133, 226);
  float: right;
  line-height: 25px;
  cursor: pointer;
}
.box .content .login-wrapper h1 {
  font-size: 35px;
  text-align: center;
  margin: 20px 0;
}
.box .content .login-wrapper .login-form,
.box .content .login-wrapper .register-form {
  width: 100%;
  height: 100%;
}
.box .content .login-wrapper .login-form .form-item .text-tips,
.box .content .login-wrapper .register-form .form-item .text-tips {
  color: rgb(123, 122, 123);
  margin: 5px;
}
.box .content .login-wrapper .login-form .form-item .text-tips .forgot-password,
.box
  .content
  .login-wrapper
  .register-form
  .form-item
  .text-tips
  .forgot-password {
  font-size: 15px;
  color: rgb(79, 133, 226);
  border-bottom: 1px solid rgb(79, 133, 226);
  float: right;
  line-height: 25px;
  cursor: pointer;
}
.box .content .login-wrapper .login-form .form-item input,
.box .content .login-wrapper .register-form .form-item input {
  width: 100%;
  height: 50px;
  margin: 5px 0;
  border-radius: 5px;
  border: 0;
  font-size: 17px;
  padding: 0 20px;
  box-sizing: border-box;
}
.box .content .login-wrapper .login-form .form-item input:focus,
.box .content .login-wrapper .register-form .form-item input:focus {
  outline: none;
  border: 1px solid rgb(79, 133, 226);
}
.box .content .login-wrapper .login-form .btn,
.box .content .login-wrapper .register-form .btn {
  width: 150px;
  height: 50px;
  margin: 20px 0;
  background-color: rgb(59, 58, 59);
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.register-scroll {
  height: calc(100% - 80px); /* 调整高度以适应其他元素 */
  overflow-y: auto;
  padding-right: 20px; /* 为滚动条预留空间 */
  box-sizing: border-box;
}
.add-class-content {
  background-color: rgb(156, 148, 208) !important;
  transition: 0.1s;
}
.add-class-login-img {
  -webkit-animation: disappear 0.3s forwards;
  animation: disappear 0.3s forwards;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
}
.add-class-login-img-show {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  -webkit-animation: appear 1s forwards;
  animation: appear 1s forwards;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
}
.add-class-register-img {
  width: 65% !important;
  -webkit-animation: appear 1s forwards;
  animation: appear 1s forwards;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes appear {
  from {
    border-radius: 15%;
    opacity: 0;
  }
  to {
    border-radius: 0%;
    opacity: 1;
  }
}
@keyframes appear {
  from {
    border-radius: 15%;
    opacity: 0;
  }
  to {
    border-radius: 0%;
    opacity: 1;
  }
}
@-webkit-keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>


<style scoped>
* {
  margin: 0;
  padding: 0;
}

.box {
  background-color: rgb(51, 32, 108);
  width: 100vw;
  height: 100vh;
}
.box .content {
  width: 90vw;
  height: 85vh;
  background-color: rgb(228, 218, 232);
  border-radius: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 1s;
}
.box .content .images {
  margin-left: -150px;
  margin-right: 100px;
  position: absolute;
  left: 15%;
}
.box .content .login-img {
  width: 55%;
  height: 90%;
  border-radius: 15%;
  object-fit: contain;
}
.box .content .register-img {
  width: 50%;
  opacity: 0;
  border-radius: 15%;
  object-fit: contain;
}
.box .content .login-wrapper {
  width: 30vw;
  height: 70vh;
  border-radius: 40px;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  background: rgba(244, 240, 245, 0.6);
  padding: 60px;
  box-sizing: border-box;
  position: absolute;
  right: 10%;
  transition: 1s;
  overflow: hidden;
}
.add-class-login-wrapper {
  height: 80vh !important;
  right: 0 !important;
}
.box .content .login-wrapper .top-tips span:nth-child(1) {
  font-size: 40px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
}
.box .content .login-wrapper .top-tips .top-tips-span {
  font-size: 20px;
  font-weight: bolder;
  font-family: "Microsoft YaHei", sans-serif;
  color: rgb(79, 133, 226);
  border-bottom: 1px solid rgb(79, 133, 226);
  float: right;
  line-height: 25px;
  cursor: pointer;
}
.box .content .login-wrapper h1 {
  font-size: 35px;
  text-align: center;
  margin: 20px 0;
}
.box .content .login-wrapper .login-form,
.box .content .login-wrapper .register-form {
  width: 100%;
  height: 100%;
}
.box .content .login-wrapper .login-form .form-item .text-tips,
.box .content .login-wrapper .register-form .form-item .text-tips {
  color: rgb(123, 122, 123);
  margin: 5px;
}
.box .content .login-wrapper .login-form .form-item .text-tips .forgot-password,
.box
  .content
  .login-wrapper
  .register-form
  .form-item
  .text-tips
  .forgot-password {
  font-size: 15px;
  color: rgb(79, 133, 226);
  border-bottom: 1px solid rgb(79, 133, 226);
  float: right;
  line-height: 25px;
  cursor: pointer;
}
.box .content .login-wrapper .login-form .form-item input,
.box .content .login-wrapper .register-form .form-item input {
  width: 100%;
  height: 50px;
  margin: 5px 0;
  border-radius: 5px;
  border: 0;
  font-size: 17px;
  padding: 0 20px;
  box-sizing: border-box;
}
.box .content .login-wrapper .login-form .form-item input:focus,
.box .content .login-wrapper .register-form .form-item input:focus {
  outline: none;
  border: 1px solid rgb(79, 133, 226);
}
.box .content .login-wrapper .login-form .btn,
.box .content .login-wrapper .register-form .btn {
  width: 150px;
  height: 50px;
  margin: 20px 0;
  background-color: rgb(59, 58, 59);
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.register-scroll {
  height: calc(100% - 80px); /* 调整高度以适应其他元素 */
  overflow-y: auto;
  padding-right: 20px; /* 为滚动条预留空间 */
  box-sizing: border-box;
}
.add-class-content {
  background-color: rgb(156, 148, 208) !important;
  transition: 0.1s;
}
.add-class-login-img {
  -webkit-animation: disappear 0.3s forwards;
  animation: disappear 0.3s forwards;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
}
.add-class-login-img-show {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  -webkit-animation: appear 1s forwards;
  animation: appear 1s forwards;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
}
.add-class-register-img {
  width: 65% !important;
  -webkit-animation: appear 1s forwards;
  animation: appear 1s forwards;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes appear {
  from {
    border-radius: 15%;
    opacity: 0;
  }
  to {
    border-radius: 0%;
    opacity: 1;
  }
}
@keyframes appear {
  from {
    border-radius: 15%;
    opacity: 0;
  }
  to {
    border-radius: 0%;
    opacity: 1;
  }
}
@-webkit-keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
