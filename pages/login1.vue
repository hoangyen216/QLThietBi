<template>
    <div class="container-fluid text-center">
        <div class="row" style="height: 100vh;">
            <div class="col col_image ">
                <img class="mw-100 mh-100" src="image/signup-image.jpg" alt="sign up image"
                    style="height: 100vh; width: 400px;  object-fit: contain;">
            </div>
            <div class="col  position-relative">
                <div class="form">
                    <h2 style="color: var(--el-color-primary);">Đăng Nhập</h2>
                    <el-form ref="ruleFormRef" :model="form" label-position="top" :rules="rules">
                        <el-form-item label="Tên đăng nhập" prop="username" size="large" :error="validateAsync.username">
                            <el-input v-model="form.username" />
                        </el-form-item>

                        <el-form-item label="Mật khẩu" prop="password" size="large" :error="validateAsync.password">
                            <el-input v-model="form.password" show-password @keyup.enter="onSubmit(ruleFormRef)"/>
                        </el-form-item>

                        <div class="flex justify-center">
                            <el-button type="primary" @click="onSubmit(ruleFormRef)" :loading="loading">Đăng nhập</el-button>
                        </div>
                    </el-form>
                    <div style="margin-top: 20px;">
                        <el-text class="mx-1">Chưa có tài khoản?</el-text>
                        <span style="display: inline;">
                            <a href="/register2">Đăng Ký</a>
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

import { FormInstance } from 'element-plus';
import { useAuth } from '~/stores/auth';

useHeadSafe({ title: 'Đăng Nhập' })
const auth = useAuth();

const { bool: loading, setTrue: setLoading, setFalse: setLoaded } = useBoolean(false);

const ruleFormRef = ref<FormInstance>()

const form = reactive({
    username: 'admin1',
    password: '@Test123456',
})

const validateAsync = reactive({
    username: '',
    password: '',

})



const rules = reactive({
    username: [
        { required: true, message: 'Hãy nhập tên người dùng', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Hãy nhập mật khẩu', trigger: 'blur' },
    ],
   
})

async function onSubmit(formEl: FormInstance | undefined) {

    if (!formEl) return
    try {
        if (! await formEl.validate((valid, _) => {
            return valid;
        })) return;
        setLoading()
        await auth.login(form)
        navigateTo('/')
    } catch (error) {
        console.error("loi",error);
    } finally {
        setLoaded()
    }
}


</script>
<style>
/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
    .form {
        width: 50%;
        margin-top: 150px;
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
    .form{
        width: 70%;
    }
}
</style>