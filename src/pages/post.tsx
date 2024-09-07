import { PostItem } from "components/post";
import React, { Suspense } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { postByIdState } from "state";
import { Page, Header, Box, Text } from "zmp-ui";


export const PostPage: FC = () => {

    const { postId } = useParams();
    const navigate = useNavigate();
    const posts = useRecoilValue(
      postByIdState(postId),
    );

    return (
      <Page className="flex flex-col ">
        <Header backgroundColor="#0068b2" textColor="white" title={posts[0].title} />
        <Suspense>
          <div className=" py-4" >
            {posts[0].sections ? <PostItem sections={posts[0].sections} /> : (<></>)}
          </div>
        </Suspense>
      </Page>
    );
};
