<template>
    <div class="d-flex">
        <div class="dropdown flex-fill px-4 px-sm-0">
            <!-- <a class="btn btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">SORT BY              
            </a> -->
            <el-select clearable v-model="selectWarehouse" filterable placeholder="Lọc theo kho"
                style="width: 150px; margin-right: 5px;">
                <el-option v-for="item in dataWareHouse" :key="item.warehouseId" :label="item.warehouseDescr"
                    :value="item.warehouseId" />
            </el-select>
        </div>

    </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.btn-light {
    color: black !important;
    background: white;
    border-radius: 0 !important;
    border: 1px solid grey !important;
}

.dropdown-menu {
    background-color: #F8F8F8 !important;
    color: #2c3539 !important;
}

.dropdown-menu>a:hover {
    background-color: #dae0e5;
    cursor: pointer
}
</style>