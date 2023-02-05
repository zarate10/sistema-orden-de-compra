import { useState } from 'react'
import { loginService, registerSerivce } from '../services/auth.services.js'

import './../assets/css/auth-form.css'
import { Notificacion } from './Notificacion.jsx'
import imagenMap from './../assets/img/map.png'
import imgRapi from './../assets/img/rapipago.png'
import imgPaypal from './../assets/img/PAYPAL.png'
import imgPagofacil from './../assets/img/PAGOFACIL.png'

const char = lon => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < lon; i++) {
        aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return aleatoria;
};

const acertijos = [
    ['Qué día está entre el Domingo y el Martes?', 'Lunes'],
    ['Veinticinco más cinco?', 'Treinta'],
    ['Veintitrés más trece?', 'Treinta y seis'],
    ['Qué día está entre el Lunes y el Miércoles?', 'Martes'],
    ['Quién es el actual campeón de la Copa Mundial de la FIFA?', 'Argentina']
]

let acertijo = acertijos[Math.floor(Math.random() * (acertijos.length - 0) + 0)]

export const AuthInterface = ({ estado, cambiarEstado, setUserSession, setEstadoProductos }) => {

    const [message, setMessage] = useState([null, null])

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [valido, setValidar] = useState('')

    const [authRender, setAuthRender] = useState(true) 


    const handleSubmitAuth = async (event, loginOrRegister) => {
        event.preventDefault() 
        try {
            let userData;

            loginOrRegister
                ? userData = await loginService({ user, pass }) 
                : userData = await registerSerivce({ user, pass })

            if (userData.data !== undefined) {
                sessionStorage.setItem("session", char(100) + 'x' + userData.data.admin + 'x' + char(50) + 'x' + userData.data.id + 'x' + char(50) + 'x' + userData.data.username + 'x' + char(50))
                setUserSession(sessionStorage.getItem('session'))

                setUser('')
                setPass('')
                cambiarEstado(!estado)
            } else {
                setMessage([userData[Object.keys(userData)[0]], Object.keys(userData)[0]])
                setTimeout(() => {
                    setMessage([null, null])
                }, 5000)
            }
        } catch (e) {
            console.log(e)
        }
    }



    // mala práctica, no se debe hacer esto, pero para ahorra tiempo: 
    const renderLoginForm = () => {
        return (
            <div className="auth-form login">
                <div className="head">
                    <h1>Ingresar</h1>
                </div>
                <div>
                </div>
                <p>Inicie sesión para poder utilizar la tienda.</p>
                <form onSubmit={(event) => handleSubmitAuth(event, true)}>
                    <input type="text" value={user} name='user' placeholder='Username' onChange={(event) => setUser(event.target.value)} required />
                    <input type="password" value={pass} name='pass' placeholder='Password' onChange={(event) => setPass(event.target.value)} required />
                    <div className="box-button">
                        <a onClick={() => setAuthRender(!authRender)}>No posee un usuario? regístrese</a>
                        <button className='btn primary' style={{ width: '30%', justifyContent: 'center' }} type="submit">Ingresar</button>
                    </div>
                </form>
                <div className="box-metodos-pago">
                    {/* <h3>Métodos de pago</h3> */}
                    <div className='contenedor-metodos'>

                        <div className="box-metodo">
                            <img src={imgRapi} alt="IMG" />
                        </div>

                        <div className="box-metodo">
                            <img src={imgPagofacil} alt="IMG" />
                        </div>

                        <div className="box-metodo">
                            <img src={imgPaypal} alt="IMG" />
                        </div>

                    </div>
                </div>

                <div className='modal' style={{ paddingTop: '2rem', height: '9vh' }}>
                    <button className='btn primary' onClick={() => setEstadoProductos(true)}><i className="fa-solid fa-tag"></i> Ver productos </button>
                </div>
            </div>
        )
    }

    const renderRegisterForm = () => {
        return (
            <div className="auth-form register">
                <div className="head">
                    <h1>Registrarse</h1>
                </div>
                <Notificacion msg={message[0]} bg={message[1] === 'err' ? '#ff4d4d' : '#4BB543'} />

                <p style={{ maxWidth: '54ch' }}>Debe de registrarse con el nombre del personaje que utiliza in game para realizar la compra de coins. Cualquier error, haga un ticket en discord y pase el número del ticket otorgado por la tienda vip.</p>

                <form onSubmit={(event) => handleSubmitAuth(event, false)}>
                    <input type="text" value={user} name='user' placeholder='Username' onChange={(event) => setUser(event.target.value)} required />
                    <input type="password" value={pass} name='pass' placeholder='Password' onChange={(event) => setPass(event.target.value)} style={{ marginBottom: '20px' }} required />

                    <small style={{ color: 'gray', fontSize: '12px' }}>{acertijo[0]}</small>

                    <input type="text" value={valido} name='validacion' placeholder='Respuesta' onChange={(event) => setValidar(event.target.value)} required />

                    <div className="box-button">
                        <a onClick={() => setAuthRender(!authRender)}>Inicie sesión</a>
                        {
                            valido.toUpperCase() === acertijo[1].toUpperCase()
                                ? <button className='btn primary' style={{ width: '30%', justifyContent: 'center' }} type="submit">Registrarse</button>
                                : <div className='btn' style={{ width: '30%', justifyContent: 'center', background: '#121e29', color: 'gray' }}>Registrarse</div>
                        }
                    </div>
                </form>
            </div>
        )
    }



    return (
        <>
            <Notificacion msg={message[0]} bg={message[1] === 'err' ? '#ff4d4d' : '#4BB543'} />
            <div className='auth-overlay' style={estado ? { display: "flex" } : { display: "none" }}>
                <div className="box-img-auth">
                    <img src={imagenMap} alt="IMG" />
                </div>
                <div className="contenedor">
                    {
                        authRender
                            ? renderLoginForm()
                            : renderRegisterForm()
                    }
                </div>
            </div>
        </>
    )
}