import { defineStore } from 'pinia'

interface UserPayloadInterface {
    account: string;
    password: string;
}

interface LoginInfo {
    data: {
        token: string,
        account: string,
        roleID: number,
        role: string,
        randomPassword: boolean,
        userID: number
    }
    succeeded: boolean;
    message: string
    errors?: string

}

export const useAuth = defineStore('auth', () => {
    const authenticated = ref(false);
    const loading = ref(false);

    async function login({ account, password }: UserPayloadInterface) {
        const { data, pending, error } = await useFetchApi('/user/login', {
            method: 'post',
            body: {
                account,
                password,
            },
        });
        loading.value = pending.value;
        if (data.value) {
            const userinfo = data.value as LoginInfo
            const token = useCookie('token');
            token.value = userinfo.data.token;
            const account = useCookie('account');
            account.value = userinfo.data.account;
            const role = useCookie('role');
            role.value = userinfo.data.role;
            const roleID = useCookie<number>('roleID');
            roleID.value = userinfo.data.roleID;
            const randomPassword = useCookie<boolean>('randomPassword');
            randomPassword.value = userinfo.data.randomPassword;
            const userID = useCookie<number>('userID');
            userID.value = userinfo.data.userID;

            authenticated.value = true;

        } else if (error.value) {
            const msg = error.value.statusCode == 401 ? 'Tên đăng nhập hoặc mật khẩu không đúng' : error.value.data

            ElNotification({
                title: 'Error',
                message: msg,
                type: 'error',
            })
        }
    }

    function logout() {
        authenticated.value = false;
        const token = useCookie('token');
        token.value = null;
        const refresh = useCookie('refresh');
        refresh.value = null;
        navigateTo('/login1');
    }

    return {
        authenticated,
        loading,
        login,
        logout,
    }
});