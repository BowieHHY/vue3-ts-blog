<template>
  <nav class="Navbar">
    <el-row type="flex" justify="space-around">
      <el-col>
        <router-link class="el-button" to="/posts/new"> 添加博客 </router-link>
      </el-col>
    </el-row>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  props: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav a {
  text-decoration: none;
}
</style>
