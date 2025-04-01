import React from "react";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { examples } from "@/components/docs/examples/card";

const CardDemo = () => {
  return (
    <ScrollView
      className={`bg-background-0 ${examples?.length > 0 ? "" : "web:justify-center"}`}
      contentContainerClassName="px-3 pb-6"
    >
      <Box className="p-5 rounded-lg m-3 mt-5 bg-background-50 gap-5 min-h-[200px] max-w-[600px] lg:min-w-[700px] w-full self-center">
        <Text className="border-b border-outline-200 pb-2 lg:pb-3 lg:text-xl text-base">
          Default
        </Text>
        <Center className="flex-1">
          <Card className="max-w-[352px] flex flex-col p-4 border border-outline-200 rounded-lg shadow-soft-1">
            <Image
              source={{
                uri: "https://i.imgur.com/yL7VSbU.png",
              }}
              alt="random"
              className="w-full aspect-[352/234] rounded"
              // @ts-ignore
              size="none"
            />
            <Text size="sm" className="mt-4 mb-2">
              May 15, 2023
            </Text>
            <Heading size="md">The Power of Positive Thinking</Heading>
            <Text size="sm" className="mt-2.5 line-clamp-2">
              Discover how the power of positive thinking can transform your
              life, boost your confidence, and help you overcome challenges.
              Explore practical tips and techniques to cultivate a positive
              mindset for greater happiness and success.
            </Text>
          </Card>
        </Center>
      </Box>

      {examples?.length > 0 &&
        examples.map((Example: any, index: any) => {
          const isFunctionComponent = typeof Example.Code === "function"; // Check if Code is a function
          return (
            <Box
              key={index}
              className="p-5 border border-outline-100 rounded-lg my-2.5 gap-5 min-h-[200px] max-w-[600px] lg:min-w-[700px] w-full self-center"
            >
              <Text className="border-b border-outline-200 pb-2 lg:pb-3 lg:text-xl text-base">
                {Example.name}
              </Text>
              <Center className="flex-1">
                {isFunctionComponent ? <Example.Code /> : Example.Code}
              </Center>
            </Box>
          );
        })}
    </ScrollView>
  );
};

export default CardDemo;
