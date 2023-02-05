import axios from "axios";

const address = 'http://127.0.0.1:7777'

export const createNewItemService = async (datos) => { 
    const response = await axios.post(address + '/api/vip/new_item', {
        name_item: datos.name, 
        description: datos.description, 
        img_url: datos.imgUrl, 
        price: datos.price, 
        category: datos.categoria
    })
    return response.data
}

export const deleteNewItemService = async (datos) => { 
    const response = await axios.post(address + '/api/vip/delete_item', {
        id_item: datos.itemId
    })
    return response.data
}

export const getItemsService = async () => { 
    const response = await axios.get(address + '/api/vip/get_items')
    return response.data
}

