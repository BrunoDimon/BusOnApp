import { Input, InputField, InputIcon, InputSlot, EyeIcon, EyeOffIcon } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"

import { useState } from "react"

export const InputPassword = ({ label, erro, dica, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, keyboardType }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <FormInput label={label} erro={erro} dica={dica} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Input h={50} borderRadius={'$xl'} $focus-borderColor={'$trueGray400'}>
                <InputField type={showPassword ? 'text' : 'password'} keyboardType={keyboardType} value={inputValue?.toString()} autoCapitalize="none" onChangeText={(v) => inputOnChange(v)} />
                <InputSlot onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon pr="$10" pb={'$6'} size='xs' color="$textDark500" as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
            </Input>
        </FormInput>
    )
}