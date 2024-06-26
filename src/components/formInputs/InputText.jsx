import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Input, InputField } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"

export const InputText = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType, autoCapitalize }) => {
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Input h={50} borderRadius={'$xl'} $focus-borderColor={'$trueGray400'}>
                <InputField type={'text'} keyboardType={keyboardType} autoCapitalize={autoCapitalize} value={inputValue?.toString()} onChangeText={(v) => inputOnChange(v)} />
            </Input>
        </FormInput>

    )
}