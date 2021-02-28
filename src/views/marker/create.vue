<template>
  <article-detail :is-edit="isEdit"/>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'CreateForm',
  components: { ArticleDetail },
  data() {
    return {
      isEdit: false
    }
  },
  created() {
    const { id } = this.$route.query
    if (id) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
  }
}
</script>

