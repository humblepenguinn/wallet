"use client";

import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { Box, Button, Text, useClipboard, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [keyPair, setKeyPair] = useState();
  const toast = useToast();
  const getKeyPair = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/create_wallet");

      const keyPair: any = {
        secret_key: response.data.private_key,
        public_key: response.data.public_key,
      };

      setKeyPair(keyPair);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 2000,
      });
    }
  };

  const handleCopy = (key: string) => {
    if (key) {
      navigator.clipboard.writeText(key);
      toast({
        title: "Key copied to clipboard",
        status: "success",
        duration: 2000,
      });
    }
  };

  const { status, data } = useSession();

  const router = useRouter();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <Layout>
        <Head>
          <title>Register</title>
        </Head>

        <section className="w-3/4 mx-auto flex flex-col gap-10">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">
              Generate Wallet
            </h1>
            <p className="w-3/4 mx-auto text-gray-400"></p>
          </div>

          <Box align="center">
            <Button
              colorScheme="teal"
              style={{ backgroundColor: "teal", color: "white" }}
              _hover={{ backgroundColor: "teal" }}
              _active={{ backgroundColor: "teal" }}
              _focus={{ backgroundColor: "teal" }}
              size="lg"
              onClick={getKeyPair}
              leftIcon={<HiFingerPrint />}
            >
              Generate Key Pair
            </Button>
            {keyPair && (
              <Box mt={4}>
                <Text color="black">
                  Secret Key: {keyPair.secret_key}
                  <Box
                    as="span"
                    onClick={() => handleCopy(keyPair.secret_key)}
                    ml={2}
                    cursor="pointer"
                    color="teal"
                    fontWeight="bold"
                  >
                    Copy
                  </Box>
                </Text>
                <Text color="black">
                  Public Key: {keyPair.public_key}
                  <Box
                    as="span"
                    onClick={() => handleCopy(keyPair.public_key)}
                    ml={2}
                    cursor="pointer"
                    color="teal"
                    fontWeight="bold"
                  >
                    Copy
                  </Box>
                </Text>
              </Box>
            )}
          </Box>

          <p className="text-center text-gray-400 ">
            Have an account?{" "}
            <Link href="/login" className="text-blue-700">
              Sign In
            </Link>
          </p>
        </section>
      </Layout>
    );
  }
}
