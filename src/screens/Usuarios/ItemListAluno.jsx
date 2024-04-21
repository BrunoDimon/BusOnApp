import { Box, Heading, Text } from '@gluestack-ui/themed';
import ItemList from "../../components/ItemList"
import Situacao from "../../components/Situacao"
import DaysCircle from '../../components/DaysCircle';

export default function itemListAluno({nome, curso, instituicao, situacao}) {
    return (
        <ItemList title={nome} subtitle={`${curso} - ${instituicao}`} exibeOpcoes={true}>
            <Box justifyContent="space-between" flexDirection="row" alignItems="center">
                {situacao === 'ATIVO' && (
                    <Situacao situacao={'Ativo'} />
                )}
                {situacao === 'INATIVO' && (
                    <Situacao situacao={'Inativo'} />
                )}
                <Box flexDirection="row" justifyContent="space-between" adjustsFontSizeToFit={true}>
                <Box flexDirection="row" gap={2} >
                        <Box flexDirection="row">
                            <DaysCircle daysActive={['SEGUNDA', 'TERCA', 'QUINTA', 'SEXTA']} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ItemList>
    )
}