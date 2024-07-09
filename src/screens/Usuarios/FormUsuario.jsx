import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter, ScrollView } from "@gluestack-ui/themed";
import { Button } from "../../components/buttons/Button";
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/formInputs/InputText";
import { InputSelect } from "../../components/formInputs/InputSelect";
import AtivoInativoEnum from "../../enums/AtivoInativoEnum";
import { useSelector } from "react-redux";
import { cadastrarUsuario, editarUsuario } from "../../service/api/requests/usuarioRequests";
import TipoAcessoUsuarioEnum from "../../enums/TipoAcessoUsuarioEnum";
import { InputCheckbox } from "../../components/formInputs/InputCheckbox";
import DiasSemanaEnum from "../../enums/DiasSemanaEnum";
import { buscarTodasInstituicoes } from "../../service/api/requests/instituicaoRequests";
import { buscarTodosCursos } from "../../service/api/requests/cursoRequests";
import { buscarTodasAssociacoes } from "../../service/api/requests/associacaoRequests";
import { useToast, Toast, ToastProvider } from "react-native-toast-notifications";
import ToastAlert from "../../components/toasts/ToastAlert";
import InputImage from "../../components/formInputs/InputImage";
import { InputNumber } from "../../components/formInputs/InputNumber";
import mime from 'mime'
import validarEmail from "../../functions/ValidarEmail";
import { InputDate } from "../../components/formInputs/InputDate";

