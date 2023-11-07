

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" style="height: 620px">
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
                    </el-menu>
                </el-row>
            </el-aside>
            <el-container>
                <!-- <el-header>Header

                </el-header > -->
                <el-header style="text-align: right;">
                    <!-- <el-autocomplete  style="text-align: left" v-model="state2" :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable
                        class="inline-input w-50" placeholder="Please Input" @select="handleSelect" /> -->
                    <client-only>
                        <el-dropdown  class="el-dropdown-link" trigger="click"
                            @command="handleCommand">
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
                </el-header>
                <!-- <el-header style="text-align: right; font-size: 12px">
                    <div class="toolbar">
                        <el-dropdown>
                            <el-icon style="margin-right: 8px; margin-top: 1px">
                                <setting />
                            </el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>View</el-dropdown-item>
                                    <el-dropdown-item>Add</el-dropdown-item>
                                    <el-dropdown-item>Delete</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <span>Tom</span>
                    </div>
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

<script lang="ts" setup>
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

</script>