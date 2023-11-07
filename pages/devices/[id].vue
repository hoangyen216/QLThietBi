<template>
  <el-text tag="b" style="font-size: x-large; margin-left: 300px; ">Edit Device </el-text>
  <CreateDevice  ref="configure" :edit="true" style="margin-top: 30px"/>
  <el-button type="primary" style=" margin-left: 150px; margin-top: 15px;" @click="updateForm()">
    Update
  </el-button>
    <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->

</template>
<script lang="ts" setup >
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'


const route = useRoute();
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<Device>()

// const updateForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   await formEl.validate(async (valid, fields) => {
//     if (valid) {
//       const { data, error, status } = await useFetchApi(`/devices/${route.params.id}`, {
//         method: 'PUT',
//         body: ruleForm
//       })
//       if (status.value == 'success') {
//         console.log('submit!')
//       }
//       else if (error.value) {
//         console.error(error.value)
//         ElNotification({
//           title: 'Error',
//           message: error.value.data,
//           type: 'error',
//         })
//       }
//     } else {
//       console.log('error submit!', fields)
//     }
//   })
// }
const configure = ref();
async function updateForm() {
    if (await configure.value.submit()) {
        ElNotification({
            title: 'Thông báo',
            message: 'Cập nhật thành công',
            type: 'success',
        })
    }
}

// const { data, pending, error } = await useFetchApi<Device>(`/devices/${route.params.id}`, {
//   method: 'GET',
//   headers: { 'Content-Type': 'application/json' },
// })
// if (data.value) {
//   ruleForm.value = data.value
// }
// else if (error.value) {

// }

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
