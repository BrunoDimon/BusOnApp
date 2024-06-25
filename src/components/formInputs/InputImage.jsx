import { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Box, Center, Text, HStack, AddIcon, Image } from '@gluestack-ui/themed';
import { Button } from '../buttons/Button';
import { FormInput } from './FormInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VStack } from '@gluestack-ui/themed';
import { TrashIcon } from '@gluestack-ui/themed';

export default function InputImage({ label, erro, imageValue, onPickImage, isDisabled, isInvalid, isReadOnly, isRequired }) {
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            onPickImage(result.assets[0].uri);
        }
    };

    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Center mb={5} flex={1} h={200} borderWidth={2} borderColor={'$trueGray200'} $dark-borderColor={'$trueGray700'} rounded={'$xl'}>
                {
                    permission?.status !== ImagePicker.PermissionStatus.GRANTED
                        ?
                        <Box gap={15} maxWidth={'75%'}>
                            <Text fontSize={'$xl'} fontWeight={'$medium'} textAlign='center' >Buson não tem acesso as suas fotos</Text>
                            <Button label={'Permitir'} onPress={requestPermission}></Button>
                        </Box>
                        :
                        imageValue
                            ?
                            (<Image flex={1} aspectRatio={'1/1'} m={10} source={{ uri: imageValue }} alt='imagem-logo' />)
                            :
                            (<MaterialCommunityIcons name={'tooltip-image-outline'} size={80} color={'#B1B1B1'} />)
                }

                <HStack position={'absolute'} end={5} bottom={5} mt={15} gap={5}>
                    {
                        permission?.status === ImagePicker.PermissionStatus.GRANTED
                            ?
                            imageValue
                                ?
                                (<Button maxWidth={45} px={0} py={8} maxHeight={45} variant={'outline'} action={'secondary'} flex={1} icon={TrashIcon} onPress={() => onPickImage(null)} />)
                                :
                                (<Button maxWidth={45} px={0} py={8} maxHeight={45} variant={'outline'} action={'secondary'} flex={1} icon={AddIcon} onPress={pickImage} />)
                            :
                            null
                    }
                </HStack>
            </Center>
        </FormInput>
    );
}