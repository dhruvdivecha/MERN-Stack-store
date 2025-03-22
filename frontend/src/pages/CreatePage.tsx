import { useState } from "react";
import {
  Container,
  Heading,
  Box,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    image?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    setErrors({});
    setMessage("");
    setIsSubmitting(true);
    
    try {
      const result = await createProduct(newProduct);
      
      if (result.success) {
        setMessage(result.message);
        setNewProduct({ name: "", price: "", image: "" });
      } else {
        setMessage(result.message);
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Container maxW="container.md" py={8}>
      <Box bg={bgColor} p={6} borderRadius="md" boxShadow="md" borderColor={borderColor} borderWidth="1px" maxW="500px" mx="auto" minW="300px">
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Create New Product
        </Heading>
        
        {message && (
          <Box 
            mb={4} 
            p={3} 
            borderRadius="md" 
            bg={message.includes("success") ? "green.100" : "red.100"}
            color={message.includes("success") ? "green.700" : "red.700"}
          >
            {message}
          </Box>
        )}
        
        <Box mb={4}>
          <Text mb={2} fontWeight="medium">
            Name
          </Text>
          <Input
            value={newProduct.name}
            onChange={(e) => 
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            borderColor={borderColor}
          />
          {errors.name && <Text color="red.500">{errors.name}</Text>}
        </Box>
        
        <Box mb={4}>
          <Text mb={2} fontWeight="medium">
            Price
          </Text>
          <Input
            value={newProduct.price}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[\d.]+$/.test(value)) {
                setNewProduct({ ...newProduct, price: value });
              }
            }}
            borderColor={borderColor}
          />
          {errors.price && <Text color="red.500">{errors.price}</Text>}
        </Box>
        
        <Box mb={6}>
          <Text mb={2} fontWeight="medium">
            Image
          </Text>
          <Input
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            borderColor={borderColor}
          />
          {errors.image && <Text color="red.500">{errors.image}</Text>}
        </Box>
        
        <Button
          colorScheme="blue"
          backgroundColor="blue.500"
          width="full"
          onClick={handleAddProduct}
          loading={isSubmitting}
          loadingText="Adding Product"
        >
          Add Product
        </Button>
      </Box>
    </Container>
  );
}