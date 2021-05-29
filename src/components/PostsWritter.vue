<template>
  <div class="PostsWritter">
    <el-form ref="postForm">
      <el-form-item label="博客标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Post } from "@/types";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PostsWritter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const title = ref(props.post.title);
    return {
      title,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
