import { AlertCircleIcon, FormControlErrorText, FormControlLabelText, Input, InputField, SelectDragIndicator, SelectItem } from "@gluestack-ui/themed"
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

export const InputSelect = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, selectValues = [] }) => {
    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Select >
                <SelectTrigger h={50} borderRadius={'$xl'} pr={23}>
                    <SelectInput placeholder="Selecionar" />
                    <SelectIcon size={'lg'}>
                        <Icon as={ChevronDownIcon} size={'lg'} />
                    </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {
                            selectValues?.map((value, index) => (
                                <SelectItem key={index} label={value.label} value={value.value} isDisabled={value.isDisabled} />
                            ))
                        }
                    </SelectContent>
                </SelectPortal>
            </Select>
        </FormInput>

    )
}