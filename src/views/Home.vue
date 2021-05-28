<template>
  <section class="home">
    <div class="container">
      <TimeLine />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimeLine from "@/components/TimeLine.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    TimeLine,
  },
});
</script>
