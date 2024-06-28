import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Input,
  InputField,
  ScrollView,
  VStack
} from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import CardMensagem from "../../components/CardMensagem";
import { enviarMensagem } from "../../service/api/requests/chatRequests";
import TypingIndicator from "./TypingIndicator";
import { Image } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";

export default IaChat = ({ navigation }) => {
  const [inputChat, setInputChat] = useState();
  const [mensagens, setMensagens] = useState([]);
  const [awaitResponse, setAwaitResponse] = useState(false);
  const theme = useSelector(state => state.theme.theme);
  const usuarioId = useSelector(state => state.auth.user.id);

  const logo = theme === "light" ? require('../../../assets/busOnFontePreta.png') : require('../../../assets/busOnFonteBranca.png');
  const draw = require('../../../assets/school-bus-predios-dark.png');

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [mensagens]);

  useEffect(() => {
    navigation.setOptions({ onLeftButtonPress: navigation.goBack })
  }, [navigation]);

  async function enviarMensagemChat(mensagem) {
    if (mensagem) {
      setAwaitResponse(true);
      setInputChat(null);
      setMensagens((mensagens) => [
        ...mensagens,
        {
          mensagem: mensagem,
          enviadoDe: "Você",
        },
      ]);
      const data = await enviarMensagem(mensagem + ". Quem está fazendo a pergunta é o usuário de id: " + usuarioId);
      console.log(data)
      setMensagens((mensagens) => [
        ...mensagens,
        {
          mensagem: data.message || data,
          enviadoDe: "IA",
        },
      ]);
      setAwaitResponse(false);
    }
  }

  return (
    <Box flex={1}>
      <Box
        flex={1}
        $dark-bg={"$backgroundDark900"}
        $light-bg={"$white"}
        alignItems={"start"}
        hardShadow="5"
        borderRadius={25}
        mx={20}
        mb={20}
        mt={12}
        p={10}
        justifyContent={"space-between"}
      >
        <Box flex={1} borderRadius={30}>
          <Box flex={1} h={'$full'} w={'$full'} position="absolute" opacity={0.2}>
            <Box flex={0.7} alignItems='center' justifyContent='flex-end'>
              <Image
                w={'70%'}
                source={logo}
                alt='Logo'
              />
            </Box>
            <Box flex={1.5} alignItems="center">
              <Image
                h={'85%'}
                w={'85%'}
                resizeMode='contain'
                source={draw}
                alt='SubLogo'
              />
            </Box>
          </Box>
          <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
            {mensagens?.map((mensagem, index) => {
              return (
                <CardMensagem
                  key={index}
                  mensagem={mensagem.mensagem}
                  enviadoDe={mensagem.enviadoDe}
                />
              );
            })}
          </ScrollView>
        </Box>
        <Box flexGrow={0}>
          {awaitResponse && (
            <VStack alignItems="flex-start">
              <TypingIndicator isTyping={awaitResponse} />
            </VStack>
          )}

          <Input variant="outline" size="md" mx={2} mt={10} borderRadius={18}>
            <InputField
              placeholder="Faça uma pergunta para a IA..."
              onChangeText={(v) => setInputChat(v)}
              value={inputChat}
            />
            <Button
              isDisabled={awaitResponse || !inputChat}
              h={"$full"}
              px={8}
              bg={"transparent"}
              onPress={() => enviarMensagemChat(inputChat)}
            >
              <MaterialCommunityIcons
                name="send-circle-outline"
                size={30}
                color={awaitResponse || !inputChat ? "black" : '#FFC100'}
              />
            </Button>
          </Input>
        </Box>
      </Box>
    </Box>
  );
};
