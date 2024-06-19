import { VStack, Text } from "@gluestack-ui/themed";
import { Children } from "react";

export default function Label({ label, children, maxFontSizeMultiplier = 1.5, ...props }) {
    return (
        <VStack space="xs" mb={10} w={'$full'}  {...props}>
            <Text size="xl" $dark-color={'$light100'} lineHeight="$xl" fontWeight="$semibold" pl={5} maxFontSizeMultiplier={maxFontSizeMultiplier}>
                {label}
            </Text>
            {children}
        </VStack >
    )
}