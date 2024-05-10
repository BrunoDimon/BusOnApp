import { Pressable, Text, Box, Center, TrashIcon, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetItem, EditIcon, ActionsheetSectionHeaderText, Divider } from "@gluestack-ui/themed"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActionsheetDragIndicatorWrapper } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { ActionsheetIcon } from "@gluestack-ui/themed";
import { ActionsheetItemText } from "@gluestack-ui/themed";
import { Dialog } from "../dialog/Dialog";

export default ButtonDotsDropdownMenu = ({ dotsColor, opcoesMenu, titulo }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const theme = useSelector(state => state.theme.theme);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <Box position="relative">
            <Pressable onPress={toggleDropdown}>
                <MaterialCommunityIcons name={'dots-vertical'} size={26} color={dotsColor || '#525252'} />
            </Pressable>
            {isDropdownOpen &&
                (
                    <Actionsheet isOpen={isDropdownOpen} onClose={closeDropdown}>
                        <ActionsheetBackdrop />
                        <ActionsheetContent>
                            <ActionsheetDragIndicatorWrapper>
                                <ActionsheetDragIndicator />
                            </ActionsheetDragIndicatorWrapper>
                            {
                                titulo &&
                                (
                                    <>
                                        <ActionsheetSectionHeaderText fontSize={18} my={15} maxFontSizeMultiplier={1.3}>
                                            {titulo}
                                        </ActionsheetSectionHeaderText>
                                        <Divider />
                                    </>
                                )
                            }

                            {
                                opcoesMenu?.map((value, index) => {
                                    return (
                                        <ActionsheetItem key={index} onPress={() => { value.onPress(); closeDropdown() }} p={20}>
                                            <ActionsheetIcon height={30} w={30} >
                                                <MaterialCommunityIcons name={value.nomeIcone} size={24} color={value.corIcone} />
                                            </ActionsheetIcon>
                                            <ActionsheetItemText lineHeight={'$xl'} fontSize={'$xl'} maxFontSizeMultiplier={1.3}>{value.label}</ActionsheetItemText>
                                        </ActionsheetItem>
                                    )
                                })
                            }



                        </ActionsheetContent>
                    </Actionsheet>
                )
            }
        </Box>
    )
}