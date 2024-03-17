import { Box, Input, ScrollView, InputField, Button, ButtonText } from "@gluestack-ui/themed"
import { Text } from "@gluestack-ui/themed"
import Label from "../components/Label"
import SelectInputValues from "../components/SelectInput"

export default MeusDados = () => {
    return (
        <Box flex={1} bg={'$white'} mx={20} mb={15} borderRadius={'$3xl'}>
            <ScrollView flex={1} >
                <Box justifyContent="flex-start" alignItems="center" gap={15} p={15}>
                    <Box w={'$full'}>
                        <Label label={"Nome Completo"} >
                            <Input h={50} borderRadius={'$xl'}>
                                <InputField type={'text'} />
                            </Input>
                        </Label>
                        <Label label={"E-mail"} >
                            <Input h={50} borderRadius={'$xl'}>
                                <InputField type={'text'} />
                            </Input>
                        </Label>
                        <Label label={"Telefone"} >
                            <Input h={50} borderRadius={'$xl'}>
                                <InputField type={'text'} />
                            </Input>
                        </Label>
                        <Label label={"Faculdade"} >
                            <SelectInputValues values={[
                                {
                                    label: 'UNISATC',
                                    value: 'UNISATC',
                                    isDisabled: false
                                },
                                {
                                    label: 'UNESC',
                                    value: 'UNESC',
                                    isDisabled: false
                                },
                                {
                                    label: 'ESUCRI',
                                    value: 'ESUCRI',
                                    isDisabled: false
                                },

                            ]} />

                        </Label>
                        <Label label={"Curso"} >
                            <SelectInputValues />
                        </Label>
                        <Label label={"Ponto de Entrada"} >
                            <SelectInputValues />
                        </Label>

                        <Button size='xl' borderRadius={'$xl'} alignSelf="flex-end">
                            <ButtonText maxFontSizeMultiplier={1.5}>
                                Salvar
                            </ButtonText>
                        </Button>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    )
}