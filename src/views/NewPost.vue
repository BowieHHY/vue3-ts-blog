<template>
  <div class="NewPost">
    <PostsWritter :post="post"></PostsWritter>
  </div>
</template>

<script lang="ts">
import PostsWritter from "@/components/PostsWritter.vue";
import { Post } from "@/types";
import moment from "moment";
import { defineComponent } from "vue";

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

    return {
      post,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
