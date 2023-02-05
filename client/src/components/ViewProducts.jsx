import { useState, useEffect, Suspense } from 'react'
import './../assets/css/viewproducts.css'
import imgLogo from './../assets/img/logo.png'
const address = "http://127.0.0.1:7777"

const ViewProducts = ({ estado, cambiarEstado }) => {

    const [arrItems, setArrItems] = useState([])
    const [filterCategory, setFilterCategory] = useState(null)

    const showData = async () => {
        const response = await fetch(address + '/api/vip/get_items')
        const data = await response.json()
        setArrItems(data)
    }

    useEffect(() => {
        showData()
    }, [])

    let results = []

    if (filterCategory === null) {
        results = arrItems
    } else {
        results = arrItems.filter((item) => item.category === filterCategory)
    }

    return (
        <Suspense fallback={<div></div>}>
            <div className="view-products-wrapper" style={estado ? { display: 'flex' } : { display: 'none' }}>
                <div className="products-main-box">
                    <div className="img-bg">
                        <img src="https://www.somosxbox.com/wp-content/uploads/2021/11/FDblYlEXIAU_nO0.jpg" alt="IMG" />
                    </div>
                    <div className="box-css"></div>
                    <div className="top-nav">
                        <div className='tienda-logo'>
                            <h1>CATÁLOGO</h1>
                        </div>

                        <div className='btnclose' style={{ position: 'absolute', right: '2rem', cursor: 'pointer' }} onClick={() => cambiarEstado(!estado)}><i className="fa-solid fa-xmark"></i></div>
                    </div>
                    <div className="bottom-navbar">
                        <div className="box-opciones">

                            <div className="btn-icon" onClick={() => setFilterCategory('Casas')}>
                                <i className="fa-solid fa-house"></i>
                            </div>

                            <div className="btn-icon" onClick={() => setFilterCategory('Vehículos')}>
                                <i className="fa-solid fa-car"></i>
                            </div>

                            <div className="btn-icon" onClick={() => setFilterCategory('Negocios')}>
                                <i className="fa-solid fa-shop"></i>
                            </div>

                            <div className="btn-icon" onClick={() => setFilterCategory('Skins')}>
                                <i className="fa-solid fa-person"></i>
                            </div>

                            <div className="btn-icon" onClick={() => setFilterCategory('Accesorios')}>
                                <i className="fa-solid fa-hat-cowboy"></i>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-box">

                        {
                        
                        results.length
                            ? results.map((item, index) => {
                                    return (
                                        <div className={"box-product " + item.item_id} key={index}>
                                            <div className="box-coins">
                                                <span>{item.price} coins</span>
                                            </div>
                                            <div className="img-box">
                                                <img src={item.img_url} alt="IMG" />
                                            </div>
                                            <div className="info-bottom">
                                                <h4>{item.name_item}</h4>
                                                <h6>{item.category}</h6>
                                            </div>
                                        </div>
                                    )
                                })
                            : <>No hay datos para mostrar</>
                        }

                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default ViewProducts