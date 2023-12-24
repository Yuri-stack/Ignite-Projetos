import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarProps } from '@ignite-ui/react'

const meta: Meta<AvatarProps> = {
    title: 'Data Display/Avatar',
    component: Avatar,
    args: {
        src: 'https://github.com/Yuri-stack.png',
        alt: 'Yuri Oliveira'
    },
    argTypes: {
        src: {
            control: {
                type: 'text',
            },
        },
    },
}

export default meta;

export const Primary: StoryObj<AvatarProps> = {}

export const WithFallback: StoryObj<AvatarProps> = {
    args: {
        src: 'https://github.com/Yuri-stack.png',
        alt: 'Yuri Oliveira'
    },
}