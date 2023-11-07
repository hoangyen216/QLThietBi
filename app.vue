<template>
  <el-config-provider :locale="vi">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
<script setup lang="ts">
import vi from 'element-plus/dist/locale/vi.mjs'
</script>
