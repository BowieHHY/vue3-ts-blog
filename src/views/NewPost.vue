<template>
  <div class="NewPost">
    <PostsWritter :post="post" @savePost="handleSave"></PostsWritter>
  </div>
</template>

<script lang="ts">
import PostsWritter from "@/components/PostsWriter.vue";
import { useStore } from "@/store";
import { Post } from "@/types";
import moment from "moment";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { PostsWritter },
  name: "NewPost",
  props: {},
  setup() {
    const post: Post = {
      id: -1,
      title: "hhy",
      markdown: "#### hhy",
      html: "",
      authorId: 0,
      createDate: moment(),
    };

    const store = useStore();
    const router = useRouter();
    const handleSave = async (post: Post) => {
      console.log("save", post);
      //存储到store中

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
<style scoped></style>
