<template>
  <div class="TimeLine">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        data-test="period"
        v-for="(item, idx) in period"
        :key="idx"
        :index="idx + ''"
      >
        {{ item }}
      </el-menu-item>
    </el-menu>
    <el-row class="TimeLinePost">
      <TimeLinePost v-for="post in posts" :key="post.id" :post="post"></TimeLinePost>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Period, Post } from "@/types";
import { todayPost, thisWeek, thisMonth } from "@/mock";
import moment from "moment";
import TimeLinePost from "./TimeLinePost.vue";
import { useStore } from "@/store";

const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export default defineComponent({
  name: "TimeLine",
  components: {
    TimeLinePost,
  },
  props: {},
  async setup() {
    const activeIndex = ref("0");
    const period: Period[] = ["今天", "本周", "本月"];
    const selectedPeriod = ref<Period>("今天");
    const handleSelect = (index: String) => {
      selectedPeriod.value = period[Number(index)];
    };

    const store = useStore();
    console.log(store.getState());

    if (!store.getState().posts.loaded) {
      await store.fetchPosts(); // main.ts 中打印 axios url /posts
    }

    const allPosts = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const post = store.getState().posts.all[id];
      return acc.concat(post);
    }, []);

    console.log(allPosts);
    await delay(1000);

    //showData
    const posts = computed(() =>
      allPosts.filter((post) => {
        if (
          selectedPeriod.value == "今天" &&
          post.createDate.isAfter(moment().subtract(1, "day"))
        ) {
          return true;
        }
        if (
          selectedPeriod.value == "本周" &&
          post.createDate.isAfter(moment().subtract(7, "day"))
        ) {
          return true;
        }

        if (
          selectedPeriod.value == "本月" &&
          post.createDate.isAfter(moment().subtract(1, "month"))
        ) {
          return true;
        }

        return false;
      })
    );
    console.log([todayPost, thisWeek, thisMonth]);
    return {
      activeIndex,
      period,
      selectedPeriod,
      handleSelect,
      posts,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TimeLine {
  border-radius: 2%;
  box-shadow: 5px 5px 5px 5px #f5f3f3;
}
</style>
