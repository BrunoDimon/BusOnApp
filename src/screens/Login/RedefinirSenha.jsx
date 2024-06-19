import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter, Center } from "@gluestack-ui/themed"
import { cadastrarInstituicao, editarInstituicao } from "../../service/api/requests/instituicaoRequests";
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import { Button } from "../../components/buttons/Button";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";
import { InputPassword } from "../../components/formInputs/InputPassword";
import { Text } from "@gluestack-ui/themed";
import { useToast, Toast, ToastProvider } from "react-native-toast-notifications";
import ToastAlert from "../../components/toasts/ToastAlert";
import { editarSenhaUsuario } from "../../service/api/requests/usuarioRequests";

export const RedefinirSenha = ({ onClose, dadosEdicao, eExigeTrocarSenha, onConfirmChangePassword }) => {
    const globalToast = useToast()
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [inputValues, setInputValues] = useState({
        idUsuario: dadosEdicao?.id || null,
        senhaAntiga: dadosEdicao?.senhaAntiga || null,
        senhaNova: dadosEdicao?.senhaNova || null,
        repetirSenhaNova: dadosEdicao?.repetirSenhaNova || null,
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
        if (!eExigeTrocarSenha) {
            if (inputValues.senhaAntiga == null || inputValues.senhaAntiga == '') {
                errors.senhaAntiga = "Senha anterior é obrigatório"
            }
        }
        if (inputValues.senhaNova == null || inputValues.senhaNova == '') {
            errors.senhaNova = "Nova Senha é obrigatório"
        }
        if (inputValues.repetirSenhaNova == null || inputValues.repetirSenhaNova == '') {
            errors.repetirSenhaNova = "Repetir senha é obrigatório"
        }
        if ((inputValues.senhaNova != null && inputValues.senhaNova != '') && (inputValues.repetirSenhaNova != null && inputValues.repetirSenhaNova != '') && inputValues.senhaNova != inputValues.repetirSenhaNova) {
            errors.repetirSenhaNova = "As senhas não correspondem"
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


    const acaoPressionarSalvar = async () => {
        try {
            setButtonIsLoading(true);
            if (validarFormulario()) {
                await editarSenhaUsuario(inputValues.idUsuario, { senhaAntiga: inputValues.senhaAntiga, senhaNova: inputValues.senhaNova })
                    .then((response) => {
                        onConfirmChangePassword(inputValues.senhaNova);
                        onClose(true);
                        globalToast.show("Sucesso", { data: { messageDescription: 'Senha redefinida com sucesso!' }, type: 'success' })
                    }).catch((error) => {
                        Toast.show("Aviso", { data: { messageDescription: error?.response?.data?.message }, type: 'warning' })
                    }).finally(() => {
                        setButtonIsLoading(false);
                    })
            } else {
                setButtonIsLoading(false);
                Toast.show("Aviso", { data: { messageDescription: 'A validação do formulário falhou!\nVerifique os campos e tente novamente.' }, type: 'warning' })
            }
        } catch (error) {
            setButtonIsLoading(false);
            console.error(error.response.data);
            Toast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    return (
        <Modal defaultIsOpen={true} useRNModal={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{'Redefinir Senha'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    {eExigeTrocarSenha ?
                        (
                            <Center mb={15}>
                                <Heading fontWeight="normal" >Troca de Senha Obrigatória</Heading>
                                <Text textAlign="center">Você está realizando seu primeiro login, portanto é necessário trocar a senha padrão por segurança</Text>
                            </Center>
                        )
                        :
                        (
                            <>
                                <InputPassword label={'Senha Anterior'} erro={errors.senhaAntiga} inputOnChange={(value) => handleChangeInputValues('senhaAntiga', value)} isRequired={true} inputValue={inputValues.senhaAntiga} />
                            </>
                        )
                    }
                    <InputPassword label={'Nova Senha'} erro={errors.senhaNova} inputOnChange={(value) => handleChangeInputValues('senhaNova', value)} isRequired={true} inputValue={inputValues.senhaNova} />
                    <InputPassword label={'Repetir Senha'} erro={errors.repetirSenhaNova} inputOnChange={(value) => handleChangeInputValues('repetirSenhaNova', value)} isRequired={true} inputValue={inputValues.repetirSenhaNova} />
                </ModalBody>
                <ModalFooter gap={10}>
                    <Button label={'Cancelar'} variant={'outline'} action={'secondary'} onPress={() => onClose()} />
                    <Button label={'Salvar'} onPress={() => acaoPressionarSalvar()} isLoading={buttonIsLoading} />
                </ModalFooter>
            </ModalContent>
            <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} />
        </Modal>
    )
}