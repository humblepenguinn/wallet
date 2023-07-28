"use client";
import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useToast } from "@chakra-ui/react";

export default function Login() {
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const secretKeyInput = document.getElementById("secret_key");
    const secretKey = secretKeyInput.value.trim();

    if (secretKey === "") {
      toast({
        title: "Error",
        description: "Secret key is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      secret_key: secretKey,
    });

    if (!result.error) {
      toast({
        title: "Success",
        description: "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      router.push("/");

    } else {
      toast({
        title: "Error",
        description: "Invalid secret key",
        status: "error",
        duration: 2000,
        isClosable: true,
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
          <title>Login</title>
        </Head>

        <section className="w-3/4 mx-auto flex flex-col gap-10">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">
              Welcome Back!
            </h1>
            <p className="w-3/4 mx-auto text-gray-400">Odyssey Blockchain</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <input
                type={`${show ? "text" : "password"}`}
                name="secret_key"
                placeholder="Type in your secret key"
                id="secret_key"
                className={styles.input_text}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
          </form>

          <p className="text-center text-gray-400 ">
            don't have an account yet?{" "}
            <Link className="text-blue-700" href="/register">
              Sign Up
            </Link>
          </p>
        </section>
      </Layout>
    );
  }
}
