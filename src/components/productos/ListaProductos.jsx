import React, { Component, Fragment } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import ItemProducto from './ItemProducto';

class ListaProductos extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

    }



    render() {
        return (
            <Fragment>
                <Container className='my-5'>
                    <h1 className='text-center'>Lista de productos</h1>
                    <ListGroup className='mb-5'>
                        {
                            this.props.productos.map((item)=> <ItemProducto producto={item} key={item._id} consultarAPI={this.props.consultarAPI}></ItemProducto>)
                        }
                    </ListGroup>
                </Container>
            </Fragment>
        );
    }
}

export default ListaProductos;