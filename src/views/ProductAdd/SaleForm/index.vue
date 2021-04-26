<template>
  <div class="saleFormContainer">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="
            'http://mallapi.duyiedu.com/upload/images?appkey=' +
              $store.state.user.userInfo.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button type="primary" @click="prev" style="margin-right:5px"
          >上一步</a-button
        >
        <a-button type="primary" @click="submit">完成</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: {
    form: {
      type: Object,
      default: () => [],
    },
  },
  computed: {},
  data() {
    return {
      formLayout: "horizontal",
      fileList: [],
      loading: false,
      previewImage: "",
      previewVisible: false,
    };
  },
  methods: {
    prev() {
      console.log(this.form);
      this.$emit("prev", this.form);
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.form);
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
    handleChange(e) {
      console.log(e);
      let file = e.file;
      let fileList = e.fileList;
      if (file.status === "done") {
        // console.log(file);
        this.form.images.push(file.response.data.url);
      } else if (file.status === "removed") {
        // console.log(file.response);
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(obj.originFileObj);
      }
      this.previewImage = obj.url || obj.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },

  created() {
    console.log(this.form);
    if (this.form.images.length != 0) {
      this.fileList = this.form.images.map((item, index) => {
        return {
          uid: index,
          name: `img-${index}.png`,
          status: "done",
          url: item,
        };
      });
    }

    console.log(this.fileList);
  },
};
</script>
<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
