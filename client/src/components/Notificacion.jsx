import './../assets/css/notificacion.css'

export const Notificacion = ({ msg, bg }) => { 
    return ( 
        <div className="wrapper-notify" style={ 
            msg != null 
            ? {display: "flex"} 
            : {display: "none"} 
        }>
            <div className="notify-container" style={ 
                msg != null 
                ? {background: bg} 
                : {} 
            }>
                <p>{ msg }</p>
            </div>
        </div>
    )
}
