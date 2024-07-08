<template>
  <div style="width: 100%; height: 100%; margin: 0; padding: 0;">
    <el-container style="height: 100%;" id="containerNav">
      <el-aside
        :width="isCollapse ? '64px' : '200px'"
        style="background-color: #231731;"
        id="asideNav"
      >
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#4A148C"
          text-color="rgba(255,255,255,.7)"
          active-text-color="#FFD700"
          :collapse="isCollapse"
        >
          <div class="logo-name">
            <p id="sysTitle" style="cursor: pointer;" @click="changeIcon">
              {{ systemTitle }}
              <el-button type="text" :icon="collapseIcon" @click="changeIcon"></el-button>
            </p>
          </div>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>工作人员管理</span>
            </template>
            <el-menu-item @click="gotoAdminInfo" index="1-1">基本信息</el-menu-item>
            <el-menu-item @click="gotoAdminStatistic" index="1-3">报表统计</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>义工管理</span>
            </template>
            <el-menu-item @click="gotoVolunteerInfo" index="2-1">基本信息</el-menu-item>
            <el-menu-item @click="gotoVolunteerStatistic" index="2-3">报表统计</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>老年人管理</span>
            </template>
            <el-menu-item @click="gotoElderInfo" index="3-1">基本信息</el-menu-item>
            <el-menu-item @click="gotoElderStatistic" index="3-3">报表统计</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>事件管理</span>
            </template>
            <el-menu-item @click="gotoEventInfo" index="4-1">基本信息</el-menu-item>
            <el-menu-item @click="gotoEventStatistic" index="4-3">报表统计</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>视频监控</span>
            </template>
            <el-menu-item @click="gotoCameraInfo" index="5-1">摄像头信息</el-menu-item>
            <el-menu-item @click="gotoCamera" index="5-2">查看视频</el-menu-item>
            <el-menu-item @click="gotoAreaDetect" index="5-4">区域入侵检测</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header
          class="indexHeader"
          style="font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); background-color: #cdcdcd;"
        >
          <div class="icon" style="float: right;">
            <img :src="circleUrl" style="cursor: pointer;" />
          </div>

          <div style="float: right;">
            <el-dropdown
              trigger="click"
              @command="handleInfo"
              style="margin-right: 20px; padding-right: 20px;"
            >
              <span
                class="el-dropdown-link"
                style="font-size: 16px; color: #333333; cursor: pointer;"
              >
                欢迎您！{{ name }}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <user-info
            v-if="dialogInfoVisible"
            :title="title"
            :dialogVisible="dialogInfoVisible"
            :userId="userId"
            @successCallback="successCallback"
          />
          <edit-password
            v-if="dialogPassVisible"
            :dialogVisible="dialogPassVisible"
            @editPwdCallback="editPwdCallback"
          />
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

#sysTitle {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  font-family: "Microsoft YaHei", sans-serif;
}

.el-header {
  background-color: #f0f2f5;
  color: #333;
  line-height: 60px;
  font-family: "Verdana", sans-serif;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: none !important;
  font-family: "KaiTi", serif;
}

#asideNav {
  text-align: left;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  border-right: solid 1px #e6e6e6;
  .el-menu-item {
    width: auto !important;
    background-color: #321c4d !important;
    border-bottom: 1px solid #4a148c;
    transition: background-color 0.3s ease;
  }
  .el-menu-item.is-active {
    background-color: rgba(70, 36, 84, 0.55) !important;
  }
  .el-menu-item:hover {
    background-color: rgba(62, 39, 77, 0.42) !important;
  }
}

.icon img {
  margin-#{$top}: 10px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

.icon img:hover {
  transform: scale(1.1);
}

.el-button--text {
  transition: all 0.3s ease;
}

.el-button--text:focus,
.el-button--text:active {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.el-dropdown-menu__item {
  font-family: "SimSun", serif;
}
</style>

<script>
import UserInfo from "../components/userForm/userInfo";
import EditPassword from "../components/userForm/editPassword";

export default {
  components: { EditPassword, UserInfo },
  data() {
    return {
      name: localStorage.getItem("username"),
      msgNum: "12",
      systemTitle: "智慧养老系统",
      circleUrl: require("../assets/stb.jpg"), // 控制右上角头像
      isCollapse: false, // 控制导航栏展开，false为展开
      collapseIcon: "el-icon-arrow-left",
      switchValue: true,

      // 有关信息下拉框
      dialogInfoVisible: false,
      dialogPassVisible: false,
      title: "",
      userId: "",

      direction: "rtl"
    };
  },
  methods: {
    changeIcon() {
      if (this.collapseIcon === "el-icon-arrow-left") {
        this.collapseIcon = "el-icon-arrow-right";
        this.systemTitle = "";
        this.isCollapse = true;
      } else {
        this.collapseIcon = "el-icon-arrow-left";
        this.isCollapse = false;
        this.systemTitle = "智慧养老系统管理端";
      }
    },
    gotoVolunteerInfo() {
      this.$router.push("/volunteerInfo");
    },
    gotoVolunteerStatistic() {
      this.$router.push("/volunteerStatistic");
    },
    gotoAdminInfo() {
      this.$router.push("/adminInfo");
    },
    gotoAdminStatistic() {
      this.$router.push("/adminStatistic");
    },

    gotoEventInfo() {
      this.$router.push("/eventInfo");
    },

    gotoEventStatistic() {
      this.$router.push("/eventStatistic");
    },
    gotoCameraInfo() {
      this.$router.push("/cameraInfo");
    },
    gotoCamera() {
      this.$router.push("/camera");
    },

    gotoCameraThree() {
      this.$router.push("/cameraThree");
    },

    gotoAreaDetect() {
      this.$router.push("/area");
    },

    gotoSelectScene() {
      this.$router.push("/selectScene");
    },

    gotoElderInfo() {
      this.$router.push("/elderInfo");
    },

    gotoElderStatistic() {
      this.$router.push("/elderStatistic");
    },
    handleMessage(command) {
      if (command === "checkMsg") {
        alert("页面跳转");
      } else if (command === "clearMsg") {
        this.msgNum = "";
        this.$message({
          type: "success",
          message: "全部已读!"
        });
      }
    },
    handleInfo(command) {
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          token: gtoken
        }
      };
      if (command === "info") {
        this.dialogInfoVisible = true;
        this.title = "编辑信息";
      } else if (command === "editPassword") {
        this.dialogPassVisible = true;
      } else if (command === "logout") {
        this.$http.post("/user/logout", {}, config).then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "已退出登录!"
            });
            this.$webSocket.disconnect();
            this.$router.push("/login");
          } else {
            this.$message({
              type: "error",
              message: "无法退出"
            });
          }
        });
      }
    },
    editPwdCallback() {
      this.dialogPassVisible = false;
    },
    successCallback() {
      this.dialogInfoVisible = false;
    }
  }
};
</script>
