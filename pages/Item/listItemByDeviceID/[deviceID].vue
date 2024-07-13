<template>
    <h3>Danh sách Item theo mã Thiết Bị {{ route.params.deviceID }} </h3>
    <el-space :wrap="true" class="mb-2">
        <el-button type="primary" @Click="dialogAddItem = true; getWareHouse()">
            <Icon name="mdi:plus" class="mr-2" size="20" />
            Tạo mới
        </el-button>
    </el-space>
    <el-card shadow="never" style="min-height: 100vh;position: relative;">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @row-dblclick="HandlelDoubclick">
            <el-table-column prop="itemId" label="Item ID" />
            <el-table-column prop="deviceId" label="Device ID" />
            <el-table-column prop="importDate" label="Ngày Nhập Kho">
                <template #default="scope">
                    {{ datetimeFormat(scope.row.importDate) }}
                </template>
            </el-table-column>
            <el-table-column prop="warrantyPeriod" label="Thời gian bảo hành">

            </el-table-column>
            <el-table-column label="Tác Vụ" width="150px">
                <template #default="scope">
                    <el-button type="primary" plain @click=" updateItem(scope.row.itemId);">
                        <Icon name="bx:edit" />
                    </el-button>
                    <client-only>
                        <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                            @confirm="(_) => deleteItem(scope.row.itemId)">
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

        <el-pagination style=" bottom: 2px; position: absolute;" v-model:current-page="page"
            v-model:page-size="pageSize" :background=true layout=" prev, pager, next" :total="total" />
    </el-card>
    <el-dialog v-model="dialogAddItem" :title="updateItemBoolean ? 'Cập Nhật Item' : 'Thêm Mới Item'" width="500"
        draggable @close="() => { updateItemBoolean = false; labelPos = false }">
        <el-form label-width="200" :rules="rules" ref="ruleFormRef" :model="formAddItem" class="demo-ruleForm">
            <!-- <el-form-item label="Người Nhập Kho:" prop="importer">
                <el-input v-model="formAddItem.importer" />
            </el-form-item> -->
            <el-form-item label="Chọn nhà kho">
                <el-select v-model="selectWarehouse" filterable placeholder="Chọn kho"
                    @change="getPositionByWarehouseId()">
                    <el-option v-for="item in dataWareHouse" :key="item.warehouseId" :label="item.warehouseDescr"
                        :value="item.warehouseId" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="labelPos" label="Chọn vị trí">
                <el-select v-model="formAddItem.posId" filterable placeholder="Chọn vị trí">
                    <el-option v-for="item in dataPosition" :key="item.posId" :label="item.positionDescr"
                        :value="item.posId" />
                </el-select>
            </el-form-item>
            <el-form-item label="Thời gian bảo hành(Tháng):" prop="warrantyPeriod">
                <el-input-number v-model="formAddItem.warrantyPeriod" :min="1" :max="12" />
            </el-form-item>
            <el-form-item label="Thời gian bảo dưỡng(Tháng)" prop="maintenanceTime">
                <el-input-number v-model="formAddItem.maintenanceTime" :min="1" :max="12" />
            </el-form-item>
            <el-form-item label="Ngày bảo dưỡng gần đây:" prop="lastMaintenance">
                <el-date-picker v-model="formAddItem.lastMaintenance" value-format="YYYY-MM-DD" type="date"
                    placeholder="Chọn ngày" format="DD-MM-YYYY" style="width: 100%" />
            </el-form-item>
            <el-form-item label="Tình trạng:" pro="status">
                <el-input v-model="formAddItem.status" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitAddItem(ruleFormRef)">
                    <span v-if="updateItemBoolean == false">Thêm mới</span>
                    <span v-if="updateItemBoolean == true">Cập nhật</span>
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog draggable v-model="dialogDetailItem" title="Chi tiết Item" width="700">
        <el-descriptions border :column="2">
            <el-descriptions-item label="Name Item"></el-descriptions-item>
            <el-descriptions-item label="Thời gian bảo hành">{{ detailPostion?.warrantyPeriod }}</el-descriptions-item>
            <el-descriptions-item label="Thời gian bảo dưỡng">{{ detailPostion?.maintenanceTime
                }}</el-descriptions-item>
            <el-descriptions-item label="Ngày bảo dưỡng gần đây">{{ detailPostion?.lastMaintenance
                }}</el-descriptions-item>
            <el-descriptions-item label="Tình trạng">
                {{ detailPostion?.status }}
            </el-descriptions-item>
            <el-descriptions-item label="Người nhập kho">{{ detailPostion?.importer }}</el-descriptions-item>
            <el-descriptions-item label="Device ID">{{ detailPostion?.deviceId }}</el-descriptions-item>
            <el-descriptions-item label="Position ID">{{ detailPostion?.posId }}</el-descriptions-item>
        </el-descriptions>
    </el-dialog>

