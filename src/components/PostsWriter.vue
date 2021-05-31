<template>
  <div class="PostsWritter">
    <el-form ref="postForm">
      <el-form-item label="博客标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="m-3" type="flex" justify="space-between">
      <el-col :span="11">
        <div contenteditable id="markdowm" ref="contentEditable" @input="handleEdit" />
      </el-col>
      <el-col :span="11">
        <div v-html="html"></div>
      </el-col>
    </el-row>
    <el-button type="primary" @click="handleSubmit">保存</el-button>
  </div>
</template>

<script lang="ts">
import { Post } from "@/types";
import { defineComponent, onMounted, ref, watch } from "vue";
import { parse, MarkedOptions } from "marked";
import { highlightAuto } from "highlight.js";
const debounce = require("lodash/debounce");

export default defineComponent({
  name: "PostsWritter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props, ctx) {
    //标题
    const title = ref(props.post.title);
    const contentEditable = ref<null | HTMLDivElement>(null);

    console.log("contentEditable.value", contentEditable.value); //null
    const markdown = ref(props.post.markdown);

    const html = ref("");

    const handleEdit = () => {
      // @ts-ignore
      markdown.value = contentEditable.value.innerText;
    };

    const handleSubmit = () => {
      // 1.可通过 store 进行存储

      // 2. 将数据提交到父级
      const post: Post = {
        ...props.post,
        title: title.value,
        markdown: markdown.value,
        html: html.value,
      };
      ctx.emit("savePost", post);
    };

    const options: MarkedOptions = {
      highlight: (code: string) => highlightAuto(code).value,
    };

    // 延迟效果
    const updated = (value: string) => {
      html.value = parse(value, options);
    };
    watch(
      () => markdown.value,
      debounce(updated, 500),
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
      handleSubmit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-3 {
  margin: 3rem 0;
}
</style>
