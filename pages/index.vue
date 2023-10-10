<template>
    <el-card shadow="never">
        <el-space :wrap="true" class="mb-2">

            <NuxtLink to="/devices/addDevice" :underline="false">
                <el-button type="primary">
                    <Icon name="mdi:plus" class="mr-2" size="20" />
                    Tạo mới
                </el-button>
            </NuxtLink>

        </el-space>
        <client-only>
            <el-table v-loading="pending" ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column type="expand">
                    <template #default="props">
                        <div m="4">
                            Hello
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="idTB" width="50" label="Id" />
                <el-table-column prop="hinhanh" label="Ảnh" align="center">
                    <template #default="scope">
                        <el-image style="height: 40px" :src="scope.row.hinhanh" fit="contain" />
                    </template>
                </el-table-column>
                <el-table-column prop="ten" label="Tên Thiết Bị" />
                <el-table-column prop="soLuong" label="Số Lượng" />
                <el-table-column width="250">
                    <template #default="scope">
                        <!-- <el-space wrap alignment="center">
                            <el-button @click="navigateTo(`/programs/${scope.row.id}`)">
                                <Icon name="mdi:pencil" class="mr-2" />Chi tiết
                            </el-button>
                        </el-space> -->
                        <el-space wrap alignment="center">
                            <el-button @click="navigateTo(`/devices/${scope.row.idTB}`)">
                                <Icon name="mdi:pencil" class="mr-2" />Edit
                            </el-button>
                            <client-only>
                                <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                                    @confirm="(_) => deleteDevice(scope.row.idTB)">
                                    <template #reference>
                                        <el-button type="danger">
                                            <Icon name="mdi:delete" class="mr-2" size="20" />
                                            Xóa
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </client-only>
                        </el-space>
                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[30, 70, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" class="mt-5" />
    </el-card>

    <client-only>
        <el-dialog v-model="dialogVisible" title="Thêm thiết bị" :before-close="handleClose" :show-close="false"
            :center="true">
            <ProgramCreate ref="addNewRef" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
                    <el-button type="primary" @click="submit">
                        OK
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </client-only>
</template>

<script setup lang="ts">
// useHeadSafe({ title: 'Chương trình quay số' })
import { ref } from 'vue'
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}

const tableData = ref<Program[]>();
const multipleSelection = ref<Program[]>([])
const dialogVisible = ref(false)
const page = ref(1);
const pageSize = ref(30);
const total = ref(0);
const reload = ref(0);
const route = useRoute();
const addNewRef = ref();

const { data, pending } = await useFetch('https://65183f73582f58d62d358659.mockapi.io/devices', {
    method: 'GET',
    server: false,
    headers: { 'Content-Type': 'application/json' },
    query: {
        page: page,
        page_size: pageSize,
    },
    watch: [
        page,
        pageSize,
        reload,
    ]
});

watch(data, (x) => {
    tableData.value = typeof (x) == 'string' ? JSON.parse(x as string) : x as Program[];
})


function handleSelectionChange(val: Program[]) {
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
    const { status } = await useFetch(`https://65183f73582f58d62d358659.mockapi.io/devices/${id}`, {
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