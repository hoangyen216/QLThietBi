<template>
  <div  class="container text-center">
    <el-text tag="b" style="font-size: x-large;">Thêm Thiết Bị </el-text>
    <CreateDevice ref="addNewRef" style="margin-top: 30px" />
    <el-button type="primary" style=" margin-left: 150px; margin-top: 15px;" @click="submitForm()">
      Add Device
    </el-button>
  </div>

  <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
</template>
  
<script lang="ts" setup >

import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Device>({
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
onMounted(() => {
  console.log('add')
})





const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const addNewRef = ref();
async function submitForm() {
  if (await addNewRef.value.submit()) {

    ElNotification({
      title: 'Thông báo',
      message: 'Thêm thành công',
      type: 'success',
    })
    navigateTo('/')
  }
}

</script>
