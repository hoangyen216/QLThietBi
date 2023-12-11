<template>
    <el-card shadow="never">
        <el-space :wrap="true" class="mb-2">

            <NuxtLink to="/personRegister/register-device" :underline="false">
                <el-button type="primary">
                    <Icon name="mdi:plus" class="mr-2" size="20" />
                    Đăng ký mượn thiết bị
                </el-button>
            </NuxtLink>

        </el-space>
        <client-only>
            <el-table  v-loading="pending" ref="multipleTableRef" :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template #default="props">
                        <el-row>
                            <el-col :span="7">

                            </el-col>
                            <el-col :span="10">
                                <!-- <table style="width:100%">
                                    <tr>
                                        <th>Tên thiết bị</th>
                                        <th>Số lượng</th>
                                    </tr>
                                    <tr v-for="tb in props.row.listCTPDK">
                                        <td>{{ tb.tenThietBi }}</td>
                                        <td>{{ tb.soLuong }}</td>
                                    </tr>
                                </table> -->
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
                                   
                                </el-space>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50" label="STT" />>
                <el-table-column prop="maPdk" label="Mã PDK" />
                <el-table-column prop="ngayMuon" label="Ngày Mượn">
                    <template #default="scope">
                        <el-text class="mx-1">{{ datetimeFormat(scope.row.ngayMuon) }} - {{
                            datetimeFormat(scope.row.ngayTra)
                        }} </el-text>
                    </template>
                </el-table-column>

                <el-table-column prop="tgGhiNhan" label="Thời Gian Ghi Nhận">
                    <template #default="scope">
                        <el-text class="mx-1">{{ datetimeFormat1(scope.row.tgGhiNhan) }} </el-text>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="ghiChu" label="Ghi Chú" /> -->
                <el-table-column width="150" prop="trangThai" label="Trạng Thái" :align="center" :filters="[
                    { text: 'Chờ duyệt', value: 'Chờ duyệt' },
                    { text: 'Duyệt', value: 'Duyệt' },
                    { text: 'Không duyệt', value: 'Không duyệt' },
                    { text: 'Đã Mượn', value: 'Đã Mượn' },
                    { text: 'Đã trả', value: 'Đã trả' },
                ]" :filter-method="filterTag">
                    <template #default="scope">

                        <el-button style="padding: 0;" text @click="dialogFormVisible = true">
                            <el-tag size="large" :type="showTypeTag(scope.row.trangThai)" disable-transitions>{{
                                scope.row.trangThai
                            }}</el-tag>
                        </el-button>

                    </template>
                </el-table-column>

            </el-table>
        </client-only>
        <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]" :background=true
            layout="sizes, prev, pager, next" :total="total" style="margin-top: 25px" />
    </el-card>
    <client-only>
        <el-dialog v-model="dialogTableVisible" :modal="false" :append-to-body="true">
            <!-- <p>{{ dialogModel?.maPdk }}</p> -->
            <!-- <el-image style="height: 100px;" :src="`data:image/png;base64,${dialogModel?.qrcode}`" fit="contain">
                <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                    </div>
                </template>
            </el-image> -->
            <el-table :data="dialogModel?.listCTPDK">
                <el-table-column property="tenThietBi" label="Tên thiết bị" />
                <el-table-column property="soLuong" label="Số lượng" />
                <!-- <el-table-column property="tinhTrangCT" label="Tinh Trang" /> -->
            </el-table>
        </el-dialog>

    </client-only>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
useHeadSafe({ title: 'Danh sách Phiếu Đăng Ký' })
const dialogFormVisible = ref(false)
const dialogTableVisible = ref(false)
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const dialogModel = ref<PDK>()

interface PDK {
    listCTPDK: listCTPDK[],
    maPdk: number,
    ghiChu: string,
    ngayMuon: string,
    ngayTra: string,
    trangThai: string,
    tgGhiNhan: string,
    qrcode: string
}

interface listCTPDK {
    tenThietBi: string,
    soLuong: number,
    tinhTrangCT: string
}


const tableData = ref<PDK[]>();

const filterTag = (value: string, row: PDK) => {
    return row.trangThai === value
}

function showTypeTag(value: string) {
    if (value == 'Duyệt')
        return 'success';
    if (value == 'Không Duyệt')
        return 'danger';
    else
        return '';
}
const user = useCookie('user')

const { data, pending } = useFetchApi('pdk/findByUser', {
    method: 'GET',
    server: false,
    query: {
        page: page,
        pageSize: pageSize,
        username: user.value
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

if (data.value) {
    // tableData.value = data.value as PDK
    console.log("danh sach phieu dang ky")
    console.log("ds", data.value)
}

function doubleClickHandler(row: any, column: any, event: any) {
    dialogModel.value = row;
    dialogTableVisible.value = true
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