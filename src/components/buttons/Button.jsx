import { Button as Btn, ButtonText } from "@gluestack-ui/themed"

export const Button = ({ label, onPress, variant }) => {
    return (
        <Btn size='xl' borderRadius={'$xl'} alignSelf="flex-end" onPress={onPress} variant={variant} >
            <ButtonText maxFontSizeMultiplier={1.5}>
                {label}
            </ButtonText>
        </Btn>
    )
}
