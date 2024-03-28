import React from 'react';
import { useToast, Center, VStack, Button } from "@gluestack-ui/themed"; // Importe os componentes necessários aqui

export default function Toast({ index, actionType, title, description }) {
    const toast = useToast();

    return (
        <Center h='$80'>
            <VStack space='md'>
                <Button
                    onPress={() => {
                        toast.show({
                            placement: "top",
                            render: ({ id }) => {
                                const toastId = "toast-" + id;
                                return (
                                    <Toast nativeID={toastId} action={actionType}>
                                        <VStack space="xs">
                                            <ToastTitle>{title}</ToastTitle>
                                            <ToastDescription >
                                                {description}
                                            </ToastDescription>
                                        </VStack>
                                    </Toast>
                                );
                            },
                        });
                    }}
                >
                    <ButtonText>{actionType}</ButtonText>
                </Button>
            </VStack>
        </Center>
    );
};
