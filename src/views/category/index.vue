<!--
 * @Author: your name
 * @Date: 2020-01-17 13:39:03
 * @LastEditTime : 2020-01-17 20:00:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\views\homeActivityType\index.vue
 -->
<!--  -->
<template>
  <div class="container">
    <template>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always">
            <el-row>
              <el-col v-for="tag in dynamicTags" :key="tag" :span="8">
                <el-tag
                  :disable-transitions="false"
                  closable
                  @close="handleClose(tag)">
                  {{ tag }}
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
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-card>
        </el-col>
      </el-row>

    </template>
  </div>
</template>

<script>
import { getActivityTypeCategory } from '@/api/common'
export default {

  components: {},
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },

  computed: {
  },
  async created() {
    this.activityTypeInfo = await getActivityTypeCategory()
    console.log(this.activityTypeInfo)
  },
  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}

</script>
<style lang='scss' scoped>
.container{
    margin:30px;
}
.button-new-tag {
  // margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
