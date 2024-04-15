import { Box, Heading, Input, ScrollView, InputField, useToast, VStack, HStack, Divider, Modal, ModalBackdrop, Spinner } from "@gluestack-ui/themed"
import Label from "../../components/Label"
import { InputSelect } from "../../components/formInputs/InputSelect"
import { InputText } from "../../components/formInputs/InputText"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { buscarParametroDaAssociacao, cadastrarParametro, editarParametro } from "../../service/api/requests/parametroRequests"
import ToastConfig from "../../components/toasts/ToastConfig"
import { InputNumber } from "../../components/formInputs/InputNumber"
import LiberadoBloqueadoEnum from "../../enums/LiberadoBloqueadoEnum"
import { Button } from "../../components/buttons/Button"
import { ModalContent } from "@gluestack-ui/themed"

export default Configuracoes = () => {
    const toast = useToast()

    const associacaoId = useSelector(state => state.auth.user.associacaoId);
    const [isLoadingParametros, setIsLoadingParametros] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [inputValues, setInputValues] = useState({
        associacao_id: associacaoId,
        valor_1: null,
        valor_2: null,
        valor_3: null,
        valor_4: null,
        valor_5: null,
        valor_6: null,
        valor_multa: null,
        dia_vencimento: null,
        dia_abertura_pagamentos: null,
        dias_tolerancia_multa: null,
        libera_alteracao_dados_pessoais: null,
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

        if (inputValues.valor_1 == null || inputValues.valor_1 == '') {
            errors.valor_1 = "Obrigatório"
        }
        if (inputValues.valor_2 == null || inputValues.valor_2 == '') {
            errors.valor_2 = "Obrigatório"
        }
        if (inputValues.valor_3 == null || inputValues.valor_3 == '') {
            errors.valor_3 = "Obrigatório"
        }
        if (inputValues.valor_4 == null || inputValues.valor_4 == '') {
            errors.valor_4 = "Obrigatório"
        }
        if (inputValues.valor_5 == null || inputValues.valor_5 == '') {
            errors.valor_5 = "Obrigatório"
        }
        if (inputValues.valor_6 == null || inputValues.valor_6 == '') {
            errors.valor_6 = "Obrigatório"
        }
        if (inputValues.valor_multa == null || inputValues.valor_multa == '') {
            errors.valor_multa = "Obrigatório"
        }
        if (inputValues.dia_vencimento == null || inputValues.dia_vencimento == '') {
            errors.dia_vencimento = "Obrigatório"
        }
        if (inputValues.dia_abertura_pagamentos == null || inputValues.dia_abertura_pagamentos == '') {
            errors.dia_abertura_pagamentos = "Obrigatório"
        }
        if (inputValues.dias_tolerancia_multa == null || inputValues.dias_tolerancia_multa == '') {
            errors.dias_tolerancia_multa = "Obrigatório"
        }
        if (inputValues.libera_alteracao_dados_pessoais == null || inputValues.libera_alteracao_dados_pessoais == '') {
            errors.libera_alteracao_dados_pessoais = "Obrigatório"
        }

        setErrors(errors);
        const isValid = (Object.keys(errors).length === 0);
        console.log(isValid)
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
                } else {
                    await editarParametro(inputValues.id, inputValues);
                }
                toast.show(ToastConfig('success', 'Sucesso', 'Parâmetros salvos com sucesso!', (v) => toast.close(v)));
            } else {
                toast.show(ToastConfig('error', 'Erro', 'Campos Inválidos', (v) => toast.close(v)));
            }
        } catch (error) {
            console.error(error.response.data);
            toast.show(ToastConfig('error', 'Erro', error.response.data.message, (v) => toast.close(v)));
        } finally {
            setIsSaving(false)
        }
    }

    const buscarParametros = async () => {
        try {
            const response = await buscarParametroDaAssociacao(associacaoId);
            console.log(response.data)
            if (response.data) {
                setIsEditMode(true);
                setInputValues(response.data);
            }
        } catch (error) {
            console.error('Parametros não cadastrados!', error.response.data);
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
                    <Modal isOpen={true}>
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
                            <InputNumber label={'Valor 1 dia'} erro={errors.valor_1} inputOnChange={(value) => handleChangeInputValues('valor_1', value)} inputValue={inputValues.valor_1} isDisabled={isLoadingParametros} />
                            <InputNumber label={'Valor 2 dia'} erro={errors.valor_2} inputOnChange={(value) => handleChangeInputValues('valor_2', value)} inputValue={inputValues.valor_2} isDisabled={isLoadingParametros} />
                        </HStack>
                        <HStack flex={1} gap={15} >
                            <InputNumber label={'Valor 3 dia'} erro={errors.valor_3} inputOnChange={(value) => handleChangeInputValues('valor_3', value)} inputValue={inputValues.valor_3} isDisabled={isLoadingParametros} />
                            <InputNumber label={'Valor 4 dia'} erro={errors.valor_4} inputOnChange={(value) => handleChangeInputValues('valor_4', value)} inputValue={inputValues.valor_4} isDisabled={isLoadingParametros} />
                        </HStack>
                        <HStack flex={1} gap={15} >
                            <InputNumber label={'Valor 5 dia'} erro={errors.valor_5} inputOnChange={(value) => handleChangeInputValues('valor_5', value)} inputValue={inputValues.valor_5} isDisabled={isLoadingParametros} />
                            <InputNumber label={'Valor 6 dia'} erro={errors.valor_6} inputOnChange={(value) => handleChangeInputValues('valor_6', value)} inputValue={inputValues.valor_6} isDisabled={isLoadingParametros} />
                        </HStack>
                    </VStack>
                    <InputNumber label={'Valor Multa'} erro={errors.valor_multa} inputOnChange={(value) => handleChangeInputValues('valor_multa', value)} inputValue={inputValues.valor_multa} isDisabled={isLoadingParametros} />

                    <Divider bg="$backgroundDark800" />

                    <VStack flex={1} gap={15}>
                        <Heading fontSize={'$2xl'} color="#525252">Datas Mensalidade</Heading>
                        <InputNumber label={'Dia de Abertura dos Pagamentos'} erro={errors.dia_abertura_pagamentos} inputOnChange={(value) => handleChangeInputValues('dia_abertura_pagamentos', value)} inputValue={inputValues.dia_abertura_pagamentos} isDisabled={isLoadingParametros} />
                        <InputNumber label={'Dia Vencimento'} erro={errors.dia_vencimento} inputOnChange={(value) => handleChangeInputValues('dia_vencimento', value)} inputValue={inputValues.dia_vencimento} isDisabled={isLoadingParametros} />
                        <InputNumber label={'Dia Tolêrancia Multa'} erro={errors.dias_tolerancia_multa} inputOnChange={(value) => handleChangeInputValues('dias_tolerancia_multa', value)} inputValue={inputValues.dias_tolerancia_multa} isDisabled={isLoadingParametros} />
                    </VStack>

                    <Divider bg="$backgroundDark800" />

                    <VStack flex={1} gap={15}>
                        <Heading fontSize={'$2xl'} color="#525252">Liberações</Heading>
                        <InputSelect label="Liberar Alteração Dados Pessoais" erro={errors.libera_alteracao_dados_pessoais} selectValues={LiberadoBloqueadoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('libera_alteracao_dados_pessoais', value)} inputValue={LiberadoBloqueadoEnum[inputValues.libera_alteracao_dados_pessoais]} isDisabled={isLoadingParametros} />
                    </VStack>

                    <Box alignSelf="flex-end">
                        <Button label={'Salvar'} onPress={() => handleOnPressSave()} isLoading={isSaving} />
                    </Box>
                </Box>
            </ScrollView>
        </>

    )
}
