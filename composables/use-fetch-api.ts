import { UseFetchOptions } from 'nuxt/dist/app/composables';
import { useAuth } from '~/stores/auth';

export const useFetchApi = (url: string, options?: UseFetchOptions<object>, noCT?: boolean) => {
    const config = useRuntimeConfig()
    const BE_URL = config.public.baseUrl
    const token = useCookie('token');

    return useFetch(url, {
        baseURL: BE_URL,
        ...options,
        async onRequest({ request, options }) {
            
            const headers = new Headers(options.headers);
            if (!noCT) {
                headers.set('Content-Type', 'application/json');
            }
            if (token.value && !request.toString().includes('auth')) {
                headers.set('Authorization', `Bearer ${token.value}`);
            }
            options.headers = headers;
        },
        async onRequestError({ request, options, error }) {
            console.error(error);
        },
        async onResponse({ request, response, options }) {
            // console.log('[fetch response]');
        },
        async onResponseError({ request, response, options }) {
            console.error(response);
            if (response.status == 401) {
                const auth = useAuth();
                auth.logout();
            }
        },
    });
};
