<template>
    <!-- <div class="user">
        <img data-bs-toggle="modal" data-bs-target="#userModal" width="25" height="25"
            src="https://img.icons8.com/ultraviolet/40/gender-neutral-user.png" alt="gender-neutral-user"
            title="gender-neutral-user" />
    </div> -->
    <el-dropdown class="el-dropdown-link" trigger="click" @command="handleCommand">
        <el-space style="width: max-content">
            <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <el-text tag="b">{{ user }}</el-text>
        </el-space>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="logout">Đăng xuất</el-dropdown-item>
                <el-dropdown-item> <a style=" text-decoration: none; color: #606065;" href="/changePassword">Đổi mật
                        khẩu</a></el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
const auth = useAuth()
const user = useCookie('account')

const role = useCookie('role');

function handleCommand(command: string) {
    if (command == 'logout')
        auth.logout();
}


</script>