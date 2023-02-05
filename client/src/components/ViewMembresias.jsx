import React from 'react'
import { motion } from 'framer-motion'
import './../assets/css/membresias.css'

import primerPersonaje from './../assets/img/PD.png'
import segundoPersonaje from './../assets/img/PD2.png'
import bala from './../assets/img/pngegg.png'
import money from './../assets/img/money.png'
import billete from './../assets/img/billete.png'
import bg from './../assets/img/vg1.png'

function Membresia({ personaje, nombreMembresia, colorBgGaussiano, children, etiqueta, coins }) {
    return (
        <div className="wrapper-membresia">
            {
                etiqueta
                    ? <div className="etiqueta">MÁS COMPRADO</div>
                    : <></>
            }
            <div className="bg-fondo">
                <img src={bg} alt="IMG" />
            </div>

            <div className="bg-gaussiano" style={{ background: colorBgGaussiano }}></div>

            <div className="box-pj-fondo">
                <img src={personaje} alt="IMG" />
            </div>

            <div className="item item-right item-1">
                <img src={bala} alt="IMG" />
            </div>

            <div className="box-data-membresia">
                {children}
            </div>

            <div className="item item-right item-2">
                <img src={money} alt="IMG" style={{ width: "50%" }} />
            </div>

            <div className="item item-left item-3">
                <img src={billete} alt="IMG" style={{ width: "25%" }} />
            </div>

            <div className="title-membresia">
                <h1>{nombreMembresia} <span style={{ background: colorBgGaussiano }}>{coins} COINS</span></h1>
            </div>
        </div>
    )
}

export const ViewMembresias = ({ estado, cambiarEstado }) => {
    return (
        <div className="box-membresia" style={estado ? { display: 'flex' } : { display: 'none' }}>
            <Membresia personaje={primerPersonaje} nombreMembresia='VIP ORO' colorBgGaussiano='#e3e62e' coins={5}>
                <h4>Información</h4>
                <p>Membresía válida por 30 días.</p>
                <br />
                <p>Beneficios VIP ORO</p>
                <ul>
                    <li>Pagas extras en todos los trabajos</li>
                    <li>Dinero de regalo <span style={{ color: 'rgb(34, 255, 34)' }}>$10.000</span></li>
                    <li>Ingreso al Lounge VIP</li>
                    <li>Menú especial de /membresia</li>
                    <li>Dinero extra en PayDay</li>
                    <li>+1 slot para casas y negocios</li>
                    <li>+2 slots para vehículos</li>
                    <li>Límite de accesorios: 4</li>
                    <li>Límite de plantaciones: 3</li>
                    <li>Regalos aleatorios</li>
                    <li>Nombre dorado (IN-GAME)</li>
                </ul>
            </Membresia>
            <Membresia personaje={segundoPersonaje} nombreMembresia='VIP DIAMANTE' colorBgGaussiano='#2ea2e6' coins={10} etiqueta={false}>
                <h4>Información</h4>
                <p>Membresía válida por 30 días.</p>
                <br />
                <p>Beneficios VIP DIAMANTE</p>
                <ul>
                    <li>Pagas extras en todos los trabajos</li>
                    <li>Dinero de regalo <span style={{ color: 'rgb(34, 255, 34)' }}>$20.000</span></li>
                    <li>Rol de Diamond Donator en Discord</li>
                    <li>Ingreso al Lounge VIP</li>
                    <li>Menú especial de /membresia</li>
                    <li>Dinero extra en PayDay</li>
                    <li>+2 slot para casas y negocios</li>
                    <li>+4 slots para vehículos</li>
                    <li>Límite de accesorios: 6</li>
                    <li>Límite de plantaciones: 4</li>
                    <li>Regalos aleatorios</li>
                    <li>Nombre dorado (IN-GAME)</li>
                    <li>Contacto directo con el staff</li>
                </ul>
            </Membresia>
            <button onClick={() => cambiarEstado(!estado)}><i className="fa-solid fa-x"></i></button>
        </div>
    )
}
