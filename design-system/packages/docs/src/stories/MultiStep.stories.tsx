import type { Meta, StoryObj } from '@storybook/react'
import { Box, MultiStep, MultiStepProps } from '@ignite-ui/react'

const meta: Meta<MultiStepProps> = {
    title: 'Form/Multi Step',
    component: MultiStep,
    args: {
        size: 4,
        currentStep: 1,
    },
    decorators: [
        (Story) => {
            return (
                <Box
                    as="label"
                    css={{ display: 'flex', flexDirection: 'column', gap: '$2' }}
                >
                    {Story()}
                </Box>
            )
        },
    ],
}

export default meta;

export const Primary: StoryObj<MultiStepProps> = {
    args: {},
}

export const Full: StoryObj<MultiStepProps> = {
    args: {
        currentStep: 4,
    },
}