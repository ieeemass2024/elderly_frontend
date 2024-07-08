<template>
  <el-dialog :title="title" width="600px" :visible.sync="visible" destroy-on-close @close="closeCallback">
    <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户编号" prop="userId">
        <el-input v-model="ruleForm2.userId"  readonly="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm2.username" readonly="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="ruleForm2.gender"  readonly="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="ruleForm2.realname"  readonly="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm2.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm2.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm2.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
        <el-button @click="resetForm('ruleForm2')">重 置</el-button>
      </el-form-item>
    </el-form>
<!--    </div>-->
  </el-dialog>
</template>

<script>
export default {
  name: 'userInfo',
  props: {
    title: {
      type: String,
      default: '账号信息'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      roleName: false,
      roleData: '',
      visible: this.dialogVisible,
      ruleForm2: {
        userId:'',
        username:'',
        gender:'',
        realname:'',
        phone: '',
        nickname: '',
        email: ''
      },
      rules: {
  
      }
    }
  },
  methods: {
    closeCallback () {
      this.$emit('successCallback')
    },

    getList () {
      const _this = this
      const gtoken = JSON.parse(localStorage.getItem('token')) 
      const config = {
      headers: {
        token:gtoken
          }
        };
        this.$http.get("/user/info",config
      ).then((response) => {
      if (response.data.code === 1) {
        _this.ruleForm2 = response.data.data
        } else {
          this.$message({
            type: 'error',
            message: '失败'
          });
      }
    })
    },
    submitForm (formName) {
      const gtoken = JSON.parse(localStorage.getItem('token')) 
      const config = {
      headers: {
        token:gtoken
          }
        };
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put("/user/info",{
            "nickname": that.ruleForm2.nickname,
            "email": that.ruleForm2.email,
            "phone": that.ruleForm2.phone
          },config
      ).then((response) => {
        if (response.data.code === 1) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          that.visible=false
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          });
        }
      })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style scoped>
  .demo-ruleForm {
    width: 460px;
    padding-top: 25px;
  }
  .el-select {
    width: 100%;
  }
  .card {
    width: 560px;
    padding-bottom: 15px;
    margin: 0px auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
