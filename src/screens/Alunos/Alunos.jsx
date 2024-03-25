import React from 'react';
import { Box, Button, ButtonText } from "@gluestack-ui/themed"
import ListAlunos from "./ListAlunos";

const cadastrarAluno = ({ navigation }) => {
    navigation.navigate('CadastroAlunos');
}

export default Alunos = () => {
    return (
        <Box>
            <Box mx={20} mb={15} justifyContent="space-between" borderRadius={'$5x1'} flexDirection="row">
                <Button variant="outline">
                    <ButtonText>Filtros</ButtonText>
                </Button>
                <Button onPress={cadastrarAluno}>
                    <ButtonText>Cadastrar Aluno</ButtonText>
                </Button>
            </Box>
            <ListAlunos />
        </Box>

    )
}