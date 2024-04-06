import { AlertCircleIcon, Button, ButtonIcon, ButtonText, FormControlErrorText, FormControlLabelText, Icon, Input, InputField } from "@gluestack-ui/themed"
import { CalendarDaysIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

export const InputDate = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, calendarType = 'date' }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        inputOnChange(selectedDate)
        setShow(false);
    };
    const handlePress = async () => {
        if (show) {
            await setShow(false);
        }
        setShow(true);
    }
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Button variant="outline" borderColor="$secondary200" h={50} borderRadius={'$xl'} onPress={handlePress} justifyContent="space-between" >
                <ButtonText color={inputValue ? "black" : "gray"} fontWeight={"$normal"}>
                    {inputValue ? moment(inputValue).format('DD/MM/yyyy') : 'dd/mm/yyyy'}
                </ButtonText>
                <ButtonIcon size={'lg'}>
                    <Icon as={CalendarDaysIcon} color={"$secondary400"} size="lg" />
                </ButtonIcon>
            </Button>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(inputValue)}
                    mode={calendarType} // Pode ser date ou time
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </FormInput >

    )
}

