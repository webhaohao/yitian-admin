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

          <!-- <Warning /> -->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
            <el-form-item prop="image_uri" style="margin-bottom: 30px;" label="上传活动封面图片">
              <el-col :span="24">
                <Upload v-model="postForm.main_img_url" @input="uploadImage"/>
              </el-col>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-form-item label="活动时间">
                  <el-col :span="6">
                    <el-date-picker v-model="postForm.start_time" type="datetime" placeholder="选择日期" style="width: 100%;" format="yyyy-MM-dd HH:mm"/>
                  </el-col>
                  <el-col :span="1" class="line" style="text-align:center">-</el-col>
                  <el-col :span="6">
                    <el-date-picker v-model="postForm.end_time" type="datetime" placeholder="选择时间" style="width: 100%;" format="yyyy-MM-dd HH:mm"/>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动人数">
                  <el-col :span="4">
                    <el-input v-model="postForm.number"/>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动地点">
                  <el-col :span="4">
                    <el-input v-model="postForm.location"/>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动类型">
                  <el-select v-model="postForm.category_id" placeholder="请选择活动类型" >
                    <el-option v-for="(item,index) in categories" :key="index" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <!-- <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input :rows="1" v-model="postForm.content_short" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item> -->

        <el-form-item prop="detail" style="margin-bottom: 30px;" label="活动详情:">
          <el-col :span="24">
            <Tinymce ref="editor" :height="400" v-model="postForm.detail" />
          </el-col>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { parseTime } from '@/utils'
import { fetchArticle } from '@/api/article'
import { getCatories, createActivity, getActivityTypeByAdmin } from '@/api/common'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  detail: '', // 文章内容
  // content_short: '', // 文章摘要
  //  source_uri: '', // 文章外链
  main_img_url: '', // 文章图片
  start_time: undefined, // 前台展示时间
  end_time: undefined,
  location: '', // 地点
  number: '',
  category_id: '',
  platforms: ['a-platform']
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {},
      categories: [

      ]
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.getCatories()
    this.getActivityTypeByAdmin()
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    async getCatories() {
      this.categories = await getCatories()
    },
    async getActivityTypeByAdmin() {
      this.activityType = await getActivityTypeByAdmin()
    },
    uploadImage(file) {
      // console.log(file)
      this.postForm.main_img_url = file.url
      console.log(this.postForm.main_img_url)
    },
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // Set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      this.postForm.start_time = parseTime(this.postForm.start_time, '{y}-{m}-{d} {h}:{i}')
      this.postForm.end_time = parseTime(this.postForm.end_time, '{y}-{m}-{d} {h}:{i}')
      console.log(this.postForm)
      this.$refs.postForm.validate(async(valid) => {
        if (valid) {
          const result = await createActivity(this.postForm)
          console.log(result)
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布活动成功',
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
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
