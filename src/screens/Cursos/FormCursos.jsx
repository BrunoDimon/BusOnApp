import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter, Spinner, ThreeDotsIcon } from "@gluestack-ui/themed"
import { buscarTodasInstituicoes, cadastrarInstituicao, editarInstituicao } from "../../service/api/requests/instituicaoRequests";
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import { Button } from "../../components/buttons/Button";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";
import { Box } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { cadastrarCurso, editarCurso } from "../../service/api/requests/cursoRequests";
import { useToast, Toast, ToastProvider } from "react-native-toast-notifications";
import ToastAlert from "../../components/toasts/ToastAlert";

export const FormCursos = ({ onClose, dadosEdicao }) => {
    const globalToast = useToast();
    const ref = useRef(null)
    const [isLoadingInstituicoes, setIsLoadingInstituicoes] = useState(false);
    const [instituicoes, setInstituicoes] = useState([])
    const [inputValues, setInputValues] = useState({
        nome: dadosEdicao?.nome || null,
        situacao: dadosEdicao?.situacao || "ATIVO",
        instituicaoId: dadosEdicao?.instituicaoId || null,
    });

    const eModoEdicao = dadosEdicao ? true : false

    const handleChangeInputValues = (fieldName, value) => {
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });
    };

    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        let errors = {};

        if (inputValues.instituicaoId == null || inputValues.instituicaoId == '') {
            errors.instituicaoId = "Instituição é obrigatório"
        }
        if (inputValues.nome == null || inputValues.nome == '') {
            errors.nome = "Nome é obrigatório"
        }
        if (inputValues.situacao == null || inputValues.situacao == '') {
            errors.situacao = "Situação é obrigatório"
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
            if (validarFormulario()) {
                if (!eModoEdicao) {
                    await cadastrarCurso(inputValues);
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Curso cadastrado com sucesso!' }, type: 'success' })
                } else {
                    await editarCurso(dadosEdicao.id, inputValues);
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Curso alterado com sucesso!' }, type: 'success' })
                }
            } else {
                Toast.show("Aviso", { data: { messageDescription: 'Preencha os campos obrigatórios do formulário!' }, type: 'warning' })
            }
        } catch (error) {
            console.error(error.response.data);
            Toast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }
    const buscarInstituicoes = async () => {
        try {
            setIsLoadingInstituicoes(true);
            const response = await buscarTodasInstituicoes();
            const valoresSelect = response.data.map((value) => ({
                label: value.nome,
                value: value.id,
                isDisabled: value.situacao !== 'ATIVO'
            }));
            setInstituicoes(valoresSelect);
        } catch (error) {
            console.error('Erro ao buscar instituições:', error.response.data);
        } finally {
            setIsLoadingInstituicoes(false)
        }
    };

    useEffect(() => {
        buscarInstituicoes();
    }, []);

    return (
        <Modal useRNModal={true} defaultIsOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Curso' : 'Edição Curso'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody >
                    <InputSelect label={'Instituição'} erro={errors.instituicaoId} selectValues={instituicoes} inputOnChange={(value) => handleChangeInputValues('instituicaoId', value)} isRequired={true} inputValue={inputValues.instituicaoId} isLoading={isLoadingInstituicoes} />
                    <InputText label={'Nome'} erro={errors.nome} inputOnChange={(value) => handleChangeInputValues('nome', value)} isRequired={true} inputValue={inputValues.nome} />
                    <InputSelect label={'Situação'} erro={errors.situacao} selectValues={AtivoInativoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={inputValues.situacao} />
                </ModalBody>
                <ModalFooter gap={10}>
                    <Button label={'Cancelar'} variant={'outline'} action={'secondary'} onPress={() => onClose()} />
                    <Button label={'Salvar'} onPress={() => handleOnPressSave()} />
                </ModalFooter>
            </ModalContent>
            <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} />
        </Modal>
    )
}