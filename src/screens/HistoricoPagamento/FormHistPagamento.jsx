import { Heading, ModalContent, useToast, Button, ButtonText, ModalCloseButton, Icon, CloseIcon, Modal, ModalBackdrop, ModalHeader, ModalBody, ModalFooter, ScrollView } from "@gluestack-ui/themed"
import { useEffect, useRef, useState } from "react"
import { cadastrarPagamento, editarPagamento } from "../../service/api/requests/pagamentoRequest"
import { InputSelect } from "../../components/formInputs/InputSelect"
import { InputNumber } from "../../components/formInputs/InputNumber"
import { InputDate } from "../../components/formInputs/InputDate"
import SituacaoPagamentoEnum from "../../enums/SituacaoPagamentoEnum"
import { buscarTodosUsuarios } from "../../service/api/requests/usuarioRequests"
import { InputText } from "../../components/formInputs/InputText"
import TipoPagamentoEnum from "../../enums/TipoPagamentoEnum"

export const FormHistPagamento = ({ onClose, dadosEdicao }) => {
    const toast = useToast();
    const ref = useRef(null);
    const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [inputValues, setInputValues] = useState({
        txid: dadosEdicao?.txid || null,
        copia_cola: dadosEdicao?.copia_cola || null,
        usuario: dadosEdicao?.usuario || null,
        tipo: dadosEdicao?.tipo || null,
        valor: dadosEdicao?.valor || null,
        multa: dadosEdicao?.multa || null,
        data_pagamento: dadosEdicao?.data_pagamento || null,
        data_vencimento: dadosEdicao?.data_vencimento || null,
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
    const buscarUsuarios = async () => {
        try {
            setIsLoadingUsuarios(true);
            const response = await buscarTodosUsuarios();
            const valoresSelect = response.data.map((value) => ({
                label: value.nome,
                value: value.id,
                isDisabled: value.situacao !== 'ATIVO'
            }));
            setUsuarios(valoresSelect);
            console.log(valoresSelect);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error.response.data);
        } finally {
            setIsLoadingUsuarios(false)
        }
    };

    useEffect(() => {
        buscarUsuarios();
    }, []);


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
                        <InputText label={'txid'} inputOnChange={(value) => handleChangeInputValues('txid', value)} isRequired={true} inputValue={inputValues.txid} />
                        <InputText label={'copia cola'} inputOnChange={(value) => handleChangeInputValues('copia_cola', value)} isRequired={true} inputValue={inputValues.copia_cola} />
                        <InputSelect label={'Usuario'} selectValues={usuarios} inputOnChange={(value) => handleChangeInputValues('usuario', value)} isRequired={true} inputValue={usuarios.find(v => v.value === inputValues.usuario)?.label} isLoading={isLoadingUsuarios} />
                        <InputNumber label={'Valor'} inputOnChange={(value) => handleChangeInputValues('valor', value)} isRequired={true} inputValue={inputValues.valor} />
                        <InputNumber label={'Multa'} inputOnChange={(value) => handleChangeInputValues('multa', value)} isRequired={true} inputValue={inputValues.multa} />
                        <InputSelect label={'Forma de Pagamento'} selectValues={TipoPagamentoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('tipo', value)} isRequired={true} inputValue={TipoPagamentoEnum[inputValues.tipo]} />
                        <InputDate la bel={'Data Pagamento'} inputOnChange={(value) => handleChangeInputValues('data_pagamento', value)} isRequire={true} inputValue={inputValues.data_pagamento} />
                        <InputDate la bel={'Data Vencimento'} inputOnChange={(value) => handleChangeInputValues('data_vencimento', value)} isRequire={true} inputValue={inputValues.data_vencimento} />
                        <InputSelect label={'Situação'} selectValues={SituacaoPagamentoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={SituacaoPagamentoEnum[inputValues.situacao]} />
                    </ScrollView>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button size='xl' borderRadius={'$xl'} variant="outline">
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    <Button size='xl' borderRadius={'$xl'} onPress={() => handleOnPressSave()}>
                        <ButtonText>
                            Salvar
                        </ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}