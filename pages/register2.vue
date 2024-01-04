<template>
    <div class="container-fluid text-center">
        <div class="row" style="height: 100vh;">
            <div class="col col_image ">
                <img class="mw-100 mh-100" src="image/signup-image.jpg" alt="sign up image"
                    style="height: 100vh; width: 400px;  object-fit: contain;">
            </div>
            <div class="col  position-relative">
                <div class="form">
                    <h2 style="color: var(--el-color-primary);">Đăng Ký</h2>
                    <el-form ref="ruleFormRef" :model="form" label-position="top" :rules="rules">
                        <el-form-item label="Tên đăng nhập" prop="username" size="large" :error="validateAsync.username">
                            <el-input v-model="form.username" />
                        </el-form-item>
                        <el-form-item label="Email" prop="email" size="large" :error="validateAsync.email">
                            <el-input v-model="form.email" />
                        </el-form-item>
                        <el-form-item label="Mật khẩu" prop="password" size="large" :error="validateAsync.password">
                            <el-input v-model="form.password" show-password />
                        </el-form-item>

                        <el-form-item label="Xác nhận mật khẩu" prop="password1" size="large"
                            :error="validateAsync.password1">
                            <el-input v-model="form.password1" show-password />
                        </el-form-item>



                        <div class="flex justify-center">
                            <el-button type="primary" @click="onSubmit(ruleFormRef)">Đăng ký</el-button>
                        </div>
                    </el-form>
                    <div style="margin-top: 20px;">
                        <el-text class="mx-1">Đã có tài khoản?</el-text>
                        <span style="display: inline;">
                            <a href="/login1">Đăng Nhập</a>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'layout1'
})

import type { FormInstance, FormRules } from 'element-plus';


useHeadSafe({ title: 'Đăng Ký' })


const ruleFormRef = ref<FormInstance>()

const form = reactive({
    username: '',
    password: '',
    password1: '',
    email: '',

})

const validateAsync = reactive({
    username: '',
    password: '',
    password1: '',
    email: '',
})

interface DangKy {
    username: string,
    password: string,
    password1: string,
    email: string,
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Hãy nhập lại mật khẩu'))
    } else if (value !== form.password) {
        callback(new Error('Mật khẩu không khớp'))
    } else {
        callback()
    }
}

const validatePass1 = (rule: any, value: any, callback: any) => {
    if (value.length < 6) {
        callback(new Error('Mật khẩu phải ít nhất 6 ký tự'))
    } else {
        callback()
    }

}


const rules = reactive<FormRules<DangKy>>({
    username: [
        { required: true, message: 'Hãy nhập tên người dùng', trigger: 'blur' },
    ],
    email: [
        { required: true, message: 'Hãy nhập email', trigger: 'blur' },
        {
            type: 'email',
            message: 'Vui lòng nhập chính xác địa chỉ email',
            trigger: ['blur', 'change'],
        },

    ],
    password: [
        { required: true, message: 'Hãy nhập mật khẩu', trigger: 'blur' },
        { validator: validatePass1, trigger: ['blur', 'change'] },
    ],

    password1: [
        { required: true, validator: validatePass, trigger: 'blur' },
    ],
})

async function onSubmit(formEl: FormInstance | undefined) {

    if (!formEl) return;


    // await formEl.validate((valid, fields) => {
    //     console.log(valid);

    //     return valid;
    // })
    console.log("hi");

    const a = await formEl.validate(async (valid) => {
        console.log("hello");

        if (valid) {
            console.log("submit");

            const { data, error, status } = await useFetchApi('/auth/register/', {
                method: 'post',
                body: form,
                watch: false,
            });

            if (data.value) {
                const { username } = data.value as { username: string }
                ElNotification({
                    title: 'Đăng ký thành công',
                    message: username,
                    type: 'success',
                })
                navigateTo('/login')
            } else if (status.value == 'error') {
                ElNotification({
                    title: 'Error',
                    message: error.value?.data,
                    type: 'error',
                })
            }
        } else {
            console.log('error submit!')
            return false
        }
    })

}


</script>
<style>
/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
    .form {
        width: 50%;
        margin-top: 120px;
    }
}

@media (max-width: 991.98px) {
    .col_image {
        display: none;
    }

}



@media (max-width: 991.98px) {
    .form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 50%;
    }
}

@media (max-width: 767.98px) {
    .form {
        width: 70%;
    }
}
</style>