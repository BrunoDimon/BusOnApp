import { Text, Card } from "@gluestack-ui/themed";

export default CardMensagem = () => {
  return (
    <Card
      size="md"
      variant="filled"
      bg="red"
      minWidth={350}
      minHeight={35}
      justifyContent="center"
      px={10}
    >
      <Text>Meu Texto</Text>
    </Card>
  )
}
