import { Flex, Image, useBreakpointValue } from "@chakra-ui/react";

export function Header() {

  const isWideVersion = useBreakpointValue({
    base: true,
    sm: false
  })

  return (
    <>
      {isWideVersion ? (
        <Flex as="header" w="100%" h="10" mt="4" px="6" align="center" justify="center">
          <Image src="logo.svg" alt="Logo World Trip" boxSize='120px' />
        </Flex>
      ) : (
        <Flex as="header" w="100%" h="20" mt="4" px="6" align="center" justify="center">
          <Image src="logo.svg" alt="Logo World Trip" />
        </Flex>
      )}
    </>
  )
}
