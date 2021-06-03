<template>
  <nav class="Navbar">
    <el-row type="flex" justify="center" class="align-center">
      <el-col :span="8">
        <div @click="toHome" class="d-hover">
          <i class="el-icon-s-home font-24"></i>
          博客
        </div>
      </el-col>
      <el-col :span="8" class="text-right" v-if="auth">
        <div class="flex-center">
          <el-avatar src="https://api.prodless.com/avatar.png"></el-avatar>
          <span class="m-1">Admin</span>
          <el-button @click="logout"> 退出 </el-button>
        </div>
      </el-col>
      <el-col :span="8" class="text-right" v-else>
        <el-button @click="toLogin" type="primary" icon="el-icon-circle-plus">
          登陆
        </el-button>
        <el-button @click="toRegister" icon="el-icon-s-custom"> 注册 </el-button>
      </el-col>
    </el-row>
  </nav>
  <teleport to="#modal" v-if="modal.visible.value">
    <!-- 插入组件 -->
    <DialogItem title="title"></DialogItem>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useModal } from "@/utils/useModal";
import DialogItem from "./DialogItem.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: { DialogItem },
  name: "Navbar",
  props: {},
  setup() {
    const router = useRouter();
    const modal = useModal();
    const store = useStore();
    const auth = computed(() => store.getState().loginUser.currentUserId);

    const title = ref<string>("");
    const handleAdd = () => {
      router.push("/posts/new");
    };
    const toHome = () => {
      router.push("/");
    };

    const toLogin = () => {
      title.value = "登陆";
      modal.showModal();
    };

    const toRegister = () => {
      title.value = "注册";
      modal.showModal();
    };

    const logout = async () => {
      await store.signOut();
    };

    return {
      handleAdd,
      toHome,
      title,
      modal,
      toLogin,
      toRegister,
      auth,
      logout,
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

.flex-center {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.m-1 {
  margin: 0 10px;
}
</style>
