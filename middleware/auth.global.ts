import { storeToRefs } from 'pinia';
import { useAuth } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuth());
    const token = useCookie('token');

    if (token.value) {
        authenticated.value = true;
    }

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'login1') {
        return navigateTo('/');
    }

    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'login1' && to?.name !== 'register2') {
        abortNavigation();
        return navigateTo('/login1');
    }
});