import { Text, Card, Box } from "@gluestack-ui/themed";

export default CardMensagem = ({ mensagem, enviadoDe, ...props }) => {
  return (
    <Box alignItems={enviadoDe == 'IA' ? 'flex-start' : 'flex-end'}>
      <Text fontSize={12} px={10}>{enviadoDe}</Text>
      <Card
        size="md"
        variant="filled"
        bg={enviadoDe == 'IA' ? '#ffdc72' : '#dcdcdc'}
        maxWidth={300}
        minHeight={35}
        justifyContent="center"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        borderTopRightRadius={enviadoDe == 'IA' ? 20 : 0}
        borderTopLeftRadius={enviadoDe == 'IA' ? 0 : 20}
        p={10}
        mx={10} 
      >
        <Text color={enviadoDe == 'IA' ? '#ffffff' : '#2c2c2c'}>{mensagem}</Text>
      </Card>
    </Box>
  );
};
