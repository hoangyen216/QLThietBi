<template>
    <el-text tag="b" style="font-size: x-large; margin-left: 250px;">Đăng Ký Mượn Thiết Bị </el-text>
    <!-- <el-form ref="ruleFormRef" :model="modelForm" label-width="150px" style="margin-top: 30px" class="demo-ruleForm"
        :rules="rules" status-icon>
        <div style="display:flex; flex-direction:row;" v-for="(item) in modelForm.sponsors" >
            <el-form-item label="Tên thiết bị" prop="tenTB">
                <el-input v-model="item.tenTB" />
            </el-form-item>
            <el-form-item label="Số lượng" prop="soLuong">
                <el-input-number v-model="item.soLuong" :min="1" :max="100" controls-position="right" />
            </el-form-item>
            <el-form-item>
                <el-button v-if="index != 0" circle @click="removeItem(index)" class="mb-6">
                    <Icon name="material-symbols:delete" size="20" />
                </el-button>
            </el-form-item>
        </div>
        <el-form-item>

            <el-button @click="addItem">
                <Icon name="mdi:plus" class="mr-2" size="20" />
                Thêm Thiết Bị
            </el-button>
        </el-form-item>
        <el-form-item label="Ngày mượn">
            <el-col :span="13">
                <el-form-item prop="ngayMuon">
                    <el-date-picker v-model="modelForm.ngayMuon" type="date" label="Pick a date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="Ngày Trả">
            <el-col :span="13">
                <el-form-item prop="ngayTra">
                    <el-date-picker v-model="modelForm.ngayTra" type="date" label="Pick a date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                Đăng Ký Mượn
            </el-button>
        </el-form-item>
    </el-form> -->
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" style="margin-top: 30px;">

        <div style="display:flex; flex-direction:row;" v-for="(device, index) in dynamicValidateForm.devices"
            :key="device.key">
            <el-form-item :prop="'devices.' + index + '.tenTB'" label="Tên thiết bị" :rules="{
                required: true,
                message: 'Vui lòng nhập tên thiết bị',
                trigger: 'blur',
            }">
                <el-input v-model="device.tenTB" />
            </el-form-item>
            <el-form-item :prop="'devices.' + index + '.soLuong'" label="SoLuong"
                :rules="[{ validator: validateSoLuong, trigger: 'blur' }]">
                <el-input-number v-model="device.soLuong" :min="0" :max="100" controls-position="right" />
            </el-form-item>
            <el-form-item>
                <el-button v-if="index != -1" circle @click.prevent="removeDomain(device)" class="mb-6">
                    <Icon name="material-symbols:delete" size="20" />
                </el-button>
            </el-form-item>
        </div>
        <el-form-item>
            <el-button @click="addDomain">
                <Icon name="mdi:plus" class="mr-2" size="20" />
                Thêm Thiết Bị
            </el-button>
        </el-form-item>
        <el-form-item label="Ngày mượn" prop="ngayMuon" :rules="[
            {
                required: true,
                message: 'Vui lòng chọn ngày mượn ',
                trigger: 'blur',
            },

        ]">
            <el-col :span="13">
                <el-form-item prop="ngayMuon">
                    <el-date-picker v-model="dynamicValidateForm.ngayMuon" type="date" label="Pick a date"
                        placeholder="Pick a date" style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="Ngày Trả" prop="ngayTra" :rules="[
            {
                required: true,
                message: 'Vui lòng chọn ngày trả ',
                trigger: 'blur',
            },

        ]">
            <el-col :span="13">
                <el-form-item prop="ngayTra">
                    <el-date-picker v-model="dynamicValidateForm.ngayTra" type="date" label="Pick a date"
                        placeholder="Pick a date" style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
            <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

 <!-- <script lang="ts" setup >
import { FormRules } from 'element-plus';

interface Props {
    value?: ApiManagement.Sponsor[];
}

const props = withDefaults(defineProps<Props>(), {
    value: () => [],
});


const modelForm = reactive({
    sponsors: props.value,
    ngayMuon: '',
    ngayTra: ''
});

watch(
    () => props.value,
    newValue => {
        modelForm.sponsors = newValue;
    }
);

const removeItem = (index: number) => {
    modelForm.sponsors.splice(index, 1)
}

const addItem = () => {
    modelForm.sponsors.push({ tenTB: '', soLuong: 0 })
}

const rules = reactive<FormRules>({
  tenTB: [
    { required: true, message: 'Vui lòng nhập tên thiết bị', trigger: 'blur' },

  ],
})
</script>  -->


<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
    devices: DomainItem[]
    ngayMuon: string,
    ngayTra: string
}>({
    devices: [
        {
            key: 1,
            tenTB: '',
            soLuong: '',
        },
    ],
    ngayMuon: '',
    ngayTra: '',
})

interface DomainItem {
    key: number
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
        key: Date.now(),
        tenTB: '',
        soLuong: 0,
    })

}

const validateSoLuong = (rule: any, value: any, callback: any) => {
    if (value === null) {
        callback(new Error('Hãy nhập vào số lượng'))
    } else if (value < 1) {
        callback(new Error("Số lượng > 0"))
    } else {
        callback()
    }
}

async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
    const { error, status } = await useFetch('https://65183f73582f58d62d358659.mockapi.io/formregister/', {
        method: 'POST',
        server: false,
        body: {
            devices: dynamicValidateForm.devices,
            ngayMuon: dynamicValidateForm.ngayMuon,
            ngayTra: dynamicValidateForm.ngayTra

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
<style>
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
</style>