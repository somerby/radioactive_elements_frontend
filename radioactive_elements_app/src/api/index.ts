import { NavigateFunction } from 'react-router-dom';
import { Api } from './Api';
import { ROUTES } from '../Routes';

export const api = new Api({
    baseURL: 'http://localhost:3000/api',
});

export const setupInterceptors = (navigate: NavigateFunction) => {
    api.instance.interceptors.response.use(
        (response) => (response),
        (error) => {
            if (error.response.status === 403) {
                navigate(ROUTES.FORBIDDEN)
            } else if (error.response.status === 404) {
                navigate(ROUTES.NOT_FOUND)
            }
            return Promise.reject(error)
        }
    )
}
