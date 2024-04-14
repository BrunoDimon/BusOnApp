import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter, useToast } from "@gluestack-ui/themed"
import { cadastrarInstituicao, editarInstituicao } from "../../service/api/requests/instituicaoRequests";
import ToastConfig from "../../components/toasts/ToastConfig"
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import { Button } from "../../components/buttons/Button";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";


export const FormInstituicao = ({ onClose, dadosEdicao }) => {
    const toast = useToast()
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const [inputValues, setInputValues] = useState({
        nome: dadosEdicao?.nome || null,
        endereco: dadosEdicao?.endereco || null,
        situacao: dadosEdicao?.situacao || null,
        associacao_id: dadosEdicao?.associacaoId || userInfos.associacaoId
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
                if (!eModoEdicao) {
                    await cadastrarInstituicao(inputValues);
                } else {
                    await editarInstituicao(dadosEdicao.id, inputValues);
                }
                toast.show(ToastConfig('success', 'Sucesso', 'Sucesso ao cadastrar!', (v) => toast.close(v)));
                onClose(true);
            } else {
                toast.show(ToastConfig('error', 'Erro', 'Campos Inválidos', (v) => toast.close(v)));
            }
        } catch (error) {
            console.error(error.response.data);
            toast.show(ToastConfig('error', 'Erro', error.response.data.message, (v) => toast.close(v)));
        }
    }

    return (
        <Modal isOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
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
                    <InputSelect label={'Situação'} erro={errors.situacao} selectValues={AtivoInativoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={AtivoInativoEnum[inputValues.situacao]} />
                </ModalBody>
                <ModalFooter gap={10}>
                    <Button label={'Cancelar'} variant={'outline'} action={'secondary'} onPress={() => onClose()} />
                    <Button label={'Salvar'} onPress={() => handleOnPressSave()} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}