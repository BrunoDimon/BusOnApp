import { Heading, ModalContent, useToast, ModalCloseButton, Icon, CloseIcon, Modal, ModalBackdrop, ModalHeader, ModalBody, ModalFooter, ScrollView } from "@gluestack-ui/themed"
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
import ToastConfig from "../../components/toasts/ToastConfig";

export const FormHistPagamento = ({ onClose, dadosEdicao }) => {
    const toast = useToast();
    const ref = useRef(null);
    const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [inputValues, setInputValues] = useState({
        txid: dadosEdicao?.txid || null,
        copiaCola: dadosEdicao?.copiaCola || null,
        usuarioId: dadosEdicao?.usuarioId || null,
        tipo: dadosEdicao?.tipo || null,
        valor: dadosEdicao?.valor || null,
        multa: dadosEdicao?.multa || null,
        dataPagamento: dadosEdicao?.dataPagamento || new Date(),
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
            <ModalContent maxHeight={'$3/4'}>
                <ModalHeader justifyContent="center">
                    <Heading size="xl" color="$textDark800">Cadastro de Pagamento</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <ScrollView>
                        <InputSelect label={'Usuario'} selectValues={usuarios} inputOnChange={(value) => handleChangeInputValues('usuarioId', value)} isRequired={true} inputValue={inputValues.usuarioId} isLoading={isLoadingUsuarios} />
                        <InputNumber label={'Valor'} inputOnChange={(value) => handleChangeInputValues('valor', value)} isRequired={true} inputValue={inputValues.valor} />
                        <InputNumber label={'Multa'} inputOnChange={(value) => handleChangeInputValues('multa', value)} isRequired={false} inputValue={inputValues.multa} />
                        <InputSelect label={'Forma de Pagamento'} selectValues={TipoPagamentoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('tipo', value)} isRequired={true} inputValue={inputValues.tipo} />
                        <InputDate label={'Data Pagamento'} inputOnChange={(value) => handleChangeInputValues('dataPagamento', value)} isRequire={true} inputValue={inputValues.dataPagamento} />
                        <InputSelect label={'Situação'} selectValues={SituacaoPagamentoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={inputValues.situacao} />
                    </ScrollView>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Button label={"Cancelar"} variant={"outline"} action={"secondary"} onPress={() => onClose()} />
                    <Button label={"Salvar"} onPress={() => handleOnPressSave()} />
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}