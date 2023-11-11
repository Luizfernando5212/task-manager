const urls = {
    login: {
        url: 'http://localhost:3000/user/login',
        tratamento: async (data, res, setError, navigate, setUser) => {
            if (res.status === 200) {
                let user = data.user;
                user.token = data.token;
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(user._id));
                setUser(user);
                setError('');
                navigate('/dashboard');
            }
            else
                setError(data.message)
        }
    },
    register: 'http://localhost:3000/user',
    forgotPassword: {
        url: 'http://localhost:3000/user/recoveryEmail',
        tratamento: async (data, res, setError, navigate, setUser) => {
            if (res.status === 200) {
                setError('');
                navigate('/login');
            }
            else
                setError('Email not found.')
         }
    },
    updatePassword: 'http://localhost:3000/user/updatePassword',
    updateRegister: 'http://localhost:3000/user',
}

export default urls;