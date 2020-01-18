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
        <el-col v-for="(item,index) in activityTypeInfo " :span="8" :key="index">
          <el-card shadow="always">
            <div slot="header" class="clearfix">
              <span>{{ item.name }}</span>
            </div>
            <el-row>
              <el-col v-for="(tag,i) in item.items" :key="i" :span="8">
                <el-tag
                  :disable-transitions="false"
                  closable
                  @close="handleClose(tag,index)">
                  {{ tag.name }}
                </el-tag>
              </el-col>
            </el-row>
            <el-input
              v-if="item.inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm(index)"
              @blur="handleInputConfirm(index)"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput(item,index)">+ Add</el-button>
          </el-card>
        </el-col>
      </el-row>

    </template>
  </div>
</template>

<script>
import { getActivityTypeCategory, createCategory, removeCategory } from '@/api/common'
export default {

  components: {},
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      activityTypeInfo: [
      ]
    }
  },

  computed: {
  },
  async created() {
    this.activityTypeInfo = await getActivityTypeCategory()
    this.activityTypeInfo.map(item => {
      item.inputVisible = false
      return item
    })
    console.log(this.activityTypeInfo)
  },
  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    async handleClose(tag, index) {
      console.log(tag)
      await removeCategory(tag.id)
      console.log(this.activityTypeInfo[index].items.indexOf(tag))
      this.activityTypeInfo[index].items.splice(this.activityTypeInfo[index].items.findIndex(item => item.name === tag.name), 1)
    },

    showInput(item, index) {
      item.inputVisible = true
      this.$set(this.activityTypeInfo, index, item)
      this.$nextTick(_ => {
        console.log(this.$refs.saveTagInput[0])
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    },

    async handleInputConfirm(index) {
      const inputValue = this.inputValue
      if (inputValue) {
        const _index = this.activityTypeInfo[index].items.findIndex(item => item.name === inputValue)
        if (_index !== -1) {
          this.$message.error('错了哦，您输入的已存在！')
          return false
        } else {
          await createCategory({ name: inputValue, activity_type_id: this.activityTypeInfo[index].id })
          this.activityTypeInfo[index].items.push({ name: inputValue })
          console.log(this.activityTypeInfo)
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
