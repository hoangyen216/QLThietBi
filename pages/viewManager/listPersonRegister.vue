<template>
    <el-card shadow="never" style="min-height: 100vh; position: relative;">
        <el-space :wrap="true" class="mb-2">
        </el-space>
        <client-only>
            <el-table v-loading="pending" ref="multipleTableRef" :data="tableData" style="width: 100%">
                <!-- <el-table-column type="expand">
                    <template #default="props">
                        <el-row>
                            <el-col :span="7">

                            </el-col>
                            <el-col :span="10">
                                <el-table border :data="props.row.listCTPDK" style="width: 100%; margin-top: 20px;">
                                    <el-table-column prop="tenThietBi" label="Tên thiết bị" />
                                    <el-table-column prop="soLuong" label="Số lượng" />

                                </el-table>
                            </el-col>
                            <el-col :span="8">

                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px; margin-bottom: 20px;">


                            <el-col :span="7" style="background-color: white">

                            </el-col>
                            <el-col :span="5" style="background-color: white">

                                <el-space direction="vertical" alignment="left">
                                    <el-row>
                                        <el-text class="mx-1" tag="b">MaPDK: </el-text>
                                        <el-text class="mx-1"> {{ props.row.maPdk }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Thời gian ghi nhận: </el-text>
                                        <el-text class="mx-1"> {{ datetimeFormat1(props.row.tgGhiNhan) }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1" tag="b">Người duyệt: </el-text>
                                        <el-text class="mx-1"> {{ props.row.nguoiDuyet }}</el-text>
                                    </el-row>

                                </el-space>
                            </el-col>
                            <el-col :span="8" style="background-color: white">
                                <el-space direction="vertical" alignment="left">
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Ngày Mượn: </el-text>
                                        <el-text class="mx-1"> {{ datetimeFormat(props.row.ngayMuon) }} - {{
                                            datetimeFormat(props.row.ngayTra)
                                        }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1 " tag="b">Trạng thái: </el-text>
                                        <el-text class="mx-1"> {{ props.row.trangThai }}</el-text>
                                    </el-row>
                                    <el-row>
                                        <el-text class="mx-1" tag="b">Người đăng ký: </el-text>
                                        <el-text class="mx-1"> {{ props.row.nguoiMuon }}</el-text>
                                    </el-row>
                                </el-space>
                            </el-col>
                        </el-row>
                    </template>
</el-table-column> -->
                <!-- <el-table-column type="index" width="50" label="STT" /> -->
                <!-- <el-table-column prop="nguoiMuon" label="Người đăng ký" /> -->
                <!-- <el-table-column prop="nguoiDuyet" label="Người Duyệt" /> -->
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

                        <el-button size="large" style="padding: 0; " text
                            @click="xuLyTrangThai(scope.row); detailRegist(scope.row.registId)">
                            <el-tag style="width: 97px;" size="large" :type="showTypeTag(scope.row.status)"
                                disable-transitions>{{
                                    scope.row.status
                                }}</el-tag>
                        </el-button>

                    </template>
                </el-table-column>
                <el-table-column label="Tác Vụ" width="170">
                    <template #default="scope">
                        <el-button type="primary" @click="detailRegist(scope.row.registId); dialogTableVisible = true">
                            <Icon name="pajamas:details-block" height="18" width="20" style="color: white" />
                        </el-button>
                        <el-button v-if="scope.row.isFine" type="primary"
                            @click="dialogPenalty = true; getDetailPenalty(scope.row.registId)">
                            <Icon name="uil:bill" height="20" width="20" style="color: white" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination style=" bottom: 2px; position: absolute;" v-model:current-page="page"
            v-model:page-size="pageSize" :background=true layout=" prev, pager, next" :total="total" />
    </el-card>
    <client-only>
        <el-dialog width="700px" v-model="dialogTableVisible" :modal="false" :append-to-body="true">
            <h4 style="text-align: center;">Chi tiết phiếu đăng ký </h4>
            <!-- {{  listDetailsArray}} -->
            <el-table :data="listDetailsArray">
                <!-- <el-table-column type="expand">
                    <template #default="props">
                        <el-table :data="props.row.listDetails">
                            <el-table-column prop="registId" label="RegistId" />
                            <el-table-column prop="deviceId" label="DeviceId" />
                            <el-table-column prop="itemId" label="ItemId" />
                            <el-table-column prop="beforeStatus" label="BeforeStatus" />
                            <el-table-column prop="afterStatus" label="AfterStatus" />
                        </el-table>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="registId" label="RegistId" /> -->
                <el-table-column prop="deviceId" label="DeviceId" />
                <el-table-column prop="borrowQuantity" label="BorrowQuantity" />
                <el-table-column prop="confirmQuantity" label="ConfirmQuantity" />
            </el-table>
        </el-dialog>
        <el-dialog v-model="dialogFormVisible" title="Duyệt Đăng ký ">
            <el-form :model="formDuyetDangKy">
                <el-form-item label="Trạng Thái" :label-width="formLabelWidth">
                    <el-select v-model="formDuyetDangKy.trangThai" placeholder="Chọn trạng thái">
                        <el-option v-for="item in currentOper" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item v-if="formDuyetDangKy.trangThai.includes('Không Duyệt')" label="Lý do"
                    :label-width="formLabelWidth">
                    <el-input v-model="formDuyetDangKy.lyDo" />
                </el-form-item>
                <el-form-item v-if="formDuyetDangKy.trangThai.includes('Đã Mượn')" label="Danh sách Item Mượn">
                    <el-cascader :show-all-levels="false" :props="props" v-model="cascadervalue" :options="options"
                        clearable />
                </el-form-item>
            </el-form>
            <!-- {{ detailRegistData }} -->
            <div v-if="formDuyetDangKy.trangThai.includes('Đã Trả')">
                <el-table :data="detailRegistData">
                    <!-- <el-table-column prop="registId" label="RegistId" /> -->
                    <el-table-column prop="deviceId" label="DeviceId" />
                    <el-table-column prop="itemId" label="ItemId" />
                    <el-table-column prop="beforeStatus" label="beforeStatus" />
                    <el-table-column label="AfterStatus" width="240px">
                        <template #default="scope">
                            <!-- <el-input v-model="scope.row.afterStatus" style="width: 200px"
                                placeholder="tình trạng thiết bị" /> -->
                            <el-select v-model="scope.row.afterStatus" placeholder="AfterStatus" size="large"
                                style="width: 200px">
                                <el-option v-for="item in Status" :key="item.value" :label="item.value"
                                    :value="item.value" />
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click=" formSubmitDuyetDangKy()">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </client-only>
    <el-dialog v-model="dialogPenalty" width="700px">
        <!-- {{ dataPenalty }} -->
        <el-table :data="dataPenalty" show-summary>
            <!-- <el-table-column prop="registId" label="RegistId" /> -->
            <el-table-column prop="descr" label="Mô tả" />
            <el-table-column prop="fine" label="Số tiền Phạt" align="right">
                <template #default="scope">
                    <!-- <el-input v-model="scope.row.fine" style="width: 150px" placeholder="Nhập số tiền phạt" /> -->
                    <el-input-number v-model="scope.row.fine" :min="1" :max="1000000000" controls-position="right"
                        size="large" />
                </template>
            </el-table-column>
        </el-table>
        <el-button style="margin: 20px 284px 0px 292px;" type="primary" @click="submitMoneyFine()">
            Xác nhận
        </el-button>
    </el-dialog>

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
const currentOper = ref<string[]>([])
const tableData = ref<PDK[]>();
const options = ref()
const props = { multiple: true }
const cascadervalue = ref([])
const detailRegistData = ref<ListDetail[]>()
// const listDetailsArray = ref<BorrowRecord>()
const listDetailsArray = ref()
const dataPenaltyTicket = ref<PenaltyTicket>()
const dataPenalty = ref<Penalty[]>([])
const dialogPenalty = ref(false)

//interface đã mượn
interface Device {
    deviceID: number;
    deviceDescr: string;
    listItemID: number[];
}
interface Warehouse {
    listDevice: Device[]
}
// end interface đã mượn

//interface detail regist

interface BorrowRecord {
    deviceRegist: DeviceRegistration;
    listDetails: ListDetail[];
}
//End interface detail regist


const formDuyetDangKy = reactive({
    trangThai: '',
    maPdk: '',
    lyDo: '',
    username: user,

})
const operations = new Map<string, string[]>(
    [
        ['Duyệt', ['Đã Mượn']],
        ['Đã Mượn', ['Đã Trả']],
        ['Chờ Duyệt', ['Duyệt', 'Không Duyệt']],
    ]
)

const Status = [
    {
        value: 'Bình Thường',
    },
    {
        value: 'Mất',
    },
    {
        value: 'Hỏng',
    }
]

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


function cascaderConverter(data: Warehouse) {
    const listDevice = data.listDevice;
    return listDevice.map(e => ({
        value: e.deviceID,
        label: e.deviceDescr,
        children: e.listItemID.map(x => ({
            value: x,
            label: x,
        }))
    }))
}
async function xuLyTrangThai(row: any) {
    if (row.status == "Không Duyệt" || row.status == "Đã Trả") {
        ElMessage({
            message: 'Từ chối yêu cầu thay đổi trạng thái',

        })
        return;
    }
    // if(row.trangThai == "Chờ Duyệt"){
    //     formDuyetDangKy.lyDo = 
    // }
    currentOper.value = operations.get(row.status) ?? [];
    dialogFormVisible.value = true;
    formDuyetDangKy.trangThai = row.status
    formDuyetDangKy.maPdk = row.registId
    const warehouseId = row.warehouseId
    const { data: warehouse } = await useFetchApi(`/item/getTree/${warehouseId}&${formDuyetDangKy.maPdk}`, {
        method: 'GET',
    });
    if (warehouse.value) {
        options.value = cascaderConverter((warehouse.value as Warehouse[])[0])
    }
}
// async function ItemBorrow() {
//     const { status, error } = await useFetchApi('/regist/borrow', {
//         method: 'POST',
//         server: false,
//         body: {
//             registID: formDuyetDangKy.maPdk,
//             listItemID: cascadervalue.value.map(e => e[1])
//         },
//     })
//     if (status.value == 'success') {
//         reload.value++;
//         ElNotification({
//             title: 'Đã xác nhận',
//             type: 'success',
//         })
//     } else if (status.value == 'error') {
//         ElNotification({
//             title: 'Error',
//             message: error.value?.data,
//             type: 'error',
//         })
//     }
// }
async function formSubmitDuyetDangKy() {
    if (formDuyetDangKy.trangThai == '') return
    const { status, error } = await useFetchApi('/regist/updateStatus', {
        method: 'POST',
        server: false,
        body: {
            registID: formDuyetDangKy.maPdk,
            managerID: 1,
            status: formDuyetDangKy.trangThai,
            reason: formDuyetDangKy.lyDo
        },
        watch: false
    })
    if (status.value == 'success') {
        reload.value++;
    }
    if (formDuyetDangKy.trangThai.includes('Đã Mượn')) {
        const { status, error } = await useFetchApi('/regist/borrow', {
            method: 'POST',
            server: false,
            body: {
                registID: formDuyetDangKy.maPdk,
                listItemID: cascadervalue.value.map(e => e[1])
            },
        })
        if (status.value == 'success') {
            reload.value++;
            ElNotification({
                title: 'Đã xác nhận',
                type: 'success',
            })
        } else if (status.value == 'error') {
            ElNotification({
                title: 'Error',
                message: error.value?.data,
                type: 'error',
            })
        }
    }
    if (formDuyetDangKy.trangThai.includes('Đã Trả')) {
        {
            const { data } = await useFetchApi('/regist/return', {
                method: 'POST',
                server: false,
                body: {
                    registID: formDuyetDangKy.maPdk,
                    listItem: detailRegistData.value?.map(({ itemId, afterStatus }) => ({ itemId, afterStatus }))
                },
            })
            if (data.value) {
                dataPenaltyTicket.value = data.value as PenaltyTicket
            }
            if (status.value == 'success') {
                reload.value++;
                ElNotification({
                    title: 'Đã xác nhận',
                    type: 'success',
                })
            } else if (status.value == 'error') {
                ElNotification({
                    title: 'Error',
                    message: error.value?.data,
                    type: 'error',
                })
            }
        }
    }

    dialogFormVisible.value = false
}
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

const { data, pending } = useFetchApi('/regist/getall', {
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

async function submitMoneyFine() {
    const detailPenalty = dataPenalty.value.map(({ lineRef, descr, fine }) => ({ lineRef, descr, fine }));
    const { status, error } = await useFetchApi("/penalty/updateDetail/", {
        method: 'POST',
        body: {
            registID: dataPenalty.value[0].registId,
            managerID: 1,
            penaltyID: dataPenalty.value[0].penaltyId,
            listPenalty: detailPenalty
        }
    });
    if (status.value == 'success') {
        reload.value++;
        ElNotification({
            title: 'Xác nhận thành công',
            type: 'success',
        })
    } else if (status.value == 'error') {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }
}

async function getDetailPenalty(registId: number) {
    const { data } = await useFetchApi(`/penalty/getDetail/${registId}`, {
        method: 'GET',
    });
    if (data.value) {
        dataPenalty.value = data.value as Penalty[]
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