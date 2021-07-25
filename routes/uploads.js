const { check } = require('express-validator')
const { loadFile, updateFileColection, getImgColection } = require('../controllers/uploads')
const { colectionAllowed } = require('../helpers/dbValidators')
const validateFields = require('../middlewares/validateFields')
const validateFile = require('../middlewares/validateFile')

const router = require('express').Router()



router.post('/',validateFile,loadFile)

router.put('/:colection/:id',[
    validateFile,

check('id', 'Id de mongo invalido').isMongoId(),
check('colection').custom((c)=>colectionAllowed(c,['users','products'])),
validateFields,


],updateFileColection)



router.get('/:colection/:id',[

    
check('id', 'Id de mongo invalido').isMongoId(),
check('colection').custom((c)=>colectionAllowed(c,['users','products'])),
validateFields,
],getImgColection)

module.exports = router