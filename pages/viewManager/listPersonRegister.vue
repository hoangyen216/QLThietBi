<template>
  <el-card shadow="never">
    <el-space :wrap="true" class="mb-2">
      <NuxtLink to="/personRegister/register-device" :underline="false">
        <el-button type="primary">
          <Icon name="mdi:plus" class="mr-2" size="20" />
          Đăng ký mượn thiết bị
        </el-button>
      </NuxtLink>
    </el-space>
    <client-only>
      <el-table v-loading="pending" ref="multipleTableRef" :data="tableData" style="width: 100%">
        <el-table-column prop="nguoiMuon" label="Người mượn" />
        <el-table-column prop="ten" label="Tên Thiết Bị" />
        <el-table-column prop="soLuong" label="Số Lượng" />
        <el-table-column prop="trangThai" label="Trạng Thái" />
        <el-table-column prop="ngayMuon" label="Ngày Mượn" />
        <el-table-column prop="ngayTra" label="Ngày Trả" />
      </el-table>
    </client-only>
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const tableData = ref<{
  nguoiMuon: string,
  ten: string,
  soLuong: number,
  hinhanh: string,
  ngayMuon: string,
  ngayTra: string,
  trangThai: string,
}>();

const { data, pending } = useFetch(
  "https://65183f73582f58d62d358659.mockapi.io/showMain/",
  {
    method: "GET",
  }
);
if (data.value) {
  tableData.value = data.value;
}
</script>
