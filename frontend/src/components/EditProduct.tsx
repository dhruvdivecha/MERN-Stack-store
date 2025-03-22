import {
    Field,
    Input,
    Popover,
    Portal,
    Stack,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    PopoverPositioner,
    CloseButton,
    Box
  } from "@chakra-ui/react"
  import { Product, useProductStore } from "../store/product";
  import { toast } from "react-hot-toast";
  import { useState } from "react";
  interface EditProductProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
  }
  
  export default function EditProduct({ isOpen, onClose, product }: EditProductProps) {
    const { updateProduct } = useProductStore();
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());
    const [image, setImage] = useState(product.image);
  
    const handleSubmit = async () => {
      if (!product._id) return;
      
      const result = await updateProduct(product._id, { 
        name, 
        price, 
        image 
      });
  
      if (result.success) {
        toast.success("Product updated!");
        onClose();
      } else {
        toast.error("Update failed");
      }
    };
  
    return (
      <Popover.Root 
        open={isOpen} 
        onOpenChange={(open) => !open && onClose()}
      >
        <Portal>
          <PopoverPositioner 
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <PopoverContent w="90vw" maxW="500px">
              <PopoverArrow />
              <PopoverBody p={6}>
                <Box display="flex" justifyContent="right">
                  <CloseButton onClick={onClose} />
                </Box>
                <Stack gap={4}>
                  <Field.Root>
                    <Field.Label>Product Name</Field.Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field.Root>
  
                  <Field.Root>
                    <Field.Label>Price</Field.Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Field.Root>
  
                  <Field.Root>
                    <Field.Label>Image URL</Field.Label>
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Field.Root>
  
                  <Button 
                    colorScheme="blue" 
                    onClick={handleSubmit}
                  >
                    Update Product
                  </Button>
                </Stack>
              </PopoverBody>
              <Popover.CloseTrigger 
                style={{ 
                  position: 'absolute',
                  right: '12px',
                  top: '12px'
                }}
              />
            </PopoverContent>
          </PopoverPositioner>
        </Portal>
      </Popover.Root>
    );
  }