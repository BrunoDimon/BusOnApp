import { Box, Heading, Input, ScrollView, InputField, VStack, HStack, Divider, Modal, ModalBackdrop, Spinner } from "@gluestack-ui/themed"
import Label from "../../components/Label"
import { InputSelect } from "../../components/formInputs/InputSelect"
import { InputText } from "../../components/formInputs/InputText"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { buscarParametroDaAssociacao, cadastrarParametro, editarParametro } from "../../service/api/requests/parametroRequests"
import { InputNumber } from "../../components/formInputs/InputNumber"
import LiberadoBloqueadoEnum from "../../enums/LiberadoBloqueadoEnum"
import { Button } from "../../components/buttons/Button"
import { ModalContent } from "@gluestack-ui/themed"
import { useToast } from "react-native-toast-notifications"

export default Configuracoes = () => {
    const globalToast = useToast()

    const associacaoId = useSelector(state => state.auth.user.associacaoId);
    const [isLoadingParametros, setIsLoadingParametros] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [inputValues, setInputValues] = useState({
        associacaoId: associacaoId,
        valor1: null,
        valor2: null,
        valor3: null,
        valor4: null,
        valor5: null,
        valor6: null,
        valorMulta: null,
        diaVencimento: null,
        diasToleranciaMulta: null,
        liberaAlteracaoDadosPessoais: 'BLOQUEADO',
    });

    const handleChangeInputValues = (fieldName, value) => {
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });
    };

    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        let errors = {};

        if (inputValues.valor1 == null || inputValues.valor1 == '') {
            errors.valor1 = "Obrigatório"
        }
        if (inputValues.valor2 == null || inputValues.valor2 == '') {
            errors.valor2 = "Obrigatório"
        }
        if (inputValues.valor3 == null || inputValues.valor3 == '') {
            errors.valor3 = "Obrigatório"
        }
        if (inputValues.valor4 == null || inputValues.valor4 == '') {
            errors.valor4 = "Obrigatório"
        }
        if (inputValues.valor5 == null || inputValues.valor5 == '') {
            errors.valor5 = "Obrigatório"
        }
        if (inputValues.valor6 == null || inputValues.valor6 == '') {
            errors.valor6 = "Obrigatório"
        }
        if (inputValues.valorMulta == null || inputValues.valorMulta == '') {
            errors.valorMulta = "Obrigatório"
        }
        if (inputValues.diaVencimento == null || inputValues.diaVencimento == '') {
            errors.diaVencimento = "Obrigatório"
        }
        if (inputValues.diasToleranciaMulta == null || inputValues.diasToleranciaMulta == '') {
            errors.diasToleranciaMulta = "Obrigatório"
        }
        if (inputValues.liberaAlteracaoDadosPessoais == null || inputValues.liberaAlteracaoDadosPessoais == '') {
            errors.liberaAlteracaoDadosPessoais = "Obrigatório"
        }

        setErrors(errors);
        const isValid = (Object.keys(errors).length === 0);
        return isValid;
    }
    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            validarFormulario();
        }
    }, [inputValues]);

    const handleOnPressSave = async () => {
        try {
            setIsSaving(true);
            if (validarFormulario()) {
                if (!isEditMode) {
                    await cadastrarParametro(inputValues);
                    setIsEditMode(true);
                } else {
                    await editarParametro(inputValues.id, inputValues);
                }
                globalToast.show("Sucesso", { data: { messageDescription: 'Parâmetros salvos com sucesso!' }, type: 'success' })
            } else {
                globalToast.show("Erro", { data: { messageDescription: 'Preencha os campos obrigatórios do formulário!' }, type: 'warning' })
            }
        } catch (error) {
            console.error(error.response.data);
            globalToast.show("Erro ao salvar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setIsSaving(false)
        }
    }

    const buscarParametros = async () => {
        try {
            const response = await buscarParametroDaAssociacao(associacaoId);
            if (response.data) {
                setIsEditMode(true);
                setInputValues(response.data);
            }
        } catch (error) {
            console.error(error.response.data.title, error.response.data);
            globalToast.show(error.response.data.title, { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setIsLoadingParametros(false)
        }
    };

    useEffect(() => {
        buscarParametros();
    }, []);

    return (
        <>
            {
                isLoadingParametros &&
                (
                    <Modal useRNModal={true} defaultIsOpen={true} >
                        <Box flex={1} w={'$full'} bgColor={'#00000070'} justifyContent="center">
                            <Spinner size={65} />
                            <Heading textAlign="center" color={'$white'}>Buscando parâmetros...</Heading>
                        </Box>
                    </Modal>
                )
            }

            <ScrollView showsVerticalScrollIndicator={false} flex={1} borderRadius={'$3xl'} mx={'$4'} mt={'$2'} mb={'$4'} bg={'$white'} >
                <Box flex={1} gap={15} p={15} mt={10}>
                    <VStack flex={1} gap={15}>
                        <Heading fontSize={'$2xl'} color="#525252">Valores</Heading>
                        <HStack flex={1} gap={15}>
                            <InputNumber label={'Valor 1 dia'} erro={errors.valor1} inputOnChange={(value) => handleChangeInputValues('valor1', value)} inputValue={inputValues.valor1} isDisabled={isLoadingParametros} isRequired={true} />
                            <InputNumber label={'Valor 2 dia'} erro={errors.valor2} inputOnChange={(value) => handleChangeInputValues('valor2', value)} inputValue={inputValues.valor2} isDisabled={isLoadingParametros} isRequired={true} />
                        </HStack>
                        <HStack flex={1} gap={15} >
                            <InputNumber label={'Valor 3 dia'} erro={errors.valor3} inputOnChange={(value) => handleChangeInputValues('valor3', value)} inputValue={inputValues.valor3} isDisabled={isLoadingParametros} isRequired={true} />
                            <InputNumber label={'Valor 4 dia'} erro={errors.valor4} inputOnChange={(value) => handleChangeInputValues('valor4', value)} inputValue={inputValues.valor4} isDisabled={isLoadingParametros} isRequired={true} />
                        </HStack>
                        <HStack flex={1} gap={15} >
                            <InputNumber label={'Valor 5 dia'} erro={errors.valor5} inputOnChange={(value) => handleChangeInputValues('valor5', value)} inputValue={inputValues.valor5} isDisabled={isLoadingParametros} isRequired={true} />
                            <InputNumber label={'Valor 6 dia'} erro={errors.valor6} inputOnChange={(value) => handleChangeInputValues('valor6', value)} inputValue={inputValues.valor6} isDisabled={isLoadingParametros} isRequired={true} />
                        </HStack>
                    </VStack>
                    <InputNumber label={'Valor Multa'} erro={errors.valorMulta} inputOnChange={(value) => handleChangeInputValues('valorMulta', value)} inputValue={inputValues.valorMulta} isDisabled={isLoadingParametros} isRequired={true} />

                    <Divider bg="$backgroundDark800" />

                    <VStack flex={1} gap={15}>
                        <Heading fontSize={'$2xl'} color="#525252">Datas Mensalidade</Heading>
                        <InputNumber label={'Dia Vencimento'} erro={errors.diaVencimento} inputOnChange={(value) => handleChangeInputValues('diaVencimento', value)} inputValue={inputValues.diaVencimento} isDisabled={isLoadingParametros} isRequired={true} />
                        <InputNumber label={'Dia Tolêrancia Multa'} erro={errors.diasToleranciaMulta} inputOnChange={(value) => handleChangeInputValues('diasToleranciaMulta', value)} inputValue={inputValues.diasToleranciaMulta} isDisabled={isLoadingParametros} isRequired={true} />
                    </VStack>

                    <Divider bg="$backgroundDark800" />

                    <VStack flex={1} gap={15}>
                        <Heading fontSize={'$2xl'} color="#525252">Liberações</Heading>
                        <InputSelect label="Liberar Alteração Dados Pessoais" erro={errors.liberaAlteracaoDadosPessoais} selectValues={LiberadoBloqueadoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('liberaAlteracaoDadosPessoais', value)} inputValue={inputValues.liberaAlteracaoDadosPessoais} isRequired={true} isDisabled={isLoadingParametros} />
                    </VStack>

                    <Box alignSelf="flex-end">
                        <Button label={'Salvar'} onPress={() => handleOnPressSave()} isLoading={isSaving} />
                    </Box>
                </Box>
            </ScrollView>
        </>

    )
}
