import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Icono(props) {
  return (
    <div>
        <FontAwesomeIcon icon={props.forma} />
    </div>
  )
}

