import { Box } from "@gluestack-ui/themed"


export default function CardBox({ children, ...props }) {
    return (
        <Box bg='$white' $dark-bg="$backgroundDark925" flexDirection="row" justifyContent="space-between" mx={20} p={20} borderRadius={'$3xl'} hardShadow="1" {...props} >
            {children}
        </Box>
    )
}