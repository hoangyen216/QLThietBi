<template>
    <div class="col4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
        <img :src="item.image" style="width: 90px;" alt="cart-item" title="cart-item">
    </div>
    <div class="col6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <h4>Tên: {{ item.deviceDescr }}</h4>
        <h6>số lượng:{{ item.quantity }} </h6>
    </div>
    <div class="col2 col-xl-2 col-lg-2 col-md-2 col-sm-2 pt-4">
        <el-button type="danger" 
            @click="store.removes(item.deviceID)">
            <Icon name="mingcute:delete-2-line" size="1em" />
        </el-button>
    </div>
</template>

<script setup lang="ts">
// import { Product } from '../types';

const store = useMainStore()

defineProps<{
    item: Purchase
}>()

</script>

<style scoped lang="scss">
.remove-btn {
    border-radius: 50%;
    content: url('../assets/multiply.png');

    :hover {
        background-color: grey;
    }
}
</style>