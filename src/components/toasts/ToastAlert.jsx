import { HStack } from "@gluestack-ui/themed"
import { CloseIcon, Icon, Pressable, Toast, ToastDescription, ToastTitle, VStack } from "@gluestack-ui/themed"
import { SafeAreaView } from "react-native-safe-area-context"

export default ToastAlert = ({ toastId, tipo, titulo, descricao, toastClose }) => {
    return (
        <SafeAreaView>
            <Toast nativeID={toastId} action={tipo} variant="accent" mt={0}>
                <HStack w={'$full'} justifyContent="space-between">
                    <VStack space="xs">
                        <ToastTitle size="xl">{titulo}</ToastTitle>
                        <ToastDescription size="md">{descricao}</ToastDescription>
                    </VStack>
                    <Pressable mt="$1" onPress={() => toastClose()}>
                        <Icon as={CloseIcon} color="$black" />
                    </Pressable>
                </HStack>
            </Toast>
        </SafeAreaView>
    )
}