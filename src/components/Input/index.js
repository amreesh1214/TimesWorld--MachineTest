import React from 'react'
import { Form } from 'react-bootstrap'

const Input = ({ type, onchange, placeholder, value }) => {
    return (
        <div>
            <Form.Group className="mb-3" >
                <Form.Control type={type} onChange={onchange} value={value} placeholder={placeholder} />
            </Form.Group>
        </div>
    )
}

export default Input
