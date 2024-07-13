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
    <h3>Danh Sách Thiết Bị</h3>
    <el-card shadow="never" style=" min-height: 100vh; position: relative;">
        <el-space :wrap="true" class="mb-2">

            <NuxtLink to="/devices/add-device" :underline="false">
                <el-button type="primary">
                    <Icon name="mdi:plus" class="mr-2" size="20" />
                    Tạo mới
                </el-button>
            </NuxtLink>

        </el-space>
        <el-space :wrap="true" class="mb-2">


            <el-input style="width: 300px;" v-model="query" @input="searchDevice()" @keyup.enter="searchDevice()"
                clearable placeholder="Tìm Kiếm">
                <template #prefix>
                    <Icon name="material-symbols-light:search" color="gray" width="26" height="26" />
                </template>
            </el-input>


        </el-space>
        <client-only>
            <el-table ref="multipleTableRef" :data="data1" style="width: 100%" @row-dblclick="HandlelDoubclick">
                <el-table-column prop="deviceID" width="150" label="Device Id" />
                <!-- <el-table-column prop="hinhanh" label="Ảnh" align="center">
                    <template #default="scope">
                        <el-image style="height: 50px" :src="scope.row.hinhanh" fit="contain" />
                    </template>
                </el-table-column> -->
                <el-table-column prop="deviceDescr" label="Tên Thiết Bị" />
                <el-table-column prop="deviceShortDescr" label="Tên viết tắt" />
                <el-table-column prop="totalAmount" label="Số Lượng Tổng" />
                <el-table-column prop="currentAmount" label="Số lượng Hiện Có" />
                <!-- <el-table-column prop="nguoiNhapKho" label="Người Nhập Kho" />
                <el-table-column prop="tinhTrang" label="Tình trạng" /> -->
                <el-table-column label="Tác Vụ" width="200">
                    <template #default="scope">

                        <el-button type="primary" @click="navigateTo(`/Item/listItemByDeviceID/${scope.row.deviceID}`)">
                            <Icon name="pajamas:details-block" height="18" width="20" style="color: white" />
                        </el-button>

                        <el-button @click="navigateTo(`/devices/${scope.row.deviceID}`)">
                            <Icon name="bx:edit" />
                        </el-button>
                        <client-only>
                            <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                                @confirm="(_) => deleteDevice(scope.row.deviceID)">
                                <template #reference>
                                    <el-button type="danger">
                                        <Icon name="mingcute:delete-2-line" />

                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </client-only>

                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination style=" margin-top: 25px;bottom: 0px; position: absolute;" @current-change="current_page()"
            v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]" :background=true
            layout=" prev, pager, next" :total="(query == '' ? total : total1)" />

    </el-card>
    <el-dialog draggable v-model="dialogDetailDevice" title="Chi tiết Thiết Bị" width="700">
        <!-- <el-row :gutter="10">
            <el-col :span="12">
                <div class="grid-content ep-bg-purple" />
            </el-col>
            <el-col :span="12">
                <el-descriptions border :column="1">
                    <el-descriptions-item label="Name Item"></el-descriptions-item>
                    <el-descriptions-item label="Thời gian bảo hành">{{ detailPostion?.warrantyPeriod
                        }}</el-descriptions-item>
                    <el-descriptions-item label="Thời gian bảo dưỡng">{{ detailPostion?.maintenanceTime
                        }}</el-descriptions-item>
                    <el-descriptions-item label="Ngày bảo dưỡng gần đây">{{ detailPostion?.lastMaintenance
                        }}</el-descriptions-item>
                    <el-descriptions-item label="Tình trạng">
                        {{ detailPostion?.status }}
                    </el-descriptions-item>
                    
                </el-descriptions>
            </el-col>

        </el-row> -->
        <el-row >
            <el-col :span="12" >

                <el-image style="height: 250px; width: 300px;" :src="dataDetailDevice.image" fit="contain" />
            </el-col>
            <el-col :span="12" style="background-color: bisque">
                <el-space direction="vertical" alignment="left">
                    <el-row>
                        <el-text class="mx-1" tag="b">Tên Thiết Bị: </el-text>
                        <el-text class="mx-1"> {{ dataDetailDevice.deviceDescr }}</el-text>
                    </el-row>
                    <el-row>
                        <el-text class="mx-1" tag="b">Tên viết tắt: </el-text>
                        <el-text class="mx-1"> {{ dataDetailDevice.deviceShortDescr }}</el-text>
                    </el-row>
                    <el-row>
                        <el-text class="mx-1" tag="b">Device ID: </el-text>
                        <el-text class="mx-1"> {{ dataDetailDevice.deviceID }}</el-text>
                    </el-row>
                    <!-- <el-row>
                        <el-text class="mx-1 " tag="b">Warehouse ID: </el-text>
                        <el-text class="mx-1"> {{ dataDetailDevice.warehouseID }}</el-text>
                    </el-row> -->
                </el-space>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script setup lang="ts">
useHeadSafe({ title: 'Danh Sách Thiết Bị' })
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
const dialogDetailDevice = ref(false)
const tableData = ref<Device[]>()
const dataDetailDevice = ref()
const page = ref<number>(1);
const page1 = ref<number>(1);
const pageSize = ref<number>(10);
const pageSize1 = ref<number>(10);
const total = ref(0);
const total1 = ref(0);
const reload = ref(0);
const route = useRoute();
const addNewRef = ref();
const role = useCookie('role').value;
const soLuongTong = ref(0);
const soLuongHT = ref(0);
const soLuongCM = ref(0);

async function getData() {
    const { data, pending } = await useFetchApi('/device/getalldevice', {
        method: 'GET',
        server: false,
        query: {
            page: page,
            pageSize: pageSize,
        },
        watch: false
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
    getData()
})

watch(reload, () => {
    getData()
})




const data1 = computed(() => {
    return query.value == '' ? tableData.value : filterDevice.value
})

async function searchDevice() {

    const { data } = await useFetchApi(`/device/findbyname/${query.value}`, {
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

async function HandlelDoubclick(row: any, column: any, event: Event) {
    // detailPostion.value = row;
    
    const { data } = await useFetchApi(`/device/getbyid/${row.deviceID}`, {
        method: 'GET',
    });
    if (data.value) {
        dataDetailDevice.value = data.value
    }
    dialogDetailDevice.value = true
    console.log(dataDetailDevice.value);

}

async function deleteDevice(id: number) {
    const { status } = await useFetchApi(`device/delete/${id}`, {
        method: 'DELETE',
        server: false,
    })
    if (status.value == 'success') {
        page.value = 1;
        ++reload.value;
    }
}


</script>

<style>
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