import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Input, InputField } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"

export const InputText = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType }) => {
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Input h={50} borderRadius={'$xl'} >
                <InputField type={'text'} keyboardType={keyboardType} value={inputValue} onChangeText={(v) => inputOnChange(v)} />
            </Input>
        </FormInput>

    )
}