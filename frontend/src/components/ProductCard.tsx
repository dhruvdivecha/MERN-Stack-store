import { 
    Box, 
    Image, 
    Text, 
    Button, 
    Flex, 
    } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { Product, useProductStore } from "../store/product";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProduct from "./EditProduct";
import { useState } from "react"; 

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { deleteProduct } = useProductStore();
    const [isEditing, setIsEditing] = useState(false); 

    const handleDelete = async (productID: string) => {
        const result = await deleteProduct(productID);
        if(result.success) {
            toast.success("Product deleted successfully");
        } else {
            toast.error("Product deletion failed");
        }
    }
    
    return (
        <>
            <Box
                shadow='lg'rounded='lg' overflow='hidden' transition='all 0.3s' 
                _hover={{ transform: "translateY(-5px)" }}
            >
                <Image src={product.image} alt={product.name} h={60} w='full' objectFit='cover' />
                <Box p={6}>
                    <Text fontSize='2xl' fontWeight='bold'>{product.name}</Text>
                    <Text mt={2}>${product.price}</Text>
                </Box>
                <Flex justify='right' align='center' pb={6} pr={6} gap={2}>
                    <Button 
                        colorScheme='blue' 
                        variant='outline' 
                        color='blue.500'
                        _hover={{ color: "blue.600" }}
                        onClick={() => {
                            if(product._id) {
                                setIsEditing(true);
                            }
                        }}
                    >
                        <FaEdit />
                    </Button>
                    <Button 
                        colorScheme='red' 
                        variant='outline' 
                        color='red.500'
                        _hover={{ color: "red.600" }}
                        onClick={() => product._id && handleDelete(product._id)}
                    >
                        <FaTrash />
                    </Button>
                </Flex>
            </Box>

            {isEditing && (
                <EditProduct 
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    product={product}
                />
            )}
        </>
    );
}