export const FormUsuario = ({ onClose, dadosEdicao }) => {
    const globalToast = useToast();
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const eUsuarioAdmin = userInfos.tipoAcesso == "ADMIN";

    const [inputValues, setInputValues] = useState({
        associacaoId: dadosEdicao?.associacaoId || userInfos?.associacaoId,
        nome: dadosEdicao?.nome || null,
        email: dadosEdicao?.email || null,
        telefone: dadosEdicao?.telefone || null,
        endereco: dadosEdicao?.endereco || null,
        matricula: dadosEdicao?.matricula || null,
        instituicaoId: dadosEdicao?.instituicaoId || null,
        dataEntradaAssociacao: dadosEdicao?.dataEntradaAssociacao || null,
        cursoId: dadosEdicao?.cursoId || null,
        tipoAcesso: dadosEdicao?.tipoAcesso || "ALUNO",
        situacao: dadosEdicao?.situacao || "ATIVO",
        diasUsoTransporte: dadosEdicao?.diasUsoTransporte || [],
        senha: null,
        foto: dadosEdicao?.foto && process.env.EXPO_PUBLIC_FILES_API_URL + dadosEdicao?.foto || null,
    });

    const [associacoes, setAssociacoes] = useState([]);
    const [isLoadingAssociacoes, setIsLoadingAssociacoes] = useState(false);

    const [instituicoes, setInstituicoes] = useState([]);
    const [isLoadingInstituicoes, setIsLoadingInstituicoes] = useState(false);

    const [cursos, setCursos] = useState([]);
    const [isLoadingCursos, setIsLoadingCursos] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const eModoEdicao = dadosEdicao ? true : false

    const handleChangeInputValues = (fieldName, value) => {
        setInputValues(prevState => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const buscarAssociacoes = async () => {
        try {
            setIsLoadingAssociacoes(true);
            const response = await buscarTodasAssociacoes();
            const valoresSelect = response.data.map((value) => ({
                label: value.sigla,
                value: value.id,
                isDisabled: value.situacao !== 'ATIVO'
            }));
            setAssociacoes(valoresSelect);
        } catch (error) {
            console.error('Erro ao buscar instituições:', error.response.data);
        } finally {
            setIsLoadingAssociacoes(false)
        }
    };
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
    const buscarCursos = async () => {
        try {
            setIsLoadingCursos(true);
            const response = await buscarTodosCursos({ equals: { instituicaoId: inputValues.instituicaoId } });
            const valoresSelect = response.data.map((value) => ({
                label: value.nome,
                value: value.id,
                isDisabled: value.situacao !== 'ATIVO'
            }));
            setCursos(valoresSelect);
        } catch (error) {
            console.error('Erro ao buscar cursos:', error.response.data);
        } finally {
            setIsLoadingCursos(false)
        }
    };

    useEffect(() => {
        buscarAssociacoes();
        buscarInstituicoes();
    }, []);
    useEffect(() => {
        buscarCursos();
    }, [inputValues.instituicaoId]);

    const validarFormulario = () => {
        let errors = {};

        if (!eUsuarioAdmin && !inputValues.associacaoId) {
            errors.associacaoId = "Associação é obrigatória";
        }
        if (inputValues.associacaoId && !inputValues.dataEntradaAssociacao) {
            errors.dataEntradaAssociacao = "Data entrada associação é obrigatória";
        }
        if (!inputValues.nome) {
            errors.nome = "Nome é obrigatório";
        }
        if (!inputValues.email) {
            errors.email = "E-mail é obrigatório";
        } else {
            if (!validarEmail(inputValues.email)) {
                errors.email = "O valor informado não é um e-mail";
            }
        }
        if (!inputValues.telefone) {
            errors.telefone = "Telefone é obrigatório";
        }
        if (!inputValues.tipoAcesso) {
            errors.tipoAcesso = "Tipo acesso é obrigatório";
        }
        if (!inputValues.situacao) {
            errors.situacao = "Situação é obrigatório";
        }

        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        return isValid;
    };

    const handleOnPressSave = async () => {
        try {
            setIsSaving(true);
            if (validarFormulario()) {
                const formData = new FormData();
                formData.append('data', JSON.stringify({
                    associacaoId: inputValues?.associacaoId,
                    nome: inputValues?.nome,
                    email: inputValues?.email,
                    telefone: inputValues?.telefone,
                    endereco: inputValues?.endereco,
                    matricula: inputValues?.matricula,
                    instituicaoId: inputValues?.instituicaoId,
                    dataEntradaAssociacao: inputValues?.dataEntradaAssociacao,
                    cursoId: inputValues?.cursoId,
                    tipoAcesso: inputValues?.tipoAcesso,
                    situacao: inputValues?.situacao,
                    diasUsoTransporte: inputValues?.diasUsoTransporte,
                    senha: inputValues?.senha
                }));
                if (inputValues.foto) {
                    const img = {
                        uri: inputValues.foto,
                        name: `${inputValues.nome}.jpg`,
                        type: 'image/jpeg'
                    };
                    console.log(img.uri)
                    formData.append('foto', img);
                }
                setTimeout(async () => {
                    if (!eModoEdicao) {
                        await cadastrarUsuario(formData)
                            .finally(() => {
                                setIsSaving(false);
                            });
                        onClose(true);
                        globalToast.show("Sucesso", { data: { messageDescription: 'Usuário cadastrado com sucesso!' }, type: 'success' })
                    } else {
                        await editarUsuario(dadosEdicao.id, formData)
                            .finally(() => {
                                setIsSaving(false);
                            });
                        onClose(true);
                        globalToast.show("Sucesso", { data: { messageDescription: 'Usuário alterado com sucesso!' }, type: 'success' })
                    }
                }, 500);
            } else {
                setIsSaving(false);
                Toast.show("Aviso", { data: { messageDescription: 'Preencha os campos obrigatórios do formulário!' }, type: 'warning' })
            }
        } catch (error) {
            setIsSaving(false);
            console.error(error.response?.data);
            Toast.show("Erro", { data: { messageDescription: error?.response?.data?.message }, type: 'warning' })
        }
    }

    const tipoAcessoValores =
        eUsuarioAdmin
            ?
            { ADMIN: 'Administrador', GESTAO: 'Gestor' }
            :
            { ALUNO: 'Aluno', GESTAO: 'Gestor' }


    return (
        <Modal useRNModal={true} defaultIsOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent maxHeight={'$3/4'}>
                <ModalHeader>
                    <Heading size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Aluno' : 'Edição Aluno'}</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody >
                    <ScrollView >
                        <InputSelect label={"Associação"} erro={errors.associacaoId} inputOnChange={(value) => handleChangeInputValues("associacaoId", value)} inputValue={inputValues.associacaoId} selectValues={associacoes} isRequired={!eUsuarioAdmin} isDisabled={!eUsuarioAdmin} />
                        <InputText label={"Nome Completo"} erro={errors.nome} inputOnChange={(value) => handleChangeInputValues("nome", value)} isRequired={true} inputValue={inputValues.nome} />
                        <InputImage label={'Foto'} erro={errors.foto} onPickImage={(value) => handleChangeInputValues('foto', value)} imageValue={inputValues.foto} />
                        <InputText label={"E-mail"} erro={errors.email} keyboardType={'email-address'} autoCapitalize="none" inputOnChange={(value) => handleChangeInputValues("email", value)} isRequired={true} inputValue={inputValues.email} />
                        <InputNumber label={"Telefone"} erro={errors.telefone} inputOnChange={(value) => handleChangeInputValues("telefone", value)} isRequired={true} inputValue={inputValues.telefone} />
                        <InputText label={"Endereço"} erro={errors.endereco} inputOnChange={(value) => handleChangeInputValues("endereco", value)} inputValue={inputValues.endereco} />
                        <InputText label={"Matricula"} erro={errors.matricula} inputOnChange={(value) => handleChangeInputValues("matricula", value)} inputValue={inputValues.matricula} />
                        <InputSelect label={"Instituição"} inputOnChange={(value) => handleChangeInputValues("instituicaoId", value)} inputValue={inputValues.instituicaoId} selectValues={instituicoes} />
                        <InputSelect label={"Curso"} inputOnChange={(value) => handleChangeInputValues("cursoId", value)} inputValue={inputValues.cursoId} selectValues={cursos} isDisabled={!inputValues.instituicaoId} />
                        <InputSelect label={"Tipo Acesso"} inputOnChange={(value) => handleChangeInputValues("tipoAcesso", value)} inputValue={inputValues.tipoAcesso} selectValues={tipoAcessoValores} typeSelectValues={'ENUM'} isRequired={true} />
                        <InputDate label={'Data Entrada Associação'} inputOnChange={(value) => handleChangeInputValues('dataEntradaAssociacao', value)} inputValue={inputValues.dataEntradaAssociacao} erro={errors.dataEntradaAssociacao} isRequired={inputValues.associacaoId} />
                        <InputSelect label={"Situação"} inputOnChange={(value) => handleChangeInputValues("situacao", value)} inputValue={inputValues.situacao} selectValues={AtivoInativoEnum} typeSelectValues={'ENUM'} isRequired={true} />
                        <InputCheckbox label={"Dias Uso Transporte"} inputOnChange={(value) => handleChangeInputValues("diasUsoTransporte", value)} checkboxValues={DiasSemanaEnum} typeCheckboxValues={'ENUM'} inputValue={inputValues.diasUsoTransporte} />
                    </ScrollView>
                </ModalBody>
                <ModalFooter gap={10}>
                    <Button label={"Cancelar"} variant={"outline"} action={"secondary"} onPress={() => onClose()} />
                    <Button label={"Salvar"} onPress={() => handleOnPressSave()} isLoading={isSaving} />
                </ModalFooter>
            </ModalContent>
            <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} />
        </Modal >
    );
};