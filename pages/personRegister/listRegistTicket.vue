<template>
    <el-card shadow="never" style="min-height: 100vh; position: relative;">
        <el-space :wrap="true" class="mb-2">
        </el-space>
        <client-only>
            <el-table v-loading="pending" ref="multipleTableRef" :data="tableData" style="width: 100%">
                <el-table-column prop="registId" label="Mã PDK" />
                <el-table-column prop=" borrowDate" label="Ngày Mượn">
                    <template #default="scope">
                        <el-text class="mx-1">{{ datetimeFormat(scope.row.borrowDate) }} - {{
                            datetimeFormat(scope.row.returnDate)
                            }} </el-text>
                    </template>
                </el-table-column>

                <el-table-column prop="registDate" label="Thời Gian Ghi Nhận">
                    <template #default="scope">
                        <el-text class="mx-1">{{ datetimeFormat1(scope.row.registDate) }} </el-text>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="ghiChu" label="Ghi Chú" /> -->
                <el-table-column width="150" prop="status" label="Trạng Thái" :filters="[
                    { text: 'Chờ Duyệt', value: 'Chờ Duyệt' },
                    { text: 'Duyệt', value: 'Duyệt' },
                    { text: 'Không Duyệt', value: 'Không Duyệt' },
                    { text: 'Đã Mượn', value: 'Đã Mượn' },
                    { text: 'Đã Trả', value: 'Đã Trả' },
                ]" :filter-method="filterTag">
                    <template #default="scope">
                        <el-tag style="width: 97px;" size="large" :type="showTypeTag(scope.row.status)"
                            disable-transitions>{{
                                scope.row.status
                            }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Tác Vụ" width="170">
                    <template #default="scope">
                        <el-button type="primary" @click="detailRegist(scope.row.registId); dialogRegistDetail = true">
                            <Icon name="pajamas:details-block" height="18" width="20" style="color: white" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination style=" bottom: 2px; position: absolute;" v-model:current-page="page"
            v-model:page-size="pageSize" :background=true layout=" prev, pager, next" :total="total" />
        <el-dialog v-model="dialogRegistDetail" title="Chi Tiết Phiếu Đăng ký ">
            <h4 style="text-align: center;">Chi tiết phiếu đăng ký </h4>
            <!-- {{  listDetailsArray}} -->
            <el-table :data="listDetailsArray">
                <el-table-column prop="deviceId" label="DeviceId" />
                <el-table-column prop="borrowQuantity" label="BorrowQuantity" />
                <el-table-column prop="confirmQuantity" label="ConfirmQuantity" />
            </el-table>    
        </el-dialog>
    </el-card>
</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh sách Phiếu Đăng Ký' })
definePageMeta({
    layout: 'viewpersonregister'
})
import { reactive, ref } from 'vue'


const dialogFormVisible = ref(false)
const dialogTableVisible = ref(false)
const dialogRegistDetail = ref(false)
const formLabelWidth = '140px'
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const dialogModel = ref<PDK>()
const user = useCookie('account')
const tableData = ref();
const detailRegistData = ref<ListDetail[]>()
const listDetailsArray = ref()

const filterTag = (value: string, row: PDK) => {
    return row.status === value
}
function showTypeTag(value: string) {
    if (value == 'Duyệt')
        return 'success';
    if (value == 'Không Duyệt')
        return 'danger';
    else
        return '';
}

const { data, pending } = useFetchApi(`/regist/getbyuser/${useCookie('userID').value}`, {
    method: 'GET',
    server: false,
    query: {
        page: page,
        pageSize: pageSize,
    },
    watch: [
        page,
        pageSize,
        reload,
    ]
});
watch(data, (x) => {
    if (!x)
        return
    const newData = x as { itemCount: number, data: any };
    tableData.value = newData?.data;
    total.value = newData.itemCount;
})
function listDeviceRegist(data: BorrowRecord[]) {
    const details: ListDetail[] = []
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        details.push(...element.listDetails);
    }
    return details
}
function listDeviceRegistDemo(data: BorrowRecord[]) {
    const details: DeviceRegistration[] = data.map(item => item.deviceRegist);
    return details;
}
async function detailRegist(registId: number) {
    const { data } = await useFetchApi(`/regist/listDeviceRegist/${registId}`, {
        method: 'GET',
    });
    if (data.value) {
        detailRegistData.value = listDeviceRegist(data.value as BorrowRecord[])
        // listDetailsArray.value = (data.value as BorrowRecord[])[0]
        listDetailsArray.value = listDeviceRegistDemo(data.value as BorrowRecord[])
        // console.log(demo);
    }
}

</script>

<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>