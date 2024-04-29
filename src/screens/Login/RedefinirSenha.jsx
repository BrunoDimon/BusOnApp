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

export const RedefinirSenha = ({ onClose, dadosEdicao, eExigeTrocarSenha, onConfirmChangePassword }) => {
    const globalToast = useToast()
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const [inputValues, setInputValues] = useState({
        senhaAtual: dadosEdicao?.senhaAtual || null,
        senha: dadosEdicao?.senha || null,
        repetirSenha: dadosEdicao?.repetirSenha || null,
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
            if (inputValues.senhaAtual == null || inputValues.senhaAtual == '') {
                errors.senhaAtual = "Senha anterior é obrigatório"
            }
        }
        if (inputValues.senha == null || inputValues.senha == '') {
            errors.senha = "Nova Senha é obrigatório"
        }
        if (inputValues.repetirSenha == null || inputValues.repetirSenha == '') {
            errors.repetirSenha = "Repetir senha é obrigatório"
        }
        if ((inputValues.senha != null && inputValues.senha != '') && (inputValues.repetirSenha != null && inputValues.repetirSenha != '') && inputValues.senha != inputValues.repetirSenha) {
            errors.repetirSenha = "As senhas não correspondem"
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
            if (validarFormulario()) {
                onConfirmChangePassword(inputValues.senha);
                onClose(true);
                globalToast.show("Sucesso", { data: { messageDescription: 'Senha redefinida com sucesso!' }, type: 'success' })
            } else {
                Toast.show("Aviso", { data: { messageDescription: 'A validação do formulário falhou!\nVerifique os campos e tente novamente.' }, type: 'warning' })
            }
        } catch (error) {
            console.error(error.response.data);
            Toast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    return (
        <Modal defaultIsOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
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
                                <InputPassword label={'Senha Anterior'} erro={errors.senha} inputOnChange={(value) => handleChangeInputValues('senha', value)} isRequired={true} inputValue={inputValues.senha} />
                            </>
                        )
                    }
                    <InputPassword label={'Nova Senha'} erro={errors.senha} inputOnChange={(value) => handleChangeInputValues('senha', value)} isRequired={true} inputValue={inputValues.senha} />
                    <InputPassword label={'Repetir Senha'} erro={errors.repetirSenha} inputOnChange={(value) => handleChangeInputValues('repetirSenha', value)} isRequired={true} inputValue={inputValues.repetirSenha} />
                </ModalBody>
                <ModalFooter gap={10}>
                    <Button label={'Cancelar'} variant={'outline'} action={'secondary'} onPress={() => onClose()} />
                    <Button label={'Salvar'} onPress={() => acaoPressionarSalvar()} />
                </ModalFooter>
            </ModalContent>
            <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} />
        </Modal>
    )
}