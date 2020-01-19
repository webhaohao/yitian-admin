<!--
 * @Author: your name
 * @Date: 2020-01-08 18:31:04
 * @LastEditTime : 2020-01-19 13:49:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\views\news\list.vue
 -->
<template>
  <div class="app-container">

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="id" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column min-width="300px" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <!-- <router-link :to="'/example/edit/'+scope.row.id"> -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleClick(scope.row)">操作</el-button>
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogFormVisible" title="新鲜详情">
      <div class="demo-image__placeholder">
        <div class="block">
          <span>封面图片</span>
          <img :src="detail.main_img_url" alt="">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setTopBanner">置顶banner图</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getNewsDetailByCategoryId } from '@/api/common'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      detail: {

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const result = await getNewsDetailByCategoryId({ id: '', page: 1, size: 10 })
      this.list = result.data
      this.listLoading = false
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    async handleClick(row) {
      this.dialogFormVisible = true
      this.detail.main_img_url = row.main_img_url
      this.detail.key_word = row.id
      // 后期要改 new banner_id 2
      this.detail.banner_id = 2
      console.log(row)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    setTopBanner() {
      console.log('banner')
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
