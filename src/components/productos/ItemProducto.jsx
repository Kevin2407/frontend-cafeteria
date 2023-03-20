import React, { Component } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';





export default class ItemProducto extends Component {


  render() {

    
    const eliminarProducto = (id) => {
      
      const URL = process.env.REACT_APP_API_URL + '/' + id;

      Swal.fire({
        title: 'Estas seguro que quieres eliminar el producto?',
        text: "No puedes recuperar el producto una vez eliminado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then( async (result) => {
        if (result.isConfirmed) {

          try{
            const response = await fetch(URL,{
              method:'DELETE',
              headers: {
                "Content-Type": "application/json"
              }
            });

            if(response.status === 200){
              // mostrar cartel de prod. eliminado
              Swal.fire(
                'Borrado!',
                'El producto ha sido borrado.',
                'success'
              )

              // actualizar los datos
              this.props.consultarAPI();


            }else{

              Swal.fire(
                'Se produjo un error!',
                'Intentelo nuevamente',
                'error'
              )


            }

          }catch(error){
            console.log(error);

            Swal.fire(
              'Se produjo un error!',
              'Intentelo en unos minutos',
              'error'
            )
          }
        }
      })

    }

    return (
      <ListGroup>
        <ListGroup.Item className='d-flex justify-content-between'>
          <div className='w-100'>
            <p>{ this.props.producto.nombreProducto }</p>
          </div>
          <div className='w-100'>
            <p>
              <span style={{fontWeight: 'bold'}}>${ this.props.producto.precioProducto }</span>
            </p>
          </div>
          <div className='d-flex justify-content-end w-100'>
            <Link to={`/productos/editar/${this.props.producto._id}`} className='btn btn-warning me-2 text-light'>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
            {/* <Button className='me-2 text-light' variant='warning'>
            </Button> */}
            <Button variant='danger' onClick={()=> eliminarProducto(this.props.producto._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
          </ListGroup.Item>
      </ListGroup>
    )
  }
}

