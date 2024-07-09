import { AlertCircleIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabelText, Input, InputField } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"

export const FormInput = ({ label, erro, dica, inputValue, inputOnChangeText, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType, children }) => {
    return (
        <FormControl
            isDisabled={isDisabled}
            isInvalid={isInvalid || erro}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            mb={10}
            flex={0}
        >
            {
                label && (
                    <FormControlLabel>
                        <FormControlLabelText mr={5} color={isDisabled ? "$textDark500" : "$textDark800"} $dark-color={isDisabled ? "$textLight500" : "$textLight100"} size="xl" lineHeight="$xl" fontWeight="$semibold" maxFontSizeMultiplier={1.2}>
                            {label}
                        </FormControlLabelText>
                    </FormControlLabel>
                )
            }

            {children}
            <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText flex={1}>
                    {erro}
                </FormControlErrorText>
            </FormControlError>
            {
                dica && (
                    <FormControlHelper>
                        <FormControlHelperText mx={5} flex={1}>
                            {dica}
                        </FormControlHelperText>
                    </FormControlHelper>
                )
            }

        </FormControl>

    )
}