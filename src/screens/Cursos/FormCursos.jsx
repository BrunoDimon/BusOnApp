import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter, useToast, Spinner, ThreeDotsIcon } from "@gluestack-ui/themed"
import { buscarTodasInstituicoes, cadastrarInstituicao, editarInstituicao } from "../../service/api/requests/instituicaoRequests";
import ToastConfig from "../../components/toasts/ToastConfig"
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import { Button } from "../../components/buttons/Button";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";
import { Box } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { cadastrarCurso, editarCurso } from "../../service/api/requests/cursoRequests";


export const FormCursos = ({ onClose, dadosEdicao }) => {
    const toast = useToast()
    const ref = useRef(null)
    const [isLoadingInstituicoes, setIsLoadingInstituicoes] = useState(false);
    const [instituicoes, setInstituicoes] = useState([])
    const [inputValues, setInputValues] = useState({
        nome: dadosEdicao?.nome || null,
        situacao: dadosEdicao?.situacao || null,
        instituicao_id: dadosEdicao?.instituicao_id || null,
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

        if (inputValues.instituicao_id == null || inputValues.instituicao_id == '') {
            errors.instituicao_id = "Instituição é obrigatório"
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
                } else {
                    await editarCurso(dadosEdicao.id, inputValues);
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
        <Modal isOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Curso' : 'Edição Curso'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody >
                    <InputSelect label={'Instituição'} erro={errors.instituicao_id} selectValues={instituicoes} inputOnChange={(value) => handleChangeInputValues('instituicao_id', value)} isRequired={true} inputValue={instituicoes.find(v => v.value === inputValues.instituicao_id)?.label} isLoading={isLoadingInstituicoes} />
                    <InputText label={'Nome'} erro={errors.nome} inputOnChange={(value) => handleChangeInputValues('nome', value)} isRequired={true} inputValue={inputValues.nome} />
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