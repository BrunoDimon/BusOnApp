import { Box, Input, ScrollView, InputField, Button, ButtonText } from "@gluestack-ui/themed"
import Label from "../components/Label"
import SelectInputValues from "../components/SelectInput"
import { InputSelect } from "../components/formInputs/InputSelect"
import { InputText } from "../components/formInputs/InputText"
import { InputDate } from "../components/formInputs/InputDate"

export default MeusDados = () => {
    return (
        <Box flex={1} bg={'$white'} mx={'$4'} mt={'$2'} mb={'$4'} borderRadius={'$3xl'}>
            <ScrollView flex={1} >
                <Box justifyContent="flex-start" alignItems="center" gap={15} p={15}>
                    <Box w={'$full'}>
                        <InputText label={'Nome Completo'} inputOnChangeText={(value) => handleChangeInputValues('nome', value)} isRequired={true} />
                        <InputText label={'E-mail'} inputOnChangeText={(value) => handleChangeInputValues('email', value)} isRequired={true} />
                        <InputText label={'Telefone'} inputOnChangeText={(value) => handleChangeInputValues('telefone', value)} isRequired={true} />
                        <InputSelect label="Faculdade" selectValues={[
                            {
                                label: 'UNISATC',
                                value: 'UNISATC',
                                isDisabled: false
                            },
                            {
                                label: 'UNESC',
                                value: 'UNESC',
                                isDisabled: false
                            },
                            {
                                label: 'ESUCRI',
                                value: 'ESUCRI',
                                isDisabled: false
                            },

                        ]} />
                        <InputSelect label="Curso" selectValues={[
                            {
                                label: 'Eng Soft',
                                value: 'ENG_SOFT',
                                isDisabled: false
                            },
                            {
                                label: 'Eng Compt',
                                value: 'ENG_COMPT',
                                isDisabled: false
                            },
                            {
                                label: 'Publi Prop',
                                value: 'PUBLI_PROP',
                                isDisabled: false
                            },

                        ]} />
                        <InputDate />

                        <Button size='xl' borderRadius={'$xl'} alignSelf="flex-end">
                            <ButtonText maxFontSizeMultiplier={1.5}>
                                Salvar
                            </ButtonText>
                        </Button>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    )
}