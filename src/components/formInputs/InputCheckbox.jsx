import { Checkbox, CheckIcon, CheckboxIcon, CheckboxIndicator, CheckboxGroup, VStack, CheckboxLabel } from "@gluestack-ui/themed"
import { FormInput } from "./FormInput"

export const InputCheckbox = ({ label, erro, inputValue, inputOnChange, isDisabled, isInvalid, isReadOnly, isRequired, checkboxValues = [], typeCheckboxValues, defaultValue, isLoading }) => {
    const enumToOptions = (enumObject) => {
        return Object.entries(enumObject).map(([key, value]) => ({
            label: value,
            value: key,
            isDisabled: false
        }));
    };
    const values = typeCheckboxValues === 'ENUM' ? enumToOptions(checkboxValues) : checkboxValues;

    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <CheckboxGroup
                value={inputValue}
                onChange={inputOnChange}
            >
                <VStack flex={1} ml={5} space="md">
                    {
                        values?.map((value, index) => (
                            <Checkbox key={index} value={value.value} size={'md'} aria-label={value.label}>
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>
                                <CheckboxLabel>{value.label}</CheckboxLabel>
                            </Checkbox>
                        ))
                    }
                </VStack>
            </CheckboxGroup>
        </FormInput>

    )
}