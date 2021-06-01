<template>
  <el-button type="primary" icon="el-icon-edit" @click="handleEdit"> 编辑博客 </el-button>
  <div class="ShowPostItem">博客标题: {{ post.title }}</div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ShowPostItem",
  props: {},
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const id = route.params.id as string;

    // resolve 刷新没有数据
    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }

    const post = store.getState().posts.all[id];
    const handleEdit = () => {
      router.push(`/posts/${post.id}/edit`);
    };
    return {
      post,
      handleEdit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}
</style>
