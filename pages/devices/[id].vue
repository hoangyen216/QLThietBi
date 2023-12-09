<template>
  <div class="container text-center">
    <el-text tag="b" style="font-size: x-large;">Edit Device </el-text>
    <CreateDevice ref="configure" :edit="true"  />
    <el-button type="primary" style=" margin-top: 15px;" @click="updateForm()">
      Update
    </el-button>
  </div>

  <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
</template>
<script lang="ts" setup >
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const configure = ref();
async function updateForm() {
  if (await configure.value.submit()) {
    ElNotification({
      title: 'Thông báo',
      message: 'Cập nhật thành công',
      type: 'success',
    })
    navigateTo('/')
  }
}


</script>
