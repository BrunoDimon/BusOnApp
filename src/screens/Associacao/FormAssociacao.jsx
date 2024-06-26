import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter } from "@gluestack-ui/themed"
import { cadastrarAssociacao, editarAssociacao } from "../../service/api/requests/associacaoRequests";
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import { Button } from "../../components/buttons/Button";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";
import { InputNumber } from "../../components/formInputs/InputNumber";
import { useToast, Toast, ToastProvider } from "react-native-toast-notifications";
import ToastAlert from "../../components/toasts/ToastAlert";
import InputImage from "../../components/formInputs/InputImage";

export const FormAssociacao = ({ onClose, dadosEdicao }) => {
    const globalToast = useToast();
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const [isSaving, setIsSaving] = useState(false);
    const [inputValues, setInputValues] = useState({
        cnpj: dadosEdicao?.cnpj || null,
        nome: dadosEdicao?.nome || null,
        endereco: dadosEdicao?.endereco || null,
        situacao: dadosEdicao?.situacao || 'ATIVO',
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
            setIsSaving(true);
            if (validarFormulario()) {
                const formData = new FormData();
                formData.append('data', JSON.stringify({
                    cnpj: inputValues.cnpj,
                    nome: inputValues.nome,
                    endereco: inputValues.endereco,
                    situacao: inputValues.situacao,
                }));
                if (inputValues.logo) {
                    const img = {
                        uri: inputValues.logo,
                        name: `${inputValues.nome}.jpg`,
                        type: 'image/jpeg'
                    };
                    console.log(img.uri)
                    formData.append('logo', img);
                }
                setTimeout(async () => {
                    if (!eModoEdicao) {
                        await cadastrarAssociacao(formData);
                        onClose(true);
                        globalToast.show("Sucesso", { data: { messageDescription: 'Associação cadastrada com sucesso!' }, type: 'success' })
                    } else {
                        await editarAssociacao(dadosEdicao.id, formData);
                        onClose(true);
                        globalToast.show("Sucesso", { data: { messageDescription: 'Associação alterada com sucesso!' }, type: 'success' })
                    }
                }, 500);
            } else {
                setIsSaving(false);
                Toast.show("Aviso", { data: { messageDescription: 'Preencha os campos obrigatórios do formulário!' }, type: 'warning' })
            }
        } catch (error) {
            setIsSaving(false);
            console.error(error.response.data);
            Toast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    return (
        <Modal useRNModal={true} defaultIsOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Associação' : 'Edição Associação'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <InputNumber label={'CNPJ'} erro={errors.cnpj} inputOnChange={(value) => handleChangeInputValues('cnpj', value)} inputValue={inputValues.cnpj} />
                    <InputText label={'Nome'} erro={errors.nome} inputOnChange={(value) => handleChangeInputValues('nome', value)} isRequired={true} inputValue={inputValues.nome} />
                    <InputText label={'Endereço'} erro={errors.endereco} inputOnChange={(value) => handleChangeInputValues('endereco', value)} isRequired={true} inputValue={inputValues.endereco} />
                    <InputSelect label={'Situação'} erro={errors.situacao} selectValues={AtivoInativoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={inputValues.situacao} />
                    <InputImage label={'Logo'} erro={errors.logo} onPickImage={(value) => {
                        handleChangeInputValues('logo', value);
                    }} imageValue={inputValues.logo} />
                </ModalBody>
                <ModalFooter gap={10}>
                    <Button label={'Cancelar'} variant={'outline'} action={'secondary'} onPress={() => onClose()} />
                    <Button label={'Salvar'} onPress={() => handleOnPressSave()} isLoading={isSaving} />
                </ModalFooter>
            </ModalContent>
            <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} />
        </Modal>
    )
}