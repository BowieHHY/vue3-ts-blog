<template>
  <el-col class="TimeLinePost" data-test="post" :span="24" @click="toPost">
    <p>{{ post.title }}</p>
    <p>{{ post.createDate.format("YYYY-MM-DD") }}</p>
  </el-col>
</template>

<script lang="ts">
import { Post } from "@/types";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TimeLinePost",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const toPost = () => {
      router.push(`/posts/${props.post.id}`);
    };
    return {
      toPost,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TimeLinePost {
  cursor: pointer;
}
.TimeLinePost:hover {
  background: rgb(223, 221, 221);
}
</style>
