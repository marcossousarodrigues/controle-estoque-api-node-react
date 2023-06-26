const router = require('express').Router();
const ProdutoController = require('../controller/ProdutoController');
const UserController = require('../controller/UsrerController');
const SupplierController = require('../controller/SupplierController');
const CategoryController = require('../controller/CategoryController');
const UnitController = require('../controller/UnitController');

const { imageUpload } = require('../helpers/image-upload');

// rotas do produto

router.get('/', ProdutoController.products);
router.get('/produto-mercado', ProdutoController.products)

router.post('/produto-mercado', ProdutoController.post);
router.put('/produto-mercado/:id', ProdutoController.update);
router.delete('/produto-mercado/:id', ProdutoController.delete);

// rotas de fornecedor

router.get('/supplier/get', SupplierController.get )
router.post('/supplier/post', SupplierController.post )
router.put('/supplier/put/:id', SupplierController.update )
router.delete('/supplier/delete/:id', SupplierController.delete )

// rotas de categoria
router.post('/category/post', CategoryController.post);
router.get('/category/get', CategoryController.get);
router.put('/category/put/:id', CategoryController.update);
router.delete('/category/delete/:id', CategoryController.delete);

// rotas de unidades
router.post('/unit/post', UnitController.post)
router.get('/unit/get', UnitController.get)
router.put('/unit/put/:id', UnitController.update)
router.delete('/unit/delete/:id', UnitController.delete)


// rotas do usuário
router.get('/user/finduser', UserController.findUser)
router.get('/user/find/:id', UserController.findUserById)
router.post('/user/post', imageUpload.single('image'), UserController.post)
router.patch('/user/edit', imageUpload.single('image'), UserController.update)
router.post('/user/login', UserController.login)
router.delete('/user/delete/:id', UserController.destroy)





module.exports = router;