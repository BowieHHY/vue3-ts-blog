<template>
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback>
      <Progress />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Progress from "@/components/Progress.vue";
import TimeLine from "@/components/TimeLine.vue";

export default defineComponent({
  components: { TimeLine, Progress },
  name: "Home",
  props: {},
});
</script>
<style></style>
