<template>

<el-card shadow="never">


            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
                <el-table-column type="index"  label="STT" />
                <el-table-column prop="userName" label="Tên Tài Khoản" />
                <el-table-column prop="email" label="Email" />
                <el-table-column  prop="roles" label="Role" >

                    <template #default="scope">
                        <el-text class="mx-1" v-if="(scope.row.roles.length ==3)">Admin </el-text>
                        <!-- <el-text class="mx-1" v-if="(scope.row.roles.includes('Manager')==false) ">User </el-text> -->
                    </template>

                </el-table-column>
                <!-- <el-form-item label="ThietBi" prop="thietBi">
                    <el-select v-model="value" filterable placeholder="Select" style="width: 300px">
                        <el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <p>{{ value }}</p>      -->
            </el-table>

        <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]" :background=true
            layout="sizes, prev, pager, next" :total="total" style="margin-top: 25px" />
        </el-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

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
    }
});
watch(data, (x) => {
    if (!x)
        return

    const newData = x as { itemCount: number, data: any };
    tableData.value = newData?.data 
    total.value = newData.itemCount;
    console.log( 'in',tableData.value[1].roles.length );
})




</script>

