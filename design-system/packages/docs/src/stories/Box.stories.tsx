import type { Meta, StoryObj } from '@storybook/react'
import { Box, BoxProps, Text } from '@ignite-ui/react'

const meta: Meta<BoxProps> = {
    title: 'Surfaces/Box',
    component: Box,
    args: {
        children: <Text>Testando o elemento Box</Text>
    },
    argTypes: {
        children: {
            control: {
                type: null,
            },
        },
    },
}

export default meta;

export const Primary: StoryObj<BoxProps> = {}