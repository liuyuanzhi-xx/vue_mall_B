<template>
  <div class="findBackContainer">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '请输入有效的邮箱地址!',
                },
                {
                  required: true,
                  message: '请输入邮箱地址!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                },
                {
                  pattern: /^[0-9a-zA-Z]{1,}$/,
                  message: '只能输入字母或数字!',
                },
                {
                  min: 10,
                  max: 15,
                  message: '请设置密码在10-15位',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认新密码" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请在次确认新密码!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="验证码">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'code',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码!',
                    },
                  ],
                },
              ]"
            />
          </a-col>
          <a-col :span="12" @click="handleCodeClick">
            <a-button ref="getCode" :disabled="isDisabled">{{
              codeLabel
            }}</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>

      <router-link to="/login">
        去登陆!
      </router-link>
    </a-form>
    <template v-if="isLoading">
      <Loading />
    </template>
  </div>
</template>

<script>
import { getCode, findBack } from "@/api/user";
import Loading from "@/components/Loading";
export default {
  components: { Loading },
  data() {
    return {
      isLoading: false,
      confirmDirty: false,
      codeLabel: "获取验证码",
      isDisabled: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          this.isLoading = true;
          const res = await findBack(values);
          this.isLoading = false;
          if (res.status == "success") {
            this.$Message.success("修改密码成功！赶快去登陆吧！");
          } else {
            this.$Message.error("修改密码失败！");
          }
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleCodeClick() {
      const form = this.form;
      console.log(this.$refs.getCode);
      form.validateFields(["email"], async (error, value) => {
        if (error) {
          this.$Message.error(`请输入有效的邮箱地址`);
        } else {
          this.isDisabled = true;
          let res = await getCode(value);
          console.log(res);
          if (res.status == "success") {
            this.$Message.success("验证码已发送至您的邮箱，请查收");
            let i = 59;
            let timer = null;
            timer = setInterval(() => {
              if (i == -1) {
                this.isDisabled = false;
                this.codeLabel = "获取验证码";
                clearInterval(timer);
                return;
              }
              this.codeLabel = `${i}s`;
              i--;
            }, 1000);
          } else {
            this.isDisabled = false;
            this.$Message.error("获取验证码失败");
          }
        }
      });
    },
  },
};
</script>
<style lang="less">
.findBackContainer {
  max-width: 400px;
  margin: 40px auto;
  border: 1px solid #ddd;
  padding: 20px;
}
</style>
