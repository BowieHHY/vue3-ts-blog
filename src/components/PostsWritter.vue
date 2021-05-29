<template>
  <div class="PostsWritter">
    <el-form ref="postForm">
      <el-form-item label="博客标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex">
      <el-col :span="12">
        <div contenteditable id="markdowm" ref="contentEditable" @input="handleEdit" />
      </el-col>
      <el-col :span="12">
        {{ markdown }}
      </el-col>
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
    const markdown = ref(props.post.markdown);

    const handleEdit = () => {
      // @ts-ignore
      markdown.value = contentEditable.value.innerText;
    };

    onMounted(() => {
      console.log(contentEditable.value); //div

      // markdown -->div
      // @ts-ignore
      contentEditable.value.innerText = markdown.value;
    });

    return {
      title,
      contentEditable,
      markdown,
      handleEdit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
