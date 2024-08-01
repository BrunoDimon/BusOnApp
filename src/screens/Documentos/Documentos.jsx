import { Box, Center, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { InputSelect } from "../../components/formInputs/InputSelect";
import { useEffect, useState } from "react";
import { InputDate } from "../../components/formInputs/InputDate";
import { InputCheckbox } from "../../components/formInputs/InputCheckbox";
import { buscarTodosUsuarios, buscarTodosUsuariosCompleto } from "../../service/api/requests/usuarioRequests";
import { useSelector } from "react-redux";
import { Button } from "../../components/buttons/Button";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { useToast } from "react-native-toast-notifications";
import { buscarAssociacaoPorId, buscarTodasAssociacoes } from "../../service/api/requests/associacaoRequests";
import { buscarTemplateDocumentoPorId, buscarTodosTemplatesDocumentos } from "../../service/api/requests/templateDocumentoRequest";
import formatarValorEmReais from "../../functions/FormatarValorEmReais";
import { formatarValorEmReaisPorExtenso } from "../../functions/FormatarValorEmReaisPorExtenso";
import moment from 'moment';
import 'moment/locale/pt-br';
import { TrashIcon } from "lucide-react-native";
import formatarCpf from "../../functions/FormatarCpf";
import formatarCep from "../../functions/FormatarCep";
import formatarCnpj from "../../functions/FormatarCnpj";
moment.locale('pt-br');

export default function Documentos({ navigation }) {
    const globalToast = useToast()
    const userInfos = useSelector(state => state.auth.user);
    const eUsuarioAdmin = userInfos.tipoAcesso == "ADMIN";

    const [dadosAssociacao, setDadosAssociacao] = useState();
    const [templateDocumentoSelecionado, setTemplateDocumentoSelecionado] = useState();
    const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);
    const [associacaoSelecionada, setAssociacaoSelecionada] = useState(userInfos.associacaoId);
    const [selecionarTodosUsuarios, setSelecionarTodosUsuarios] = useState([]);
    const [dataDeclaracao, setDataDeclaracao] = useState();
    const [dataEmissao, setDataEmissao] = useState(new Date());

    const [isLoadingTemplateDocumentos, setIsLoadingTemplateDocumentos] = useState(false);
    const [templatesDocumentos, setTemplatesDocumentos] = useState([]);


    const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [dadosUsuarios, setDadosUsuarios] = useState([]);


    const [isLoadingAssociacoes, setIsLoadingAssociacoes] = useState(false);
    const [associacoes, setAssociacoes] = useState([]);

    const [isLoadingUsuariosGestao, setIsLoadingUsuariosGestao] = useState(false);
    const [usuariosGestao, setUsuariosGestao] = useState([]);
    const [dadosUsuariosGestao, setDadosUsuariosGestao] = useState([]);

    const [usuarioAssinatura, setUsuarioAssinatura] = useState();

    const buscarUsuarios = async () => {
        if (associacaoSelecionada) {
            try {
                setIsLoadingUsuarios(true);
                const filters = { equals: { associacaoId: associacaoSelecionada } }
                const orderBy = [{ field: 'situacao', direction: 'ASC' }, { field: 'nome', direction: 'ASC' },]
                const response = await buscarTodosUsuariosCompleto(filters, orderBy);
                setDadosUsuarios(response.data);
                const valoresSelect = response.data.map((value) => ({
                    label: value.nome,
                    value: value.id,
                    isDisabled: value.situacao !== 'ATIVO'
                }));
                setUsuarios(valoresSelect);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error.response.data);
            } finally {
                setIsLoadingUsuarios(false)
            }
        }
    };
    const buscarUsuariosGestao = async () => {
        if (associacaoSelecionada) {
            try {
                setIsLoadingUsuariosGestao(true);
                const filters = { equals: { associacaoId: associacaoSelecionada, tipoAcesso: "GESTAO" } }
                const orderBy = [{ field: 'situacao', direction: 'ASC' }, { field: 'nome', direction: 'ASC' },]
                const response = await buscarTodosUsuarios(filters, orderBy);
                setDadosUsuariosGestao(response.data);
                const valoresSelect = response.data.map((value) => ({
                    label: value.nome,
                    value: value.id,
                    isDisabled: value.situacao !== 'ATIVO'
                }));
                setUsuariosGestao(valoresSelect);
            } catch (error) {
                console.error('Erro ao buscar usuários gestão:', error.response.data);
            } finally {
                setIsLoadingUsuariosGestao(false)
            }
        }
    };
    const buscarTemplatesDocumentos = async () => {
        if (associacaoSelecionada) {

            try {
                setIsLoadingTemplateDocumentos(true);
                const filters = { equals: { associacaoId: associacaoSelecionada, situacao: 'ATIVO' } }
                const orderBy = [{ field: 'nome', direction: 'ASC' },]
                const response = await buscarTodosTemplatesDocumentos(filters, orderBy);
                const valoresSelect = response.data.map((value) => ({
                    label: value.nome,
                    value: value.id,
                    isDisabled: value.situacao !== 'ATIVO'
                }));
                setTemplatesDocumentos(valoresSelect);
            } catch (error) {
                console.error('Erro ao buscar template de documentos:', error.response.data);
            } finally {
                setIsLoadingTemplateDocumentos(false)
            }
        }
    };

    const buscarDadosDaAssociacao = async () => {
        if (associacaoSelecionada) {
            try {
                const response = await buscarAssociacaoPorId(associacaoSelecionada);
                setDadosAssociacao(response.data);
            } catch (error) {
                globalToast.show(error.response.data.title, { data: { messageDescription: error.response.data.message }, type: 'warning' })
            }
        }
    };

    const buscarAssociacoes = async () => {
        if (eUsuarioAdmin) {
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
                console.error('Erro ao buscar aassociações:', error.response.data);
            } finally {
                setIsLoadingAssociacoes(false)
            }
        }
    };

    useEffect(() => {
        buscarAssociacoes();
    }, []);
    useEffect(() => {
        buscarDadosDaAssociacao();
        buscarTemplatesDocumentos();
        buscarUsuariosGestao();
        buscarUsuarios();
    }, [associacaoSelecionada])

    const [errors, setErrors] = useState({});

    const validarFiltrosEmissao = () => {
        let errors = {};

        if (templateDocumentoSelecionado == null) {
            errors.templateDocumentoSelecionado = "Obrigatório"
        }
        if (usuarioAssinatura == null) {
            errors.usuarioAssinatura = "Obrigatório"
        }
        if (dataEmissao == null) {
            errors.dataEmissao = "Obrigatório"
        }
        if (usuariosSelecionados == null || usuariosSelecionados.length === 0) {
            errors.usuariosSelecionados = "Obrigatório"
        }

        setErrors(errors);
        const isValid = (Object.keys(errors).length === 0);
        return isValid;
    }
    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            validarFiltrosEmissao();
        }
    }, [templateDocumentoSelecionado, dataEmissao, usuarioAssinatura, usuariosSelecionados]);

    useEffect(() => {
        if (selecionarTodosUsuarios.includes('SELECIONAR_TODOS')) {
            setUsuariosSelecionados(usuarios.map(user => user.value))
        } else {
            setUsuariosSelecionados([])
        }
    }, [selecionarTodosUsuarios])

    String.prototype.interpolate = function (params) {
        const names = Object.keys(params);
        const vals = Object.values(params);
        return new Function(...names, `return \`${this}\`;`)(...vals);
    }
    const generatePDF = async (nomeTemplate, htmlTemplate, dados) => {
        var declaracaoHtml = htmlTemplate.interpolate({
            dados
        });
        try {
            const { uri } = await Print.printToFileAsync({ html: declaracaoHtml, width: 595, height: 842 });
            const nomeArquivo = dados.dadosUsuario.nome + ' - ' + nomeTemplate;
            const pdfUri = `${FileSystem.documentDirectory}${nomeArquivo}.pdf`;
            await FileSystem.moveAsync({
                from: uri,
                to: pdfUri
            });
            return pdfUri;
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            return null;
        }
    };

    const acaoEmitirDeclaracoes = async () => {
        const pdfUris = [];
        if (validarFiltrosEmissao()) {
            await buscarTemplateDocumentoPorId(templateDocumentoSelecionado).
                then(async (response) => {
                    const htmlTemplate = response.data.htmlTemplate;
                    const nomeTemplate = response.data.nome;
                    const dadosUsuarioAssinatura = dadosUsuariosGestao.find(dadosUsuario => dadosUsuario.id === usuarioAssinatura);
                    for (const usuario of usuariosSelecionados) {
                        const dadosUsuarioAtual = dadosUsuarios.find(dadosUsuario => dadosUsuario.id === usuario);
                        const dados = {
                            dadosUsuario: {
                                ...dadosUsuarioAtual,
                                cpfFormatado: formatarCpf(dadosUsuarioAtual.cpf),
                                valorMensalidadeFormatado: formatarValorEmReais(dadosUsuarioAtual.valorMensalidade),
                                valorMensalidadePorExtenso: formatarValorEmReaisPorExtenso(dadosUsuarioAtual.valorMensalidade)
                            },
                            dadosUsuarioAssinatura: {
                                ...dadosUsuarioAssinatura,
                                cpfFormatado: formatarCpf(dadosUsuarioAssinatura.cpf)
                            },
                            dadosAssociacao: {
                                ...dadosAssociacao,
                                cnpjFormatado: formatarCnpj(dadosAssociacao.cnpj),
                                cepFormatado: formatarCep(dadosAssociacao.cep)
                            },
                            nomeDeclaracao: nomeTemplate,
                            dataEmissao: moment(dataEmissao).format('DD/MM/yyyy'),
                            dataEmissaoPorExtenso: moment(dataEmissao).format('LL'),
                            dataDeclaracao: dataDeclaracao && moment(dataDeclaracao).format('DD/MM/yyyy'),
                            dataDeclaracaoPorExtenso: dataDeclaracao && moment(dataDeclaracao).format('LL'),
                            logoDeclaracaoUrl: dadosAssociacao.logoDeclaracaoUrl && process.env.EXPO_PUBLIC_FILES_API_URL + dadosAssociacao.logoDeclaracaoUrl || null,
                        };
                        const pdfUri = await generatePDF(nomeTemplate, htmlTemplate, dados);
                        if (pdfUri) {
                            pdfUris.push(pdfUri);
                        }
                    }
                    if (pdfUris.length === 1) {
                        await shareAsync(pdfUris[0], {
                            mimeType: 'application/pdf'
                        });
                    } else if (pdfUris.length > 1) {
                        const zip = new JSZip();

                        for (const uri of pdfUris) {
                            const pdfData = await FileSystem.readAsStringAsync(uri, {
                                encoding: FileSystem.EncodingType.Base64,
                            });
                            const fileName = uri.split('/').pop();
                            zip.file(fileName, pdfData, { base64: true });
                        }

                        zip.generateAsync({ type: 'base64' }).then(async (base64) => {
                            const nomeZip = nomeTemplate;
                            const zipUri = `${FileSystem.documentDirectory}${nomeZip}.zip`;
                            await FileSystem.writeAsStringAsync(zipUri, base64, {
                                encoding: FileSystem.EncodingType.Base64,
                            });

                            await shareAsync(zipUri, {
                                mimeType: 'application/zip'
                            });
                        }).catch((error) => {
                            console.error('Erro ao criar o arquivo ZIP:', error);
                        });
                    } else {
                        globalToast.show("Aviso", { data: { messageDescription: 'Não foi possível gerar os PDFs.' }, type: 'warning' })
                    }
                })
        } else {
            globalToast.show("Aviso", { data: { messageDescription: 'Preecha todos os campos obrigatórios!' }, type: 'warning' })
        }
    };

    return (
        <Box flex={1} mx={15} >
            <ScrollView>
                <VStack flex={0} >
                    {
                        eUsuarioAdmin && (
                            <InputSelect label={"Associação"} erro={errors.associacaoId} inputOnChange={setAssociacaoSelecionada} inputValue={associacaoSelecionada} selectValues={associacoes} isLoading={isLoadingAssociacoes} isRequired={true} />
                        )
                    }
                    <InputSelect label={'Tipo de Declaração'} selectValues={templatesDocumentos} inputOnChange={setTemplateDocumentoSelecionado} erro={errors.templateDocumentoSelecionado} isRequired={true} isLoading={isLoadingTemplateDocumentos} />
                    <InputSelect label={"Usuário Assinatura"} erro={errors.usuarioAssinatura} inputOnChange={setUsuarioAssinatura} inputValue={usuarioAssinatura} selectValues={usuariosGestao} isLoading={isLoadingUsuariosGestao} isRequired={true} dica={'Valor será exibido ao final da declaração com os dados do usuário para efetuar a assinatura como responsável pela declaração'} />
                    <InputDate label={'Data de Emissão'} inputValue={dataEmissao} inputOnChange={setDataEmissao} erro={errors.dataEmissao} isRequired={true} dica={'Valor será exibido como a data que a declaração foi emitida'} />
                    <InputDate label={'Data da Declaração'} inputValue={dataDeclaracao} inputOnChange={setDataDeclaracao} erro={errors.dataDeclaracao} isRequired={false} dica={'Valor será exibido referenciando para qual data a declaração foi emitida'} />
                </VStack>
                <VStack flex={1} my={15}>
                    <InputCheckbox label={'Alunos'} checkboxValues={[{ label: 'Selecionar Todos', value: 'SELECIONAR_TODOS' }]} inputOnChange={setSelecionarTodosUsuarios} inputValue={selecionarTodosUsuarios} />
                    <ScrollView flex={1} >
                        <InputCheckbox checkboxValues={usuarios} inputOnChange={setUsuariosSelecionados} inputValue={usuariosSelecionados} erro={errors.usuariosSelecionados} />
                    </ScrollView>
                </VStack>
            </ScrollView>
            <Box flex={0} my={15}>
                <Button label={'Emitir'} onPress={() => acaoEmitirDeclaracoes()} />
            </Box>
        </Box >
    )

}