import { Modal, ModalBackdrop, ModalHeader, ModalBody, Heading, Icon, CloseIcon, Input, InputField, ModalCloseButton, ModalContent, ModalFooter, ScrollView } from "@gluestack-ui/themed"
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
import { buscarTodasAssociacoes } from "../../service/api/requests/associacaoRequests";
import { InputTextArea } from "../../components/formInputs/InputTextArea";
import { cadastrarTemplateDocumento, editarTemplateDocumento } from "../../service/api/requests/templateDocumentoRequest";


export const FormTemplatesDocumentos = ({ onClose, dadosEdicao }) => {
    const globalToast = useToast();
    const ref = useRef(null)
    const userInfos = useSelector(state => state.auth.user);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingAssociacoes, setIsLoadingAssociacoes] = useState(false);
    const [associacoes, setAssociacoes] = useState([]);

    const [inputValues, setInputValues] = useState({
        nome: dadosEdicao?.nome || null,
        situacao: dadosEdicao?.situacao || 'ATIVO',
        associacaoId: dadosEdicao?.associacaoId || null,
        htmlTemplate: dadosEdicao?.htmlTemplate || null,
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
        if (inputValues.associacaoId == null || inputValues.associacaoId == '') {
            errors.associacaoId = "Associação é obrigatório"
        }
        if (inputValues.situacao == null || inputValues.situacao == '') {
            errors.situacao = "Situação é obrigatório"
        }
        if (inputValues.htmlTemplate == null || inputValues.htmlTemplate == '') {
            errors.htmlTemplate = "O html do template é obrigatório"
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
        setIsSaving(true);
        try {
            if (validarFormulario()) {
                if (!eModoEdicao) {
                    await cadastrarTemplateDocumento(inputValues)
                        .finally(() => {
                            setIsSaving(false);
                        });
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Template de documento cadastrado com sucesso!' }, type: 'success' })
                } else {
                    await editarTemplateDocumento(dadosEdicao.id, inputValues)
                        .finally(() => {
                            setIsSaving(false);
                        });
                    onClose(true);
                    globalToast.show("Sucesso", { data: { messageDescription: 'Template de documento alterado com sucesso!' }, type: 'success' })
                }
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

    useEffect(() => {
        buscarAssociacoes();
    }, []);

    return (
        <Modal useRNModal={true} defaultIsOpen={true} onClose={() => onClose()} finalFocusRef={ref}>
            <ModalBackdrop />
            <ModalContent maxHeight={'$3/4'}>
                <ScrollView>
                    <ModalHeader>
                        <Heading flex={1} size="xl" maxFontSizeMultiplier={1.3}>{!eModoEdicao ? 'Cadastro Template de Documento' : 'Edição Template de Doc.'}</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <InputSelect label={"Associação"} erro={errors.associacaoId} inputOnChange={(value) => handleChangeInputValues("associacaoId", value)} inputValue={inputValues.associacaoId} selectValues={associacoes} isLoading={isLoadingAssociacoes} isRequired={true} />
                        <InputText label={'Nome'} erro={errors.nome} inputOnChange={(value) => handleChangeInputValues('nome', value)} isRequired={true} inputValue={inputValues.nome} />
                        <InputSelect label={'Situação'} erro={errors.situacao} selectValues={AtivoInativoEnum} typeSelectValues={'ENUM'} inputOnChange={(value) => handleChangeInputValues('situacao', value)} isRequired={true} inputValue={inputValues.situacao} />
                        <InputTextArea height={'$96'} label={'HTML do Template'} erro={errors.htmlTemplate} inputOnChange={(value) => handleChangeInputValues('htmlTemplate', value)} isRequired={true} inputValue={inputValues.htmlTemplate}
                            dica={`
Dados disponibilizados para criar uma declaração:

  const dados = {
      dadosUsuario: {
          ...dadosUsuarioAtual,
          cpfFormatado,,
          valorMensalidadeFormatado,,
          valorMensalidadePorExtenso
      },
      dadosUsuarioAssinatura: {
          ...dadosUsuarioAssinatura,
          cpfFormatado
      },
      dadosAssociacao: {
          ...dadosAssociacao,
          cnpjFormatado,
          cepFormatado
      },
      nomeDeclaracao,
      dataEmissao,
      dataDeclaracao,
      logoDeclaracaoUrl
  };

Como utilizar:
    Fazer o html normalmente, e onde quiser algum valor dinâmico utilizar a tag \${dados.}

Exemplo: 
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />

            </head>
        <body style="text-align: center;">
            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
                Declaração Teste do usuário \${dados.dadosUsuario.nome}
            </h1>
            <p>Data: \${dados.dataDeclaracao}</p>
        </body>
    </html>

Obs: Funções não funcionam se tentar cadastrar no meio do html usando \${FUNCAO()} 
    `}
                        />
                    </ModalBody>
                    <ModalFooter gap={10}>
                        <Button label={'Cancelar'} variant={'outline'} action={'secondary'} onPress={() => onClose()} />
                        <Button label={'Salvar'} onPress={() => handleOnPressSave()} isLoading={isSaving} />
                    </ModalFooter>
                </ScrollView>
            </ModalContent>
            <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} />
        </Modal>
    )
}