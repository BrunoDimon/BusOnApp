import { VStack, Text } from "@gluestack-ui/themed";
import { Children } from "react";

export default function Label({ label, children }) {
    return (
        <VStack space="xs" mb={10}>
            <Text size="xl" lineHeight="$xl" fontWeight="$semibold" pl={5} maxFontSizeMultiplier={1.5}>
                {label}
            </Text>
            {children}
        </VStack >
    )
}