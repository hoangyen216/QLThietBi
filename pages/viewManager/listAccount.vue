<template>
    <h3>Quản lý tài khoản</h3>
    <el-space :wrap="true" class="mb-2">
        <el-button type="primary" @Click="dialogAddAccount = true; getRole()">
            <Icon name="mdi:plus" class="mr-2" size="20" />
            Thêm mới tài khoản
        </el-button>
    </el-space>
    <el-card shadow="never" style="min-height: 100vh;position: relative;">

        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
            <el-table-column type="index" label="STT" width="100px" />
            <el-table-column prop="userId" width="90" label="User ID" />
            <el-table-column prop="surname" label="Họ" />
            <el-table-column prop="name" label="Tên" />
            <el-table-column prop="phoneNumber" label="Số điện thoại" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="roleDescr" label="Quyền" />
            <el-table-column label="Tác Vụ" width="200px">
                <template #default="scope">
                    <el-button type="primary" plain @click="updateRole(scope.row.userId, scope.row.roleId); getRole()">
                        <Icon name="bx:edit" />
                    </el-button>
                    <el-button type="primary" plain @click="open(scope.row.userId)">
                        <Icon name="icon-park-outline:back" />
                    </el-button>
                    <client-only>
                        <el-popconfirm title="Bạn có chắc muốn xóa?" width="300"
                            @confirm="(_) => deleteAccount(scope.row.userId)">
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

        <el-pagination style=" bottom: 0px; position: absolute;" v-model:current-page="page"
            v-model:page-size="pageSize" :background=true layout=" prev, pager, next" :total="total" />
    </el-card>
    <el-dialog draggable v-model="dialogAddAccount" title="Thêm Mới Tài Khoản" width="500">
        <el-form ref="ruleFormRef" label-width="120" :model="formAddAccount">
            <el-form-item label="Họ" prop="surname">
                <el-input v-model="formAddAccount.surname" />
            </el-form-item>
            <el-form-item label="Tên" prop="name">
                <el-input v-model="formAddAccount.name" />
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phoneNumber">
                <el-input v-model="formAddAccount.phoneNumber" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="formAddAccount.email" />
            </el-form-item>
            <el-form-item label="Role" prop="roleId">
                <el-select v-model="formAddAccount.roleId" placeholder="Chọn Role">
                    <el-option v-for="item in Role" :key="item.roleId" :label="item.descr" :value="item.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item label="Citizen Id " prop="citizenId">
                <el-input v-model="formAddAccount.citizenId" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogAddAccount = false; resetForm(ruleFormRef)">Hủy Bỏ</el-button>
                <el-button type="primary" @click="submitAddAccount(ruleFormRef)">
                    <span>Tạo mới</span>

                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog draggable v-model="updateRoledialog" title="Câp nhật Role" width="500">
        <el-form ref="ruleFormRef" label-width="120" :rules="rules" :model="formUpdateRole">
            <el-form-item label="Role" prop="roleId">
                <el-select v-model="formUpdateRole.roleId" placeholder="Chọn Role">
                    <el-option v-for="item in Role" :key="item.roleId" :label="item.descr" :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updateRoledialog = false;">Hủy Bỏ</el-button>
                <el-button type="primary" @click="submitUpdateRole()">
                    <span>Cập Nhật</span>

                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
useHeadSafe({ title: 'Danh sách Tài Khoản' })
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);
const reload = ref(0);
const Role = ref()
import { ElMessage, ElMessageBox } from 'element-plus'
const dialogAddAccount = ref(false);
const updateRoledialog = ref(false);
const tableData = ref<Account[]>()
const formAddAccount = reactive({
    surname: '',
    name: '',
    phoneNumber: '',
    email: '',
    roleId: 0,
    citizenId: ''
})

const formUpdateRole = reactive({
    userId: 0,
    roleId: null
})


const open = (idAccount:number) => {
    ElMessageBox.confirm(
        'Bạn có muốn reset mật khẩu của tài khoản này không?',
        'Thông Báo',
        {
            confirmButtonText: 'Chấp nhận',
            cancelButtonText: 'Hủy Bỏ',
            type: 'info',
        }
    )
        .then(async () => {
            ElMessage({
                type: 'success',
                message: 'Đã reset mật khẩu thành công',
            })
            const { data, error, status } = await useFetchApi(`/user/resetPassword/`, {
                method: 'POST',
                query: {
                    id: idAccount
                }
            });
        })
    // .catch(() => {
    //     ElMessage({
    //         type: 'info',
    //         message: 'Delete canceled',
    //     })
    // })
}
async function getRole() {
    const { data } = await useFetchApi('/role/get', {
        method: 'GET',
    });
    if (data.value) {
        Role.value = data.value;
    }

}


const { data } = useFetchApi('/user/getall', {
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
    const newData = data.value as { itemCount: number, data: any };
    tableData.value = newData.data as Account[];
    total.value = newData.itemCount;
    // console.log(tableData.value);

})

const rules = reactive<FormRules<Account>>({
    name: [
        { required: true, message: 'Hãy nhập họ', trigger: 'blur' },
    ],
    surname: [
        { required: true, message: 'Hãy nhập tên', trigger: 'blur' },
    ],
    phoneNumber: [
        { required: true, message: 'Hãy nhập số điện thoại', trigger: 'blur' },
    ],
    // roleId: [
    //     { required: true, message: 'Hãy nhập Role Id', trigger: 'blur' },
    // ],
    email: [
        { required: true, message: 'Hãy nhập Email', trigger: 'blur' },
        {
            type: 'email',
            message: 'Vui lòng nhập email hợp lệ',
            trigger: ['blur', 'change'],
        },
    ],

})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


async function submitAddAccount(ruleformref: FormInstance | undefined) {
    if (!ruleformref) return
    try {
        if (! await ruleformref.validate((valid, fields) => {
            return valid;
        })) return false;
    } catch (error) {
        return false;
    }
    const { status, error } = await useFetchApi('/user/register', {
        method: 'POST',
        body: formAddAccount
    });

    if (status.value == 'success') {
        ++reload.value;
        ElNotification({
            title: 'Gửi biểu mẫu đăng ký thành công',
            message: '',
            type: 'success',
        })
        dialogAddAccount.value = false
        resetForm(ruleFormRef.value)
    } else if (status.value == 'error') {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }

}

async function submitUpdateRole() {
    const { status, error } = await useFetchApi(`/user/updateRole/${formUpdateRole.userId}&${formUpdateRole.roleId}`, {
        method: 'POST',
    });

    if (status.value == 'success') {
        ++reload.value;
        ElNotification({
            title: 'Cập nhật thành công',
            message: '',
            type: 'success',
        })
        updateRoledialog.value = false

    } else if (status.value == 'error') {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }
}

async function updateRole(userId: number, roleId: number) {
    updateRoledialog.value = true
    formUpdateRole.userId = userId
}

async function deleteAccount(id: number) {

    const { status, error } = await useFetchApi(`/user/delete/${id}`, {
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
