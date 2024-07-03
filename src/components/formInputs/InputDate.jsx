import { AlertCircleIcon, Button, ButtonGroup, ButtonIcon, ButtonText, Button as Btn, FormControlErrorText, FormControlLabelText, Icon, Input, InputField } from "@gluestack-ui/themed"
import { CalendarDaysIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import { TrashIcon } from "lucide-react-native";
moment.locale('pt-br');

export const InputDate = ({ label, erro, dica, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, calendarType = 'date' }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false);
        if (event.type === "set") {
            inputOnChange(selectedDate)
        }
    };
    const handlePress = async () => {
        if (show) {
            await setShow(false);
        }
        setShow(true);
    }
    return (
        <FormInput label={label} erro={erro} dica={dica} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Button variant="outline" borderColor="$secondary200" $dark-borderColor={'$trueGray600'} h={50} borderRadius={'$xl'} onPress={handlePress} justifyContent="space-between" >
                <ButtonText color={inputValue ? "black" : "gray"} $dark-color={inputValue ? "$textLight100" : "gray"} fontWeight={"$normal"}>
                    {inputValue ? moment(inputValue).format('DD/MM/yyyy') : 'dd/mm/yyyy'}
                </ButtonText>
                <ButtonGroup gap={20} justifyContent="center" alignItems="center">
                    {
                        inputValue &&
                        (
                            <Btn variant={'link'} action="secondary" onPress={() => inputOnChange(null)}>
                                <ButtonIcon size={'lg'} >
                                    <Icon as={TrashIcon} color={"$secondary400"} size="20" />
                                </ButtonIcon>
                            </Btn>
                        )
                    }

                    <ButtonIcon size={'lg'}>
                        <Icon as={CalendarDaysIcon} color={"$secondary400"} size="20" />
                    </ButtonIcon>
                </ButtonGroup>
            </Button>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(inputValue || Date.now())}
                    mode={calendarType} // Pode ser date ou time
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </FormInput >

    )
}

