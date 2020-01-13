<!--
 * @Author: your name
 * @Date: 2020-01-13 10:15:40
 * @LastEditTime : 2020-01-13 14:02:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\views\about\index.vue
 -->
 <!--  -->
<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :class-name="'sub-navbar '+postForm.status">
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" /> -->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-form-item prop="detail" style="margin-bottom: 30px;">
            <el-col :span="24">
              <Tinymce ref="editor" :height="400" v-model="postForm.description" />
            </el-col>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import Tinymce from '@/components/Tinymce'
import { createOrUpdateAbout, getAbout } from '@/api/common'
export default {

  components: { Tinymce, Sticky },
  data() {
    return {
      postForm: {
        status: 'draft',
        description: ''
      }
    }
  },

  computed: {},
  created() {
    (async() => {
      const result = await getAbout()
      console.log(result)
      this.postForm = Object.assign(this.postForm, result)
      console.log(this.postForm)
    })()
  },

  mounted() {},

  methods: {
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(async(valid) => {
        if (valid) {
          const result = await createOrUpdateAbout(this.postForm)
          console.log(result)
          this.loading = true
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
          console.log(this.postForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      // if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
      //   this.$message({
      //     message: '请填写必要的标题和内容',
      //     type: 'warning'
      //   })
      //   return
      // }
      // this.$message({
      //   message: '保存成功',
      //   type: 'success',
      //   showClose: true,
      //   duration: 1000
      // })
      // this.postForm.status = 'draft'
    }
  }
}

</script>
 <style rel="stylesheet/scss"  lang='scss' scoped>
 @import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
 </style>
