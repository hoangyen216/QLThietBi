<template>
    <div class="m-4">
        <p>Child options expand when hovered</p>
        <el-cascader :show-all-levels="false" :props="props" v-model="value" :options="options" clearable @change="handleChange" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = { multiple: true }
const value = ref([])
const options = ref(cascaderConverter(raw.value[0]))

interface Device {
    deviceID:number;
    deviceDescr:string;
    listItemID: number[];
}

interface Warehouse {
    listDevice: Device[]
}


function cascaderConverter(data : Warehouse) {
    const listDevice = data.listDevice;
    return listDevice.map(e=>({
        value: e.deviceID,
        label: e.deviceDescr,
        children: e.listItemID.map(x=>({
            value: x,
            label: x,
        }))
    }))
}

// const props = {
//     expandTrigger: 'hover' as const,
// }

const handleChange = (value) => {
    console.log(value)
}

</script>