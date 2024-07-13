<template>
  <div>
    <div class="row justify-content-center">
      <el-form ref="ruleFormRef" :model="ruleForm" label-width="155px" :rules="rules" class="demo-ruleForm form"
        status-icon>
        <el-form-item label="Tên thiết bị" prop="Descr">
          <el-input v-model="ruleForm.deviceDescr" />
        </el-form-item>
        <el-form-item label="Tên viết tắt" prop="shortDescr">
          <el-input v-model="ruleForm.deviceShortDescr" />
        </el-form-item>
        <el-form-item label="Loại" prop="CategoryId">
          <el-select v-model="ruleForm.categoryId" placeholder="Chọn loại thiết bị" style="flex:1">
            <el-option v-for="item in Category" :key="item.categoryId" :label="item.descr" :value="item.categoryId" />
          </el-select>
        </el-form-item>
        <el-form-item label="Hình ảnh">
          <div class="avatar-uploader img" v-if="imageUrl!=''||ruleForm.image != ''">
            <div class="avatar img1">
              <el-text class=" close1 close" @click="() => { imageUrl = ''; ruleForm.image = '' }">x</el-text>
              <img :src="edit?ruleForm.image:imageUrl" class="avatar img2" />
            </div>
          </div>
          <el-upload v-else class="avatar-uploader" :show-file-list="false"
            :on-success="(_, file) => handleSuccessUpload(file)" :before-upload="beforeAvatarUpload">
            <el-icon class="avatar-uploader-icon">
              <Plus />
            </el-icon>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png file, không quá 2MB
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="Mô tả chức năng" prop="desc">
          <el-input v-model="ruleForm.descrFunction" type="textarea" />
        </el-form-item>
        <el-form-item label="Hướng dẫn sử dụng" prop="pdf">
          <el-upload class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
            <el-button>Upload File PDF</el-button>
            <template #tip>
              <div class="el-upload__tip">
                files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, UploadFile, UploadRawFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const imageUrl = ref('')
defineExpose({ submit })

interface Props {
  edit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  edit: false,
})

const route = useRoute()
const Category = ref<Category[]>()
const oldForm = ref<Device>()
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  categoryId: 1,
  deviceDescr: '',
  deviceShortDescr: '',
  descrFunction: '',
  image: '',
  pdf: ''
})

const rules = reactive<FormRules<Device>>({
  descr: [
    { required: true, message: 'Vui lòng nhập tên thiết bị', trigger: 'blur' },

  ],

})

if (props.edit) {
  const { data } = await useFetchApi(`/device/getbyid/${route.params.id}`, {
    method: 'GET',
  });
  if (data.value) {
    // const programDetail = data.value as Device;
    const newData = data.value as { deviceDescr: string, deviceShortDescr: string, image: string };
    // oldForm.value = programDetail;
    ruleForm.value.deviceDescr = newData.deviceDescr,
      ruleForm.value.deviceShortDescr = newData.deviceShortDescr,
      ruleForm.value.image = newData.image
  }
}

async function submit(): Promise<boolean> {
  if (!ruleFormRef.value) return false;
  try {
    if (! await ruleFormRef.value.validate((valid, fields) => {
      return valid;
    })) return false;
  } catch (error) {
    return false;
  }

  if (props.edit) {

    const { error, status } = await useFetchApi(`device/update/${route.params.id}`, {
      method: 'POST',
      server: false,
      body: {
        categoryId: ruleForm.value.categoryId,
        descr: ruleForm.value.deviceDescr,
        shortDescr: ruleForm.value.deviceShortDescr,
        image: ruleForm.value.image,
        descrFunction: ruleForm.value.descrFunction,
        pdf: ruleForm.value.pdf
      },
      watch: false
    }, false)
    if (status.value == 'success') {
      return true;
    } else if (status.value == 'error') {
      ElNotification({
        title: 'Error',
        message: error.value?.data,
        type: 'error',
      })
      // const msg = error.value?.statusCode == 400 ? 'Thiết bị đã có' : error.value?.data
      // ElNotification({
      //   title: 'Không thể thêm mới',
      //   message: msg,
      //   type: 'error',
      // })
    }
  }
  else {
    const { error, status } = await useFetchApi(`device/create`, {
      method: 'POST',
      server: false,
      body: {
        categoryId: ruleForm.value.categoryId,
        descr: ruleForm.value.deviceDescr,
        shortDescr: ruleForm.value.deviceShortDescr,
        image: ruleForm.value.image,
        descrFunction: ruleForm.value.descrFunction,
        pdf: ruleForm.value.pdf
      },
      watch: false
    }, false)
    if (status.value == 'success') {
      return true;
    } else if (status.value == 'error') {
      ElNotification({
        title: 'Error',
        message: error.value?.data,
        type: 'error',
      })
      // const msg = error.value?.statusCode == 400 ? 'Thiết bị đã có' : error.value?.data
      // ElNotification({
      //   title: 'Không thể thêm mới',
      //   message: msg,
      //   type: 'error',
      // })
    }

  }

  return false;
}

function handleSuccessUpload(file: UploadFile) {
  var reader = new FileReader();
  reader.readAsDataURL(file.raw!);
  reader.onload = function () {
    console.log(reader.result);
    ruleForm.value.image = reader.result as string;
    imageUrl.value = reader.result as any;
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

function beforeAvatarUpload(rawFile: UploadRawFile): boolean {
  const formats = ['image/jpeg', 'image/png']
  if (!formats.includes(rawFile.type)) {
    ElMessage.error('Định dạng ảnh không hợp lệ')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Hình ảnh không quá 2MB!')
    return false
  }
  return true
}

const { data } = await useFetchApi('/category/getall', {
  method: 'GET',
  query: {
    page: 1,
    pageSize: 1000
  }
});
if (data.value) {
  const newData = data.value as { itemCount: number, data: any };
  Category.value = newData?.data as Category[];
}



</script>

<style>
.img {
  border-radius: 0.5rem;
  overflow: hidden;
}

.img1 {
  position: relative;
  border-radius: 0.5rem;
}

.close1 {
  position: absolute;
  right: 0.75rem;
  z-index: 10;
  cursor: pointer;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.img2 {
  /* object-fit: contain; */
  position: absolute;
}

.close:hover {
  --el-text-color: var(--el-color-primary);
}

.avatar-uploader .avatar {
  width: 198px;
  height: 178px;
  display: block;

}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 198px;
  height: 178px;
  text-align: center;
}

@media (min-width: 992px) {
  .form {
    width: 50%;
  }
}

@media (max-width: 767.98px) {
  .el-icon.avatar-uploader-icon {
    width: 180px;
    height: 150px;
  }

  .avatar-uploader .avatar {
    width: 180px;
    height: 150px;

  }
}
</style>
