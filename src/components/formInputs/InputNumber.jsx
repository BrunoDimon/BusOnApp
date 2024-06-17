import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Input, InputField } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"
import Toast from "react-native-root-toast"

export const InputNumber = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType }) => {
    const verificarValorNumerico = (value) => {
        if (/^\d*$/.test(value)) {
            inputOnChange(value);
        } else {
            let toast = Toast.show('O campo aceita somente números!', {
                duration: Toast.durations.LONG,
            });
            setTimeout(function hideToast() {
                Toast.hide(toast);
            }, 2500);
        }
    }

    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Input h={50} borderRadius={'$xl'} >
                <InputField inputMode="numeric" type={'text'} keyboardType={'number-pad'} value={inputValue?.toString()} onChangeText={(v) => verificarValorNumerico(v)} />
            </Input>
        </FormInput>

    )
}