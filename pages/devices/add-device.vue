<template>
  <div  class="container text-center">
    <el-text tag="b" style="font-size: x-large;">Thêm Thiết Bị </el-text>
    <CreateDevice ref="addNewRef" style="margin-top: 30px" />
    <el-button type="primary" size="large" style=" margin-left: 150px; margin-top: 15px;" @click="submitForm()">
      Thêm Mới
    </el-button>
  </div>

  <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
</template>
  
<script lang="ts" setup >

import {  ref } from 'vue'
useHeadSafe({ title: 'Thêm Thiết Bị' })


const addNewRef = ref();
async function submitForm() {
  if (await addNewRef.value.submit()) {

    ElNotification({
      title: 'Thông báo',
      message: 'Thêm thành công',
      type: 'success',
    })
    navigateTo('/devices/listDevice')
  }
}

</script>
