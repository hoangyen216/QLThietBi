<template>
    <el-card shadow="never">


        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
            <el-table-column type="index" label="STT" width="100px" />
            <el-table-column prop="userName" label="Tên Tài Khoản" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="roles" label="Role" :filters="[
                    { text: 'User', value: 'User' },
                    { text: 'Admin', value: 'Admin' },
                    { text: 'Manager', value: 'Manager' },

                ]" :filter-method="filterTag">

                <template #default="scope">
            
                        
                        <el-text class="mx-1" v-if="(scope.row.roles.includes('Admin'))">Admin </el-text>
                        <el-text class="mx-1" v-else-if="(scope.row.roles.includes('User')==true && scope.row.roles.length == 1) ">User </el-text>
                        <el-text class="mx-1" v-else-if="(scope.row.roles.includes('Manager')==true && scope.row.roles.length == 1) ">Manager</el-text>

                    
                </template>

            </el-table-column>
            <el-table-column label="Tác Vụ" width="150px" >
                <template #default="scope">
                    <el-button type="primary" plain @click="dialogFormVisible = true; formSetRole.userName = scope.row.userName">
                            <Icon name="bx:edit" />
                        </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]" :background=true
            layout="sizes, prev, pager, next" :total="total" style="margin-top: 25px" />
    </el-card>

    <el-dialog style="height: 285px;" v-model="dialogFormVisible" title="Thiết lập quyền truy cập" :before-close="handleClose">
        <el-form :model="formSetRole">
            <el-form-item label="Role" :label-width="formLabelWidth">
                <el-select v-model="formSetRole.role" placeholder="Set Role">
                    <el-option label="Admin" value="Admin" />
                    <el-option label="Manager" value="Manager" />
                    <el-option label="User" value="User" />
                </el-select>

            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="formSubmitSetRole()">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh sách Người Dùng' })
import { reactive, ref } from 'vue'
const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const filterTag = (value: string, row: Role) => {
    
    return row.roles[0] === value
}

const formSetRole = reactive({
    role: '',
    userName: ''
})

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Bạn có chắc muốn đóng hộp thoại này không?')
        .then(() => {
            done()
        })
}

async function formSubmitSetRole() {

    if (formSetRole.role == '') return

    const { status, error } = await useFetchApi('admin/setRole', {
        method: 'POST',
        server: false,
        query: {
            role: formSetRole.role, 
            userName: formSetRole.userName,
        },
        
        watch: false
    })
    if (status.value == 'success') {
        reload.value++;
        ElNotification({
            title: 'Thiết lập thành công',
            type: 'success',
        })
    } else if (status.value == 'error') {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }
    dialogFormVisible.value = false

}

const tableData = ref<Role[]>()
interface Role {
    userName: string,
    email: string,
    roles: string[]
}

const { data } = useFetchApi('admin/getall', {
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
    // console.log('in', tableData.value[1].roles.length);
})




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
