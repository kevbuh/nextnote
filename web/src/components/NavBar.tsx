import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;

  {
    /* // data is loading */
  }
  if (loading) {
    // user is not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          {/* // adds client side routing */}
          <Link color="black" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="black">Register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button color="black" as={Link} mr={4}>
            new note
          </Button>
        </NextLink>
        <Box mr={4} color="black" textStyle="h1">
          {data.me.username}
        </Box>
        <Button
          variant="link"
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          color="black"
        >
          Logout
        </Button>
      </Flex>
    );
  }
  // testing comment for git

  return (
    <Flex zIndex={2} position="sticky" top={0} bg="white" p={4} align="center">
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading fontSize="20px" color="black">
              NEXTNOTE
            </Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
