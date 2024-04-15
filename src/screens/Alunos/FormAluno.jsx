import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter, useToast } from "@gluestack-ui/themed";
import { Button } from "../../components/buttons/Button";
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";
import { cadastrarAlunos } from "../../service/api/requests/alunosRequests";

export const FormAluno = ({ onClose, dadosEdicao }) => {
    const toast = useToast()
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const [inputValues, setInputValues] = useState({
        nome: dadosEdicao?.nome || null,
        endereco: dadosEdicao?.endereco || null,
        situacao: dadosEdicao?.situacao || null,
        associacao_id: dadosEdicao?.associacaoId || userInfos.associacaoId
    });

    const [errors, setErrors] = useState({});

    const eModoEdicao = dadosEdicao ? true : false

    const handleChangeInputValues = (fieldName, value) => {
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });
    };

    const validarFormulario = () => {
        let errors = {};

        if (!inputValues.nomeCompleto) {
            errors.nomeCompleto = "Nome é obrigatório";
        }
        if (!inputValues.email) {
            errors.email = "E-mail é obrigatório";
        }
        if (!inputValues.telefone) {
            errors.telefone = "Telefone é obrigatório";
        }

        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        return isValid;
    };

    const handleOnPressSave = async () => {
        try {
            if (validarFormulario()) {
                if (!eModoEdicao) {
                    await cadastrarAlunos(inputValues);
                } else {
                    await editarAlunos(dadosEdicao.id, inputValues);
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
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Aluno' : 'Edição Aluno'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <InputText label={"Nome Completo"} erro={errors.nomeCompleto} inputOnChange={(value) => handleChangeInputValues("nomeCompleto", value)} isRequired={true} inputValue={inputValues.nomeCompleto} />
                    <InputText label={"E-mail"} erro={errors.email} inputOnChange={(value) => handleChangeInputValues("email", value)} isRequired={true} inputValue={inputValues.email} />
                    <InputText label={"Telefone"} erro={errors.telefone} inputOnChange={(value) => handleChangeInputValues("telefone", value)} isRequired={true} inputValue={inputValues.telefone} />
                    <InputSelect label={"Faculdade"} inputOnChange={(value) => handleChangeInputValues("faculdade", value)} inputValue={inputValues.faculdade} selectValues={[
                        { label: "UNISATC", value: "UNISATC", isDisabled: false },
                        { label: "UNESC", value: "UNESC", isDisabled: false },
                        { label: "ESUCRI", value: "ESUCRI", isDisabled: false }
                    ]} />
                    <InputSelect label={"Curso"} inputOnChange={(value) => handleChangeInputValues("curso", value)} inputValue={inputValues.curso} selectValues={[
                        { label: "Engenharia de Software", value: "ENG_SOFT", isDisabled: false },
                        { label: "Engenharia da Computação", value: "ENG_COMPT", isDisabled: false },
                        { label: "Publicidade e Propaganda", value: "PUBLI_PROP", isDisabled: false }
                    ]} />
                </ModalBody>
                <ModalFooter gap={10}>
                    <Button label={"Cancelar"} variant={"outline"} action={"secondary"} onPress={() => onClose()} />
                    <Button label={"Salvar"} onPress={() => handleOnPressSave()} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};