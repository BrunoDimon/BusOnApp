import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Textarea, TextareaInput } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"

export const InputTextArea = ({ label, erro, dica, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType, placeholder, autoCapitalize, enterKeyHint, height }) => {
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired} dica={dica}>
            <Textarea height={height} borderRadius={'$xl'} $focus-borderColor={'$trueGray400'} >
                <TextareaInput type={'text'} keyboardType={keyboardType} value={inputValue?.toString()} onChangeText={(v) => inputOnChange(v)} placeholder={placeholder} autoCapitalize={autoCapitalize} enterKeyHint={enterKeyHint} />
            </Textarea>
        </FormInput>

    )
}