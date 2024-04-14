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

const { height } = Dimensions.get("window");

export default IaChat = () => {
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
            <CardMensagem
              mensagem="Quais os alunos que estão com a mensalidade atrasada?"
              enviadoDe="Você"
              alignItems="flex-end"
            />
            <CardMensagem
              mensagem="Estão com a mensalidade atrasada os seguintes alunos: Thiago Dimon Miranda e Douglas Kuerten"
              enviadoDe="IA"
              mt={5}
            />
            <CardMensagem
              mensagem="Quais os alunos que estão com a mensalidade atrasada?"
              enviadoDe="Você"
              mt={5}
              alignItems="flex-end"
            />
            <CardMensagem
              mensagem="Estão com a mensalidade atrasada os seguintes alunos: Thiago Dimon Miranda e Douglas Kuerten"
              enviadoDe="IA"
              mt={5}
            />
            <CardMensagem
              mensagem="Quais os alunos que estão com a mensalidade atrasada?"
              enviadoDe="Você"
              mt={5}
              alignItems="flex-end"
            />
            <CardMensagem
              mensagem="Estão com a mensalidade atrasada os seguintes alunos: Thiago Dimon Miranda e Douglas Kuerten"
              enviadoDe="IA"
              mt={5}
            />
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
            <InputField placeholder="Faça uma pergunta para a IA..." />
            <Button h={'$full'} px={8} bg={'transparent'} >
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
