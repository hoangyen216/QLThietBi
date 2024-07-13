
import { NuxtLink } from '#build/components';
<template>
  <NuxtLink to="/Products">
  <span class="navbar-brand py-0 pl-5">
    <img src="~/assets/fi-logo.svg" width="40" height="40" alt="site-logo" title="site-logo">
  </span>
</NuxtLink>
</template>

<style>
@media only screen and (max-width: 768px) {
  .navbar-brand {
    margin-left: 50px;
  }
}
</style>