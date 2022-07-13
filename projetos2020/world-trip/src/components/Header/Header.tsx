import { Flex, Image, useBreakpointValue } from "@chakra-ui/react";

export function Header() {

  const isDesktopVersion = useBreakpointValue({
    sm: true
  })

  return (
    <>
      {isDesktopVersion ? (
        <Flex as="header" w="100%" h="10" my="4" align="center" justify="center">
          <Image src="logo.svg" alt="Logo World Trip" />
        </Flex>
      ) : (
        <Flex as="header" w="100%" h="10" my="3" align="center" justify="center">
          <Image src="logo.svg" alt="Logo World Trip" boxSize='120px' />
        </Flex>
      )}
    </>
  )
}
