<template>
    <el-space wrap>
        <el-card v-for="device in listDevice" class="box-card" style="width: 250px; position: relative;">
            <img :src="device.image" style="width: 100%" fit="contain"/>
            <!-- //Ten TB    -->
            <h4>{{ device.ten }}</h4>
            <p>Số lượng: {{ device.soluong }}</p>
            <el-button round type="primary" style="position: absolute; right: 5px; bottom: 6px;">
                Thêm vào giỏ
            </el-button>
        </el-card>
    </el-space>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'viewpersonregister'
})
const listDevice = ref<Devices[]>()

interface Devices {
    ten: string,
    soluong: number,
    image: string
}

const { data } = await useFetchApi('https://65183f73582f58d62d358659.mockapi.io/Device', {
    method: 'GET',
});
if (data.value) {
    listDevice.value = data.value as Devices[]
}

</script>