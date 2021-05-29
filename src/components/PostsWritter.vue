<template>
  <div class="PostsWritter">
    <el-form ref="postForm">
      <el-form-item label="博客标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex">
      <el-col :span="12">
        <div contenteditable id="markdowm" ref="contentEditable">写的内容</div>
      </el-col>
      <el-col :span="12"> 展示的内容 </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Post } from "@/types";
import { defineComponent, onMounted, ref } from "vue";

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
    const contentEditable = ref<null | HTMLDivElement>(null);

    console.log(contentEditable.value); //null

    onMounted(() => {
      console.log(contentEditable.value); //div
    });

    return {
      title,
      contentEditable,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
