<template>
    <h3>Danh sách kho hàng </h3>
    <el-card shadow="never" style=" min-height: 100vh; position: relative;">
        <el-space :wrap="true" class="mb-2">
            <el-button type="primary" @Click="dialogAddWareHouse = true">
                <Icon name="mdi:plus" class="mr-2" size="20" />
                Tạo mới
            </el-button>
        </el-space>
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @row-dblclick="handlerClick">

            <el-table-column type="index" label="STT" width="100px" />
            <el-table-column prop="warehouseId" label="Mã Kho" />
            <el-table-column prop="warehouseDescr" label="Tên Kho" />
            <el-table-column prop="address" label="Địa chỉ kho" />
            <el-table-column label="Tác Vụ" width="170">
                <template #default="scope">

                    <el-button type="primary" @click="getWarehouseById(scope.row.warehouseId)">
                        <Icon name="bx:edit" />
                    </el-button>
                    <client-only>
                        <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                            @confirm="(_) => deleteWareHouse(scope.row.warehouseId)">
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
        <el-pagination style="bottom: 2px; position: absolute;" v-model:current-page="page" v-model:page-size="pageSize"
            :background=true layout=" prev, pager, next" :total="total" />
    </el-card>
    <el-dialog v-model="dialogTableVisible" title="" width="800">
        <div>
            <h3>Danh sách vị trí kho hàng {{ IdKho }}</h3>
            <el-button style=" " type="primary" @Click="dialogAddPos = true">
                <Icon name="mdi:plus" class="mr-2" size="20" />
                Thêm mới vị trí
            </el-button>
        </div>

        <el-card shadow="never" style=" min-height: 100vh; position: relative;">

            <el-table ref="multipleTableRef" :data="dataPosition" style="width: 100%">
                <el-table-column type="index" label="STT" width="100px" />
                <el-table-column prop="posId" label="PosId" />
                <el-table-column prop="positionDescr" label="Position" />
                <el-table-column label="Tác Vụ" width="150">
                    <template #default="scope">
                        <el-button type="primary" @click="getPosById(scope.row.posId)">
                            <Icon name="bx:edit" />
                        </el-button>
                        <client-only>
                            <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                                @confirm="deletePosition(scope.row.posId, scope.row.positionDescr)">
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

            <el-pagination v-model:current-page="pagePos" v-model:page-size="pageSizePos" :background=true
                layout=" prev, pager, next" :total="totalPostition" @current-change="EventCurrentChange"
                style="margin-top: 25px;bottom: 18px; position: absolute;" />
        </el-card>
    </el-dialog>

    <el-dialog v-model="dialogAddPos" :title="updatePos ? 'Cập Nhật Vị Trí' : 'Thêm Mới Vị Trí'" width="500"
        @close="() => { updatePos = false }">
        <el-form>
            <el-form-item label="Nhập vị trí" pro="addPosition">
                <el-input v-model="addPosition" />
                <p v-if="addPosition == ''" style="color: red">Vui lòng nhập vị trí</p>
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogAddPos = false">Hủy Bỏ</el-button>
                <el-button type="primary" @click="onSubmit()">
                    <span v-if="updatePos == false">Thêm mới</span>
                    <span v-if="updatePos == true">Cập nhật</span>
                </el-button>
            </div>
        </template>

    </el-dialog>

    <el-dialog v-model="dialogAddWareHouse" :title="updateWarehouse ? 'Cập Nhật Kho Hàng' : 'Thêm Mới Kho Hàng'"
        width="500" @close="() => { updateWarehouse = false }">
        <el-form label-width="75">
            <el-form-item label="Tên kho" pro="addPosition">
                <el-input v-model="formAddWareHouse.warehouseDescr" />
                <p v-if="formAddWareHouse.warehouseDescr == ''" style="color: red">Vui lòng nhập tên kho</p>
            </el-form-item>
            <el-form-item label="Địa chỉ" pro="addPosition">
                <el-input v-model="formAddWareHouse.address" />
                <p v-if="formAddWareHouse.address == ''" style="color: red">Vui lòng nhập địa chỉ</p>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogAddPos = false">Hủy Bỏ</el-button>
                <el-button type="primary" @click="onSubmitAddWareHouse()">
                    <span v-if="updateWarehouse == false">Thêm mới</span>
                    <span v-if="updateWarehouse == true">Cập nhật</span>
                </el-button>
            </div>
        </template>

    </el-dialog>

</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh Sách Kho Hàng' })
import { reactive, ref } from 'vue'

// const WareHouseReactive = reactive({
//     page: 1,
//     pageSize: 10,
//     total: 0,
//     reload: 0,
//     updateWarehouse: false,

