import { Dimensions } from "react-native";
import {
  Box,
  Heading,
  Pressable,
  Input,
  InputField,
  Button,
  ScrollView,
  Spinner,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CardMensagem from "../components/CardMensagem";
import { enviarMensagem } from "../service/api/requests/chatRequests";
import { useState } from "react";
import { Text } from "@gluestack-ui/themed";


export default IaChat = () => {
  const [inputChat, setInputChat] = useState();
  const [mensagens, setMensagens] = useState([]);
  const [awaitResponse, setAwaitResponse] = useState(false);

  async function enviarMensagemChat(mensagem) {
    if (mensagem) {
      setAwaitResponse(true);
      setInputChat(null);
      setMensagens(mensagens => [...mensagens, {
        mensagem: mensagem,
        enviadoDe: "Você"
      }]);
      const data = await enviarMensagem(mensagem);
      setMensagens(mensagens => [...mensagens, {
        mensagem: data,
        enviadoDe: "IA"
      }]);
      setAwaitResponse(false);
    }
  }

  return (
    <Box flex={1}>
      <Box flex={1}
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
          <ScrollView >
            {mensagens?.map((mensagem, index) => {
              return (
                <CardMensagem key={index} mensagem={mensagem.mensagem} enviadoDe={mensagem.enviadoDe} />)
            })
            }
          </ScrollView>
        </Box>
        <Box flexGrow={0}>
          {awaitResponse &&
            (
              <VStack alignItems="center">
                <Spinner />
                <Text>Buscando resposta...</Text>
              </VStack>
            )
          }

          <Input
            variant="outline"
            size="md"
            mx={2}
            mt={10}
            borderRadius={18}
          >
            <InputField placeholder="Faça uma pergunta para a IA..." onChangeText={(v) => setInputChat(v)} value={inputChat} />
            <Button isDisabled={awaitResponse || !inputChat} h={'$full'} px={8} bg={'transparent'} onPress={() => enviarMensagemChat(inputChat)} >
              <MaterialCommunityIcons
                name="send-circle-outline"
                size={30}
                color={"#ffd000"}
              />
            </Button>
          </Input>
        </Box>
      </Box>
    </Box>
  );
};
