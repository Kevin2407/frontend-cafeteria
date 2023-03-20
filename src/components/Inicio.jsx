import React, { Component } from 'react'
import cafe from '../img/coffee.jpg'

export default class Inicio extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={cafe} alt="publicidad" className='w-100' />
        </div>
      </div>
    )
  }
}
