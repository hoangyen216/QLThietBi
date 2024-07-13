import { storeToRefs } from 'pinia';
import { useAuth } from '~/stores/auth';

function isMatchURL(to: string, match: string) {
    return to.substring(0, match.length).includes(match)
}

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuth());
    const token = useCookie('token');
    const role = useCookie('role')
    const requiredRoles = ['Admin', 'Manager'];
    if (token.value) {
        authenticated.value = true;
    }
    const toPage = to?.fullPath || ''
    console.log("fullPath", toPage);


    //if token doesn't exist redirect to log in
    if (!token.value) {
        if (!isMatchURL(toPage, '/login1')) {
            abortNavigation();
            return navigateTo('/login1');
        }
        return
    }

    if (role.value == 'User') {
        const userPageAllowed = [
            '/personRegister',
            '/Products',
            '/Cart',
        ]
        const p = userPageAllowed[1]
        if (!userPageAllowed.some((v) => isMatchURL(toPage, v)) || isMatchURL(toPage, '/login1')) {
            abortNavigation();
            return navigateTo('/Products');
        }
    }

});