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
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Box>
      <Box
        $dark-bg={"$backgroundDark900"}
        $light-bg={"$white"}
        height={height - 175}
        alignItems={"start"}
        hardShadow="5"
        borderRadius={30}
        mx={"$2"}
        my={"$2"}
        pt={10}
        justifyContent={"space-between"}
      >
        <Box borderRadius={30}>
          <ScrollView maxHeight={580}>
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
        <Box>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            mx={"$3"}
            borderRadius={40}
          >
            <InputField placeholder="Faça uma pergunta para a IA..." />
            <Button size="sm" bg="none">
              <MaterialCommunityIcons
                name="arrow-right-box"
                size={25}
                color="#d3d3d3"
              />
            </Button>
          </Input>
        </Box>
      </Box>
    </Box>
  );
};
