import api from '../api';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.refreshToken();
        setAuth(prev => {
            return { ...prev,loaded: true, accessToken: response.data.accessToken, user: response.data.user }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;