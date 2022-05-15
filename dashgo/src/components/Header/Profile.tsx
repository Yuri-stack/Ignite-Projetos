import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">

            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Yuri Oliveira</Text>
                    <Text color="gray.300" fontSize="small">
                        yuri@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name='Yuri Oliveira' src='https://github.com/Yuri-stack.png' />
        </Flex>
    )
}