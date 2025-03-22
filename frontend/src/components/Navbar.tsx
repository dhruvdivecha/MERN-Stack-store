import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Link as RouterLink } from "react-router-dom";
import { FaMoon, FaPlus, FaShoppingCart, FaSun } from "react-icons/fa";


export default function Navbar() {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxH={"1140px"} px={4} py={2} bg={useColorModeValue("gray.350", "gray.900")}>
            <Flex 
                justifyContent="space-between"
                alignItems="center"
                className="flex justify-between items-center"
            >
                <Text 
                    fontSize="2xl" 
                    fontWeight="bold"
                    color="blue.500"
                    _hover={{ color: "blue.600" }}
                    transition="color 0.3s ease"
                    >
                    <RouterLink to="/">
                        Product Store <FaShoppingCart />
                    </RouterLink>
                </Text>
                
                <HStack className="space-x-4 alignItems-center">
                    <RouterLink to="/create">
                        <Button colorScheme="blue" >
                           <FaPlus /> Create
                        </Button>
                    </RouterLink>
                    <Button onClick = {toggleColorMode}>
                        {colorMode === "dark" ? <FaSun /> : <FaMoon />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}