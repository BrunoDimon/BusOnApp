import { Dimensions } from "react-native";
import {
  Box,
  Heading,
  Pressable,
  Input,
  InputField,
  Button,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { CardMensagem } from "../components/CardMensagem";

const { height } = Dimensions.get("window");
const minhaMensagem = "Minha string de mensagemn";

export default IaChat = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Box>
      <Box
        $dark-bg={"$backgroundDark900"}
        $light-bg={"$white"}
        flex={0}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"start"}
        px={20}
        py={12}
        gap={15}
        hardShadow="5"
        borderRadius={"$full"}
        mx={"$4"}
        my={"$2"}
      >
        <Pressable>
          <MaterialCommunityIcons
            name={"keyboard-backspace"}
            size={30}
            color={theme === "light" ? "#525252" : "white"}
          />
        </Pressable>
        <Heading
          size={"xl"}
          $dark-color="$white"
          $light-color="#525252"
          maxFontSizeMultiplier={1.25}
          lineHeight={"$xl"}
        >
          IA Chat
        </Heading>
      </Box>
      <Box
        $dark-bg={"$backgroundDark900"}
        $light-bg={"$white"}
        height={height - 90}
        alignItems={"center"}
        hardShadow="5"
        borderRadius={30}
        mx={"$2"}
        my={"$2"}
      >
        <CardMensagem />
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          mx={"$3"}
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
  );
};
