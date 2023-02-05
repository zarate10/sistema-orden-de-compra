import conn from './../db.js'

export const createNewItemCtrl = async (req, res) => { 

    const { name_item, description, img_url, price, category } = req.body

    if (name_item.length < 5) { 
        res.send({ err: 'El nombre debe tener más de cinco carácteres.' })
        return
    }

    if (img_url.length < 10) { 
        res.send({ err: 'Se debe colocar una URL correcta.' })
        return
    }

    if (price < 1) { 
        res.send({ err: 'El precio del item no puede ser negativo' })
        return
    }

    if (category.length < 3) { 
        res.send({ err: 'Debe tener seleccionada una categoría' })
        return
    }

    try { 
        await conn.query(
            'INSERT INTO items (name_item, description, img_url, price, category) VALUES (?, ?, ?, ?, ?)', 
            [
                name_item, 
                description, 
                img_url, 
                price, 
                category 
            ])
    } catch (e) { 
        console.log(e)
    }
    res.send({ info: 'Item cargado exitosamente.'})
    return 
}

export const deleteItemCtrl = async (req, res) => { 
    try { 
        const [ itemInDb ] = await conn.query('SELECT * FROM items WHERE item_id=?', [req.body.id_item])
    
        if (!itemInDb.length) { 
            res.send({ err: 'El item no se encuentra dentro de la base de datos.' })
            return 
        }
        await conn.query('DELETE FROM items WHERE item_id=?', [req.body.id_item])
    } catch(e) { 
        console.log(e)
    }
    res.send({ info: 'Item eliminado correctamente. '})
}   

export const getItemsCtrl = async (req, res) => { 
    try { 
        const [ items ] = await conn.query('SELECT * FROM items')
        if (items.length) { 
            res.send(items)
        } else { 
            res.send({ err: 'No hay elementos para mostrar. '})
        }
    } catch (e) { 
        console.log(e)
    }
}