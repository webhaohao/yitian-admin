<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" /> -->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <!-- <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button> -->
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->
          <el-tabs v-model="activeName" style="margin:0 0 20px 0;" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
              <el-form-item style="margin-bottom: 40px;" prop="title">
                <MDinput v-model="postForm[activeName].title" :maxlength="100" name="name" required>
                  标题
                </MDinput>
              </el-form-item>
              <el-form-item prop="detail" style="margin-bottom: 30px;" label="活动详情:">
                <el-col :span="24">
                  <Tinymce ref="editor" v-model="postForm[activeName].detail" :height="400" />
                </el-col>
              </el-form-item>
              <el-form-item prop="sounds" style="margin-bottom: 30px;" label="上传声音介绍">
                <el-col :span="24">
                  <el-col span="12">
                    <el-upload
                      :show-file-list="false"
                      :on-success="handleSoundsSuccess"
                      :before-upload="beforeAvatarUpload"
                      :action="uploadSoundsUrl"
                      class="avatar-uploader"
                      name="files">
                      <i class="el-icon-plus avatar-uploader-icon"/>
                    </el-upload>
                  </el-col>
                  <el-col span="12">
                    <video v-if="postForm[activeName].sounds" :src="postForm[activeName].sounds" controls/>
                  </el-col>
                </el-col>

              </el-form-item>
            </el-tab-pane>
          </el-tabs>
          <el-col :span="24">
            <el-form-item label="类型">
              <el-select v-model="postForm.type" placeholder="请选择类型" >
                <el-option v-for="(item,index) in categories" :key="index" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="经度">
              <el-input v-model="postForm.longitude"/>
            </el-form-item>
            <el-form-item label="纬度">
              <el-input v-model="postForm.latitude"/>
            </el-form-item>
            <el-form-item prop="title_bg" style="margin-bottom: 30px;" label="上传标题背景">
              <el-col span="24">
                <el-upload
                  :action="uploadImageUrl"
                  :show-file-list="false"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handleIconTitleBgImage"
                  name="files"
                  class="avatar-uploader"
                >
                  <img v-if="postForm.title_bg" :src="postForm.title_bg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-col>
            </el-form-item>
            <el-form-item prop="title_bg" style="margin-bottom: 30px;" label="上传详情背景">
              <el-col span="24">
                <el-upload
                  :action="uploadImageUrl"
                  :show-file-list="false"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handleIconDetailBgImage"
                  name="files"
                  class="avatar-uploader"
                >
                  <img v-if="postForm.detail_bg" :src="postForm.detail_bg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-col>
            </el-form-item>
            <el-form-item prop="iconPath" style="margin-bottom: 30px;" label="上传icon">
              <el-col span="24">
                <el-upload
                  :action="uploadImageUrl"
                  :show-file-list="false"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handleIconImage"
                  name="files"
                  class="avatar-uploader"
                >
                  <img v-if="postForm.iconPath" :src="postForm.iconPath" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-col>
            </el-form-item>
            <el-form-item prop="image_uri" style="margin-bottom: 30px;" label="上传详情图片">
              <el-col span="24">
                <el-upload
                  :action="uploadImageUrl"
                  :on-preview="handlePictureCardPreview"
                  :file-list="detailFileList"
                  :on-success="handleDetailImageList"
                  :on-remove="handleDetailImageRemove"
                  list-type="picture-card"
                  name="files">
                  <i class="el-icon-plus"/>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Upload from '@/components/Upload/singleImage3'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { updateMarker, getMarkersType, getMarkerById, createMarker } from '@/api/common'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  // status: 'draft',
  // title: '', // 文章题目
  // detail: '', // 文章内容
  // // content_short: '', // 文章摘要
  // //  source_uri: '', // 文章外链
  // main_img_url: '', // 文章图片
  // start_time: undefined, // 前台展示时间
  // end_time: undefined,
  // location: '', // 地点
  // number: '',
  // category_id: '',
  // activity_type_id: 0,
  // platforms: ['a-platform']
  items: [],
  title_bg: '',
  detail_bg: '',
  iconPath: '',
  cn: {
    title: '',
    detail: '',
    sounds: ''
  },
  en: {
    title: '',
    detail: '',
    sounds: ''
  },
  hk: {
    title: '',
    detail: '',
    sounds: ''
  },
  type: 1
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

      ],
      activityType: [],
      tabMapOptions: [
        { label: 'China', key: 'cn' },
        { label: 'USA', key: 'en' },
        { label: 'HK', key: 'hk' }
      ],
      activeName: 'cn'
    }
  },
  computed: {
    detailFileList: {
      get() {
        const { items } = this.postForm
        if (items.length) {
          return items.map(item => (
            {
              name: item.marker_id,
              url: item.path
            }
          ))
        }
        return []
      },
      set(values) {
        console.log(values)
        // return values
      }

    },
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    },
    uploadImageUrl() {
      return `${process.env.BASE_API}/common/upload`
    },
    uploadSoundsUrl() {
      return `${process.env.BASE_API}/common/uploadSound`
    }
  },
  watch: {
    activeName(val) {
      const index = this.tabMapOptions.findIndex(item => item.key === val)
      this.$refs.editor[index].setContent(this.postForm[val].detail)
    }
  },

  created() {
    if (this.isEdit) {
      const id = this.$route.query && this.$route.query.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.getCatories()

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221

    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    async getCatories() {
      this.categories = await getMarkersType()
    },
    handleDetailImageRemove(file, fileList) {
      console.log('files', fileList)
      const id = this.$route.query && this.$route.query.id
      this.postForm.items = fileList.map(item => {
        return {
          marker_id: id || null,
          path: item.url
        }
      })
    },
    handleDetailImageList(response, file, fileList) {
      const id = this.$route.query && this.$route.query.id
      this.postForm.items = fileList.map(item => {
        if (item.response) {
          return {
            marker_id: id || null,
            path: item.response.url
          }
        }
        return {
          marker_id: id || null,
          path: item.url
        }
      })
    },
    handleIconDetailBgImage(file) {
      this.postForm.detail_bg = file.url
    },
    handleIconTitleBgImage(file) {
      this.postForm.title_bg = file.url
    },
    handleIconImage(file) {
      this.postForm.iconPath = file.url
    },
    handleSoundsSuccess({ url }) {
      this.postForm[this.activeName].sounds = url
    },
    fetchData(id) {
      getMarkerById(id).then(response => {
        this.postForm = response
        console.log(this.postForm)
        // Set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        this.postForm = defaultForm
        console.log(err)
      })
    },
    setTagsViewTitle() {
      // const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      // const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      // this.$store.dispatch('updateVisitedView', route)
    },

    submitForm() {
      this.$refs.postForm.validate(async(valid) => {
        if (valid) {
          const data = {
            ...this.postForm
          }
          console.log('data', data)
          const id = this.$route.query && this.$route.query.id
          if (id) {
            await updateMarker(data)
          } else {
            await createMarker(data)
          }
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
