<template>
    <div class="mainDiv">
        <div class="cardStyle">
            <h2 class="formTitle" style="color: var(--el-color-primary);"> Thay đổi mật khẩu</h2>
            <el-form style="padding: 25px" ref="ruleFormRef" :model="form" label-position="top" :rules="rules">
                <el-form-item label="Mật khẩu cũ" prop="oldPassword" size="large" :error="ruleForm.oldPassword">
                    <el-input size="large" v-model="form.oldPassword" show-password />
                </el-form-item>

                <el-form-item label="Mật khẩu mới" prop="newPassword" size="large" :error="ruleForm.newPassword">
                    <el-input size="large" v-model="form.newPassword" show-password />
                </el-form-item>
                <el-form-item label="Nhập lại mật khẩu mới" prop="confirmPassword" size="large"
                    :error="ruleForm.confirmPassword">
                    <el-input size="large" v-model="form.confirmPassword" show-password />
                </el-form-item>
                <div style="text-align: center;">
                    <el-button size="large" type="primary" @click="onSubmit(ruleFormRef)" :loading="loading" >Thay đổi mật khẩu</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">

import type { FormInstance, FormRules } from 'element-plus';

definePageMeta({
    layout: 'viewpersonregister'
})

const ruleFormRef = ref < FormInstance > ()
const { bool: loading, setTrue: setLoading, setFalse: setLoaded } = useBoolean(false);
const form = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const ruleForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const confirmPass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Vui lòng xác nhận lại mật khẩu'))
    } else if (value !== form.newPassword) {
        callback(new Error("Mật khẩu mới không khớp"))
    } else {
        callback()
    }
}

const rules = reactive({
    newPassword: [
        { required: true, message: 'Vui lòng nhập mật khẩu mới.', trigger: 'change' },
    ],
    oldPassword: [
        { required: true, message: 'Hãy nhập mật khẩu', trigger: 'change' },
    ],
    confirmPassword: [
        { validator: confirmPass, trigger: 'change', required: true, },
    ],
})

async function onSubmit(formEl: FormInstance | undefined) {

    if (!formEl) return
    try {
        if (! await formEl.validate((valid, _) => {
            return valid;
        })) return;
        setLoading();
        const { data, error, status } = await useFetch('https://65183f73582f58d62d358659.mockapi.io/changPass', {
            method: 'POST',
            body: form,
        });

        console.log(data);
        if (status.value == "success") {
            // Handle successful        
            ElNotification({
                title: 'Đổi mật khẩu thành công',
                type: 'success',
            })
        } else if (status.value == 'error') {
            ElNotification({
                title: 'Lỗi',
                message: error.value?.data,
                type: 'error',
            })
        }

    } catch (error) {
        console.error("loi", error);
    } finally {
        setLoaded()
    }
}


</script>
<style>
.mainDiv {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    font-family: 'Open Sans', sans-serif;
}

.cardStyle {
    width: 400px;
    border-color: white;
    background: #fff;
    padding: 36px 0;
    border-radius: 4px;
    margin: 30px 0;
    box-shadow: 0px 0 2px 0 rgba(0, 0, 0, 0.25);
}


.formTitle {
    font-weight: 600;
    margin-top: 20px;
    color: #2F2D3B;
    text-align: center;
}
</style>