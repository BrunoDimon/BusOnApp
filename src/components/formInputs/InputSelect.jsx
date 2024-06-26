import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Input, InputField, SelectDragIndicator, SelectItem, SelectItemText, SelectScrollView } from "@gluestack-ui/themed"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlLabel, } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"
import { ChevronDownIcon } from "@gluestack-ui/themed"
import { Select } from "@gluestack-ui/themed"
import { SelectTrigger } from "@gluestack-ui/themed"
import { SelectInput } from "@gluestack-ui/themed"
import { SelectIcon } from "@gluestack-ui/themed"
import { SelectPortal } from "@gluestack-ui/themed"
import { SelectBackdrop } from "@gluestack-ui/themed"
import { SelectContent } from "@gluestack-ui/themed"
import { SelectDragIndicatorWrapper } from "@gluestack-ui/themed"
import { Icon } from "@gluestack-ui/themed"
import { Spinner } from "@gluestack-ui/themed"
import { Text } from "@gluestack-ui/themed"

export const InputSelect = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, selectValues = [], typeSelectValues, defaultValue, isLoading }) => {
    const enumToOptions = (enumObject) => {
        return Object.entries(enumObject).map(([key, value]) => ({
            label: value,
            value: key,
            isDisabled: false
        }));
    };
    const values = typeSelectValues === 'ENUM' ? enumToOptions(selectValues) : selectValues;
    const currentValue = values.filter(v => v.value == inputValue)[0]?.label
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled || isLoading} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Select onValueChange={(v) => inputOnChange(v)} selectedValue={currentValue} defaultValue={defaultValue}>
                <SelectTrigger h={50} borderRadius={'$xl'} $dark-borderColor={'$trueGray600'} pr={23}>
                    <SelectInput placeholder={isLoading ? "Buscando..." : "Selecionar"} />
                    <SelectIcon>
                        {
                            isLoading
                                ?
                                (
                                    <Spinner h={'$full'} size={28} />
                                )
                                :
                                (
                                    <Icon as={ChevronDownIcon} size={20} />
                                )
                        }
                    </SelectIcon>
                </SelectTrigger>
                <SelectPortal useRNModal={true} >
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectScrollView>
                            {
                                isRequired ?? <SelectItem key={0} label={null} value={null} />
                            }
                            {
                                values?.map((value, index) => (
                                    <SelectItem key={index} label={value.label} value={value.value} isDisabled={value.isDisabled} />
                                ))
                            }
                        </SelectScrollView>

                    </SelectContent>
                </SelectPortal>
            </Select>
        </FormInput>

    )
}