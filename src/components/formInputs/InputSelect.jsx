import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Input, InputField } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"

export const InputSelect = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, selectValues = [] }) => {
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <SelectInputValues values={selectValues} />
        </FormInput>

    )
}