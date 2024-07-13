<template>
    <el-card shadow="never" style="min-height: 100vh; position: relative;">
        <client-only>
            <!-- {{ dataPenalty }} -->
            <el-table v-loading="pending" ref="multipleTableRef" :data="dataPenalty" style="width: 100%">
                <el-table-column prop="penaltyId" label="Mã Phiếu Phạt" />
                <el-table-column prop="totalFine" label="Tổng Tiền Phiếu Phạt" />
                <el-table-column width="150" prop="status" label="Trạng Thái" :filters="[
                    { text: 'Chưa Trả', value: 'Chưa Trả' },
                    { text: 'Đã Trả', value: 'Đã Trả' },
                ]" :filter-method="filterTag">
                    <template #default="scope">
                        <el-button size="large" style="padding: 0;" text >
                            <el-tag style="width: 97px;" size="large" :type="showTypeTag(scope.row.status)"
                                disable-transitions>{{
                                    scope.row.status
                                }}</el-tag>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="Tác Vụ" width="170">
                    <template #default="scope">
                        <el-button type="primary" @click="dialogPenalty = true; getDetailPenalty(scope.row.penaltyId)">
                            <Icon name="uil:bill" height="20" width="20" style="color: white" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination style=" bottom: 2px; position: absolute;" v-model:current-page="page"
            v-model:page-size="pageSize" :background=true layout=" prev, pager, next" :total="total" />
    </el-card>

    <el-dialog v-model="dialogPenalty" width="700px">
        <!-- {{ dataPenalty }} -->
        <el-table :data="dataPenaltyDetail" show-summary>
            <!-- <el-table-column prop="registId" label="RegistId" /> -->
            <el-table-column prop="descr" label="Mô tả" />
            <el-table-column prop="fine" label="Số tiền Phạt">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh sách Phiếu Phạt' })
definePageMeta({
    layout: 'viewpersonregister'
})
import { reactive, ref } from 'vue'
const page = ref(1);
const formLabelWidth = '140px'
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const dataPenalty = ref()
const dialogPenalty = ref(false)
const dataPenaltyDetail = ref<Penalty[]>([])


const filterTag = (value: string, row: any) => {
    return row.status === value
}



function showTypeTag(value: string) {
    if (value == 'Đã Trả')
        return 'success';
    if (value == 'Chưa Trả')
        return 'danger';
    else
        return '';
}

const { data, pending } = useFetchApi(`/penalty/getByUserID/${useCookie('userID').value}`, {
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
    dataPenalty.value = newData?.data;
    total.value = newData.itemCount;
})

async function getDetailPenalty(registId: number) {
    const { data } = await useFetchApi(`/penalty/getDetail/${registId}&1`, {
        method: 'GET',
    });
    if (data.value) {
        dataPenaltyDetail.value = data.value as Penalty[]
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