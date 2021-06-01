<template>
  <Suspense>
    <template #default>
      <ShowPostItem />
    </template>
    <template #fallback>
      <Progress />
    </template>
  </Suspense>
</template>

<script lang="ts">
import ShowPostItem from "@/components/ShowPostItem.vue";
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { ShowPostItem },
  name: "ShowPost",
  props: {},
  setup() {
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
