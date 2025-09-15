import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

function PasswordForm({isPasswordVisible, tooglePasswordVisibility}) {
    
  return (
    <InputGroup>
    <Input placeholder='Password' type={ isPasswordVisible ? 'text' : 'password'} variant='outline' />
    <InputRightElement>
    <Button onClick={tooglePasswordVisibility}>
        {isPasswordVisible ? 'Hide' : 'Show'}
    </Button>
    </InputRightElement>
    </InputGroup>
  )
}

PasswordForm.propTypes = {
    isPasswordVisible: PropTypes.bool.isRequired,
    tooglePasswordVisibility: PropTypes.func.isRequired,
}

export default PasswordForm
