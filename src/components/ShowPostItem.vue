<template>
  <div style="p-3">
    <el-row type="flex" justify="space-around" class="m-b-3">
      <el-col :span="6">
        <el-tag>vue3—ts-blog</el-tag>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card">
          <h4>{{ post.title }}</h4>
          <div v-html="post.html"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <el-button type="danger" @click="$router.go(-1)"> 取消 </el-button>
      </el-col>
      <el-col :span="4" class="text-right">
        <el-button type="primary" icon="el-icon-edit" @click="handleEdit">
          编辑
        </el-button>
      </el-col>
    </el-row>
  </div>
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
.p-3 {
  padding: 3rem;
}
.m-b-3 {
  margin-bottom: 3rem;
}
.text-right {
  text-align: right;
}
</style>
