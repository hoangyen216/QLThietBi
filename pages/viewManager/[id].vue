<template>
    <el-card shadow="never">

        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" >
            <el-table-column type="index" label="STT" width="100px" />
            <el-table-column prop="posId" label="posId" />
            <el-table-column prop="positionDescr" label="Position" />
            <el-table-column label="Tác Vụ" width="150">
                <template #default="scope">

                    <el-button type="primary" @click="navigateTo(`/viewManager/${scope.row.warehouseId}`)">
                        Detail
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

        <el-pagination v-model:current-page="page" v-model:page-size="pageSize" 
            :background=true layout=" prev, pager, next" :total="total" style="margin-top: 25px" />
    </el-card>


</template>
<script lang="ts" setup>
const route = useRoute()
route.params.id
useHeadSafe({ title: '' })
import { reactive, ref } from 'vue'
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);


const tableData = ref<Position[]>()


// interface Position {
//     posId: number,
//     position1: string,
//     warehouseId: string,
// }



const { data } = useFetchApi(`warehouse/getPos/${route.params.id}`, {
    method: 'POST',
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
    tableData.value = newData?.data
    total.value = newData.itemCount;

})

if (data.value) {

    console.log("danh sach postition")
    console.log("ds", tableData.value)
}
</script>