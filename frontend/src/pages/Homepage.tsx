import { Container, VStack, Text, Flex, Link, SimpleGrid } from "@chakra-ui/react";
import { FaRocket, FaSadCry } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Homepage() {

    const {fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW="container.xl" py={12}>
            <VStack px={8} py={2} >

                <Flex alignItems="center" justifyContent="center" gap={2} mb={4}>
                        <Text 
                            fontSize={"3xl"}
                            fontWeight={"bold"}
                            bgGradient={"linear(to-r, cyan.400, blue.500)"}
                            bgClip={"text"}
                            textAlign={"center"}
                            color={"blue.500"}
                        >
                            Current Products
                        </Text>
                        <FaRocket style={{ fontSize: "20px" , color: "rgb(100, 149, 237)"}} /> 
                </Flex>

                <SimpleGrid columns = {{base: 1, md: 2, lg: 3}} gap={4} w={"full"}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            
                </SimpleGrid>

                {products.length === 0 && (
                    <Flex alignItems={"center"} justifyContent={"center"} gap={2} flexDirection={"column"}>
                    <Text fontSize={"20px"} textAlign={"center"} color={"red.300"}>
                        No products found 
                    </Text>
                    <FaSadCry style={{fontSize: "20px", marginRight: "10px", color: "#bb5e60"}} />
                    <Link href="/create" bg={"green.500"} borderRadius={"md"} p={2} _hover={{ bg: "green.600" }} display={"flex"} alignItems={"center"}>
                        Create a new product
                    </Link>
                </Flex>
                )}
            </VStack>
        </Container>
    );
}