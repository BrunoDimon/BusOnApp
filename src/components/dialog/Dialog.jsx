import { AlertDialogBody, AlertDialogCloseButton, AlertDialogFooter, CloseIcon, Heading } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { ButtonGroup } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Button, ButtonText, Center } from "@gluestack-ui/themed";
import { useEffect, useState, memo } from "react";

const Dialog = memo(function Dialog({ type = 'DEFAULT', config = {}, onClose }) {
    const styles = {
        'EXCLUIR': {
            buttonBgColor: '$error600',
            titulo: config.titulo || 'Excluir registro',
            descricao: config.descricao || 'Você tem certeza que deseja excluir o registro?',
            etiquetaBotaoAcao: config.etiquetaBotaoAcao || 'Excluir'
        },
        'EDITAR': {
            buttonBgColor: '$darkBlue500',
            titulo: config.titulo || 'Editar registro',
            descricao: config.descricao || 'Você tem certeza que deseja alterar o registro?',
            etiquetaBotaoAcao: config.etiquetaBotaoAcao || 'Editar'
        },
        'SALVAR': {
            buttonBgColor: '$darkBlue500',
            titulo: config.titulo || 'Salvar',
            descricao: config.descricao || 'Você tem certeza que deseja salvar o registro?',
            etiquetaBotaoAcao: config.etiquetaBotaoAcao || 'Salvar'
        },
        'CONFIRMAR': {
            buttonBgColor: '$yellow500',
            titulo: config.titulo || 'Confirmar',
            descricao: config.descricao || 'Você tem certeza que deseja realizar a operação?',
            etiquetaBotaoAcao: config.etiquetaBotaoAcao || 'Salvar'
        },
        'DEFAULT': {
            buttonBgColor: '$black',
            titulo: 'Default',
            descricao: 'Default',
            etiquetaBotaoAcao: config.etiquetaBotaoAcao || 'Default'
        },
    }

    const style = styles[type];

    return (
        <AlertDialog
            useRNModal={true}
            isOpen={true}
            onClose={() => {
                onClose()
            }}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading size='xl'> {style.titulo}</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size='xl'>
                        {style.descricao}
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup space="lg">
                        <Button
                            variant="outline"
                            size="xl"
                            action="secondary"
                            onPress={() => {
                                onClose();
                            }}
                        >
                            <ButtonText maxFontSizeMultiplier={1.2}>Cancelar</ButtonText>
                        </Button>
                        <Button
                            bg={style.buttonBgColor}
                            size="xl"
                            action="negative"
                            onPress={() => {
                                config.onPress()
                                onClose();
                            }}>
                            <ButtonText maxFontSizeMultiplier={1.2}>{style.etiquetaBotaoAcao}</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
})
export default Dialog;