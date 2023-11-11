const urls = {
    login: {
        url: 'https://task-manager-sgx9.onrender.com/user/login',
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
    register: 'https://task-manager-sgx9.onrender.com/user',
    forgotPassword: {
        url: 'http://localhost:3000/user/recoveryEmail',
        tratamento: async (data, res, setError, navigate, setUser) => {
            setUser({ username: '', password: '' })
            if (res.status === 200) {
                setError('');
                navigate('/login');
            }
            else
                setError('Email not found.')
        }
    },
    updatePassword: {
        url: `https://task-manager-sgx9.onrender.com/user/`,
        tratamento: async (data, res, setError, navigate, setUser) => {
            setUser({ username: '', password: '' })
            if (res.status === 200) {
                alert('Passowrd updated successfully!');
                setError('');
                navigate('/login');
            }
            else
                setError('Error.')
        }
    },
    updateRegister: 'https://task-manager-sgx9.onrender.com/user',
}

export default urls;