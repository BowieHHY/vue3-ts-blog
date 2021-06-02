<template>
  <nav class="Navbar">
    <el-row type="flex" justify="center" class="align-center">
      <el-col :span="8">
        <div @click="toHome" class="d-hover">
          <i class="el-icon-s-home font-24"></i>
          博客
        </div>
      </el-col>
      <el-col :span="8" class="text-right">
        <el-button icon="el-icon-circle-plus"> 登陆 </el-button>
        <el-button icon="el-icon-s-custom"> 注册 </el-button>
      </el-col>
    </el-row>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Navbar",
  props: {},
  setup() {
    const router = useRouter();
    const handleAdd = () => {
      router.push("/posts/new");
    };
    const toHome = () => {
      router.push("/");
    };
    return {
      handleAdd,
      toHome,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Navbar {
  padding: 0.5rem 0;
  background: darkgray;
}
.Navbar a {
  text-decoration: none;
}

.text-right {
  text-align: right;
}
.align-center {
  align-items: center;
}
.font-24 {
  font-size: 24px;
}

.d-hover:hover {
  cursor: pointer;
}
</style>
