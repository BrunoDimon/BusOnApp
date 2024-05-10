import { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Box, Center, Icon, HStack, AddIcon, Image } from '@gluestack-ui/themed';
import { Button } from '../buttons/Button';
import { FormInput } from './FormInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VStack } from '@gluestack-ui/themed';
import { TrashIcon } from '@gluestack-ui/themed';

export default function InputImage({ label, erro, imageValue, onPickImage, isDisabled, isInvalid, isReadOnly, isRequired }) {
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true,
        });

        //console.log(result)

        if (!result.canceled) {
            onPickImage(result.assets[0].base64);
        }
    };

    return (
        <FormInput label={label} erro={erro} isDisabled={isDisabled} isInvalid={isInvalid} isReadOnly={isReadOnly} isRequired={isRequired}>
            <Center mb={5} flex={1} h={200} borderWidth={2} borderColor={'$trueGray200'} rounded={'$xl'}>
                {
                    imageValue
                        ?
                        (<Image flex={1} aspectRatio={'1/1'} m={10} source={"data:image/jpeg;base64," + imageValue} alt='imagem-logo' />)
                        :
                        (<MaterialCommunityIcons name={'tooltip-image-outline'} size={80} color={'#B1B1B1'} />)
                }

                <HStack position={'absolute'} end={5} bottom={5} mt={15} gap={5}>
                    {
                        imageValue
                            ?
                            (<Button maxWidth={45} px={0} py={8} maxHeight={45} variant={'outline'} action={'secondary'} flex={1} icon={TrashIcon} onPress={() => onPickImage(null)} />)
                            :
                            (<Button maxWidth={45} px={0} py={8} maxHeight={45} variant={'outline'} action={'secondary'} icon={AddIcon} onPress={pickImage} />)
                    }
                </HStack>
            </Center>
        </FormInput>
    );
}