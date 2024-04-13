import { Avatar, Box, Button, ButtonIcon, ButtonText, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"
import { EditIcon } from "lucide-react-native"
import { useState } from "react"
import ButtonDotsDropdownMenu from "./buttons/ButtonDotsDropdownMenu"

export default function ItemList({ title, subtitle, avatar, children, exibeOpcoes = false }) {
    return (
        <Box display="flex" mx={20} mb={15} borderRadius={'$3xl'} hardShadow="1" >
            <Pressable w={'$full'}>
                <Card bg={'white'} flexDirection="col" w={'$full'} p={12} borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} gap={12} >
                    <Box justifyContent="space-between" flexDirection="col">
                        <Box flexDirection="row" gap={12} alignItems="center" mb={2} >
                            <Avatar></Avatar>
                            <Box>
                                <Heading>{title}</Heading>
                                {subtitle && (
                                    <Text>{subtitle}</Text>
                                )}
                            </Box>
                            <Box alignItems="flex-end" flexGrow={1} mb={15}>
                                {exibeOpcoes && (
                                    <ButtonDotsDropdownMenu />)}
                            </Box>
                        </Box>
                        {children}
                    </Box>
                </Card>
            </Pressable>
        </Box>
    )
}