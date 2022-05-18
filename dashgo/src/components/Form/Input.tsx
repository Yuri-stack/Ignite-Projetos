import { ForwardRefRenderFunction } from 'react'
import { FormControl, FormLabel, forwardRef, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps{
    name: string
    label?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, ...rest }: InputProps, ref) => {
    return (
        <FormControl>
            { !!label && <FormLabel htmlFor={ name }>{ label }</FormLabel> }
            
            <ChakraInput
              id={ name } name={ name } type="email"
              focusBorderColor='pink.500'
              backgroundColor="gray.900"
              variant='filled' size="lg" ref={ ref }
              _hover={{ bgColor: "gray.900" }}
              { ...rest }   // Repassando todas outras props dos Inputs
            />
          </FormControl>
    )
} 

export const Input = forwardRef(InputBase)  // encaminhando o ref