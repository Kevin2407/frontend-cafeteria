import React, { Component, Fragment } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { campoRequerido, rangoValor } from '../helpers/validaciones';

class EditarProducto extends Component {

  constructor(props) {
    super(props);

    this.nombreProducto = React.createRef();
    this.precioProducto = React.createRef();

    this.state = {
      productoEditar: "",
      categoria: ""
    }

  }

  async componentDidMount() {
    // obtengo el parametro de la URL
    const id = this.props.match.params.id;
    // consultar producto seleccionado
    try {
      const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        this.setState({ productoEditar: resultado });
      }
    } catch (e) {
      console.log(e)
    }

  }


  render() {

    const checkValue = (e) => this.setState({ categoria: e.target.value });
    const URL = process.env.REACT_APP_API_URL;
    const id = this.props.match.params.id;


    const handleSubmit = async (e) => {
      e.preventDefault();
      // revisar si la categoria cambió, si no lo hizo, conservar la categoria del state producto
      const categoriaSeleccionada = (this.state.categoria === '') ? this.state.productoEditar.categoria : this.state.categoria;
      // Validar los datos
      if (campoRequerido(this.nombreProducto.current.value) && campoRequerido(this.precioProducto.current.value) && campoRequerido(categoriaSeleccionada) && rangoValor(parseInt(this.precioProducto.current.value))) {
        // si todo esta bien, enviar la peticion PUT a la api
        console.log('enviar los datos')

        // armar el objeto a enviar
        const productoEditado = {
          nombreProducto: this.nombreProducto.current.value,
          precioProducto: this.precioProducto.current.value,
          categoria: categoriaSeleccionada
        }

        try {
          const respuesta = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(productoEditado)
          });
          console.log(respuesta);
          Swal.fire(
            'Producto editado',
            'El producto a sido editado',
            'Cerrar'
          )

          // recargar los productos
          this.props.consultarAPI();

          // redireccionar a listaProductos
          this.props.history.push('/productos');
          
        } catch (error) {
          console.log(error)
        }

      } else {
        console.log('mostrar cartel error')
      }










      // if (this.state.producto.trim() === "" || this.state.precio.trim() === '' || this.state.categoria === '') {
      //     // mostrar cartel de error
      //     console.log('formulario erroneo');
      //     this.setState({ error: true });
      // } else {
      //     // enviar el producto a la api
      //     this.setState({ error: false });
      //     // crear objeto a enviar
      //     const datos = {
      //         nombre: this.state.producto,
      //         precio: this.state.precio,
      //         categoria: this.state.categoria
      //     }
      //     // enviar el objeto a la api, operacion POST
      //     try {
      //         const parametros = {
      //             method: 'POST',
      //             headers: {
      //                 "Content-Type": "application/json"
      //             },
      //             body: JSON.stringify(datos)
      //         }
      //         // ejecutar la solicitud
      //         const respuesta = await fetch(URL, parametros);
      //         if (await respuesta.status === 201) {
      //             Swal.fire(
      //                 'Perfecto!',
      //                 'El producto a sido añadido',
      //                 'Cerrar'
      //             )
      //             //   limpiar formulario
      //             this.setState({ producto: '', precio: '', categoria: '' });
      //             // deschequear los radios
      //             document.querySelectorAll('div.text-center.my-4 input[type=radio]').forEach((checkElement) => checkElement.checked = false);
      //             // recargar los productos
      //             this.props.consultarAPI();
      //             // redireccionar a listaProductos
      //             this.props.history.push('/productos');
      //         }
      //     } catch (error) {
      //         console.log(error);
      //     }
      // }
    }



    return (
      <Fragment>
        <Container className='my-5'>
          <Form onSubmit={handleSubmit}>
            <h1 className='text-center'>Editar producto</h1>
            <Form.Group>
              <Form.Label>Nombre de producto *</Form.Label>
              <Form.Control type='text' placeholder='Submarino' defaultValue={this.state.productoEditar.nombreProducto} ref={this.nombreProducto}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio *</Form.Label>
              <Form.Control type='text' placeholder='$50' defaultValue={this.state.productoEditar.precioProducto} ref={this.precioProducto} ></Form.Control>
            </Form.Group>
            <div className='text-center my-4'>
              <h3>Categoria *</h3>
              <Form.Check inline type='radio' label='Bebida caliente' name='Categoria' value='bebida-caliente' defaultValue={this.state.categoria} onChange={checkValue} defaultChecked={this.state.productoEditar.categoria && this.state.productoEditar.categoria === "bebida-caliente"} />
              <Form.Check inline type='radio' label='Bebida fria' name='Categoria' value='bebida-fria' defaultValue={this.state.categoria} onChange={checkValue} defaultChecked={this.state.productoEditar.categoria && this.state.productoEditar.categoria === "bebida-fria"} />
              <Form.Check inline type='radio' label='Sandwich' name='Categoria' value='sandwich' defaultValue={this.state.categoria} onChange={checkValue} defaultChecked={this.state.productoEditar.categoria && this.state.productoEditar.categoria === "sandwich"} />
              <Form.Check inline type='radio' label='Dulce' name='Categoria' value='dulce' defaultValue={this.state.categoria} onChange={checkValue} defaultChecked={this.state.productoEditar.categoria && this.state.productoEditar.categoria === "dulce"} />
              <Form.Check inline type='radio' label='Salado' name='Categoria' value='salado' defaultValue={this.state.categoria} onChange={checkValue} defaultChecked={this.state.productoEditar.categoria && this.state.productoEditar.categoria === "salado"} />
            </div>
            <Button variant='danger' type='submit' className='w-100'>Agregar producto</Button>
          </Form>
          {(this.state.error) ? (<Alert variant={'danger'} className='mt-4'>Todos los campos son obligatorios</Alert>) : null}
        </Container>
      </Fragment>
    );



  }
}


export default withRouter(EditarProducto);