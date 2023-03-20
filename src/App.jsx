import {React, useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AgregarProducto from './components/productos/AgregarProducto';
import Inicio from './components/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaProductos from './components/productos/ListaProductos';
import Navegacion from './components/common/Navegacion';
import Footer from './components/common/Footer';
import EditarProducto from './components/productos/EditarProducto';
import Error404 from './components/Error404';


function App() {
  const URL = process.env.REACT_APP_API_URL;
  const [productos, setProductos] = useState([]);

  useEffect(
    ()=> {
      consultarAPI();
    },[]);

    const consultarAPI = async ()=>{
      try{
        const consulta =  await fetch(URL);
        const respuesta = await consulta.json();
        console.log(respuesta[0]._id)
        setProductos(respuesta);
      }catch(error){
        console.log(error);
      }
    }


  return (
    <Router>
      <Navegacion></Navegacion>
      <Switch>
        <Route exact path='/'>
          <Inicio></Inicio>
        </Route>
        <Route exact path='/productos'>
          <ListaProductos productos={productos} consultarAPI={consultarAPI}></ListaProductos>
        </Route>
        <Route exact path='/productos/nuevo'>
          <AgregarProducto consultarAPI={consultarAPI}></AgregarProducto>
        </Route>
        <Route exact path='/productos/editar/:id'>
          <EditarProducto consultarAPI={consultarAPI}></EditarProducto>
        </Route>
        <Route exact path='*'>
          <Error404></Error404>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
