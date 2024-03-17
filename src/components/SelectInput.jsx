import { Box, Input, ScrollView, InputField, Select, SelectItem, SelectBackdrop, SelectContent, SelectPortal, SelectTrigger, SelectInput, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, Icon, ChevronDownIcon } from "@gluestack-ui/themed"

export default SelectInputValues = ({ values }) => {
    return (
        <Select >
            <SelectTrigger h={50} borderRadius={'$xl'}>
                <SelectInput placeholder="Selecionar" />
                <SelectIcon mr="$3">
                    <Icon as={ChevronDownIcon} />
                </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {
                        values?.map((value, index) => (
                            <SelectItem key={index} label={value.label} value={value.value} isDisabled={value.isDisabled} />
                        ))
                    }
                </SelectContent>
            </SelectPortal>
        </Select>
    )
}