import './../assets/css/background.css'
import personajeFondo from './../assets/img/person.png'
import lineas from './../assets/img/lineas.svg'


export const Background = () => { 

    return (
            <div className='bg-container'>
                <div className="fondo">
                    <img src={personajeFondo} alt="IMG" />
                </div>
                <div className="lineas object" >
                    <img src={lineas} alt="IMG" />
                </div>
            </div> 
    )
}
