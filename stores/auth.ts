import { defineStore } from 'pinia'

interface UserPayloadInterface {
    username: string;
    password: string;
}

interface LoginInfo {
    data: {
        token:string;
        username: string;
        expiration: string;
        roles:string[];
    }
    succeeded: boolean;
    message: string
    errors?: string

}

export const useAuth = defineStore('auth', () => {
    const authenticated = ref(false);
    const loading = ref(false);

    async function login({ username, password }: UserPayloadInterface) {
        const { data, pending, error } = await useFetchApi('/auth/login/', {
            method: 'post',
            body: {
                username,
                password,
            },
        });
        loading.value = pending.value;
        if (data.value) {
            const userinfo = data.value as LoginInfo
            const token = useCookie('token');
            token.value = userinfo.data.token;
            const user = useCookie('user');
            user.value = userinfo.data.username;  
            const role = useCookie('role');
            role.value = JSON.stringify(userinfo.data.roles) ;
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