import { ForwardRefRenderFunction } from 'react'
import { FormControl, FormErrorMessage, FormLabel, forwardRef, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }: InputProps, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        id={name} name={name} type="email"
        focusBorderColor='pink.500'
        backgroundColor="gray.900"
        variant='filled' size="lg" ref={ref}
        _hover={{ bgColor: "gray.900" }}
        {...rest}   // Repassando todas outras props dos Inputs
      />

      {!!error && (
        <FormErrorMessage>
          { error.message }
        </FormErrorMessage>
      )}

    </FormControl>
  )
}

export const Input = forwardRef(InputBase)  // encaminhando o ref