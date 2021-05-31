<template>
  <div class="PostsWritter">
    <el-form ref="postForm">
      <el-form-item label="博客标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="space-between">
      <el-col :span="11">
        <div contenteditable id="markdowm" ref="contentEditable" @input="handleEdit" />
      </el-col>
      <el-col :span="11">
        <div v-html="html"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Post } from "@/types";
import { defineComponent, onMounted, ref, watch } from "vue";
import { parse } from "marked";

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

    console.log("contentEditable.value", contentEditable.value); //null
    const markdown = ref(props.post.markdown);

    const html = ref("");

    const handleEdit = () => {
      // @ts-ignore
      markdown.value = contentEditable.value.innerText;
    };

    watch(
      () => markdown.value,
      (value) => {
        console.log(value);
        html.value = parse(markdown.value);
      },
      { immediate: true } //立即执行
    );
    onMounted(() => {
      console.log("contentEditable.value", contentEditable.value); //div

      // markdown -->div
      // @ts-ignore
      contentEditable.value.innerText = markdown.value;

      // html.value = parse(markdown.value);
    });

    return {
      title,
      contentEditable,
      markdown,
      handleEdit,
      html,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
