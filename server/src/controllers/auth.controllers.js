import conn from './../db.js'
import { encrypt, compare } from '../helpers/handleBcrypt.js'

async function userEnDB(user) { 
    return await conn.query('SELECT * FROM usuarios WHERE username=?', [user])
}

export const loginController = async (req, res) => { 
    try { 
        const { user, pass } = req.body 
        const userInDB = await userEnDB(user) 

        if (userInDB[0].length) { 
            const userDB = await conn.query('SELECT * FROM usuarios WHERE username=?', [user])
            const checkPass = await compare(pass, userDB[0][0].password)
            
            if (checkPass) { 
                res.send({ data: userDB[0][0] })
            } else { 
                res.send({ err: 'Usuario o contraseña inválidos.' })
                return 
            }

        } else { 
            res.send({ err: 'Usuario o contraseña inválidos.' }) // USUARIO NO REGISTRADO
            return
        } 
    } catch (e) { 
        console.log(e)
    }
}

export const registerController = async (req, res) => { 
    const regex = /['" !"#$%&/()=?¡.,}\{@´+]|°/g;
    try { 
        const { user, pass } = req.body 
        const userInDB = await userEnDB(user)

        const userInvalid = user.match(regex);
        const passInvalid = pass.match(regex);

        if (user.length < 6) { 
            res.send({ err: 'El nombre de usuario debe tener al menos 6 carácteres.'})
            return 
        }
        if (pass.length < 8) { 
            res.send({ err: 'La contraseña debe contener al menos 8 caractéres.'})
            return 
        }
        if (userInvalid !== null || passInvalid !== null) { 
            res.send({ err: 'El usuario o la contraseña tienen carácteres inválidos.'})
            return 
        } 

        if (userInDB[0].length) { 
            res.send({ err: 'El usuario se encuentra registrado.' })
            return
        } else { 
            const passwordHasheada = await encrypt(pass)

            conn.query('INSERT INTO usuarios (username, password, admin) VALUES (?, ?, ?)', [user, passwordHasheada, 0])
            res.send({ info: 'Usuario registrado correctamente.' })
            return 
        } 
    } catch (e) { 
        console.log(e)
    }
}