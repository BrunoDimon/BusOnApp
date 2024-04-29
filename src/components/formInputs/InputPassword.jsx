import { Input, InputField, InputIcon, InputSlot } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"

import { EyeIcon, EyeOffIcon } from "lucide-react-native"
import { useState } from "react"

export const InputPassword = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Input h={50} borderRadius={'$xl'} >
                <InputField type={showPassword ? 'text' : 'password'} keyboardType={keyboardType} value={inputValue?.toString()} onChangeText={(v) => inputOnChange(v)} />
                <InputSlot onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon pr="$10" pb={'$6'} size='xs' color="$yellow400">{showPassword ? <EyeIcon color='gray' /> : <EyeOffIcon color='gray' />}</InputIcon>
                </InputSlot>
            </Input>
        </FormInput>
    )
}