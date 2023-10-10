<template>
  <h2 >Thêm Thiết Bị</h2>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="150px" style="width: 50% " :rules="rules" class="demo-ruleForm"
    :size="formSize" status-icon>
    <el-form-item label="Tên thiết bị" prop="ten">
      <el-input v-model="ruleForm.ten" />
    </el-form-item>
    <el-form-item label="Tên viết tắt" prop="tenVietTat">
      <el-input v-model="ruleForm.tenVietTat" />
    </el-form-item>
    <el-form-item label="Thời gian nhập kho" required>
      <el-col :span="11">
        <el-form-item prop="tgnhapKho">
          <el-date-picker v-model="ruleForm.tgnhapKho" type="date" label="Pick a date" placeholder="Pick a date"
            style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Thời gian bảo hành" required>
      <el-col :span="11">
        <el-form-item prop="tgbaoHanh">
          <el-date-picker v-model="ruleForm.tgbaoHanh" type="date" label="Pick a date" style="width: 100%" />
        </el-form-item>
      </el-col>

    </el-form-item>
    <el-form-item label="Thời gian bảo dưỡng" required>
      <el-col :span="11">
        <el-form-item prop="tgbaoDuong">
          <el-date-picker v-model="ruleForm.tgbaoDuong" type="date" label="Pick a date" style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Người nhập kho" prop="nguoiNhapKho">
      <el-input v-model="ruleForm.nguoiNhapKho" />
    </el-form-item>
    <el-form-item label="Hình ảnh thiết bị" prop="hinhanh">
      <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <!-- <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template> -->
      </el-upload>
    </el-form-item>

    <el-form-item label="Tình trạng thiết bị" prop="tinhTrang">
      <el-input v-model="ruleForm.tinhTrang" />
    </el-form-item>
    <el-form-item label="Số lượng" prop="desc">
      <el-input-number v-model="ruleForm.soLuong" :min="1" :max="1000" @change="handleChange" />
    </el-form-item>
    <el-form-item label="Mô tả chức năng" prop="desc">
      <el-input v-model="ruleForm.moTaChucNang" type="textarea" />
    </el-form-item>
    <el-form-item label="Hướng dẫn sử dụng" prop="desc">
      <el-input v-model="ruleForm.huongDanSuDung" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Add Device
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup >
import axios from 'axios';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'



// interface RuleForm {
//   ten: string
//   tenVietTat: string
//   tgnhapKho: string
//   nguoiNhapKho: string
//   tgbaoHanh: string
//   tgbaoDuong: string
//   tinhTrang: string
//   moTaChucNang: string
//   soLuong: number
//   hinhanh: string
//   huongDanSuDung: string
// }

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Program[]>({
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
  hinhanh: '',

})

const rules = reactive<FormRules<Program[]>>({
  ten: [
    { required: true, message: 'Vui lòng nhập tên thiết bị', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  nguoiNhapKho: [
    { required: true, message: 'Vui lòng nhập tên người nhập kho', trigger: 'blur' }

  ],
  tgnhapKho: [
    {
      type: 'date',
      required: true,
      message: 'Vui lòng chọn ngày',
      trigger: 'change',
    },
  ],
})




const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      const { data, error, status } = await useFetch('https://65183f73582f58d62d358659.mockapi.io/devices', {
        method: 'POST',
        body: ruleForm
      })
      if (status.value == 'success') {
        console.log('submit!')
      }
      else if (error.value) {
        console.error(error.value)
        ElNotification({
          title: 'Error',
          message: error.value.data,
          type: 'error',
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
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
  