import { AlertCircleIcon, Button, ButtonText, FormControlErrorText, FormControlLabelText, Input, InputField } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"
import { useState } from "react";
import DatePicker from 'react-native-date-picker'

export const InputDate = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, selectValues = [] }) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Button variant="outline" borderColor="#E2E2E2" h={50} borderRadius={'$xl'} onPress={() => setOpen(true)}>
                <ButtonText color="gray">
                    dd/mm/yyyy
                </ButtonText>
            </Button>

            {/* <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            /> */}

        </FormInput >

    )
}

