<template>
  <div>
    <div style="float: left;">
      <el-input
        placeholder="请输入事件类型编号"
        v-model="input"
        clearable
        style="width: 300px; text-align: center;"
      ></el-input>
      <el-button icon="el-icon-search" circle style="margin-left: 10px;" @click="getInfoByName"></el-button>
    </div>
    <div style="float: left;">
      <el-input
        placeholder="请输入事件关键词"
        v-model="input2"
        clearable
        style="width: 300px; text-align: center;"
      ></el-input>
      <el-button icon="el-icon-search" circle style="margin-left: 10px;" @click="getInfoByName"></el-button>
    </div>
    <div style="float: right;">
      <el-button type="primary" round @click="openInsertDialog">添加事件</el-button>
    </div>

    <br />
    <br />
    <br />

    <el-table
      :data="tableData"
      v-horizontal-scroll="'always'"
      style="width: 100%"
      :default-sort="{prop: 'eventId', order: 'ascending'}"
    >
      <el-table-column prop="eventId" label="编号" width="180" header-align="center" align="center"></el-table-column>
      <el-table-column prop="eventType" label="事件类型" header-align="center" align="center"></el-table-column>
      <el-table-column prop="eventDate" label="事件发生的时间" header-align="center" align="center"></el-table-column>
      <el-table-column prop="eventLocation" label="事件发生的地点" header-align="center" align="center"></el-table-column>
      <el-table-column prop="operations" label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button type="info" size="small" @click="openDetailDialog(scope.$index, scope.row)">查看</el-button>
          <el-button
            type="success"
            size="small"
            @click="openModifyDialog(scope.$index, scope.row)"
          >修改</el-button>
          <el-button type="danger" size="small" @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="total"
    ></el-pagination>

    <!-- 添加记录对话框 -->
    <el-dialog title="添加事件" :visible.sync="insertDialogFormVisible" width="400px">
      <el-form :model="formAdd">
        <el-form-item label="事件类型" :label-width="formLabelWidth">
          <el-input v-model="formAdd.eventType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件发生的时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formAdd.eventDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="事件发生的地点" :label-width="formLabelWidth">
          <el-input v-model="formAdd.eventLocation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件描述" :label-width="formLabelWidth">
          <el-input v-model="formAdd.eventDescription" autocomplete="off"></el-input>
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
          <el-input v-model="form.eventId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="事件类型" :label-width="formLabelWidth">
          <el-input v-model="form.eventType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件发生的时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.eventDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="事件发生的地点" :label-width="formLabelWidth">
          <el-input v-model="form.eventLocation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件描述" :label-width="formLabelWidth">
          <el-input v-model="form.eventDescription" autocomplete="off"></el-input>
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
          <el-input v-model="form.eventId" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="事件类型" :label-width="formLabelWidth">
          <el-input v-model="form.eventType" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="事件发生的时间" :label-width="formLabelWidth">
          <el-input v-model="form.eventDate" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="事件发生的地点" :label-width="formLabelWidth">
          <el-input v-model="form.eventLocation" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="事件描述" :label-width="formLabelWidth">
          <el-input v-model="form.eventDescription" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="抓拍照片" :label-width="formLabelWidth">
          <el-image
            style="width: 100px; height: 100px; display: block"
            :src="form.eventImg"
            fit="cover"
            :preview-src-list="[form.eventImg]"
          ></el-image>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "AlarmEvent",
  components: {},
  data() {
    return {
      // 搜索框输入的内容
      input: "",
      input2: "",
      tableData: [],

      //分页
      pageSize: 10, //默认10条
      total: 1000, //总条数

      // 添加对话框
      insertDialogFormVisible: false,
      // 编辑对话框
      modifyDialogFormVisible: false,
      //详情对话框
      detailDialogFormVisible: false,
      modifyId: undefined,

      formAdd: {
        eventType: "",
        eventDate: "",
        eventLocation: "",
        eventDescription: ""
      },

      form: {
        eventId: "",
        eventType: "",
        eventDate: "",
        eventLocation: "",
        eventDescription: "",
        eventImg: ""
      },
      formLabelWidth: "80px",

      // 区域列表
      allAreas: []
    };
  },
  created() {
    this.findAll(1);
  },
  methods: {
    findAll(currentPage) {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        params: {
          current: currentPage,
          size: this.pageSize,
          keyword: "",
          eventType: ""
        },
        headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/event/page", config)
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            console.log(response.data);
            that.tableData = response.data.data.records;
            that.total = response.data.data.total;
          } else {
            this.$message({
              type: "error",
              message: "查询失败"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "网络问题，查询失败"
          });
        });
    },

    handleCurrentChange(val) {
      console.log("当前页: " + val);
      this.findAll(val);
    },

    getInfoById(id) {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/event/" + id, config)
        .then(response => {
          if (response.data.code === 1) {
            that.form = response.data.data;
          } else {
            that.form = {};
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "网络问题，加载失败"
          });
        });
    },

    getInfoByName() {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        params: {
          current: "",
          size: "",
          keyword: this.input2,
          eventType: this.input
        },
        headers: {
          token: gtoken
        }
      };
      if (this.input === "" && this.input2 === "") {
        this.findAll(1);
      } else {
        this.$http
          .get("/event/page", config)
          .then(response => {
            if (response.data.code === 1) {
              this.$message({
                type: "success",
                message: "查询成功"
              });
              that.tableData = response.data.data.records;
            } else {
              this.$message({
                type: "error",
                message: "查询失败"
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "网络问题，查询失败"
            });
          });
      }
    },

    openDetailDialog(index, row) {
      this.detailDialogFormVisible = true;
      // 回显需要被修改的信息
      this.getInfoById(row.eventId);
    },

    openInsertDialog() {
      this.formAdd = {};
      this.insertDialogFormVisible = true;
    },

    insertInfo() {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          token: gtoken
        }
      };
      this.insertDialogFormVisible = false;
      this.$http
        .post(
          "/event",
          {
            eventType: that.formAdd.eventType,
            eventDate: that.formAdd.eventDate,
            eventLocation: that.formAdd.eventLocation,
            eventDescription: that.formAdd.eventDescription
          },
          config
        )
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.findAll(1);
          } else {
            this.$message({
              type: "error",
              message: "添加失败"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "网络问题，添加失败"
          });
        });
    },
    openModifyDialog(index, row) {
      this.modifyDialogFormVisible = true;
      // 回显需要被修改的信息
      this.getInfoById(row.eventId);
    },
    modifyInfo() {
      this.modifyDialogFormVisible = false;
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          token: gtoken
        }
      };
      this.$http
        .put(
          "/event",
          {
            eventId: that.form.eventId,
            eventType: that.form.eventType,
            eventDate: that.form.eventDate,
            eventLocation: that.form.eventLocation,
            eventDescription: that.form.eventDescription
          },
          config
        )
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.findAll(1);
          } else {
            this.$message({
              type: "error",
              message: "修改失败"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "网络问题，修改失败"
          });
        });
    },
    deleteInfo(index, row) {
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          token: gtoken
        }
      };
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求
          this.$http.delete("/event/" + row.eventId, config).then(response => {
            if (response.data.code === 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 发请求重新获取数据
              this.findAll(1);
            } else {
              this.$message({
                type: "error",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
