<template>
  <el-dialog :title="title" v-model="modal.visible.value">
    <el-form
      ref="refForm"
      status-icon
      :rules="ruleForm"
      :model="form"
      label-width="60px"
      label-position="top"
    >
      <el-form-item label="角色" prop="role" v-if="titel === '注册'">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option
            v-for="item in roleArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username" v-if="titel === '注册'">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2" v-if="titel === '注册'">
        <el-input v-model="form.password2" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modal.hideModal">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { User } from "@/types";
import { useModal } from "@/utils/useModal";
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  getCurrentInstance,
  toRaw,
  toRefs,
} from "vue";

export default defineComponent({
  name: "DialogItem",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const modal = useModal();
    const roleArr = reactive([
      { value: "用户", lebel: "用户" },
      { value: "游客", lebel: "游客" },
    ]);
    const state = reactive({
      form: {
        id: -1,
        username: "",
        email: "",
        password: "",
        password2: "",
        role: "",
      } as User,
      refForm: ref<any>(null),
    });
    const validatePass2 = (rule: Object, value: string, callback: Function) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== state.form.password2) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const ruleForm = reactive({
      username: [{ required: true, message: "必填", trigger: "blur" }],
      email: [{ required: true, message: "必填", trigger: "blur" }],
      password: [{ required: true, message: "必填", trigger: "blur" }],
      password2: [{ validator: validatePass2, trigger: "blur" }],
    });

    const handleSubmit = async () => {
      state.refForm.validate().then((valid: boolean) => {
        if (valid) {
          console.log("验证成功");
          console.log("form", toRaw(state.form));
          if (props.title === "注册") {
            const user: User = {
              id: -1,
              username: state.form.username,
              email: state.form.username,
              password: state.form.username,
              role: state.form.role,
            };
            store.createUser(user);
            modal.hideModal();
            return;
          }
          const user: User = {
            id: -1,
            username: state.form.username,
            password: state.form.password,
            role: state.form.role,
          };
          store.createUser(user);
          modal.hideModal();
        }
      });
    };
    const currentInstance = getCurrentInstance();
    onMounted(() => {
      console.log("currentInstance", currentInstance);

      // form._value.validate((valid: boolean) => {});
    });
    return {
      modal,
      handleSubmit,
      ...toRefs(state),
      ruleForm,
      roleArr,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
