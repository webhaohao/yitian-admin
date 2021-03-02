<!--
 * @Author: your name
 * @Date: 2020-01-17 13:39:03
 * @LastEditTime : 2020-01-17 23:36:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\views\homeActivityType\index.vue
 -->
<!--  -->
<template>
  <div class="container">
    <el-button style="margin:20px 0px" type="success" @click="addMarkersType">添加类型</el-button>
    <el-table :data="markersType" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="id"
        width="65"
        element-loading-text="请给我点时间！">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="名称">
        <template slot-scope="scope">
          <div style="display:flex;align-items:center;">
            <img :src="scope.row.icon" alt="" style="width:20px;">
            &nbsp;&nbsp;
            <span>{{ scope.row.name ? scope.row.name:'---' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">操作</el-button> -->
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" title="添加类型">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-form-item style="margin-bottom: 40px;" prop="title">
          <MDinput :maxlength="100" name="name" required>
            标题
          </MDinput>
        </el-form-item>
        <el-form-item prop="sounds" name="icon" style="margin-bottom: 30px;" label="上传icon">
          <el-col :span="24">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setTopBanner">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMarkersType } from '@/api/common'
import MDinput from '@/components/MDinput'
export default {

  components: { MDinput },
  data() {
    return {
      dialogFormVisible: false,
      markersType: [
      ]
    }
  },

  computed: {
  },
  async created() {
    this.markersType = await getMarkersType()
    // console.log('this.markersType', this.markersType)
  },
  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    addMarkersType() {
      this.dialogFormVisible = true
    },
    showInput(item, index) {
      item.inputVisible = true
      this.$set(this.activityTypeInfo, index, item)
      this.$nextTick(_ => {
        console.log(this.$refs.saveTagInput[0])
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    }

    // async handleInputConfirm(index) {
    //   const inputValue = this.inputValue
    //   if (inputValue) {
    //     const _index = this.activityTypeInfo[index].items.findIndex(item => item.name === inputValue)
    //     if (_index !== -1) {
    //       this.$message.error('错了哦，您输入的已存在！')
    //       return false
    //     } else {
    //       await createCategory({ name: inputValue, activity_type_id: this.activityTypeInfo[index].id })
    //       this.activityTypeInfo = await getActivityTypeCategory()
    //       // this.activityTypeInfo[index].items.push({ name: inputValue })
    //       console.log(this.activityTypeInfo)
    //     }
    //   }
    //   this.inputVisible = false
    //   this.inputValue = ''
    // }
  }
}
</script>

<style lang='scss' scoped>
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/ .el-upload:hover {
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
  .container{
      margin:30px;
  }
  .el-col{
      margin-bottom:10px;
  }
  .button-new-tag {
    margin-top: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-top: 10px;
    vertical-align: bottom;
  }
</style>
