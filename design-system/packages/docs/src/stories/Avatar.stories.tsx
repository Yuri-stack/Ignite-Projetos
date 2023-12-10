import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarProps } from '@ignite-ui/react'

export default {
    title: 'Data Display/Avatar',
    component: Avatar,
    args: {
        src: 'https://github.com/Yuri-stack.png',
        alt: 'Yuri Oliveira'
    },
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {}

export const WithFallback: StoryObj<AvatarProps> = {
    args: {
        src: 'https://github.com/Yuri-stack.png',
        alt: 'Yuri Oliveira'
    },
}