import type { Meta, StoryObj } from '@storybook/react'
import { Text, TextProps } from '@ignite-ui/react'

export default {
    title: 'Typography/Text',
    component: Text,
    args: {
        children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, repudiandae. Ipsam illum quibusdam explicabo mollitia labore fuga voluptates quae exercitationem facilis quaerat sapiente veniam consequuntur incidunt, beatae repudiandae perspiciatis non."
    },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
    args: {
        children: 'Strong Text',
        as: 'strong'
    }
}