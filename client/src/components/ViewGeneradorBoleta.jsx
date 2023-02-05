import { useState, Suspense } from 'react'

import './../assets/css/viewgeneradorboleta.css'
import imgColorRapi from './../assets/img/rapipago_color.png'
import imgColorPago from './../assets/img/pagofacil_color.png'
import codigoBarra from './../assets/img/codigobarras.jpg'

const ViewGeneradorBoleta = ({ estado, cambiarEstado }) => {

    const [metodo, setMetodo] = useState(imgColorRapi)
    const [importe, setImporte] = useState('')
    const [codigo, setCodigo] = useState('')
    const [fecha, setFecha] = useState('')

    return (
        <Suspense fallback={<div></div>}>
            <div className="main-wrapper-generador" style={estado ? { display: 'flex' } : { display: 'none' }}>
                <div className="left-generador">

                    <div className="box-img-generador">
                        <img src={metodo} alt="IMG BOLETA" />
                    </div>

                    <p>EMPRESA: <b>MERCADOPAGO</b></p>
                    <h3> <span style={{fontWeight: 400}}>IMPORTE A PAGAR:</span> {importe || '000'} PESOS</h3>

                    <span className='boxdata'>Deberá dictar los números que se encuentran en la parte superior del código de barras al cajero, informarle que la empresa donde se enviará el dinero es MERCADOPAGO y pagar el importe nombrado arriba. </span>

                    <h1>{ codigo.padStart(11, '0')}</h1>

                    <img src={codigoBarra} alt="CODIGO BARRAS" style={{width: '75%', marginTop: '10px'}} />
                    <p className='adv'><i className="fa-regular fa-clock"></i> Acreditación inmediata | Tienes tiempo hasta el {fecha || '00/00/00'} para hacerlo.</p>
                </div>
                <div className="right-generador">
                    <form>
                        <select 
                            id="select-metodo-pago"
                            value={metodo}
                            onChange={e => setMetodo(e.target.value)}
                        >
                            <option value={imgColorPago}>Pagofácil</option>
                            <option value={imgColorRapi}>Rapipago</option>
                        </select>

                        <input type="text" value={importe} onChange={e => setImporte(e.target.value)} placeholder='Ingresar importe' />
                        <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder='Ingresar código de barra' />
                        <input type="text" value={fecha} onChange={e => setFecha(e.target.value)} placeholder='Ingresar fecha' />
                        <div className="cerrar" onClick={() => cambiarEstado(!estado)}>Cerrar</div>
                    </form>
                </div>
            </div>
        </Suspense>
    )
}

export default ViewGeneradorBoleta