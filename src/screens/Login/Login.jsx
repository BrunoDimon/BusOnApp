import { Box, Center, Divider, HStack, Heading, Image, Pressable, ScrollView, Text, useColorMode } from "@gluestack-ui/themed";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/buttons/Button';
import { InputPassword } from '../../components/formInputs/InputPassword';
import { InputSelect } from '../../components/formInputs/InputSelect';
import { InputText } from '../../components/formInputs/InputText';
import TipoAcessoUsuarioEnum from '../../enums/TipoAcessoUsuarioEnum';
import { loginRequest } from '../../service/api/requests/autenticacaoRequests';
import { login } from '../../store/authSlice';
import { RedefinirSenha } from './RedefinirSenha';
import { editarSenhaUsuario } from "../../service/api/requests/usuarioRequests";
import { store } from "../../store/storeConfig";
import { useToast } from "react-native-toast-notifications";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenRedefinirSenha, setIsOpenRedefinirSenha] = useState(false)
    const [dadosRedefinirSenha, setDadosRedefinirSenha] = useState({})
    const globalToast = useToast()
    const colorMode = useColorMode();

    const theme = useSelector(state => state.theme.theme);

    const logo = theme === "light" ? require('../../../assets/busOnFontePreta.png') : require('../../../assets/busOnFonteBranca.png');
    const draw = require('../../../assets/school-bus-predios-dark.png');
    const dispatch = useDispatch();

    const acaoLoginSemBackEnd = () => {
        const userData = {
            user: {
                nome: 'Douglas',
                //tipoAcesso: 'ADMIN',
                tipoAcesso: 'GESTAO',
                //tipoAcesso: 'ALUNO',
                associacaoId: 1
            },
            token: 'exampleToken',
            refreshToken: 'exampleRefreshToken'
        };
        dispatch(login(userData));
    };

    const acaoLogin = async (email, password) => {
        setIsLoading(true);
        await loginRequest(email, password)
            .then(response => {
                const dadosUsuario = {
                    user: {
                        id: response.data.id,
                        nome: response.data.nome,
                        email: response.data.email,
                        telefone: response.data.telefone,
                        endereco: response.data.endereco,
                        cursoId: response.data.cursoId,
                        associacaoId: response.data.associacaoId,
                        tipoAcesso: response.data.tipoAcesso,
                        situacao: response.data.situacao,
                        exigirRedefinicaoSenha: response.data.exigirRedefinicaoSenha,
                        fotoUrl: response.data?.fotoUrl
                    },
                    token: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                };
                if (dadosUsuario.user.exigirRedefinicaoSenha) {
                    setDadosRedefinirSenha(dadosUsuario.user)
                    setIsOpenRedefinirSenha(true);
                } else {
                    store.dispatch(login(dadosUsuario));
                    console.log('Sucesso no login')
                }
            }).catch(error => {
                console.log(error.response.data)
                globalToast.show('Falha na Autenticação', { data: { messageDescription: error.response.data.message }, type: 'warning' })
            }).finally(() => {
                setIsLoading(false)
            })
    };

    const temporarioSetarValoresLogin = (value) => {
        if (value === 'ADMIN') {
            setEmail('admin@admin.com')
            setPassword('admin')
        } else if (value === 'ADMIN_INSOMNIA') {
            setEmail('usuario@admin.com')
            setPassword('admin')
        } else if (value === 'GESTAO') {
            setEmail('usuario@gestao.com')
            setPassword('gestao')
        } else if (value === 'ALUNO') {
            setEmail('usuario@aluno.com')
            setPassword('aluno')
        }
    }

    const onConfirmChangePassword = async (newPassword) => {
        try {
            const res = await editarSenhaUsuario(dadosRedefinirSenha.id, { senha: newPassword });
            acaoLogin(dadosRedefinirSenha.email, newPassword)
        } catch (error) {
            globalToast.show("Erro na redefinição de senha", { data: { messageDescription: error.response.data.message }, type: 'error' })
        }
    }

    return (
        <Box flex={1} sx={{ _dark: { bg: '$secondary900', }, _light: { bg: '$light100', }, }}>
            {
                isOpenRedefinirSenha &&
                <RedefinirSenha onClose={() => setIsOpenRedefinirSenha(false)} eExigeTrocarSenha={true} onConfirmChangePassword={(v) => onConfirmChangePassword(v)} />
            }
            <Box flex={0.7} alignItems='center' justifyContent='flex-end'>
                <Image
                    w={'70%'}
                    source={logo}
                    alt='Logo'
                />
            </Box>
            <Center flex={1}>
                <Image
                    h={'85%'}
                    w={'85%'}
                    resizeMode='contain'
                    source={draw}
                    alt='SubLogo'
                />
            </Center>

            <Box flex={1.5} sx={{ _dark: { bg: '$secondary950', }, _light: { bg: '$light100', }, }} borderTopLeftRadius={'$3xl'} borderTopRightRadius={'$3xl'} shadowColor='$light900' hardShadow='5' >
                <ScrollView py={15} px={20}>
                    <Heading fontSize={'$4xl'} size={'4xl'} allowFontScaling={false}>
                        Bem vindo
                    </Heading>
                    <Box flex={1.2} my={10}>
                        <InputText label={'E-mail'} inputOnChange={setEmail} inputValue={email} />
                        <InputPassword label={'Senha'} inputOnChange={setPassword} inputValue={password} />
                    </Box>
                    <Box flex={1} my={20}>
                        <HStack flex={0} alignItems='center' justifyContent='space-between'>
                            <Pressable>
                                <Text size='xl' fontWeight='$semibold' maxFontSizeMultiplier={1.25}>
                                    Esqueceu a senha?
                                </Text>
                            </Pressable>
                            <Button label={'Entrar'} onPress={() => acaoLogin(email, password)} isLoading={isLoading} />
                        </HStack>
                    </Box>
                    <Divider mb={15} />
                    <Center mb={15}>
                        <Heading>Temporário para Devs</Heading>
                    </Center>
                    <Box flex={1} my={10}>
                        <InputSelect label={'Setar valores login'} selectValues={TipoAcessoUsuarioEnum} typeSelectValues={'ENUM'} inputOnChange={(v) => temporarioSetarValoresLogin(v)} erro={'Funcionalidade serve apenas para não precisar digitar o login durante a fase de desenvolvimento, após isso será removido.\n\nObs: Cadastrar os usuários através do Insomnia, existe 3 rotas prontas com os 3 tipos de acesso que serão iguais aos que estão sendo setados aqui no front'} />
                    </Box>
                    <Button label={'Entrar sem autenticar'} onPress={acaoLoginSemBackEnd} isLoading={isLoading} />
                </ScrollView>
            </Box>
        </Box >
    )
}


