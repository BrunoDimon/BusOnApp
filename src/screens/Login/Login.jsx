import { useState } from 'react';
import { Center, Heading, Box, Text, Image, Toast, VStack, ToastTitle, useToast, Input, InputField, InputSlot, InputIcon, Pressable, HStack, Divider, KeyboardAvoidingView, ScrollView } from "@gluestack-ui/themed";
import { useColorMode } from "@gluestack-ui/themed"
import Label from '../../components/Label';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { loginRequest } from '../../service/api/requests/autenticacaoRequests';
import ToastConfig from '../../components/toasts/ToastConfig';
import { Button } from '../../components/buttons/Button';
import { InputSelect } from '../../components/formInputs/InputSelect';
import TipoAcessoUsuarioEnum from '../../enums/TipoAcessoUsuarioEnum';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
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

    const acaoLogin = async () => {
        setIsLoading(true);
        await loginRequest(email, password)
            .then(response => {
                // Nesse caso os dados estão sendo setados globalmente dentro do autenticacaoRequests
                console.log('Sucesso no login')
            }).catch(error => {
                console.log(error.response.data)
                toast.show(ToastConfig('error', 'Erro', error.response.data.message, (v) => toast.close(v)));
            })
        setIsLoading(false)
    };

    const temporarioSetarValoresLogin = (value) => {
        if (value === 'ADMIN') {
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

    return (
        <Box flex={1} sx={{ _dark: { bg: '$secondary900', }, _light: { bg: '$light100', }, }}>
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
                        <Label label={"E-mail"} >
                            <Input h={50} borderRadius={'$xl'}>
                                <InputField onChangeText={value => setEmail(value)} value={email} type={'email'} />
                            </Input>
                        </Label>

                        <Label label={"Senha"} >
                            <Input h={50} borderRadius={'$xl'} >
                                <InputField onChangeText={value => setPassword(value)} value={password} type={showPassword ? "text" : "password"} />
                                <InputSlot onPress={() => setShowPassword(!showPassword)}>
                                    <InputIcon pr="$8" pb={'$6'} size='xs' color="$yellow400">{showPassword ? <EyeIcon color='gray' /> : <EyeOffIcon color='gray' />}</InputIcon>
                                </InputSlot>
                            </Input>
                        </Label>

                    </Box>
                    <Box flex={1} my={20}>
                        <HStack flex={0} alignItems='center' justifyContent='space-between'>
                            <Pressable>
                                <Text size='xl' fontWeight='$semibold' maxFontSizeMultiplier={1.25}>
                                    Esqueceu a senha?
                                </Text>
                            </Pressable>
                            <Button label={'Entrar'} onPress={acaoLogin} isLoading={isLoading} />
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


