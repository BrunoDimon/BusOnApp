import { Button as Btn, ButtonIcon, ButtonSpinner, ButtonText } from "@gluestack-ui/themed"

export const Button = ({ label, onPress, variant, isLoading, isDisabled, icon, action, ...props }) => {
    return (
        <Btn size='xl' gap={10} borderRadius={'$xl'} onPress={onPress} variant={variant} isDisabled={isLoading || isDisabled} action={action} {...props}>
            {
                icon &&
                (
                    <ButtonIcon size={24} as={icon} opacity={isLoading ? 0 : 1} />
                )
            }
            {
                label &&
                (
                    <ButtonText maxFontSizeMultiplier={1.4} opacity={isLoading ? 0 : 1}>
                        {label}
                    </ButtonText>
                )
            }
            {
                isLoading &&
                (
                    <ButtonSpinner size={28} position="absolute" />
                )
            }
        </Btn>
    )
}


//gap={8} pl={15} pr={20} 