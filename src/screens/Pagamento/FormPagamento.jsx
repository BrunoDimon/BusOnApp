import { Heading, ModalContent, ModalCloseButton, Icon, CloseIcon, Modal, ModalBackdrop, ModalHeader, ModalBody, ModalFooter, ScrollView } from "@gluestack-ui/themed"
import { useEffect, useRef, useState } from "react"
import { Button } from "../../components/buttons/Button";
import { cadastrarPagamento, editarPagamento } from "../../service/api/requests/pagamentoRequest"
import { InputSelect } from "../../components/formInputs/InputSelect"
import { InputNumber } from "../../components/formInputs/InputNumber"
import { InputDate } from "../../components/formInputs/InputDate"
import SituacaoPagamentoEnum from "../../enums/SituacaoPagamentoEnum"
import { buscarTodosUsuarios } from "../../service/api/requests/usuarioRequests"
import { InputText } from "../../components/formInputs/InputText"
import TipoPagamentoEnum from "../../enums/TipoPagamentoEnum"
import { useToast, Toast, ToastProvider } from "react-native-toast-notifications";
import ToastAlert from "../../components/toasts/ToastAlert";
import { useSelector } from 'react-redux';

export const FormPagamento = ({ onClose, dadosEdicao }) => {
    const [errors, setErrors] = useState({});
    const globalToast = useToast();
    const ref = useRef(null);
    const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const userInfos = useSelector(state => state.auth.user);
    const [inputValues, setInputValues] = useState({
        txid: dadosEdicao?.txid || null,
        copiaCola: dadosEdicao?.copiaCola || null,
        usuarioId: dadosEdicao?.usuarioId || null,
        tipo: dadosEdicao?.tipo || null,
        valor: dadosEdicao?.valor || null,
        multa: dadosEdicao?.multa || null,
        dataPagamento: dadosEdicao?.dataPagamento || null,
        dataVencimento: dadosEdicao?.dataVencimento || null,
        situacao: dadosEdicao?.situacao || 'ABERTO'

    });
    const [reconsultarRegistros, setReconsultarRegistros] = useState(false);
    const eModoEdicao = dadosEdicao ? true : false

    const handleChangeInputValues = (fieldName, value) => {
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });
    };
    const validarFormulario = () => {
        let errors = {};

        if (inputValues.usuarioId == null || inputValues.usuarioId == '') {
            errors.usuarioId = "Usuário é obrigatório"
        }
        if (inputValues.valor == null || inputValues.valor == '') {
            errors.valor = "Valor é obrigatório"
        }
        if (inputValues.tipo == null || inputValues.tipo == '') {
            errors.tipo = "Forma Pagamento é obrigatório"
        }
        if (inputValues.situacao == 'ABERTO' && (inputValues.dataPagamento == null || inputValues.dataPagamento == '')) {
            errors.dataPagamento = "Data Pagamento é obrigatório"
        }
        if (inputValues.situacao == null || inputValues.situacao == '') {
            errors.situacao = "Situação é obrigatório"
        }
        setErrors(errors);
        const isValid = (Object.keys(errors).length === 0);
        return isValid;
    }

    const handleOnPressSave = async () => {
        try {
            setIsSaving(true);
            if (validarFormulario()) {
                if (!eModoEdicao) {
                    await cadastrarPagamento(inputValues);
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Pagamento cadastrado com sucesso!' }, type: 'success' })
                } else {
                    await editarPagamento(dadosEdicao.id, inputValues);
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Pagamento alterado com sucesso!' }, type: 'success' })
                }
            } else {
                setIsSaving(false);
                Toast.show("Aviso", { data: { messageDescription: 'Preencha os campos obrigatórios do formulário!' }, type: 'warning' })
            }
        } catch (error) {
            setIsSaving(false);
            console.error(error);
            Toast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }
    const buscarUsuarios = async () => {
        try {
            setIsLoadingUsuarios(true);
            const filters = { equals: { associacaoId: userInfos.associacaoId } }
            const response = await buscarTodosUsuarios(filters);
            const valoresSelect = response.data.map((value) => ({
                label: value.nome,
                value: value.id,
                isDisabled: value.situacao !== 'ATIVO'
            }));
            setUsuarios(valoresSelect);
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
        <Modal useRNModal={true} defaultIsOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent maxHeight={'$3/4'}>
                <ModalHeader>
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Pagamento' : 'Edição Pagamento'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <ScrollView>
                        <InputSelect label={'Usuario'} selectValues={usuarios} inputOnChange={(value) => handleChangeInputValues('usuarioId', value)} isRequired={true} inputValue={inputValues.usuarioId} isLoading={isLoadingUsuarios} erro={errors.usuarioId} />
                        <InputNumber label={'Valor'} inputOnChange={(value) => handleChangeInputValues('valor', value)} isRequired={true} inputValue={inputValues.valor} erro={errors.valor} />
                        <InputNumber label={'Multa'} inputOnChange={(value) => handleChangeInputValues('multa', value)} isRequired={false} inputValue={inputValues.multa} erro={errors.multa} />
                        <InputSelect label={'Forma de Pagamento'} selectValues={TipoPagamentoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('tipo', value)} isRequired={true} inputValue={inputValues.tipo} erro={errors.tipo} />
                        <InputDate label={'Data Pagamento'} inputOnChange={(value) => handleChangeInputValues('dataPagamento', value)} isRequired={true} inputValue={inputValues.dataPagamento} erro={errors.dataPagamento} />
                        <InputDate label={'Data Vencimento'} inputOnChange={(value) => handleChangeInputValues('dataVencimento', value)} inputValue={inputValues.dataVencimento} erro={errors.dataVencimento} />
                        <InputSelect label={'Situação'} selectValues={SituacaoPagamentoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={inputValues.situacao} erro={errors.situacao} />
                    </ScrollView>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button label={"Cancelar"} variant={"outline"} action={"secondary"} onPress={() => onClose()} />
                    <Button label={"Salvar"} onPress={() => handleOnPressSave()} isLoading={isSaving} />
                </ModalFooter>
            </ModalContent>
            <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} />
        </Modal>
    )
}