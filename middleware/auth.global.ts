import { storeToRefs } from 'pinia';
import { useAuth } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuth());
    const token = useCookie('token');
    const role = useCookie('role')
    const requiredRoles = ['Admin', 'Manager'];
    if (token.value) {
        authenticated.value = true;
    }

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'login1' && (role.value == "Admin" || role.value == "Manager")) {
        return navigateTo('/');
    }

    if (token.value && to?.name === 'login1' && role.value == "User") {
        return navigateTo('/Products');
    }

    // if (to.meta.requiresAuth && !userRole) {
    //     return navigateTo('/login'); // Redirect to login page
    // }

    if (!requiredRoles) {
        return navigateTo('/unauthorized'); // Redirect to unauthorized page
    }

    //if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'login1' && to?.name !== 'register2') {
        abortNavigation();
        return navigateTo('/login1');
    }
});