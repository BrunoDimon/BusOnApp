import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"
import { useState } from "react"

export default function ItemList({ title, subtitle, avatar, children }) {
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
                        </Box>
                        {children}
                    </Box>
                </Card>
            </Pressable>
        </Box>
    )
}