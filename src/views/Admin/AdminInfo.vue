<template>
    <div>
        <div style="float: left;">
            <el-input
                placeholder="请输入工作人员姓名"
                v-model="input"
                clearable
                style="width: 300px; text-align: center;">
            </el-input>
            <el-button icon="el-icon-search" circle style="margin-left: 10px;"
             @click="getInfoByName"></el-button>
        </div>
        <div style="float: right;">
            <el-button type="primary" round @click="openInsertDialog">添加工作人员</el-button>
        </div>

        <br />
        <br />
        <br />

        <el-table :data="tableData" v-horizontal-scroll="'always'"
                  style="width: 100%"
                  :default-sort = "{prop: 'employeeId', order: 'ascending'}">
            <el-table-column prop="employeeId" label="编号" sortable width="180" header-align="center" align="center" :sort-method="sortNumber">
            </el-table-column>
            <el-table-column prop="employeeName" label="姓名" width="100" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="60" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="120" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="idCard" label="身份证号" width="180" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="birthday" label="出生日期" width="100" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="hireDate" label="入职日期" width="100" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="resignDate" label="离职日期" width="100" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="operations" label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button type="info" size="small" @click="openDetailDialog(scope.$index, scope.row)">查看</el-button>
                    <el-button type="success" size="small" @click="openModifyDialog(scope.$index, scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :page-size="10"
            :total="total">
        </el-pagination>

        <!-- 添加记录对话框 -->
        <el-dialog title="添加工作人员" :visible.sync="insertDialogFormVisible" width="400px">
            <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.employeeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-radio v-model="form.gender" label="M">男</el-radio>
                  <el-radio v-model="form.gender" label="F">女</el-radio>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="form.idCard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="入职日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.hireDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="离职日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.resignDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="上传图像" :label-width="formLabelWidth">
                  <div>
                  <el-upload
                  class="upload-demo"
                  action
                  :http-request="uploadFile"
                  ref="upload"
                  :auto-upload="false"
                  :file-list="fileList"
                  :show-file-list="true"
                  :before-upload="handleBeforeUpload"
                  :on-remove="handleRemove"
                  style="margin-left: 5px; display:inline;font-size:14px;"
                  >
                  <el-button size="medium" type="primary" style="margin-top: 5px;margin-bottom: 5px;">选择文件</el-button>
                  </el-upload>
                  </div>
                  <el-button @click="submitUpload">上传文件</el-button>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="insertDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertInfo()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑记录对话框 -->
        <el-dialog title="编辑信息" :visible.sync="modifyDialogFormVisible" width="400px">
            <el-form :model="form">
              <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="form.employeeId" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.employeeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-radio v-model="form.gender" label="M">男</el-radio>
                  <el-radio v-model="form.gender" label="F">女</el-radio>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="form.idCard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="入职日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.hireDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="离职日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.resignDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="上传图像" :label-width="formLabelWidth">
                  <div>
                    <el-upload
                    class="upload-demo"
                    action
                    :http-request="uploadFile"
                    ref="uploadModify"
                    :auto-upload="false"
                    :file-list="fileList"
                    :show-file-list="true"
                    :before-upload="handleBeforeUpload"
                    :on-remove="handleRemove"
                    style="margin-left: 5px; display:inline;font-size:14px;"
                    >
                  <el-button size="medium" type="primary" style="margin-top: 5px;margin-bottom: 5px;">选择文件</el-button>
                  </el-upload>
                  </div>
                  <el-button @click="submitModifyUpload">上传文件</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyInfo()">确 定</el-button>
            </div>
        </el-dialog>

         <!-- 详情对话框 -->
         <el-dialog title="详细信息" :visible.sync="detailDialogFormVisible" width="400px">
          <el-form :model="form">
                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="form.employeeId" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.employeeName" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.gender" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="form.idCard" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-input v-model="form.birthday" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="入职日期" :label-width="formLabelWidth">
                    <el-input v-model="form.hireDate" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="离职日期" :label-width="formLabelWidth">
                    <el-input v-model="form.resignDate" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="头像" :label-width="formLabelWidth">
                  <el-image
                    style="width: 100px; height: 100px; display: block"
                    :src="form.profilePhoto"
                    fit="cover"
                    :preview-src-list="[form.profilePhoto]"
                  ></el-image>             
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<style>
.el-upload-list__item-name{
  display: none;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .spanname{
    width: 100px;
    height: 30px;
    /* background: blue; */
    position: absolute;
    top: 75px;
    left: 40px;
  }
</style>

<script>
 import axios from 'axios';
export default {
  name: 'AlarmEvent',
  components: {

  },
  data () {
    return {
      // 搜索框输入的内容
      input: '',
      tableData: [],
      dialogVisible:false,
      fileList:[],
      imageUrl:'',

      //上传后的文件列表
      fileList: [],

      selectedFile:null,

      //分页
      pageSize:10,  //默认10条
      total:1000,  //总条数

      // 添加对话框
      insertDialogFormVisible: false,
      // 编辑对话框
      modifyDialogFormVisible: false,
      //详情对话框
      detailDialogFormVisible: false,
      modifyId: undefined,

      currentId: 0,

      form: {
        employeeId: '',
        employeeName: '',
        gender: '',
        phone: '',
        idCard: '',
        birthday: '',
        hireDate: '',
        resignDate: '',
        profilePhoto:'',
      },
      formLabelWidth: '80px',

      // 区域列表
      allAreas: []
    }
  },
  created () {
    this.findAll(1)
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitModifyUpload() {
      this.$refs.uploadModify.submit();
    },
    sortNumber(a, b) {
      return a - b;
    },

    findAll (currentPage) {
    const that = this;
    const gtoken = JSON.parse(localStorage.getItem('token'))
    const config = {
    params:{
      current:currentPage,
      size:this.pageSize,
      keyword:''
    },
    headers: {
      token:gtoken
        }
      };
    this.$http.get(
      '/employee/page',config
    ).then((response) => {
      if (response.data.code === 1){
        this.$message({
          type: 'success',
          message: '查询成功'
        });
        that.tableData = response.data.data.records
        that.total = response.data.data.total
      }else{
        this.$message({
          type: 'error',
          message: '查询失败'
        });
      }
    }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络问题，查询失败'
        });
    });
  },

    handleCurrentChange(val) {
        console.log('当前页: '+val);
        this.findAll(val);
      },


  getInfoById (id) {
    const that = this;
    const gtoken = JSON.parse(localStorage.getItem('token'))
    const config = {
    headers: {
      token:gtoken
        }
      };
    this.$http.get(
      '/employee/' + id,config
    ).then((response) => {
      if (response.data.code === 1) {
        that.form = response.data.data
        // var employeeId = response.data.data.employeeId
        // that.form.imageUrl = "https://cos-lqyrmk-1312783534.cos.ap-beijing.myqcloud.com/resources/smart_employee_care/cv_file/profile/employee/"+employeeId+".jpg";
      } else {
        that.form = {}
      }
    }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络问题，加载失败'
        });
    });
  },

  getInfoByName () {
    const that = this
    const gtoken = JSON.parse(localStorage.getItem('token'))
    const config = {
    params:{
      current:'',
      size:'',
      keyword:this.input
    },
    headers: {
      token:gtoken
        }
      };
    if (this.input === '') {
      this.findAll(1)
    } else {
      this.$http.get(
      '/employee/page',config
    ).then((response) => {
      if (response.data.code === 1){
        this.$message({
          type: 'success',
          message: '查询成功'
        });
        that.tableData = response.data.data.records
      }else{
        this.$message({
          type: 'error',
          message: '查询失败'
        });
      }
    }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络问题，查询失败'
        });
    });
    }
  },
  openDetailDialog (index, row) {
    this.imageUrl = ''
      this.detailDialogFormVisible = true
      // 回显需要被修改的信息
      this.getInfoById(row.employeeId)
  },
  openInsertDialog () {
    this.imageUrl = ''
    this.form = {}
    this.insertDialogFormVisible = true
  },
  insertInfo () {
    const that = this;
    const gtoken = JSON.parse(localStorage.getItem('token'))
    const config = {
    headers: {
      token:gtoken
        }
      };
    this.insertDialogFormVisible = false
    this.$http.post(
      '/employee',{
      employeeName: that.form.employeeName,
      gender: that.form.gender,
      phone: that.form.phone,
      idCard: that.form.idCard,
      birthday: that.form.birthday,
      hireDate: that.form.hireDate,
      resignDate: that.form.resignDate,
      profilePhoto: this.imageUrl
      },
      config
    ).then((response) => {
      if (response.data.code === 1){
        this.$message({
          type: 'success',
          message: '添加成功'
        });
        localStorage.setItem("employeeId", JSON.stringify(response.data.data.employeeId)) 
        // that.$refs.upload.submit()
        this.findAll(1)
      }else{
        this.$message({
          type: 'error',
          message: '添加失败'
        });
      }
    }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络问题，添加失败'
        });
    });
  },
  openModifyDialog (index, row) {
    this.currentId = row.employeeId
    this.imageUrl = ''
      this.modifyDialogFormVisible = true
      // 回显需要被修改的信息
      this.getInfoById(row.employeeId)
  },
  modifyInfo () {
    this.modifyDialogFormVisible = false
    const that = this;
    const gtoken = JSON.parse(localStorage.getItem('token'))
    const config = {
    headers: {
      token:gtoken
        }
      };
    this.$http.put(
      '/employee',{
      employeeId: that.form.employeeId,
      employeeName: that.form.employeeName,
      gender: that.form.gender,
      phone: that.form.phone,
      idCard: that.form.idCard,
      birthday: that.form.birthday,
      hireDate: that.form.hireDate,
      resignDate: that.form.resignDate,
      profilePhoto: this.imageUrl,
      },
      config
    ).then((response) => {
      if (response.data.code === 1){
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        // that.$refs.uploadModify.submit()
        localStorage.setItem("employeeId", JSON.stringify(that.form.employeeId)) 
        this.findAll(1)
      }else{
        this.$message({
          type: 'error',
          message: '修改失败'
        });
      }
    }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络问题，修改失败'
        });
    });
  },
  deleteInfo (index, row) {
    const gtoken = JSON.parse(localStorage.getItem('token'))
    const config = {
    headers: {
      token:gtoken
        }
      };
    this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 发送请求
      this.$http.delete(
        '/employee/' + row.employeeId,config
      ).then((response) => {
        if(response.data.code === 1) {
          this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 发请求重新获取数据
        this.findAll(1)
        }else{
          this.$message({
          type: 'error',
          message: '删除失败'
        });
        }
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  },

  handleBeforeUpload(file,fileList) {
  // 获取选择的文件的属性信息
  this.selectedFile = file;
  this.fileList = fileList
},
//上传文件的事件
  uploadFile(){
    var employeeId=this.currentId;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('id', employeeId)
    formData.append('file_type', "employee")
    console.log(formData.get('file'));
    axios.post('http://localhost:8090/api/v1/info/upload', formData)
        .then(response => {
          // 处理成功响应
          this.$message({
              type: 'success',
              message: '上传成功'
          });
          console.log("文件上传成功");
        })
    .catch(error => {
      console.error(error);
      // 处理错误
      });
      localStorage.removeItem("employeeId")
  },
  handleRemove(file, fileList) {
      // 处理文件被移除的逻辑
      const index = fileList.indexOf(file);
      if (index !== -1) {
        fileList.splice(index, 1); // 移除对应的文件
      }
    }

  }
}
</script>
