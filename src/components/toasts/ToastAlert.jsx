import { Card, HStack, Modal } from "@gluestack-ui/themed"
import { Box } from "@gluestack-ui/themed"
import { CloseIcon, Icon, Pressable, Toast, ToastDescription, ToastTitle, VStack } from "@gluestack-ui/themed"
import { SafeAreaView } from "react-native-safe-area-context"

export default ToastAlert = ({ toastId, tipo, titulo, descricao, toastClose }) => {
    const buscarEstilo = () => {
        if (tipo == 'success') {
            return { borderColor: '$green500', bgColor: '$green100' }
        } else if (tipo == 'error') {
            return { borderColor: '$red500', bgColor: '$red100' }
        } else if (tipo == 'warning') {
            return { borderColor: '$yellow500', bgColor: '$yellow100' }
        } else if (tipo == 'alert') {
            return { borderColor: '$blue500', bgColor: '$white' }
        } else {
            return { borderColor: '$black', bgColor: '$white' }
        }
    }
    const estilo = buscarEstilo();

    return (
        <SafeAreaView style={{ zIndex: 9999, width: '100%' }}>
            <Card w={'95%'} rounded={'$lg'} py={12} px={15} m={10} bg={estilo.bgColor} borderLeftWidth={10} borderColor={estilo.borderColor} hardShadow="5">
                <HStack flex={1} w={'$full'} justifyContent="space-between">
                    <VStack space="xs">
                        <ToastTitle size="xl">{titulo}</ToastTitle>
                        <ToastDescription size="md">{descricao}</ToastDescription>
                    </VStack>
                    {/*                     <Pressable mt="$1" onPress={() => toastClose()}>
                        <Icon as={CloseIcon} color="$black" />
                    </Pressable> */}
                </HStack>
            </Card>
        </SafeAreaView>
    )
}