import { Heading, ModalContent, useToast, Button, ButtonText, ModalCloseButton, Icon, CloseIcon, Modal, ModalBackdrop, ModalHeader, ModalBody, ModalFooter, ScrollView } from "@gluestack-ui/themed"
import { useRef, useState } from "react"
import { FormInput } from "../../components/formInputs/FormInput"
import { cadastrarPagamento, editarPagamento } from "../../service/api/requests/pagamentoRequest"

export const FormHistPagamento = ({ onClose, dadosEdicao }) => {
    const toast = useToast();
    const ref = useRef(null);
    const [inputValues, setInputValues] = useState({
        txid: dadosEdicao?.txid || null,
        copia_cola: dadosEdicao?.copia_cola || null,
        usuario: dadosEdicao?.usuario || null,
        valor: dadosEdicao?.valor || null,
        multa: dadosEdicao?.multa || null,
        data_vencimento: dadosEdicao?.data_vencimento || null,
        data_pagamento: dadosEdicao?.data_vencimento || null,
        situacao: dadosEdicao?.situacao || null

    });
    const [reconsultarRegistros, setReconsultarRegistros] = useState(false);
    const eModoEdicao = dadosEdicao ? true : false
    const handleChangeInputValues = (fieldName, value) => {
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });
    };
    const handleOnPressSave = async () => {
        try {
            if (!eModoEdicao) {
                await cadastrarPagamento(inputValues);
            } else {
                await editarPagamento(dadosEdicao.id, inputValues);
            }
            toast.show(ToastConfig('success', 'Sucesso', 'Sucesso ao cadastrar!', (v) => toast.close(v)));
            onClose(true);
        } catch (error) {
            console.error(error);
            toast.show(ToastConfig('error', 'Erro', error.response.data.message, (v) => toast.close(v)));
        }
    }


    return (
        <Modal isOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader justifyContent="center">
                    <Heading size="xl" color="$textDark800">Cadastro de Pagamento</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <ScrollView>
                        <FormInput label={'Usuario'} inputValues={inputValues.usuario} inputOnChangeText={(value) => handleChangeInputValues('usuario', value)} isRequired={true} keyboardType={'number-pad'} />
                        <FormInput label={'Valor'} inputValues={inputValues.valor} inputOnChangeText={(value) => handleChangeInputValues('valor', value)} isRequired={true} keyboardType={'number-pad'} />
                        <FormInput label={'Multa'} inputValues={inputValues.multa} inputOnChangeText={(value) => handleChangeInputValues('multa', value)} isRequired={true} keyboardType={'number-pad'} />
                        <FormInput label={'Data Vencimento'} inputValues={inputValues.data_vencimento} inputOnChangeText={(value) => handleChangeInputValues('data_vencimento', value)} isRequired={true} />
                        <FormInput label={'Data Pagamento'} inputValues={inputValues.data_pagamento} inputOnChangeText={(value) => handleChangeInputValues('data_pagamento', value)} isRequired={true} />
                        <FormInput label={'Situacao'} inputValues={inputValues.situacao} inputOnChangeText={(value) => handleChangeInputValues('situacao  ', value)} isRequired={true} />
                    </ScrollView>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button size='xl' borderRadius={'$xl'} variant="outline">
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    <Button size='xl' borderRadius={'$xl'}>
                        <ButtonText>
                            Salvar
                        </ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )


}
