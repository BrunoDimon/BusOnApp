import { Box, Input, ScrollView, InputField, Modal, Spinner } from "@gluestack-ui/themed"
import Label from "../../components/Label"
import { InputSelect } from "../../components/formInputs/InputSelect"
import { InputText } from "../../components/formInputs/InputText"
import { InputDate } from "../../components/formInputs/InputDate"
import { useEffect, useState } from "react"
import { Button } from "../../components/buttons/Button"
import DiasSemanaEnum from "../../enums/DiasSemanaEnum";
import { buscarTodasAssociacoes } from "../../service/api/requests/associacaoRequests"
import { buscarTodasInstituicoes } from "../../service/api/requests/instituicaoRequests"
import { buscarTodosCursos } from "../../service/api/requests/cursoRequests"
import { InputCheckbox } from "../../components/formInputs/InputCheckbox"
import { useSelector } from "react-redux"
import { buscarUsuarioPorId, editarUsuario } from "../../service/api/requests/usuarioRequests"
import { Heading } from "@gluestack-ui/themed"
import { buscarParametroDaAssociacao } from "../../service/api/requests/parametroRequests"
import { useToast } from "react-native-toast-notifications"
import InputImage from "../../components/formInputs/InputImage"

export default MeusDados = ({ navigation }) => {
    const globalToast = useToast()

    const usuarioId = useSelector(state => state.auth.user.id);
    const associacaoId = useSelector(state => state.auth.user.associacaoId);
    const [isLoadingDadosUsuario, setIsLoadingDadosUsuario] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [inputValues, setInputValues] = useState({
        nome: null,
        email: null,
        telefone: null,
        endereco: null,
        matricula: null,
        instituicaoId: null,
        cursoId: null,
        diasUsoTransporte: [],
        foto: null,
    });
    const handleChangeInputValues = (fieldName, value) => {
        setInputValues({
            ...inputValues,
            [fieldName]: value,
        });
    };

    const [associacoes, setAssociacoes] = useState([]);
    const [isLoadingAssociacoes, setIsLoadingAssociacoes] = useState(false);

    const [instituicoes, setInstituicoes] = useState([]);
    const [isLoadingInstituicoes, setIsLoadingInstituicoes] = useState(false);

    const [cursos, setCursos] = useState([]);
    const [isLoadingCursos, setIsLoadingCursos] = useState(false);

    const [errors, setErrors] = useState({});
    const [isDisabledDadosUsuarios, setIsDisabledDadosUsuarios] = useState(true);

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
        navigation.setOptions({ onRightButtonPress: buscarDadosUsuario })
    }, [navigation]);

    const buscarDadosUsuario = async () => {
        setIsLoadingDadosUsuario(true);
        try {
            const response = await buscarUsuarioPorId(usuarioId);
            const dadosUsuario = response.data;
            if (dadosUsuario) {
                const data = {
                    nome: dadosUsuario.nome,
                    email: dadosUsuario.email,
                    telefone: dadosUsuario.telefone,
                    endereco: dadosUsuario.endereco,
                    matricula: dadosUsuario.matricula,
                    instituicaoId: dadosUsuario.curso?.instituicao?.id,
                    cursoId: dadosUsuario.curso?.id,
                    diasUsoTransporte: dadosUsuario.diasUsoTransporte,
                    foto: dadosUsuario.fotoUrl && process.env.EXPO_PUBLIC_FILES_API_URL + dadosUsuario.fotoUrl || null,
                };
                setInputValues(data);
            }
        } catch (error) {
            console.error('Usuário não encontrado!', error.response.data);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setIsLoadingDadosUsuario(false);
        }
    };

    const buscarPermiteAlterar = async () => {
        try {
            const response = await buscarParametroDaAssociacao(associacaoId);
            const dadosParametro = response.data;
            if (dadosParametro.liberaAlteracaoDadosPessoais === 'LIBERADO') {
                setIsDisabledDadosUsuarios(false);
            } else {
                setIsDisabledDadosUsuarios(true);
            }
        } catch (error) {
            console.error('Parametros da associação não foram encontrados!', error.response.data);
            globalToast.show(error.response.data.title, { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    };

    useEffect(() => {
        buscarPermiteAlterar();
        buscarInstituicoes();
        buscarDadosUsuario();
    }, []);

    useEffect(() => {
        buscarCursos();
    }, [inputValues.instituicaoId]);

    const validarFormulario = () => {
        let errors = {};

        if (!inputValues.nome) {
            errors.nome = "Nome é obrigatório";
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

    const acaoSalvar = async () => {
        try {
            setIsSaving(true);
            if (validarFormulario()) {
                const formData = new FormData();
                formData.append('data', JSON.stringify({
                    nome: inputValues?.nome,
                    email: inputValues?.email,
                    telefone: inputValues?.telefone,
                    endereco: inputValues?.endereco,
                    matricula: inputValues?.matricula,
                    cursoId: inputValues?.cursoId,
                    diasUsoTransporte: inputValues?.diasUsoTransporte
                }));
                if (inputValues.foto) {
                    formData.append('foto', {
                        uri: inputValues.foto,
                        name: `${inputValues.nome}.jpg`,
                        type: 'image/jpeg'
                    });
                }
                await editarUsuario(usuarioId, formData)
                    .then(() => {
                        globalToast.show("Sucesso", { data: { messageDescription: 'Usuário alterado com sucesso!' }, type: 'success' })
                    }).catch((error) => {
                        globalToast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
                    });
            } else {
                globalToast.show("Aviso", { data: { messageDescription: 'Preencha os campos obrigatórios do formulário!' }, type: 'warning' })
            }
        } catch (error) {
            console.error(error.response.data);
            globalToast.show("Erro", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            {
                isLoadingDadosUsuario &&
                (
                    <Modal useRNModal={true} defaultIsOpen={true} >
                        <Box flex={1} w={'$full'} bgColor={'#00000070'} justifyContent="center">
                            <Spinner size={65} />
                            <Heading textAlign="center" color={'$white'}>Buscando usuário...</Heading>
                        </Box>
                    </Modal>
                )
            }
            <Box flex={1} bg={'$white'} $dark-bg="$backgroundDark925" mx={'$4'} mt={'$2'} mb={'$4'} borderRadius={'$3xl'}>
                <ScrollView flex={1} >
                    <Box justifyContent="flex-start" alignItems="center" gap={15} p={15}>
                        <Box w={'$full'}>
                            <InputImage label={'Foto'} erro={errors.foto} onPickImage={(value) => handleChangeInputValues('foto', value)} imageValue={inputValues.foto} />
                            <InputText label={'Nome Completo'} inputOnChange={(value) => handleChangeInputValues('nome', value)} isRequired={true} inputValue={inputValues.nome} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} />
                            <InputText label={'E-mail'} inputOnChange={(value) => handleChangeInputValues('email', value)} isRequired={true} inputValue={inputValues.email} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} />
                            <InputText label={'Telefone'} inputOnChange={(value) => handleChangeInputValues('telefone', value)} isRequired={true} inputValue={inputValues.telefone} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} />
                            <InputText label={'Endereço'} inputOnChange={(value) => handleChangeInputValues('endereco', value)} isRequired={false} inputValue={inputValues.endereco} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} />
                            <InputText label={'Matricula'} inputOnChange={(value) => handleChangeInputValues('matricula', value)} isRequired={false} inputValue={inputValues.matricula} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} />
                            <InputSelect label={"Instituição"} inputOnChange={(value) => handleChangeInputValues("instituicaoId", value)} inputValue={inputValues.instituicaoId} selectValues={instituicoes} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} />
                            <InputSelect label={"Curso"} inputOnChange={(value) => handleChangeInputValues("cursoId", value)} inputValue={inputValues.cursoId} selectValues={cursos} isDisabled={!inputValues.instituicaoId || isDisabledDadosUsuarios} />
                            <InputCheckbox label={"Dias Uso Transporte"} inputOnChange={(value) => handleChangeInputValues("diasUsoTransporte", value)} checkboxValues={DiasSemanaEnum} typeCheckboxValues={'ENUM'} inputValue={inputValues.diasUsoTransporte} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} />
                            <Button label={'Salvar'} onPress={() => acaoSalvar()} isDisabled={isLoadingDadosUsuario || isDisabledDadosUsuarios} isLoading={isSaving} />
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
        </>
    )
}