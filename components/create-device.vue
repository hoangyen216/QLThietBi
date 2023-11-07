<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="150px" style="width: 50% " :rules="rules"
    class="demo-ruleForm" :size="formSize" status-icon>
    <el-form-item label="Tên thiết bị" prop="ten">
      <el-input v-model="ruleForm.ten" />
    </el-form-item>
    <el-form-item label="Tên viết tắt" prop="tenVietTat">
      <el-input v-model="ruleForm.tenVietTat" />
    </el-form-item>
    <el-form-item label="Thời gian nhập kho">
      <el-col :span="11">
        <el-form-item prop="tgnhapKho">
          <el-date-picker v-model="ruleForm.tgnhapKho" type="date" label="Pick a date" placeholder="Pick a date"
          value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Thời gian bảo hành">
      <el-col :span="11">
        <el-form-item prop="tgbaoHanh">
          <el-date-picker v-model="ruleForm.tgbaoHanh" type="date" label="Pick a date" style="width: 100%" />
        </el-form-item>
      </el-col>

    </el-form-item>
    <el-form-item label="Thời gian bảo dưỡng">
      <el-col :span="11">
        <el-form-item prop="tgbaoDuong">
          <el-date-picker v-model="ruleForm.tgbaoDuong" type="date" label="Pick a date" style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Người nhập kho" prop="nguoiNhapKho">
      <el-input v-model="ruleForm.nguoiNhapKho" />
    </el-form-item>
    <!-- <el-form-item label="Hình ảnh thiết bị" prop="hinhanh">
      <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
    </el-form-item> -->

    <el-form-item label="Hình nền">
      <div class="avatar-uploader rounded-lg overflow-hidden" v-if="imageUrl">
        <div class="relative avatar rounded-lg">
          <el-text class="absolute right-3 z-10 cursor-pointer text-lg close"
            @click="() => { imageUrl = ''; ruleForm.hinhanh = null }">x</el-text>
          <img :src="imageUrl" class="avatar object-contain absolute" />
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

    <el-form-item label="Tình trạng thiết bị" prop="tinhTrang">
      <el-input v-model="ruleForm.tinhTrang" />
    </el-form-item>
    <el-form-item label="Số lượng" prop="desc">
      <el-input-number v-model="ruleForm.soLuong" :min="1" :max="1000" />
    </el-form-item>
    <el-form-item label="Mô tả chức năng" prop="desc">
      <el-input v-model="ruleForm.moTaChucNang" type="textarea" />
    </el-form-item>
    <el-form-item label="Hướng dẫn sử dụng" prop="desc">
      <el-input v-model="ruleForm.huongDanSuDung" type="textarea" />
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Add Device
      </el-button> 
     <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item> -->
  </el-form>
</template>
  
<script lang="ts" setup >

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
const formSize = ref('default')
const oldForm = ref<Device>()
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<Device>({
  ten: '',
  tenVietTat: '',
  nguoiNhapKho: '',
  tgnhapKho: '',
  tgbaoHanh: '',
  tgbaoDuong: '',
  tinhTrang: '',
  moTaChucNang: '',
  huongDanSuDung: '',
  soLuong: 0,
  hinhanh: undefined,

})

const rules = reactive<FormRules<Device>>({
  ten: [
    { required: true, message: 'Vui lòng nhập tên thiết bị', trigger: 'blur' },

  ],
  nguoiNhapKho: [
    { required: true, message: 'Vui lòng nhập tên người nhập kho', trigger: 'blur' }

  ],

  // tgnhapKho: [
  //   {
  //     type: 'date',
  //     required: true,
  //     message: 'Vui lòng chọn ngày',
  //     trigger: 'change',
  //   },
  // ],
})

if (props.edit) {
  const id = route.params.id as string;
  const { data } = await useFetchApi(`/demo/find/${route.params.id}`, {
    method: 'GET',
  });
  if (data.value) {
    const programDetail = data.value as Device;
    oldForm.value = programDetail;

    ruleForm.value = programDetail

  }
}

async function submit(): Promise<boolean> {
  console.log(ruleFormRef.value)
  if (!ruleFormRef.value) return false;
  try {
    if (! await ruleFormRef.value.validate((valid, fields) => {
      return valid;
    })) return false;
  } catch (error) {
    return false;
  }

  // const formData = new FormData();
  // for (const [k, v] of Object.entries(ruleForm.value)) {
  //     if (v && k!= 'id')
  //       formData.append(k, v);
  //   }
  const { error, status } = await useFetchApi(`demo/post/${props.edit ? oldForm.value?.id + '/' : ''}`, {
    method: props.edit ? 'PUT' : 'POST',
    server: false,
    body: ruleForm, 
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
  }
  return false;
}


function handleSuccessUpload(file: UploadFile) {
  
  var reader = new FileReader();
   reader.readAsDataURL(file.raw);
   reader.onload = function () {
     console.log(reader.result);
     ruleForm.value.hinhanh = reader.result;
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>

<style scoped>
.close:hover {
  --el-text-color: var(--el-color-primary);
}

.avatar-uploader .avatar {
  width: 400px;
  height: 178px;
  display: block;
}
</style>

<style>
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
  width: 400px;
  height: 178px;
  text-align: center;
}
</style>

