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
                        <el-button type="primary" @click="detailRegist(scope.row.registId); dialogTableVisible = true">
                            <Icon name="pajamas:details-block" height="18" width="20" style="color: white" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination style=" bottom: 2px; position: absolute;" v-model:current-page="page"
            v-model:page-size="pageSize" :background=true layout=" prev, pager, next" :total="total" />
    </el-card>
</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh sách Phiếu Đăng Ký' })
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const dialogTableVisible = ref(false)
const formLabelWidth = '140px'
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const dialogModel = ref<PDK>()
const user = useCookie('account')
const tableData = ref<PDK[]>();


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

const { data, pending } = useFetchApi(`/regist/getbyuser/${useCookie('userID')}`, {
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

async function detailRegist(registId: number) {
    const { data } = await useFetchApi(`/regist/`, {
        method: 'GET',
    });
    if (data.value) {

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