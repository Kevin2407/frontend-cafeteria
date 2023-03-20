import React, { Component, Fragment } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL;

class AgregarProducto extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nombreProducto: '',
            precioProducto: '',
            categoria: '',
            error: false
        }

    }



    render() {

        const checkValue = (e) => this.setState({ categoria: e.target.value });

        const handleSubmit = async (e) => {
            e.preventDefault();
            // Validar los datos
            if (this.state.nombreProducto.trim() === '' || this.state.precioProducto.trim() === '' || this.state.categoria === '') {



                console.log(this.state.nombreProducto.trim())
                console.log(this.state.precioProducto.trim())
                console.log(this.state.categoria)

                // mostrar cartel de error
                console.log('formulario erroneo');
                this.setState({ error: true });
            } else {

                this.setState({ error: false });
                // crear objeto a enviar
                const datos = {
                    nombreProducto: this.state.nombreProducto,
                    precioProducto: this.state.precioProducto,
                    categoria: this.state.categoria
                }


                // enviar el objeto a la api, operacion POST
                try {
                    const parametros = {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(datos)
                    }

                    // ejecutar la solicitud
                    const respuesta = await fetch(URL, parametros);
                    console.log(parametros.body)
                    if (await respuesta.status === 201) {
                        Swal.fire(
                            'Perfecto!',
                            'El producto a sido añadido',
                            'Cerrar'
                        )

                        //   limpiar formulario
                        this.setState({ nombreProducto: '', precioProducto: '', categoria: '' });
                        // deschequear los radios
                        document.querySelectorAll('div.text-center.my-4 input[type=radio]').forEach((checkElement) => checkElement.checked = false);

                        // recargar los productos
                        this.props.consultarAPI();

                        // redireccionar a listaProductos
                        this.props.history.push('/productos');
                        


                    }



                } catch (error) {
                    console.log(error);
                }


            }

        }

        return (
            <Fragment>
                <Container className='my-5'>
                    <Form onSubmit={handleSubmit}>
                        <h1 className='text-center'>Agregar producto</h1>
                        <Form.Group>
                            <Form.Label>Nombre de producto *</Form.Label>
                            <Form.Control type='text' placeholder='Submarino' value={this.state.nombreproducto} onChange={(e) => this.setState({ nombreProducto: e.target.value })}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio *</Form.Label>
                            <Form.Control type='text' placeholder='$50' value={this.state.precioProducto} onChange={(e) => this.setState({ precioProducto: e.target.value })}></Form.Control>
                        </Form.Group>
                        <div className='text-center my-4'>
                            <h3>Categoria *</h3>
                            <Form.Check inline type='radio' label='Bebida caliente' name='Categoria' value='bebida-caliente' defaultValue={this.state.categoria} onChange={checkValue} />
                            <Form.Check inline type='radio' label='Bebida fria' name='Categoria' value='bebida-fria' defaultValue={this.state.categoria} onChange={checkValue} />
                            <Form.Check inline type='radio' label='Sandwich' name='Categoria' value='sandwich' defaultValue={this.state.categoria} onChange={checkValue} />
                            <Form.Check inline type='radio' label='Dulce' name='Categoria' value='dulce' defaultValue={this.state.categoria} onChange={checkValue} />
                            <Form.Check inline type='radio' label='Salado' name='Categoria' value='salado' defaultValue={this.state.categoria} onChange={checkValue} />
                        </div>
                        <Button variant='danger' type='submit' className='w-100'>Agregar producto</Button>
                    </Form>
                    {(this.state.error) ? (<Alert variant={'danger'} className='mt-4'>Todos los campos son obligatorios</Alert>) : null}
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(AgregarProducto);