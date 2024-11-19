import { PostItem } from "components/post";
import React, { Suspense } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { postByIdState } from "state";
import { Post } from "types/product";
import { Page, Header, Box, Text } from "zmp-ui";


export const PostPage: FC = () => {

    const { postId } = useParams();
    const navigate = useNavigate();
    const posts = useRecoilValue(
      postByIdState(postId),
    );
    let masterTitle = ""
    const handleTitle = (post: Post) => {
      if(post.type === "news") {
        masterTitle = "TIN TỨC"
      }
      if(post.type === "aboutUs") {
        masterTitle = "VỀ CHÚNG TÔI"
      }
      if(post.type === "services") {
        masterTitle = "DỊCH VỤ CỦA VIỆT TRÍ"
      }
      if(post.type === "projects") {
        masterTitle = "DỰ ÁN TIÊU BIỂU"
      }
    }
    
    handleTitle(posts[0])

    return (
      <Page className="flex flex-col ">
        <Header backgroundColor="#0068b2" textColor="white" title={masterTitle} />
        <Suspense>
          
          <div className=" py-4 px-6" >
            {posts[0].sections ? <PostItem sections={posts[0].sections} /> : (<> <div>Does not exist</div></>)}
          </div>
        </Suspense>
      </Page>
    );
};
