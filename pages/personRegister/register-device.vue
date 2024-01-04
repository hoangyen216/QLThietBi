<template>
    <div class="container text-center">
        <el-text tag="b" style="font-size: x-large; ">Đăng Ký Mượn Thiết Bị </el-text>

        <div class="row justify-content-center">
            <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" style=" margin-top: 30px" class="form"
                :rules="rules">

                <div style="display:flex; flex-direction:row;" v-for="(device, index) in dynamicValidateForm.devices">
                    <el-form-item :prop="'devices.' + index + '.tenTB'" label="Tên thiết bị" :rules="{
                        required: true,
                        message: 'Vui lòng nhập tên thiết bị',
                        trigger: 'blur',
                    }">
                        <!-- <el-input v-model="device.tenTB" style="width: 300px" /> -->
                        <el-select v-model="device.tenTB" filterable placeholder="Chọn thiết bị" style="width: 300px">
                            <el-option v-for="item in optionss" :key="item.tenTB" :label="item.tenTB" :value="item.tenTB">
                                <span style="float: left">{{ item.tenTB }}</span>
                                <span style="
                            float: right;
                            font-size: 13px;
                            ">{{ item.soLuong }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :prop="'devices.' + index + '.soLuong'" label="SoLuong" label-width="80px"
                        :rules="[{ validator: validateSoLuong, trigger: 'blur' }]">
                        <el-input-number v-model="device.soLuong" :min="0" :max="100" controls-position="right" />
                    </el-form-item>

                    <el-button style="margin-left: 20px;" v-if="index != -1" circle @click.prevent="removeDomain(device)"
                        class="mb-6">
                        <Icon name="material-symbols:delete" size="20" />
                    </el-button>
                </div>
                <el-form-item>
                    <el-button type="primary" plain @click="addDomain">
                        <Icon name="mdi:plus" class="mr-2" size="20" />
                        Thêm Thiết Bị
                    </el-button>
                </el-form-item>
                <el-form-item label="Ngày mượn" prop="ngayMuon">
                    <el-col :span="17">
                        <el-date-picker v-model="dynamicValidateForm.ngayMuon" type="date" label="Pick a date"
                            placeholder="Pick a date" style="width: 100%" format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
                    </el-col>
                </el-form-item>
                <el-form-item label="Ngày Trả" prop="ngayTra">
                    <el-col :span="17">
                        <el-date-picker v-model="dynamicValidateForm.ngayTra" type="date" label="Pick a date"
                            placeholder="Pick a date" format="DD-MM-YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">Submit</el-button>
                    <el-button @click="resetForm(formRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

 


<script lang="ts" setup>

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const user = useCookie('user')
useHeadSafe({ title: 'Đăng ký Mượn Thiết Bị' })


interface Option {
    tenTB: string,
    soLuong: string,
}

const optionss = ref<Option[]>()

const value = ref(0)

const { data, pending } = await useFetchApi('pdk/select', {
    method: 'GET',
    server: false,
});
optionss.value = data.value as Option[]
console.log("list", data.value)


const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<PhieuDangKy>({
    devices: [
        {

            tenTB: '',
            soLuong: 0
        },
    ],
    ngayMuon: '',
    ngayTra: '',
})

interface PhieuDangKy {
    devices: DomainItem[]
    ngayMuon: string,
    ngayTra: string
}

interface DomainItem {

    tenTB: string
    soLuong: number
}

const removeDomain = (item: DomainItem) => {
    const index = dynamicValidateForm.devices.indexOf(item)
    if (index !== -1) {
        dynamicValidateForm.devices.splice(index, 1)
    }
}



const addDomain = () => {
    dynamicValidateForm.devices.push({
        // key: Date.now(),
        tenTB: '',
        soLuong: 0,
    })

}
const validateNgayTra = (rule: any, value: any, callback: any) => {
    if (value < dynamicValidateForm.ngayMuon) {
        callback(new Error('Ngày trả phải lớn hơn ngày mượn'));
    } else {
        callback();
    }
}
const rules = reactive<FormRules<PhieuDangKy>>({
    ngayTra: [
        { validator: validateNgayTra, trigger: 'blur' },
        {
            required: true,
            message: 'Vui lòng chọn ngày trả ',
            trigger: 'blur',
        },
    ],
    ngayMuon: [
        {
            required: true,
            message: 'Vui lòng chọn ngày mượn ',
            trigger: 'blur',
        },
    ]
})

const validateSoLuong = (rule: any, value: any, callback: any) => {
    if (value === null) {
        callback(new Error('Hãy nhập vào số lượng'))
    } else if (value < 1) {
        callback(new Error("Số lượng > 0"))
    }
    // else if (value >  ) {
    //     callback(new Error("Số lượng lơn hơn giá trị hiện có"))
    // }
    else {
        callback()
    }
}

async function submitForm() {



    if (!formRef.value) return false;
    try {
        if (! await formRef.value.validate((valid, fields) => {
            return valid;
        })) return false;
    } catch (error) {
        return false;
    }

    const { error, status } = await useFetchApi('pdk/register', {
        method: 'POST',
        server: false,
        body: {
            devices: dynamicValidateForm.devices,
            ngayMuon: dynamicValidateForm.ngayMuon,
            ngayTra: dynamicValidateForm.ngayTra,
            userName: user.value
        },
        watch: false
    })
    if (status.value == 'success') {
        ElNotification({
            title: 'Đã gửi biểu mẫu đăng ký',
            message: '',
            type: 'success',
        })
        navigateTo('/personRegister/showMain')
        return true;

    } else if (status.value == 'error') {
        ElNotification({
            title: 'Error',
            message: error.value?.data,
            type: 'error',
        })
    }

}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style scoped>
.device {
    border: 1px solid rgb(201, 199, 199);
    padding: 15px 0 0 35px;
    margin-bottom: 10px;
}

.sponsor-form {
    max-width: 1000px;
    margin: 14px 5px;
}

.sponsor-form h3 {
    font-size: 22px;
    font-weight: medium;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 20px;
}

.sponsor-form .el-divider {
    margin-top: 0;
}

.sponsor-form .el-grid {
    justify-content: center;
    align-items: center;
}

.sponsor-form .el-form-item {
    margin-bottom: 0;
}

.sponsor-form .el-select {
    width: 100%;
}

.sponsor-form .el-input-number {
    width: 100%;
}

.sponsor-form .el-button--circle {
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 6px;
}

.sponsor-form .el-button--add {
    margin-top: 20px;
}

@media (min-width: 992px) {
    .form {
        width: 50%;
    }
}
</style>