import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Input, InputField } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"

export const FormInput = ({ label, erro, inputValue, inputOnChangeText, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType, children }) => {
    return (
        <FormControl
            isDisabled={isDisabled}
            isInvalid={isInvalid || erro}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            mb={10}
        >
            <FormControlLabel>
                <FormControlLabelText mr={5} color="$textDark800" size="xl" lineHeight="$xl" fontWeight="$semibold" maxFontSizeMultiplier={1.2}>
                    {label}
                </FormControlLabelText>
            </FormControlLabel>
            {children}
            <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    {erro}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>

    )
}