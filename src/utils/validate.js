

export const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== this.ruleForm.pass) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};