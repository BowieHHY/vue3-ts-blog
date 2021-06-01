<template>
  <div class="EditPostItem">
    <PostsWriter :post="post" @savePost="handleSave"></PostsWriter>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Post } from "@/types";
import PostsWriter from "./PostsWriter.vue";

export default defineComponent({
  components: { PostsWriter },
  name: "EditPostItem",
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

    const handleSave = async (post: Post) => {
      console.log("save", post);
      //存储到store中

      await store.updatePost(post);

      //跳转
      router.push("/");
    };

    return {
      post,
      handleSave,
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
