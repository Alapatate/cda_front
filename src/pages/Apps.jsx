import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageContainer } from "@/components/ui/page-container";
import { Posts } from "@/components/posts/posts";
import { Chat } from "@/components/chat/chat";

export const Apps = () => {
  return (
    <PageContainer title="Apps" description="Apps I have built">
      <Tabs defaultValue="postlist" className="w-full ">
        <TabsList>
          <TabsTrigger value="postlist">Post List</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="postlist" className="mt-6">
          <Posts />
        </TabsContent>
        <TabsContent value="chat" className="mt-6">
          <Chat />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};
