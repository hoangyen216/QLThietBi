<template>
    <h3>Danh sách Loại Thiết Bị</h3>
    <el-space :wrap="true" class="mb-2">
        <el-button type="primary" @Click="dialogAddCategory = true">
            <Icon name="mdi:plus" class="mr-2" size="20" />
            Tạo mới
        </el-button>
    </el-space>
    <el-card shadow="never" style="height: 88vh">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
            <el-table-column type="index" label="STT" width="100px" />
            <el-table-column prop="categoryId" label="Mã Loại" />
            <el-table-column prop="descr" label="Tên Loại" />
            <el-table-column label="Tác Vụ" width="150px">
                <template #default="scope">
                    <el-button type="primary" plain @click=" updateCategory(scope.row.categoryId)">
                        <Icon name="bx:edit" />
                    </el-button>
                    <client-only>
                        <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                            @confirm="(_) => deleteCategory(scope.row.categoryId)">
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

        <el-pagination style=" bottom: 18px; position: absolute;" v-model:current-page="page"
            v-model:page-size="pageSize" :background=true layout=" prev, pager, next" :total="total" />
    </el-card>
    <el-dialog draggable v-model="dialogAddCategory" :title="updateCat ? 'Cập Nhật Loại Hàng' : 'Thêm Mới Loại Hàng'"
        width="500" @close="() => { updateCat = false }">
        <el-form>
            <el-form-item label="Tên Loại" pro="addPosition">
                <el-input v-model="formAddCategory.descr" />
                <p v-if="formAddCategory.descr == ''" style="color: red">Vui lòng nhập loại hàng</p>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogAddCategory = false">Hủy Bỏ</el-button>
                <el-button type="primary" @click="submitAddCategory()">
                    <span v-if="updateCat == false">Thêm mới</span>
                    <span v-if="updateCat == true">Cập nhật</span>
                </el-button>
            </div>
        </template>

    </el-dialog>

</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh sách Loại Thiết Bị' })
import { reactive, ref } from 'vue'

const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const dialogAddCategory = ref(false);
const updateCat = ref(false);
const tableData = ref<Category[]>()
const formAddCategory = reactive({
    categoryId: 0,
    descr: ''
})

const { data } = useFetchApi('/category/getall', {
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
    // tableData.value = data.value as Category[];
})

async function submitAddCategory() {
    if (formAddCategory.descr == '')
        return;
    if (updateCat.value == true) {
        const { status, error } = await useFetchApi('/category/update/', {
            method: 'POST',
            body: {
                descr: formAddCategory.descr,
                categoryId: formAddCategory.categoryId
            },
        });
        dialogAddCategory.value = false

        if (status.value == 'success') {
            ++reload.value;
        } else if (status.value == 'error') {
            ElNotification({
                title: 'Error',
                message: error.value?.data,
                type: 'error',
            })
        }
    } else {
        const { status, error } = await useFetchApi('/category/create/', {
            method: 'POST',
            body:
                JSON.stringify(formAddCategory.descr)

        });
        dialogAddCategory.value = false
        formAddCategory.descr = ""
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
}

async function updateCategory(categoryId: number) {
    dialogAddCategory.value = true;
    updateCat.value = true
    const { data } = await useFetchApi(`/category/getbyid/${categoryId}`, {
        method: 'GET',
    });
    formAddCategory.descr = (data.value as { descr: string }).descr;
    formAddCategory.categoryId = (data.value as { categoryId: number }).categoryId;
}

async function deleteCategory(id: number) {

    const { status, error } = await useFetchApi(`/category/delete/${id}`, {
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
