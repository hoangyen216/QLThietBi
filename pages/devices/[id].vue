<template>
  <div class="container text-center">
    <el-text tag="b" style="font-size: x-large;">Cập Nhật Thiết Bị </el-text>
    <CreateDevice ref="configure" :edit="true" />
    <el-button type="primary" style=" margin-top: 15px;" @click="updateForm()">
      Cập Nhật
    </el-button>
  </div>

  <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
</template>
<script lang="ts" setup >
import { reactive, ref } from 'vue'
useHeadSafe({ title: 'Chỉnh Sửa Thông Tin Thiết Bị' })

const configure = ref();
async function updateForm() {
  if (await configure.value.submit()) {
    ElNotification({
      title: 'Thông báo',
      message: 'Cập nhật thành công',
      type: 'success',
    })
    navigateTo('/devices/listDevice')
  }
}


</script>
