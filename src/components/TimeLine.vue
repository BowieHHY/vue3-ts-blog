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
    <el-row>
      <el-col data-test="post" :span="24" v-for="item in posts" :key="item.id">
        <p>{{ item.title }}</p>
        <p>{{ item.createDate.format("YYYY-MM-DD") }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Period } from "@/types";
import { todayPost, thisWeek, thisMonth } from "@/mock";
import moment from "moment";

export default defineComponent({
  name: "TimeLine",
  props: {},
  setup() {
    const activeIndex = ref("0");
    const period: Period[] = ["今天", "本周", "本月"];
    const selectedPeriod = ref<Period>("今天");
    const handleSelect = (index: String) => {
      selectedPeriod.value = period[Number(index)];
    };

    //showData
    const posts = computed(() =>
      [todayPost, thisWeek, thisMonth].filter((post) => {
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
