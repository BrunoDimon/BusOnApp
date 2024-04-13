import { Box, Heading, Input, ScrollView, InputField, Button, ButtonText } from "@gluestack-ui/themed"
import Label from "../../components/Label"
//import SelectInputValues from "../components/SelectInput"
import { InputSelect } from "../../components/formInputs/InputSelect"
import { InputText } from "../../components/formInputs/InputText"
import { InputDate } from "../../components/formInputs/InputDate"

export default Configuracoes = () => {
    return (
        <Box flex={1} bg={'$white'} mx={'$4'} mt={'$2'} mb={'$4'} borderRadius={'$3xl'}>
            <ScrollView flex={1} >
                <Box justifyContent="flex-start" gap={15} p={15}>
                    <Heading fontSize={'$2xl'} color="#525252">Valores</Heading>
                    <Box flexDirection="row" gap={15}>

                        <Box flexDirection="column" gap={15} width={165}>
                            <InputText label={'Valor 1 dia'} inputOnChangeText={(value) => handleChangeInputValues('valor1', value)} />
                            <InputText label={'Valor 3 dia'} inputOnChangeText={(value) => handleChangeInputValues('valor3', value)} />
                            <InputText label={'Valor 5 dia'} inputOnChangeText={(value) => handleChangeInputValues('valor5', value)} />
                        </Box>

                        <Box flexDirection="column" gap={15} width={175}>
                            <InputText label={'Valor 2 dia'} inputOnChangeText={(value) => handleChangeInputValues('valor2', value)} />
                            <InputText label={'Valor 4 dia'} inputOnChangeText={(value) => handleChangeInputValues('valor4', value)} />
                            <InputText label={'Valor 6 dia'} inputOnChangeText={(value) => handleChangeInputValues('valor6', value)} />
                        </Box>

                    </Box>
                    <Box mt={15} borderBottomWidth={1} borderBottomColor="black" pb={40} mb={10}>
                        <InputText label={'Valor Multa'} inputOnChangeText={(value) => handleChangeInputValues('valormulta', value)} />
                    </Box>
                    <Heading fontSize={'$2xl'} color="#525252">Datas Mensalidade</Heading>

                    <Box mt={15} borderBottomWidth={1} borderBottomColor="black" pb={40} mb={10}>
                        <InputText label={'Dia de Abertura dos Pagamentos'} inputOnChangeText={(value) => handleChangeInputValues('diabertura', value)} />
                        <InputText label={'Dia Vencimento'} inputOnChangeText={(value) => handleChangeInputValues('diavencimento', value)} />
                        <InputText label={'Dia Tolêrancia Multa'} inputOnChangeText={(value) => handleChangeInputValues('diatolerancia', value)} />
                    </Box>

                    <Heading fontSize={'$2xl'} color="#525252">Liberações</Heading>
                    <Box mt={15} borderBottomWidth={1} borderBottomColor="black" pb={40} mb={10}>
                        <InputSelect label="Liberar Alteração Dados Pessoais" selectValues={[
                            {
                                label: 'Sim',
                                value: 'Sim',
                                isDisabled: false
                            },
                            {
                                label: 'Não',
                                value: 'Não',
                                isDisabled: false
                            },
                        ]} />
                    </Box>

                    <Box mt={15}>
                        <InputText label={'Nome'} inputOnChangeText={(value) => handleChangeInputValues('nome', value)} />
                        <InputText label={'Universidades'} inputOnChangeText={(value) => handleChangeInputValues('universidade', value)} />
                        <InputText label={'Responsaveis'} inputOnChangeText={(value) => handleChangeInputValues('responsaveis', value)} />
                    </Box>
                    <Button size='xl' borderRadius={'$xl'} alignSelf="flex-end">
                        <ButtonText maxFontSizeMultiplier={1.5}>
                            Salvar
                        </ButtonText>
                    </Button>
                </Box>
            </ScrollView>
        </Box>
    )
}
