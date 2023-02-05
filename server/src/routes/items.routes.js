import { Router } from 'express'

import { createNewItemCtrl, deleteItemCtrl, getItemsCtrl } from '../controllers/items.controller.js'

const router = Router()

router.post('/api/vip/new_item', createNewItemCtrl)
router.post('/api/vip/delete_item', deleteItemCtrl)
router.get('/api/vip/get_items', getItemsCtrl)

export default router