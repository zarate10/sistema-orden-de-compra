import axios from 'axios'

const address = "http://127.0.0.1:7777"

const endpointLogin = address + "/vip/login"
const endpointRegister = address + "/vip/register"

export const loginService = async (credenciales) => { 
    const { data } = await axios.post(endpointLogin, credenciales)
    return data 
}

export const registerSerivce = async (credenciales) => { 
    const { data } = await axios.post(endpointRegister, credenciales)
    return data 
}