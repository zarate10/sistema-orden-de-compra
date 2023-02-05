import { useState, Suspense } from 'react'
import { createNewItemService, deleteNewItemService } from '../services/items.service'
import { Notificacion } from './Notificacion'
import { mostrarMensaje } from './Modal'

import './../assets/css/viewformitems.css'

const ViewFormItems = ({ estado, cambiarEstado }) => {

    const [message, setMessage] = useState([null, null])

    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [price, setPrice] = useState(null)
    const [categoria, setCategoria] = useState(null)

    const [itemId, setItemId] = useState(null)

    const handleSubmitItem = async (e) => {
        e.preventDefault()
        try {
            const response = await createNewItemService({ name, description, imgUrl, price, categoria })

            mostrarMensaje(response, setMessage)
        } catch (e) {
            console.log(e)
        }

    }

    const handleDeleteItem = async (e) => {
        e.preventDefault()
        try {
            const response = await deleteNewItemService({ itemId })
            mostrarMensaje(response, setMessage)
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <Suspense fallback={<div></div>}>
            <div className="main-form-items" style={estado ? { display: "flex" } : { display: "none" }}>
                <div className="box-forms">
                    <Notificacion msg={message[0]} bg={message[1] === 'err' ? '#ff4d4d' : '#4BB543'} />
                    <form onSubmit={handleSubmitItem}>
                        <h3>Agregar item</h3>
                        <input type="text" name='name_item' onChange={(e) => setName(e.target.value)} placeholder='Nombre del item' />
                        <input type="text" name='description' onChange={(e) => setDescription(e.target.value)} placeholder='Descripción del item' hidden />
                        <input type="text" name='img_url' onChange={(e) => setImgUrl(e.target.value)} placeholder='URL del item' />
                        <input type="number" name='price' onChange={(e) => setPrice(e.target.value)} placeholder='Precio del item' />
                        <select className="pago" name='category' placeholder='Seleccione el método de pago' defaultValue={'DEFAULT'} onChange={(e) => setCategoria(e.target.value)} required>
                            <option value="DEFAULT" disabled>Seleccione una categoría</option>
                            <option>Vehículos</option>
                            <option>Negocios</option>
                            <option>Casas</option>
                            <option>Skins</option>
                            <option>Accesorios</option>
                        </select>
                        <button type="submit" style={{ background: 'green' }}>Agregar</button>
                    </form>
                    <h3>Eliminar item</h3>
                    <form onSubmit={handleDeleteItem}>
                        <input type="number" name='item_id' onChange={(e) => setItemId(e.target.value)} placeholder='Ingrese el ID del item a eliminar' />
                        <button type="submit" style={{ background: 'red' }}>Borrar</button>
                    </form>
                </div>
                <button onClick={() => cambiarEstado(false)} style={{ marginTop: '10px' }}>Cerrar</button>
            </div>
        </Suspense>
    )
}

export default ViewFormItems