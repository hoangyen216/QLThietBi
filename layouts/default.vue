

<template>
    <div class="common-layout">
        <el-container>
            <!-- <el-aside width="200px" style="height: 620px">
                <el-row class="tac" style="height: 620px">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        <NuxtLink to="/">
                            <el-menu-item index="1">
                                <el-icon><icon-menu /></el-icon>
                                Danh Sách Thiết Bị
                            </el-menu-item>
                        </NuxtLink>



                        <el-menu-item index="2">
                            <el-icon>
                                <Document />
                            </el-icon>
                            <span>Đăng Ký</span>
                        </el-menu-item>
                        
                    </el-menu>
                </el-row>
            </el-aside> -->
            <el-container>
                <!-- <el-header style="text-align: right; ">
                    <el-menu class="el-menu-demo" mode="horizontal">

                        <el-menu-item @click="navigateTo('/')" index="1">Danh Sách Thiết Bị</el-menu-item>

                        <el-menu-item @click="navigateTo('/personRegister/showMain')" index="2">Đăng Ký</el-menu-item>
                    </el-menu>
                    <div style="display: inline;">
                        <client-only>
                            <el-dropdown class="el-dropdown-link" trigger="click" @command="handleCommand">
                                <el-space>
                                    <el-avatar :size="40"
                                        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                    <el-text tag="b">{{ user }}</el-text>
                                </el-space>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="logout">Đăng xuất</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </client-only>
                    </div>

                </el-header> -->

                <el-header style="display: inline-flex; align-items: center; justify-content: space-between;">
                    <el-menu  mode="horizontal" style="width: 93%;">
                        <el-menu-item @click="navigateTo('/')" index="1">Danh Sách Thiết Bị</el-menu-item>
                        <el-menu-item @click="navigateTo('/personRegister/showMain')" index="2">Đăng Ký</el-menu-item>
                        <el-menu-item  v-if="role?.includes('Manager')" @click="navigateTo('/viewManager/listPersonRegister')" index="3">Danh Sách PDK</el-menu-item>
                    </el-menu>
                    <client-only>
                        <el-dropdown class="el-dropdown-link" trigger="click" @command="handleCommand">
                            <el-space style="width: max-content">
                                <el-avatar :size="40"
                                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                <el-text tag="b">{{ user }}</el-text>
                            </el-space>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="logout">Đăng xuất</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </client-only>

                </el-header>

                <el-main>
                    <div>
                        <slot />
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { useAuth } from '~/stores/auth';
const auth = useAuth()
const user = useCookie('user')

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
<style >
.el-table .cell {

    word-break: break-word !important;

}

.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    right: 20px;
}
</style>