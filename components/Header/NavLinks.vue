<template>
  <div class="navbar-item bc d-none d-xl-block d-lg-block py-0">
    <NuxtLink :to="link.Link" v-for="(link, idx) in navLinks" :id="idx">{{ link.name }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">

const navLinks = [
  {
    name: 'Trang Chủ',
    Link: '/Products'
  },
  {
    name: 'Phiếu Đăng Ký',
    Link: '/personRegister/listRegistTicket'
  },
  {
    name: 'Phiếu Phạt',
    Link: '/personRegister/listPenaltyTicket'
  }
];
</script>