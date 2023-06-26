
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import { UserProvider } from './context/UserContext';

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"


// cadastros
import CreateProduct from './pages/Product/Create';
import CreateSuppler from './pages/supplier/Create';
import CreateUnit from './pages/unit/Create';
import CreateCategory from './pages/category/Create';

// user
import Login from './pages/user/Login';
import Registe from './pages/user/Registe';
import ListUser from './pages/user/ListUser';
import EditUser from './pages/user/EditUser';
// import Teste from './pages/Product/backup';

function App() {
  return(
    <BrowserRouter>
      <UserProvider>
      <NavBar/>
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/product/create' element={ <CreateProduct/>} />
          <Route path='/supplier/create' element={ <CreateSuppler/>} />
          <Route path='/unit/create' element={ <CreateUnit/>} />
          <Route path='/category/create' element={ <CreateCategory/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/user/register' element={ <Registe/>} />
          <Route path='/user/list' element={ <ListUser/> } />
          <Route path='/user/edit/:id' element={ <EditUser/> } />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
