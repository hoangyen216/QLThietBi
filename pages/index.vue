<template>
    <el-card shadow="never">
        <el-space :wrap="true" class="mb-2">

            <NuxtLink to="/devices/add-device" :underline="false">
                <el-button v-if="role?.includes('Manager')" type="primary">
                    <Icon name="mdi:plus" class="mr-2" size="20" />
                    Tạo mới
                </el-button>
            </NuxtLink>

        </el-space>
        <el-space :wrap="true" class="mb-2">

            <!-- <el-autocomplete v-model="state2" :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable
                class="inline-input w-50" placeholder="Please Input" @select="handleSelect" /> -->
            <el-input v-model="query" @input="searchDevice()" @keyup.enter="searchDevice()" clearable
                placeholder="Tìm Kiếm">
                <template #prefix>
                    <Icon name="material-symbols-light:search" color="gray" width="26" height="26" />
                </template>
            </el-input>


        </el-space>
        <client-only>
            <el-table  ref="multipleTableRef" :data="data1" style="width: 100%" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column type="expand">
                    <template #default="props">
                        <el-row style="margin-top: 20px; margin-bottom: 20px;">
                            <el-col :span="6" style="background-color: white">
                                <el-space direction="vertical" alignment="center" style="width: 100%;">
                                    <el-image style="height: 100px" :src="props.row.hinhanh" fit="contain" />
                                    <el-text class="mx-1" style="font-size: x-large" tag="b">{{ props.row.ten }}</el-text>
                                </el-space>
                            </el-col>
                            <el-col :span="10" style="background-color: white">
                                <el-space direction="vertical" alignment="left">
                                    <el-row>
                                        <el-text class="mx-1" tag="b">Tên viết tắt: </el-text>
                                        <el-text class="mx-1"> {{ props.row.tenVietTat }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Thời gian nhập kho: </el-text>
                                        <el-text class="mx-1"> {{ datetimeFormat(props.row.tgnhapKho) }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Thời gian bảo dưỡng: </el-text>
                                        <el-text class="mx-1"> {{ datetimeFormat(props.row.tgbaoDuong) }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1" tag="b">Tình trạng: </el-text>
                                        <el-text class="mx-1"> {{ props.row.tinhTrang }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Mô tả Chức năng: </el-text>
                                        <el-text class="mx-1"> {{ props.row.moTaChucNang }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Hướng dẫn sử dụng: </el-text>
                                        <el-text class="mx-1"> {{ props.row.huongDanSuDung }}</el-text>
                                    </el-row>

                                </el-space>
                            </el-col>
                            <el-col :span="8" style="background-color: white">
                                <el-space direction="vertical" alignment="left">
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Số lượng: </el-text>
                                        <el-text class="mx-1"> {{ props.row.soLuong }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Thời gian bảo hành: </el-text>
                                        <el-text class="mx-1"> {{ datetimeFormat(props.row.tgbaoHanh) }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Người nhập kho: </el-text>
                                        <el-text class="mx-1"> {{ props.row.nguoiNhapKho }}</el-text>
                                    </el-row>
                                </el-space>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="id" width="50" label="Id" /> -->
                <el-table-column prop="hinhanh" label="Ảnh" align="center">
                    <template #default="scope">
                        <el-image style="height: 50px" :src="scope.row.hinhanh" fit="contain" />
                    </template>
                </el-table-column>
                <el-table-column prop="ten" label="Tên Thiết Bị" />
                <el-table-column prop="soLuong" label="Số Lượng" />
                <el-table-column prop="nguoiNhapKho" label="Người Nhập Kho" />
                <el-table-column prop="tinhTrang" label="Tình trạng" />
                <el-table-column v-if="role?.includes('Manager')" width="150">
                    <template #default="scope">

                        <el-button  @click="navigateTo(`/devices/${scope.row.maTb}`)">
                            <Icon name="bx:edit" />
                        </el-button>
                        <client-only>
                            <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                                @confirm="(_) => deleteDevice(scope.row.maTb)">
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
        <el-pagination @current-change="current_page()" v-model:current-page="page" v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30]" :background=true layout="sizes, prev, pager, next"
            :total="(query == '' ? total : total1)" style="margin-top: 25px" />

    </el-card>
</template>

<script setup lang="ts">
useHeadSafe({ title: 'Danh Sách Thiết Bị' })
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}

function current_page() {
    if (query.value == '') {
        getData()
    } else {
        searchDevice()
    }
}



// console.log("currenpage", p);


const filterDevice = ref<Device[]>()
const query = ref("")
const tableData = ref<Device[]>()
const multipleSelection = ref<Device[]>([])
const dialogVisible = ref(false)

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

// console.log("in",role?.includes('Manager'));


async function getData() {
    const { data, pending } = await useFetchApi('demo/getall', {
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
        tableData.value = newData?.data as Device[];
        total.value = newData.itemCount;
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

    const { data } = await useFetchApi(`demo/findbyname/${query.value}`, {
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

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Bạn có chắc muốn thoát không?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

async function deleteDevice(id: number) {
    const { status } = await useFetchApi(`demo/delete/${id}`, {
        method: 'DELETE',
        server: false,
    })
    if (status.value == 'success') {
        page.value = 1;
        ++reload.value;
    }
}

async function submit() {
    if (await addNewRef.value.submit()) {
        dialogVisible.value = false;
        ++reload.value;
    }
}

</script>

<style>
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