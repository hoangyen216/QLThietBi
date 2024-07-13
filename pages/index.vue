<template>

    <div class="display-total" v-if="role?.includes('Manager')">

        <el-card shadow="never" class="card">
            <el-row justify="center">
                <el-col :span="10">
                    <Icon class="icon-total" name="tabler:chart-pie-filled" color="#009cff" />

                </el-col>
                <el-col :span="12">

                    <el-text tag="b" type="info">Tổng số thiết bị</el-text><br />
                    <el-text tag="b">{{ soLuongTong }}</el-text>

                </el-col>
            </el-row>
        </el-card>


        <el-card shadow="never" class="card">

            <el-row justify="center">
                <el-col :span="10">
                    <Icon name="ion:bar-chart" color="#009cff" class="icon-total" />

                </el-col>
                <el-col :span="12">

                    <el-text tag="b" type="info">Số lượng hiện tại trong kho</el-text><br />
                    <el-text tag="b">{{ soLuongHT }}</el-text>

                </el-col>
            </el-row>
        </el-card>


        <el-card shadow="never" class="card">

            <el-row justify="center">
                <el-col :span="10">
                    <Icon name="ooui:chart" color="#009cff" class="icon-total" />

                </el-col>
                <el-col :span="12">

                    <el-text tag="b" type="info">Số lượng thiết bị đang cho mượn</el-text><br />
                    <el-text tag="b">{{ soLuongCM }}</el-text>

                </el-col>
            </el-row>
        </el-card>


    </div>

    <h3>Danh Sách Thiết Bị Theo Kho</h3>
    <el-card shadow="never" style=" min-height: 100vh; position: relative;">
        <el-space :wrap="true" class="mb-2" style="position: absolute; right: 10px; top: 18px;">
            <NuxtLink to="/devices/add-device" :underline="false">
                <el-button type="primary">
                    <!-- v-if="role?.includes('Manager')" -->
                    <Icon name="mdi:plus" class="mr-2" size="20" />
                    Tạo mới
                </el-button>
            </NuxtLink>
        </el-space>

        <!-- <el-select v-model="value" filterable placeholder="Lọc theo loại" style="width: 150px; margin-right: 5px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->

       <div style="display: flex;">
        <el-select clearable v-model="selectWarehouse" filterable placeholder="Lọc theo kho"
            style="width: 150px; margin-right: 5px;">
            <el-option v-for="item in dataWareHouse" :key="item.warehouseId" :label="item.warehouseDescr"
                :value="item.warehouseId" />
        </el-select>
        <!-- <el-autocomplete v-model="state2" :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable
                class="inline-input w-50" placeholder="Please Input" @select="handleSelect" /> -->
        <div style="width: 300px;">
            <el-input v-model="query" @input="searchDevice()" @keyup.enter="searchDevice()" clearable
                placeholder="Tìm Kiếm">
                <template #prefix>
                    <Icon name="material-symbols-light:search" color="gray" width="26" height="26" />
                </template>
            </el-input>
        </div>
       </div>
        <client-only>
            <el-table ref="multipleTableRef" :data="data1" style="width: 100%"
                @selection-change="handleSelectionChange">
               
                <!-- <el-table-column prop="id" width="50" label="Id" /> -->
                <!-- <el-table-column prop="image" label="Ảnh" align="center">
                    <template #default="scope">
                        <el-image style="height: 50px" :src="scope.row.image" fit="contain" />
                    </template>
                </el-table-column> -->
                <el-table-column prop="warehouseDescr" label="Tên Kho" />
                <el-table-column prop="deviceDescr" label="Tên Thiết Bị" />
                <el-table-column prop="totalAmount" label="Số Lượng Tổng" />
                <el-table-column prop="currentAmount" label="Số Lượng Hiện Có" />
                <el-table-column label="Tác Vụ" width="100">
                    <!-- v-if="role?.includes('Manager')" -->
                    <template #default="scope">
                        <el-button type="primary" @click="navigateTo(`/Item/listItemByDeviceID/${scope.row.deviceID}`)">
                            <Icon name="pajamas:details-block" height="18" width="20" style="color: white" />        
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination style=" bottom: 2px; position: absolute;" @current-change="current_page()"
            v-model:current-page="page" v-model:page-size="pageSize"  :background=true
            layout=" prev, pager, next" :total="(query == '' ? total : total1)" />

    </el-card>
</template>

<script setup lang="ts">
useHeadSafe({ title: 'Danh Sách Thiết Bị Theo Kho' })
import { ref } from 'vue'


function current_page() {
    if (query.value == '') {
        getData()
    } else {
        searchDevice()
    }
}


const filterDevice = ref<Device[]>()
const query = ref("")
const tableData = ref<Device[]>()
const multipleSelection = ref<Device[]>([])
const page = ref<number>(1);
const page1 = ref<number>(1);
const pageSize = ref<number>(10);
const pageSize1 = ref<number>(10);
const total = ref(0);
const total1 = ref(0);
const reload = ref(0);
const route = useRoute();
const dataWareHouse = ref();
const role = useCookie('role').value;
const soLuongTong = ref(0);
const soLuongHT = ref(0);
const soLuongCM = ref(0);
const selectWarehouse = ref('');
// console.log("in",role?.includes('Manager'));


async function getData() {

    const { data, pending } = await useFetchApi(`device/getall/${selectWarehouse.value == "" ? 1 : selectWarehouse.value}`, {
        method: 'GET',
        server: false,
        query: {
            page: page,
            pageSize: pageSize,
        },

    });
    if (data.value) {
        const newData = data.value as { itemCount: number, data: any, soLuongCM: number, soLuongTong: number, soLuongHT: number };
        tableData.value = newData?.data as Device[];
        total.value = newData.itemCount;
        soLuongCM.value = newData.soLuongCM;
        soLuongHT.value = newData.soLuongHT
        soLuongTong.value = newData.soLuongTong;
    }
}

onMounted(() => {
    getData();
    getWareHouse()
})



watch([reload, selectWarehouse], () => {
    getData()
})

const data1 = computed(() => {
    return query.value == '' ? tableData.value : filterDevice.value
})

async function searchDevice() {

    const { data } = await useFetchApi(`/device/getbyname/${query.value}&${selectWarehouse.value}`, {
        method: 'GET',
        server: false,
        query: {
            page: page,
            pageSize: pageSize,
        },
        watch: false

    });

    if (data.value) {
        const newData = data.value as { itemCount: number, data: any };
        filterDevice.value = newData?.data as Device[];
        console.log("filter", filterDevice.value);
        total1.value = newData.itemCount;
    }
}

function handleSelectionChange(val: Device[]) {
    multipleSelection.value = val
}


async function getWareHouse() {
    const { data } = await useFetchApi('warehouse/getall', {
        method: 'GET',
        query: {
            page: 1,
            pageSize: 100,
        },

    });
    if (data.value) {
        dataWareHouse.value = (data.value as { data: any }).data;
    }

}





</script>

<style scoped>
.icon-total {
    width: 60px;
    height: 60px;
}

@media (min-width: 768px) {
    .display-total {
        display: flex;

    }

    .card {
        width: 33.33%;
        border-radius: 7px;

    }
}

.card {
    height: 115px;
}

.display-total {

    gap: 2%;
    margin-bottom: 2%;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.mx-1 {
    margin-right: 4px;
}
</style>