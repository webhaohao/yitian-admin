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
    <el-button style="margin:20px 0px" type="success" @click="addBanner">添加banner</el-button>
    <el-table :data="banners" border fit highlight-current-row style="width: 100%">
      <!-- <el-table-column
        v-loading="loading"
        align="center"
        label="id"
        width="65"
        element-loading-text="请给我点时间！">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column min-width="100px" label="banner图片">
        <template slot-scope="scope">
          <div style="display:flex;align-items:center;">
            <img :src="scope.row.path" alt="" style="width:120px;">
            &nbsp;&nbsp;
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">操作</el-button> -->
          <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" title="添加banner">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-form-item style="margin-bottom: 40px;" prop="title">
          <MDinput v-model="postForm.url" :maxlength="100" name="url" required>
            跳转链接
          </MDinput>
        </el-form-item>
        <el-form-item prop="path" name="path" style="margin-bottom: 30px;" label="上传banner图片">
          <el-col :span="24">
            <Upload v-model="postForm.path" @input="uploadImage"/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setBanner">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdBanner, addAdBanner, updateAdBanner } from '@/api/common'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
export default {

  components: { MDinput, Upload },
  data() {
    return {
      dialogFormVisible: false,
      banners: [
      ],
      postForm: {
        path: '',
        url: ''
      }
    }
  },

  computed: {
  },
  async created() {
    this.getAdBanner()
    // console.log('this.markersType', this.markersType)
  },
  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    async getAdBanner() {
      this.banners = await getAdBanner()
      console.log(this.banners)
    },
    addBanner() {
      this.dialogFormVisible = true
      this.postForm = {
        path: '',
        url: ''
      }
    },
    showInput(item, index) {
      item.inputVisible = true
      this.$set(this.activityTypeInfo, index, item)
      this.$nextTick(_ => {
        console.log(this.$refs.saveTagInput[0])
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    },
    uploadImage(file) {
      // console.log(file)
      this.postForm.path = file.url
    },
    async setBanner() {
      // console.log(this.postForm);
      // console.log('this.postform',this.postForm);
      const { id } = this.postForm
      const data = {
        ...this.postForm
      }
      if (id) {
        await updateAdBanner(data)
      } else {
        await addAdBanner(data)
      }
      this.getAdBanner()
      this.dialogFormVisible = false
      // await saveMarkerType(data)
    },
    handleEditClick(row) {
      this.dialogFormVisible = true
      this.postForm = JSON.parse(JSON.stringify(row))
      // console.log(row);
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

