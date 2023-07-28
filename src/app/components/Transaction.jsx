import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Box,
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function Transaction({
  drawerOpen,
  setDrawerOpen,
  useraddress,
}) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const toast = useToast();
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/transaction/${useraddress}/${amount}/${address}`
      );

      if (response.data !== true) {
        toast({
          title: "Error",
          description:
            "Any of the following could be the reason: \n 1. You don't have enough balance \n 2. The address you entered is invalid \n 3. There was a problem with the server",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occured while sending the transaction request",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    
    setAddress("");
    setAmount(0);

    setDrawerOpen(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Drawer
      isOpen={drawerOpen}
      placement="right"
      onClose={() => {
        setDrawerOpen(false);
      }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Create New Transaction
        </DrawerHeader>

        <form onSubmit={submitForm}>
          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  placeholder="Enter the address you want to send the money to"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <NumberInput value={amount} min={0} max={100} step={1}>
                  <NumberInputField onChange={handleAmountChange} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              colorScheme="red"
              variant="ghost"
              mr={3}
              onClick={() => setDrawerOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setDrawerOpen(false);
              }}
              colorScheme="blue"
              variant="ghost"
              color={"blue.400"}
              type="submit"
            >
              Submit
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
