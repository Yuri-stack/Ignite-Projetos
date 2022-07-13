import { Image, useBreakpointValue } from "@chakra-ui/react";

export function Banner() {
  const isDesktopVersion = useBreakpointValue({
    sm: true
  })
  return (
    <Image src="banner.svg" alt="Banner World Trip" />
  )
}
