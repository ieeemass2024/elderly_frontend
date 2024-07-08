<template>
    <div>
        <div style="float: left;">
            <el-input
                placeholder="请输入摄像头名称"
                v-model="input"
                clearable
                style="width: 300px; text-align: center;">
            </el-input>
            <el-button icon="el-icon-search" circle style="margin-left: 10px;"
             @click="getInfoByName"></el-button>
        </div>

        <div style="float: right;">
            <el-button type="primary" round @click="openInsertDialog">添加摄像头</el-button>
        </div>

        <br />
        <br />
        <br />

        <el-table :data="tableData" v-horizontal-scroll="'always'"
                  style="width: 100%"
                  :default-sort = "{prop: 'cameraId', order: 'ascending'}">
            <el-table-column prop="cameraId" label="编号"  width="180" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="cameraName" label="摄像头名称"  header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="streamAddress" label="流地址"  header-align="center" align="center">
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
        <el-dialog title="添加摄像头" :visible.sync="insertDialogFormVisible" width="400px">
            <el-form :model="form">
                <el-form-item label="摄像头名称" :label-width="formLabelWidth">
                    <el-input v-model="form.cameraName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="流地址" :label-width="formLabelWidth">
                    <el-input v-model="form.streamAddress"  autocomplete="off"></el-input>
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
                    <el-input v-model="form.cameraId" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="摄像头名称" :label-width="formLabelWidth">
                    <el-input v-model="form.cameraName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="流地址" :label-width="formLabelWidth">
                    <el-input v-model="form.streamAddress"  autocomplete="off"></el-input>
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
                    <el-input v-model="form.cameraId" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="摄像头名称" :label-width="formLabelWidth">
                    <el-input v-model="form.cameraName" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="流地址" :label-width="formLabelWidth">
                    <el-input v-model="form.streamAddress" autocomplete="off" readonly></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
  </template>

  <style>

  </style>

  <script>
  export default {
  name: 'Alarmcamera',
  components: {

  },
  data () {
    return {
      // 搜索框输入的内容
      input: '',
      tableData: [],

      //分页
      pageSize:10,  //默认10条
      total: 1000,

      // 添加对话框
      insertDialogFormVisible: false,
      // 编辑对话框
      modifyDialogFormVisible: false,
      //详情对话框
      detailDialogFormVisible: false,
      modifyId: undefined,

      form: {
        cameraId: '',
        cameraName:'',
        streamAddress:''
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
    findAll (currentPage) {
    const that = this;
    const gtoken = JSON.parse(localStorage.getItem('token'))
    const config = {
    params:{
      current:currentPage,
      size:this.pageSize,
      keyword:'',
    },
    headers: {
      token:gtoken
        }
      };
    this.$http.get(
      '/camera/page',config
    ).then((response) => {
      if (response.data.code === 1){
        this.$message({
          type: 'success',
          message: '查询成功'
        });
        console.log(response.data);
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
      '/camera/' + id,config
    ).then((response) => {
      if (response.data.code === 1) {
        that.form = response.data.data
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
      keyword:this.input,
    },
    headers: {
      token:gtoken
        }
      };
    if (this.input === '') {
      this.findAll(1)
    } else {
      this.$http.get(
      '/camera/page',config
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
      this.detailDialogFormVisible = true
      // 回显需要被修改的信息
      this.getInfoById(row.cameraId)
  },

  openInsertDialog () {
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
      '/camera',{
      cameraName: that.form.cameraName,
      streamAddress: that.form.streamAddress,
      },
      config
    ).then((response) => {
      if (response.data.code === 1){
        this.$message({
          type: 'success',
          message: '添加成功'
        });
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
      this.modifyDialogFormVisible = true
      // 回显需要被修改的信息
      this.getInfoById(row.cameraId)
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
      '/camera',{
      cameraId: that.form.cameraId,
      cameraName: that.form.cameraName,
      streamAddress: that.form.streamAddress,
      },
      config
    ).then((response) => {
      if (response.data.code === 1){
        this.$message({
          type: 'success',
          message: '修改成功'
        });
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
        '/camera/' + row.cameraId,config
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
  }
  }
  }
  </script>
