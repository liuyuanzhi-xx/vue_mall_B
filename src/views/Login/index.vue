<template>
  <div class="loginContainer">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item has-feedback>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  required: true,
                  message: '请输入正确的邮箱格式!',
                },
              ],
            },
          ]"
          placeholder="email"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  min: 6,
                  max: 15,
                  message: '密码长度为10-15位!',
                },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          记住我
        </a-checkbox>
        <router-link to="/findBack" class="login-form-forgot">
          忘记密码
        </router-link>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登陆
        </a-button>

        <router-link to="/register">
          去注册!
        </router-link>
      </a-form-item>
    </a-form>
    <template v-if="isLoading">
      <Loading />
    </template>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { setUserCookie } from "@/utils/userCookie";
import Loading from "@/components/Loading";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  components: {
    Loading,
  },
  data() {
    return {
      loginInfo: {},
      isLoading: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let loginInfo = Object.assign({}, values);
          delete loginInfo.remember;
          this.isLoading = true;
          let res = await login(loginInfo);
          this.isLoading = false;
          if (res.status == "fail") {
            this.$Message.error(`${res.msg}`);
          } else {
            if (values.remember) {
              setUserCookie(res.data);
            }
            this.$store.commit("user/setLogined", res.data);
            this.$router.push({ name: "Statistics" });
          }
        }
      });
    },
  },
};
</script>
<style>
#components-form-demo-normal-login {
  max-width: 300px;
  margin: 40px auto;
  border: 1px solid #ddd;
  padding: 20px 20px 0 20px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.loginContainer {
  height: 100%;
}
</style>
