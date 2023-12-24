import type { Meta, StoryObj } from '@storybook/react'
import { Text, TextProps } from '@ignite-ui/react'

const meta: Meta<TextProps> = {
    title: 'Typography/Text',
    component: Text,
    args: {
        children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, repudiandae. Ipsam illum quibusdam explicabo mollitia labore fuga voluptates quae exercitationem facilis quaerat sapiente veniam consequuntur incidunt, beatae repudiandae perspiciatis non."
    },
    argTypes: {
        size: {
            options: [
                'xxs',
                'xs',
                'sm',
                'md',
                'lg',
                'xl',
                '2xl',
                '4xl',
                '5xl',
                '6xl',
                '7xl',
                '8xl',
                '9xl',
            ],
            control: {
                type: 'inline-radio',
            },
        }
    }
}

export default meta;

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
    args: {
        children: 'Strong Text',
        as: 'strong'
    }
}