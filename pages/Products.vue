<template>
    <div>
        <ProductsGrid />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'viewpersonregister'
})
// useHead({
//     link: [{ rel: 'canonical', href: 'https://vue-ecom.vercel.app/products' }],
// });
useHeadSafe({ title: 'Trang Chủ' })
</script>