// })
const page = ref(1);
const pageSize = ref(10);
const pagePos = ref(1);
const pageSizePos = ref(10);
const total = ref(0);
const reload = ref(0);
const reloadPos = ref(0);
const totalPostition = ref(0);
const dialogTableVisible = ref(false)
const dialogAddPos = ref(false)
const updateWarehouse = ref(false)
const updatePos = ref(false)
const dialogAddWareHouse = ref(false)
const IdKho = ref('');
const tableData = ref<WareHouse[]>()
const dataPosition = ref<Position[]>()
const addPosition = ref("")



const formAddWareHouse = reactive({
    warehouseId: 0,
    address: '',
    warehouseDescr: ''
})

const { data } = useFetchApi('warehouse/getall', {
    method: 'GET',
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


//Lay danh sach vị tri kho hang theo mã kho
function handlerClick(row: any, column: any, event: any) {
    dialogTableVisible.value = true
    IdKho.value = row.warehouseId
    const { data } =  useFetchApi(`warehouse/getPos/${row.warehouseId}`, {
        method: 'POST',
        query: {
            page: pagePos,
            pageSize: pageSizePos,
        },
        watch: [
            // pagePos,
            // pageSizePos,
            reloadPos
        ]
    });
    watch(data, (x) => {
        if (!x)
            return

        const newData = x as { itemCount: number, data: any };
        dataPosition.value = newData?.data
        totalPostition.value = newData.itemCount;
    })
}

function EventCurrentChange(value: number){
    // alert(value)
}


//Them moi vi tri
async function onSubmit() {
    if (addPosition.value == '')
        return;
    const { data, status, error } = await useFetchApi(`warehouse/createPos/${IdKho.value}&${addPosition.value}`, {
        method: 'POST',
    });

    dialogAddPos.value = false
    if (status.value == 'success') {
        ElNotification({
            title: 'Thêm Thành Công',
            type: 'success',
        })
    } else if (status.value == 'error' && error.value) {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }
}

async function onSubmitAddWareHouse() {
    if (formAddWareHouse.address == '' || formAddWareHouse.warehouseDescr == '')
        return;
    if (updateWarehouse.value == true) {
        const { status, error } = await useFetchApi('warehouse/update/', {
            method: 'POST',
            body: {
                address: formAddWareHouse.address,
                warehouseDescr: formAddWareHouse.warehouseDescr,
                warehouseId: formAddWareHouse.warehouseId
            },
        });
        dialogAddWareHouse.value = false

        if (status.value == 'success') {
            ++reload.value;
        } else if (status.value == 'error') {
            ElNotification({
                title: 'Error',
                message: error.value?.data.error,
                type: 'error',
            })
        }
    } else {
        const { status, error } = await useFetchApi('warehouse/create/', {
            method: 'POST',
            body: {
                address: formAddWareHouse.address,
                warehouseDescr: formAddWareHouse.warehouseDescr,
            },
        });
        dialogAddWareHouse.value = false
        if (status.value == 'success') {
            ++reload.value;
        } else if (status.value == 'error') {
            ElNotification({
                title: 'Error',
                message: error.value?.data.error,
                type: 'error',
            })
        }
    }
}

async function deleteWareHouse(id: number) {
    const { status, error } = await useFetchApi(`/warehouse/delete/${id}`, {
        method: 'DELETE',
    })
    if (status.value == 'success') {
        ++reload.value;
    } else if (status.value == 'error') {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }
}

async function getWarehouseById(id: number) {
    dialogAddWareHouse.value = true
    updateWarehouse.value = true
    const { data } = await useFetchApi(`/warehouse/getbyid/${id}`, {
        method: 'GET',
    });
    formAddWareHouse.address = (data.value as { address: string }).address;
    formAddWareHouse.warehouseDescr = (data.value as { warehouseDescr: string }).warehouseDescr;
    formAddWareHouse.warehouseId = (data.value as { warehouseId: number }).warehouseId;
}

async function deletePosition(id: number, descr: string) {

    const { status, error } = await useFetchApi('/warehouse/deletePos/', {
        method: 'DELETE',
        body: {
            posId: id,
            warehouseId: IdKho.value,
            positionDescr: descr
        }
    })
    if (status.value == 'success') {
        ++reloadPos.value;
    } else if (status.value == 'error') {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }
}

async function getPosById(id: number) {
    dialogAddPos.value = true
    updatePos.value = true
    const { data } = await useFetchApi(`/warehouse/getPos/${id}`, {
        method: 'GET',
    });
    addPosition.value = (data.value as { positionDescr: string }).positionDescr;
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
