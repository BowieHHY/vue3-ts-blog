<template>
  <el-dialog :title="title" v-model="modal.visible.value">
    <el-form ref="refForm" status-icon :rules="ruleForm" :model="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modal.hideModal">取 消</el-button>
        <el-button type="primary" @click="modal.hideModal">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
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

interface userForm {
  username: string;
  email: string;
  password: string | number;
  password2: string | number;
}
export default defineComponent({
  name: "DialogItem",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      form: {
        username: "",
        email: "",
        password: "",
        password2: "",
      } as userForm,
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

    const handleSubmit = () => {
      state.refForm.validate().then((valid: boolean) => {
        if (valid) {
          console.log("验证成功");
        }
      });
    };
    const currentInstance = getCurrentInstance();
    onMounted(() => {
      console.log("currentInstance", currentInstance);

      // form._value.validate((valid: boolean) => {});
    });
    return {
      modal: useModal(),
      handleSubmit,
      ...toRefs(state),
      ruleForm,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
