<template>
    <el-row>
        <el-col :span="10"
            style="background-color: white; border-radius: 20px;padding: 29px 50px;;min-height: 100vh;box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px;margin: 14px 8px 14px 14px;">
            <h4 style="color:#0d82dc">Chi Tiết Phiếu Đăng Ký</h4>
            <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px"
                style=" margin-top: 30px;margin-bottom: 69px;" :rules="rules">
                <el-form-item label="Ngày mượn" prop="borrowDate">
                    <el-date-picker v-model="dynamicValidateForm.borrowDate" type="date" label="Pick a date"
                        placeholder="Pick a date" style="width: 100%" format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="Ngày Hẹn Trả" prop="returnDate">
                    <el-date-picker v-model="dynamicValidateForm.returnDate" type="date" label="Pick a date"
                        placeholder="Pick a date" format="DD-MM-YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                </el-form-item>
                <el-form-item label="Ghi Chú" prop="notice">
                    <el-input style="min-height: 64px;" v-model="dynamicValidateForm.notice" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">Đăng Ký Mượn</el-button>
                    <!-- <el-button @click="resetForm(formRef)">Xóa Phiếu</el-button> -->
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="13"
            style="background-color: white; border-radius: 20px;padding: 29px;min-height: 100vh;box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px;margin: 14px 0px;">
            <h4 style="color:#0d82dc;margin-bottom: 28px;">Chi Tiết Thiết Bị Mượn</h4>
            <!-- {{ store.cartItems }} -->
            <div style="display: flex;margin-top: 20px; margin-bottom: 20px; " v-for="item in store.cartItems"
                :key="item.deviceDescr">
                <!-- <CartItem :item="item" /> -->
                <img :src="item.image" style="width: 150px; height: 130px;" alt="cart-item" title="cart-item">
                <div style="padding:15px 20px;">
                    <h4>Tên: {{ item.deviceDescr }}</h4>
                    <!-- <el-input-number :v-model="item.quantity"  :min="0" :max="10" /> -->
                    <div class="card-actions">
                        <div class="btn-group" style="border: 1px solid #0d6efd;">
                            <button class="btn btn-primary" @click="store.remove(item.deviceID)">
                                -
                            </button>
                            <button class="btn btn-ghost no-animation">
                                {{ item.quantity }}
                            </button>
                            <button class="btn btn-primary" @click="store.add(item.deviceID, item)">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <el-button type="danger" style="position: relative;top: 38px;left: 166px;width: 50px;height: 47px;"
                    @click="store.removes(item.deviceID)">
                    <Icon name="mingcute:delete-2-line" size="2em" />
                </el-button>
                <!-- <div class="col2 col-xl-2 col-lg-2 col-md-2 col-sm-2 pt-4">
                    <span class="remove-btn" style="cursor: pointer;" @click="store.outCart(item.id!)">remove</span>
                </div> -->
            </div>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
definePageMeta({
    layout: 'viewpersonregister'
})
useHeadSafe({ title: 'Trang Giỏ Hàng' })
const store = useMainStore()
const formRef = ref<FormInstance>()

const dynamicValidateForm = reactive({
    borrowDate: '',
    returnDate: '',
    notice: ''
})



const validateNgayTra = (rule: any, value: any, callback: any) => {
    if (value < dynamicValidateForm.borrowDate) {
        callback(new Error('Ngày trả phải lớn hơn ngày mượn'));
    } else {
        callback();
    }
}

const currentDate = new Date();
const validateNgayMuon = (rule: any, value: any, callback: any) => {
    if (value < currentDate) {
        callback(new Error('Ngày trả phải lớn hơn ngày hiện tại'));
    } else {
        callback();
    }
}

console.log(currentDate);


const rules = reactive({
    returnDate: [
        { validator: validateNgayTra, trigger: 'blur' },
        {
            required: true,
            message: 'Vui lòng chọn ngày trả ',
            trigger: 'blur',
        },
    ],
    borrowDate: [
        { validator: validateNgayMuon, trigger: 'blur' },
        {
            required: true,
            message: 'Vui lòng chọn ngày mượn ',
            trigger: 'blur',
        },
    ]
})
async function submitForm(ruleformref: FormInstance | undefined) {

    const detailDevice = store.cartItems.map(({ deviceID, quantity, warehouseID }) => ({ deviceID, quantity, warehouseID }));
    if (!detailDevice) return
    if (!ruleformref) return;
    await ruleformref.validate(async (valid, fields) => {
        if (valid) {
            const { error, status } = await useFetchApi('/regist/create', {
                method: 'POST',
                server: false,
                body: {
                    listRegist: detailDevice,
                    warehouseID: detailDevice[0].warehouseID,
                    borrowDate: dynamicValidateForm.borrowDate,
                    returnDate: dynamicValidateForm.returnDate,
                    notice: dynamicValidateForm.notice,
                    userId: useCookie('userID')
                },
                watch: false
            })
            if (status.value == 'success') {
                ElNotification({
                    title: 'Đã gửi biểu mẫu đăng ký',
                    message: '',
                    type: 'success',
                })
                store.removeAll()
                navigateTo('/Products')
                return true;

            } else if (status.value == 'error') {
                ElNotification({
                    title: 'Error',
                    message: error.value?.data,
                    type: 'error',
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>
<style scoped lang="scss">
.remove-btn {
    border-radius: 50%;
    content: url('../assets/multiply.png');

    :hover {
        background-color: grey;
    }
}
</style>