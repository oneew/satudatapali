import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@chakra-ui/react'

function InputForm(props) {
  return (
    <Input placeholder={props.Placeholder} type={props.InputType} variant='outline' />
  )
}

export default InputForm
