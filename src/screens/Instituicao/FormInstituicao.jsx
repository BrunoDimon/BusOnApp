import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter } from "@gluestack-ui/themed"
import { cadastrarInstituicao, editarInstituicao } from "../../service/api/requests/instituicaoRequests";
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import { Button } from "../../components/buttons/Button";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";
import { ToastProvider, useToast, Toast } from "react-native-toast-notifications";
import ToastAlert from "../../components/toasts/ToastAlert";
import InputImage from "../../components/formInputs/InputImage";


export const FormInstituicao = ({ onClose, dadosEdicao }) => {
    const globalToast = useToast();
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const [inputValues, setInputValues] = useState({
        nome: dadosEdicao?.nome || null,
        endereco: dadosEdicao?.endereco || null,
        situacao: dadosEdicao?.situacao || 'ATIVO',
        associacaoId: dadosEdicao?.associacaoId || userInfos.associacaoId,
        logo: dadosEdicao?.logo && process.env.EXPO_PUBLIC_FILES_API_URL + dadosEdicao?.logo || null,
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

        if (inputValues.nome == null || inputValues.nome == '') {
            errors.nome = "Nome é obrigatório"
        }
        if (inputValues.endereco == null || inputValues.endereco == '') {
            errors.endereco = "Endereço é obrigatório"
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
                const formData = new FormData();
                formData.append('data', JSON.stringify({
                    nome: inputValues.nome,
                    endereco: inputValues.endereco,
                    situacao: inputValues.situacao,
                    associacaoId: inputValues.associacaoId,
                }));
                if (inputValues.logo) {
                    formData.append('logo', {
                        uri: inputValues.logo,
                        name: `${inputValues.nome}.jpg`,
                        type: 'image/jpeg'
                    });
                }
                if (!eModoEdicao) {
                    await cadastrarInstituicao(formData);
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Instituição cadastrada com sucesso!' }, type: 'success' })
                } else {
                    await editarInstituicao(dadosEdicao.id, formData);
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Instituição alterada com sucesso!' }, type: 'success' })
                }
            } else {
                Toast.show("Aviso", { data: { messageDescription: 'Preencha os campos obrigatórios do formulário!' }, type: 'warning' })
            }
        } catch (error) {
            console.error(error.response.data);
            Toast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    return (
        <Modal useRNModal={true} defaultIsOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Instituição' : 'Edição Instituição'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <InputText label={'Nome'} erro={errors.nome} inputOnChange={(value) => handleChangeInputValues('nome', value)} isRequired={true} inputValue={inputValues.nome} />
                    <InputText label={'Endereço'} erro={errors.endereco} inputOnChange={(value) => handleChangeInputValues('endereco', value)} isRequired={true} inputValue={inputValues.endereco} />
                    <InputSelect label={'Situação'} erro={errors.situacao} selectValues={AtivoInativoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={inputValues.situacao} />
                    <InputImage label={'Logo'} erro={errors.logo} onPickImage={(value) => handleChangeInputValues('logo', value)} imageValue={inputValues.logo} />
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