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
    <template>
      <el-row :gutter="12">
        <el-col>
          <el-card shadow="always">
            <div slot="header" class="clearfix">
              <span>新鲜类型</span>
            </div>
            <el-row>
              <el-col v-for="(item,index) in newsCategories" :key="index" :span="8">
                <el-tag
                  :disable-transitions="false"
                  closable
                  @close="handleClose(item,index)">
                  {{ item.name }}
                </el-tag>
              </el-col>
            </el-row>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add</el-button>
          </el-card>
        </el-col>
      </el-row>

    </template>
  </div>
</template>

<script>
import { getNewsCategory, createNewsCategory, removeNewsCategory } from '@/api/common'
export default {

  components: {},
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      newsCategories: [
      ]
    }
  },

  computed: {
  },
  async created() {
    this.newsCategories = await getNewsCategory()
    console.log(this.newsCategories)
  },
  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    async handleClose(tag, index) {
      await removeNewsCategory(tag.id)
      this.newsCategories.splice(this.newsCategories.findIndex(item => item.name === tag.name), 1)
    },

    showInput(item, index) {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async handleInputConfirm(index) {
      const inputValue = this.inputValue
      if (inputValue) {
        const _index = this.newsCategories.findIndex(item => item.name === inputValue)
        if (_index !== -1) {
          this.$message.error('错了哦，您输入的已存在！')
          return false
        } else {
          await createNewsCategory({ name: inputValue })
          this.newsCategories = await getNewsCategory()
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    }
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
