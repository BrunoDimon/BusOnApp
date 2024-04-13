import React from 'react';
import { Box } from "@gluestack-ui/themed"
import ListAlunos from "./ListAlunos";
import { Button } from '../../components/buttons/Button';

export default Alunos = () => {
    return (
        <Box>
            <Box mx={20} mb={15} justifyContent="space-between" borderRadius={'$5x1'} flexDirection="row">
                <Button label={'Filtros'} variant={'outline'} />
                <Button label={'Cadastrar Aluno'} />
            </Box>
            <ListAlunos />
        </Box>

    )
}