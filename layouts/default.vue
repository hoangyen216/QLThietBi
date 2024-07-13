<template>
    <div class="common-layout">
        <el-container>
            <el-header
                style="display: inline-flex; align-items: center; justify-content: space-between; background-color:#c6e2ff ;">
                <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse"
                    class="border rounded-3 p-1 text-decoration-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                    Menu</a>
                <!-- <el-menu mode="horizontal" style="width: 93%;">
                    <el-menu-item @click="navigateTo('/')" index="1">Danh Sách Thiết Bị</el-menu-item>
                    <el-menu-item v-if="role?.includes('User') || role?.includes('Admin')"
                        @click="navigateTo('/personRegister/showMain')" index="2">Đăng Ký</el-menu-item>
                    <el-menu-item v-if="role?.includes('Manager') || role?.includes('Admin')"
                        @click="navigateTo('/viewManager/listPersonRegister')" index="3">Danh Sách PDK</el-menu-item>
                    <el-menu-item v-if="role?.includes('Admin')" @click="navigateTo('/viewManager/listUser')"
                        index="4">Danh Sách Người Dùng</el-menu-item>
                </el-menu> -->
                <client-only>
                    <!-- <el-badge :value="12" class="item" style="position: absolute; right: 150px;">
                        <el-icon><ShoppingCart /></el-icon>
                        <el-button >
                            <Icon name="mdi:cart-outline" width="30"
                            height="30"  style="color: black" />
                        </el-button>
                    </el-badge> -->
                    <el-dropdown class="el-dropdown-link" trigger="click" @command="handleCommand">
                        <el-space style="width: max-content">
                            <el-avatar :size="40"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                            <el-text tag="b">{{ user }}</el-text>
                        </el-space>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="logout">Đăng xuất</el-dropdown-item>
                                <el-dropdown-item> <a style=" text-decoration: none; color: #606065;"
                                        href="/changePassword">Đổi mật khẩu</a></el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </client-only>

            </el-header>
            <el-container>
                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <el-aside style="padding: 5px; background: aliceblue" id="sidebar" width="250px"
                            class="collapse collapse-horizontal show ">
                            <div class="col-auto px-0">
                                <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">

                                    <a href="/" class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                            width="24px" fill="#5f6368">
                                            <path
                                                d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
                                        </svg>
                                        <span style="padding-left: 5px;">
                                            Trang Chủ</span>
                                    </a>
                                    <a href="/devices/listDevice"
                                        class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-ui-checks" viewBox="0 0 16 16">
                                            <path
                                                d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                        <span style="padding-left: 5px;">
                                            Quản Lý Thiết Bị</span>
                                    </a>
                                    <a v-if="useCookie('role').value != 'Manager'" href="/Products"
                                        class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-journal-check" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                            <path
                                                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                            <path
                                                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                                        </svg>
                                        <span style="padding-left: 5px;">Đăng Ký</span></a>
                                    <a href="/viewManager/listPersonRegister"
                                        class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-ui-checks" viewBox="0 0 16 16">
                                            <path
                                                d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                        <span style="padding-left: 5px;">Quản Lý
                                            PDK</span></a>
                                    <a href="/viewManager/listPenaltyTicket"
                                        class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-ui-checks" viewBox="0 0 16 16">
                                            <path
                                                d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                        <span style="padding-left: 5px;">Quản Lý
                                            Phiếu Phạt</span></a>
                                    <a v-if="useCookie('role').value != 'Manager'" href="/viewManager/listAccount"
                                        class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fill-rule="evenodd"
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>
                                        <span style="padding-left: 5px;">Quản Lý Tài Khoản</span></a>
                                    <a href="/viewManager/listWarehouse"
                                        class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-ui-checks" viewBox="0 0 16 16">
                                            <path
                                                d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                        <span style="padding-left: 5px;">Quản Lý Kho Hàng</span></a>
                                    <a href="/category/listCategory"
                                        class="list-group-item border-end-0 d-inline-block text-truncate"
                                        data-bs-parent="#sidebar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-ui-checks" viewBox="0 0 16 16">
                                            <path
                                                d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                        <span style="padding-left: 5px;">Quản Lý Loại Hàng</span></a>
                                </div>
                            </div>
                            <!-- <main class="col ps-md-2 pt-2">
                                <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse"
                                    class="border rounded-3 p-1 text-decoration-none"><i
                                        class="bi bi-list bi-lg py-2 p-1"></i>
                                    Menu</a>

                            </main> -->
                        </el-aside>

                        <el-main>
                            <div>
                                <slot />
                            </div>
                        </el-main>

                    </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from '~/stores/auth';
const auth = useAuth()
const user = useCookie('account')

const role = useCookie('role').value;

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

function handleCommand(command: string) {
    if (command == 'logout')
        auth.logout();
}

</script>
<style>
.list-group {
    margin-top: 16px;
}

.list-group-item {
    border-style: none;
    background-color: transparent
}

.list-group-item:hover {
    background-color: #ecf5ff;
}

.el-table .cell,
.el-text {

    word-break: break-word !important;

}

.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    right: 20px;
}

.el-main {
    --el-main-padding: 10px;
}

.el-dialog__header {
    text-align: center;
}
</style>