import { Dimensions } from "react-native";
import {
  Box,
  Heading,
  Pressable,
  Input,
  InputField,
  Button,
  ScrollView,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CardMensagem from "../components/CardMensagem";
import { enviarMensagem } from "../service/api/requests/chatRequests";
import { useState } from "react";


export default IaChat = () => {
  const [inputChat, setInputChat] = useState();
  const [mensagens, setMensagens] = useState([]);

  async function enviarMensagemChat(mensagem) {
      setMensagens(mensagens => [...mensagens, {
        mensagem: mensagem,
        enviadoDe: "Você"
      }]);
      const data = await enviarMensagem(mensagem);
      setMensagens(mensagens => [...mensagens, {
        mensagem: data,
        enviadoDe: "IA"
      }]);
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
            {mensagens?.map(mensagem => <CardMensagem mensagem={mensagem.mensagem} enviadoDe={mensagem.enviadoDe}/>)}
          </ScrollView>
        </Box>
        <Box flexGrow={0}>
          <Input
            variant="outline"
            size="md"
            mx={2}
            mt={10}
            borderRadius={18}
          >
            <InputField placeholder="Faça uma pergunta para a IA..." onChangeText={(v) => setInputChat(v)} value={inputChat} />
            <Button h={'$full'} px={8} bg={'transparent'} onPress={() => enviarMensagemChat(inputChat)} >
              <MaterialCommunityIcons
                name="send-circle-outline"
                size={30}
                color="#c1c1c1"
              />
            </Button>
          </Input>
        </Box>
      </Box>
    </Box>
  );
};