</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh sách Item theo mã Thiết Bị' })
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const dialogAddItem = ref(false);
const dialogDetailItem = ref(false);
const updateItemBoolean = ref(false);
const labelPos = ref(false);
const tableData = ref<Item[]>()
const ruleFormRef = ref<FormInstance>()
const route = useRoute()
const dataWareHouse = ref();
const dataPosition = ref();
const selectWarehouse = ref('');
const detailPostion = ref();

const formAddItem = ref({
    deviceId: 0,
    // itemId: 0,
    // importDate: '',
    warrantyPeriod: 0,
    maintenanceTime: 0,
    lastMaintenance: '',
    status: '',
    posId: 0,
    importer: '',
})

const rules = reactive<FormRules<Item>>({
    importer: [
        { required: true, message: 'Vui lòng nhập tên người nhập kho', trigger: 'blur' },
    ],
    warrantyPeriod: [
        { required: true, message: 'Vui lòng nhập thời gian bảo hành', trigger: 'blur' },
    ],
    maintenanceTime: [
        { required: true, message: 'Vui lòng nhập thời gian bảo dưỡng', trigger: 'blur' },
    ],
})

const { data } = useFetchApi(`/item/getbyDeviceID/${route.params.deviceID}`, {
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
    tableData.value = newData.data as Item[];
    total.value = newData.itemCount;

})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

async function submitAddItem(ruleformref: FormInstance | undefined) {

    if (!ruleformref) return
    try {
        if (! await ruleformref.validate((valid, fields) => {
            return valid;
        })) return false;
    } catch (error) {
        return false;
    }

    if (updateItemBoolean.value == true) {
        const { status, error } = await useFetchApi('/item/update/', {
            method: 'POST',
            body: formAddItem
        });
        if (status.value == 'success') {
            dialogAddItem.value = false
            ++reload.value;
        } else if (status.value == 'error') {
            ElNotification({
                title: 'Error',
                message: error.value?.data,
                type: 'error',
            })
        }
    }
    else {
        const { status, error } = await useFetchApi('/item/create/', {
            method: 'POST',
            body: {
                deviceId: route.params.deviceID,
                warrantyPeriod: formAddItem.value.warrantyPeriod,
                maintenanceTime: formAddItem.value.maintenanceTime,
                lastMaintenance: formAddItem.value.lastMaintenance == '' ? '0001-01-01T00:00:00Z' : formAddItem.value.lastMaintenance,
                status: formAddItem.value.status,
                importerId: 228,
                posId: formAddItem.value.posId,
            }

        });

        if (status.value == 'success') {
            dialogAddItem.value = false
            ++reload.value;
        } else if (status.value == 'error') {
            ElNotification({
                title: 'Error',
                message: error.value?.data,
                type: 'error',
            })
        }
    }
}

async function updateItem(Id: number) {
    dialogAddItem.value = true;
    updateItemBoolean.value = true
    const { data } = await useFetchApi(`/item/getbyid/${Id}`, {
        method: 'GET',
    });
    if (data.value) {
        const dataItem = data.value as Item[]
        formAddItem.value = dataItem[0];
    }
}

function HandlelDoubclick(row: any, column: any, event: Event) {
    detailPostion.value = row;
    dialogDetailItem.value = true
}

async function deleteItem(id: number) {

    const { status, error } = await useFetchApi(`/item/delete/${id}`, {
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

async function getWareHouse() {
    const { data } = await useFetchApi('warehouse/getall', {
        method: 'GET',
        query: {
            page: 1,
            pageSize: 1000,
        },

    });
    if (data.value) {
        dataWareHouse.value = (data.value as { data: any }).data;
    }

}

async function getPositionByWarehouseId() {
    labelPos.value = true;
    const { data } = await useFetchApi(`/warehouse/getPos/${selectWarehouse.value}`, {
        method: 'POST',
        query: {
            page: 1,
            pageSize: 1000,
        },
    });
    dataPosition.value = (data.value as { data: any }).data;
}




</script>
<style>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

/* .el-input {
    width: 300px;
} */

.dialog-footer button:first-child {
    margin-right: 10px;
}

.el-form-item__label {
    line-height: normal;
}

.el-descriptions__label {
    width: 153px;
}
</style>
