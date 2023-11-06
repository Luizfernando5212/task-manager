const loginFields = [{
    name: 'username',
    id: 'usuario',
    placeholder: 'Seu usuario'
},
{
    name: 'password',
    id: 'senha',
    placeholder: 'Sua senha',
    type: 'password'
}]

const forgotFields = [{
    name: 'email',
    id: 'email',
    placeholder: 'Seu email',
    type: 'email'
}]

const updatePasswordFields = [{
    name: 'password',
    id: 'senha',
    placeholder: 'Sua senha',
    type: 'password'
},
{
    name: 'confirmPassword',
    id: 'confirmPassword',
    placeholder: 'Confirme sua senha',
    type: 'password'
}]

const registerFields = [{
    name: 'username',
    id: 'usuario',
    placeholder: 'Seu usuario'
},
{
    name: 'email',
    id: 'email',
    placeholder: 'Seu email',
    type: 'email'
},
{
    name: 'name',
    id: 'nome',
    placeholder: 'Seu nome'
},
{
    name: 'role',
    id: 'role',
    placeholder: 'Seu cargo'
}]

const updateRegisterFields = [{
    name: 'username',
    id: 'usuario',
    placeholder: 'Seu usuario'
},
{
    name: 'name',
    id: 'nome',
    placeholder: 'Seu nome'
},
{
    name: 'role',
    id: 'role',
    placeholder: 'Seu cargo'
}]

const returnFields = (type) => {
    switch (type) {
        case 'login':
            return loginFields;
        case 'forgotPassword':
            return forgotFields;
        case 'updatePassword':
            return updatePasswordFields;
        case 'register':
            return registerFields;
        case 'updateRegister':
            return updateRegisterFields;
        default:
            return loginFields;
    }
}

export { returnFields };