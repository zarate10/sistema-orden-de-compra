import './../assets/css/header.css'
import logo from './../assets/img/logo.png'

export const Header = ({ dataSession, setEstadoTicketsAdmin, estadoTicketsAdmin, setViewItemsAdm, setViewGenerador }) => {

    function renderBotonAdmin(admin) {
        if (admin) {
            return (
                <>
                    <li><a onClick={() => setEstadoTicketsAdmin(!estadoTicketsAdmin)} style={{ cursor: 'pointer' }}><i className="fa-solid fa-ticket"></i> Ver Tickets</a></li>
                    <li><a onClick={() => setViewItemsAdm(true)} style={{ cursor: 'pointer' }}><i className="fa-solid fa-folder-plus"></i> Gestionar ITEMS</a></li>
                    <li><a onClick={() => setViewGenerador(true)} style={{ cursor: 'pointer' }}><i className="fa-solid fa-clipboard-list"></i> Crear boletas</a></li>
                </>
            )
        }
    }

    { dataSession !== null ? renderBotonAdmin(dataSession.admin, setEstadoTicketsAdmin, estadoTicketsAdmin, setViewItemsAdm) : <></> }

    return (
        <header>
            <a href="#" rel="noopener noreferrer">
                <img src={logo} alt="IMG" />
            </a>
            <nav>
                <ul>
                    <li><a href="#" rel="noopener noreferrer"><i className="fa-solid fa-house"></i> Inicio</a></li>
                    <li><a href="#" rel="noopener noreferrer"><i className="fa-sharp fa-solid fa-comment"></i> Foro</a></li>
                    {dataSession !== null ? renderBotonAdmin(dataSession.admin) : <></>}
                    <li><a href="/" rel="noopener noreferrer" className="active"><i className="fa-solid fa-store"></i> Tienda</a></li>
                </ul>
            </nav>
        </header>
    )
}