import { useState } from 'react';
import { Center, Button, Heading, Box, Text, Image, ButtonText, Toast, VStack, ToastTitle, useToast, Input, InputField, InputSlot, InputIcon, Pressable, HStack, Divider, KeyboardAvoidingView, ScrollView } from "@gluestack-ui/themed";
import { useColorMode } from "@gluestack-ui/themed"
import Label from '../../components/Label';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { Path } from 'react-native-svg';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const colorMode = useColorMode();
    const theme = useSelector(state => state.theme.theme);

    const logo = theme === "light" ? require('../../../assets/busOnFontePreta.png') : require('../../../assets/busOnFonteBranca.png');
    const draw = require('../../../assets/school-bus-predios-dark.png');
    const dispatch = useDispatch();

    const handleLogin = () => {
        const userData = {
            user: {
                nome: 'Douglas',
                sobrenome: 'Kuerten',
                //tipoAcesso: 'ACESSO_ADMIN',
                //tipoAcesso: 'ACESSO_GESTAO',
                tipoAcesso: 'ACESSO_ALUNO',
                associacaoId: 1
            },
            token: 'exampleToken',
            refreshToken: 'exampleRefreshToken'
        };
        dispatch(login(userData));
    };

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
                                <InputField onChangeText={value => setUsername(value)} value={username} type={'text'} />
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
                            <Button size='xl' borderRadius={'$xl'} onPress={handleLogin}>
                                <ButtonText maxFontSizeMultiplier={1.5}>
                                    Entrar
                                </ButtonText>
                            </Button>
                        </HStack>
                    </Box>
                </ScrollView>
            </Box>
        </Box >
    )
}


