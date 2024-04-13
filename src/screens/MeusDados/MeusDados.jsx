import { Box, Input, ScrollView, InputField } from "@gluestack-ui/themed"
import Label from "../../components/Label"
import { InputSelect } from "../../components/formInputs/InputSelect"
import { InputText } from "../../components/formInputs/InputText"
import { InputDate } from "../../components/formInputs/InputDate"
import { useState } from "react"
import { Button } from "../../components/buttons/Button"

export default MeusDados = () => {
    const [dadosEdicao, setDadosEdicao] = useState({});
    const [inputValues, setInputValues] = useState({
        nomeCompleto: dadosEdicao?.nomeCompleto || null,
        email: dadosEdicao?.email || null,
        telefone: dadosEdicao?.telefone || null,
        faculdade: dadosEdicao?.faculdade || null,
        curso: dadosEdicao?.curso || null,
        data: dadosEdicao?.data || null,
    });
    const handleChangeInputValues = (fieldName, value) => {
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });
    };
    return (
        <Box flex={1} bg={'$white'} mx={'$4'} mt={'$2'} mb={'$4'} borderRadius={'$3xl'}>
            <ScrollView flex={1} >
                <Box justifyContent="flex-start" alignItems="center" gap={15} p={15}>
                    <Box w={'$full'}>
                        <InputText label={'Nome Completo'} inputOnChange={(value) => handleChangeInputValues('nomeCompleto', value)} isRequired={true} inputValue={inputValues.nomeCompleto} />
                        <InputText label={'E-mail'} inputOnChange={(value) => handleChangeInputValues('email', value)} isRequired={true} inputValue={inputValues.email} />
                        <InputText label={'Telefone'} inputOnChange={(value) => handleChangeInputValues('telefone', value)} isRequired={true} inputValue={inputValues.telefone} />
                        <InputSelect label="Faculdade" inputOnChange={(value) => handleChangeInputValues('faculdade', value)} inputValue={inputValues.faculdade} selectValues={[
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

                        <Button label={'Salvar'} onPress={() => console.log('Pressionado salvar')} />
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    )
}