// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Link,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// // import { withUrqlClient } from "next-urql";
// import NextLink from "next/link";
// import React, { useState } from "react";
// import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
// import { Layout } from "../components/Layout";
// import { UpdootSection } from "../components/UpdootSection";
// import { usePostsQuery } from "../generated/graphql";
// // import { createUrqlClient } from "../utils/createUrqlClient";

// const Index = () => {
//   const { data, error, loading, fetchMore, variables } = usePostsQuery({
//     variables: {
//       limit: 15,
//       cursor: null,
//     },
//   });

//   if (!loading && !data) {
//     return (
//       <div>
//         <div>you got query failed for some reason</div>
//         <div>{error?.message}</div>
//       </div>
//     );
//   }

//   return (
//     <Layout>
//       {/* <Flex align="center">
//         <Heading>LiReddit</Heading>
//         <NextLink href="/create-post">
//           <Link ml="auto">create post</Link>
//         </NextLink>
//       </Flex> */}
//       {/* <br /> */}
//       {!data && loading ? (
//         <div>loading...</div>
//       ) : (
//         <Stack spacing={8}>
//           {data!.posts.posts.map((p) =>
//             !p ? null : (
//               <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
//                 <UpdootSection post={p} />
//                 <Box flex={1}>
//                   <NextLink href="/post/[id]" as={`/post/${p.id}`}>
//                     <Link>
//                       <Heading fontSize="xl">{p.title}</Heading>
//                     </Link>
//                   </NextLink>
//                   <Text>posted by {p.creator.username} </Text>
//                   <Flex align="center">
//                     <Text flex={1} mt={4}>
//                       {p.textSnippet}
//                     </Text>
//                     <Box ml="auto">
//                       <EditDeletePostButtons
//                         id={p.id}
//                         creatorId={p.creator.id}
//                       />
//                     </Box>
//                   </Flex>
//                 </Box>
//               </Flex>
//             )
//           )}
//         </Stack>
//       )}
//       {data && data.posts.hasMore ? (
//         <Flex>
//           <Button
//             onClick={() => {
//               fetchMore({
//                 variables : {
//                   limit: variables?.limit,
//                   cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
//               },
//               updateQuery: (previousValue, {fetchMoreResult}) => {
//                 if(!fetchMoreResult) {
//                   return previousValue
//                 }

//                 return
//               }});
//             }}
//             isLoading={loading}
//             m="auto"
//             my={8}
//           >
//             load more
//           </Button>
//         </Flex>
//       ) : null}
//     </Layout>
//   );
// };

// export default Index;

import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
// import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
// import { useState } from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const Index: React.FC = () => {
  const { data: meData } = useMeQuery();
  useIsAuth();

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      {!data && loading ? (
        <div>loading...maybe you need to post?</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p || p.creator.id != meData?.me?.id ? null : (
              // console.log("hello");
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                {/* if (p.creator === p.creator.id){ */}
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>made by {p.creator.username}</Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
                {/* // } */}
              </Flex>
            )
          )}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
