<template>
  <div class="container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">

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

      <!-- <el-table-column width="180px" align="center" label="Date">
      <template slot-scope="scope">
        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column> -->

      <el-table-column min-width="100px" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.detail? scope.row.detail.title:'---' }}</span>
        <!-- <el-tag>{{ scope.row.type }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
      </template>
    </el-table-column> -->
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
    <!-- <el-pagination
      :total="1000"
      background
      layout="prev, pager, next"/> -->
    <el-dialog :visible.sync="dialogFormVisible" title="活动详情">
      <div class="demo-image__placeholder">
        <div class="block">
          <span>封面图片</span>
          <img :src="detail.main_img_url" alt="">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="type=='4'" type="primary" @click="setTopBanner(3)">置顶体育圈banner图</el-button>
        <el-button type="primary" @click="setTopBanner(1)">置顶banner图</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getMarkers } from '@/api/common'

export default {
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
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        size: 10,
        id: this.type,
        sort: '+id'
      },
      loading: false,
      dialogFormVisible: false,
      detail: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      this.$emit('create') // for test
      this.list = await getMarkers(this.type)
    },
    async handleClick(row) {
      console.log(row)
      this.$router.push({
        name: 'createMarker',
        query: {
          id: row.id
        }
      })
    },
    async setTopBanner(id) {
      // const banner_id = id
      // const key_word = this.detail.id
      // const url = this.detail.main_img_url
      // await createBanner({ banner_id, key_word, url })
      // console.log(this.detail)
      // this.dialogFormVisible = false
    }
  }
}
</script>
<style scoped>
  .tab-container{
    margin: 30px;
  }
  .demo-image__placeholder .block{
      display:flex;
      align-items:center;
  }
</style>
