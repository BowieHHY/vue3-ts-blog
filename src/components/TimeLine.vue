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
    {{ selectedPeriod }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Period } from "@/types";

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
    return {
      activeIndex,
      period,
      selectedPeriod,
      handleSelect,
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
