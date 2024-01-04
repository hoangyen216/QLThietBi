<template>
    <div class="form container mx-auto">
        <el-text class="mx-1 " style="font-size: x-large;" tag="b">Chi tiết phiếu đăng ký {{ dataDetail?.maPdk }} </el-text>
        <el-table :data="dialogModel" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="tenThietBi" label="Tên thiết bị" />
            <el-table-column prop="soLuong" label="Số lượng" />
            <!-- <el-table-column prop="tinhTrangCT" label="Tinh Trang" /> -->
        </el-table>

        <el-row style="margin-top: 20px; margin-bottom: 20px;">
            <el-col :span="10" style="background-color: white">
                <el-space direction="vertical" alignment="left">
                    <el-row>
                        <el-text class="mx-1" tag="b">MaPDK: </el-text>
                        <el-text class="mx-1"> {{ dataDetail?.maPdk }}</el-text>
                    </el-row>
                    <el-row>
                        <!-- <el-text class="mx-1" tag="b">NgàyMượn: </el-text>
                        <el-text class="mx-1"> {{ datetimeFormat(dataDetail?.ngayMuon) }}</el-text> -->
                    </el-row>
                    <el-row>
                        <el-text class="mx-1" tag="b">Trạng Thái: </el-text>
                        <el-text class="mx-1"> {{ dataDetail?.trangThai }}</el-text>
                    </el-row>
                </el-space>
            </el-col>
            <el-col :span="8" style="background-color: white">
                <el-space direction="vertical" alignment="left">

                    <el-row>
                        <el-text class="mx-1 " tag="b">Thời Gian Ghi Nhận: </el-text>
                        <el-text class="mx-1"> {{ dataDetail?.tgGhiNhan }}</el-text>
                    </el-row>
                    <el-row>
                        <el-text class="mx-1 " tag="b">Ghi Chu: </el-text>
                        <el-text class="mx-1"> {{ dataDetail?.ghiChu }}</el-text>
                    </el-row>
                </el-space>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>

interface ChiTietPDK {
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
const route = useRoute()
const dialogModel = ref<listCTPDK[]>()
const dataDetail = ref<ChiTietPDK>();



const { data } = await useFetchApi(`/pdk/getdetail/${route.params.id}`, {
    method: 'GET',
    server: false
});
// if (data.value) {

//     const dataArr = data.value as ChiTietPDK[];
//     dataDetail.value = dataArr[0];
//     dialogModel.value = dataDetail.value.listCTPDK as any;
// }
watch(data, (x) => {
    if (!x)
        return

    const dataArr = data.value as ChiTietPDK[];
    dataDetail.value = dataArr[0];
    dialogModel.value = dataDetail.value.listCTPDK as any;

})


</script>
<style scoped>
@media (min-width: 992px) {
    .form {
        width: 50%;

    }
}
</style>