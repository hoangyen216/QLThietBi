

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        
                        <el-menu-item index="1">
                            <el-icon><icon-menu /></el-icon>
                            <span @click="showDevice">Danh Sách Thiết Bị </span>
                        </el-menu-item>
                        <!-- <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>Navigator One</span>
                            </template>
                            <el-menu-item-group title="Group One">
                                <el-menu-item index="1-1">item one</el-menu-item>
                                <el-menu-item index="1-2">item two</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Group Two">
                                <el-menu-item index="1-3">item three</el-menu-item>
                            </el-menu-item-group>
                            <el-sub-menu index="1-4">
                                <template #title>item four</template>
                                <el-menu-item index="1-4-1">item one</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu> -->
                        <!-- <el-menu-item index="3" disabled>
                            <el-icon>
                                <document />
                            </el-icon>
                            <span>Navigator Three</span>
                        </el-menu-item> -->
                        <el-menu-item index="2">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>Đăng Ký</span>
                        </el-menu-item>
                    </el-menu>
                </el-row>
            </el-aside>
            <el-container>
                <!-- <el-header>Header

                </el-header> -->
                <el-main>
                    <div>
                        <slot />
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<!-- <script lang="ts" setup>
import { ShowDevice } from '#build/components';
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
const handleClick = () => {
    console.log('click')
}
</script> -->