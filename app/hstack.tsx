import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/hstack";
import { Text } from "@/components/ui/text";

const HStackDemo = () => {
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
          <HStack
            space="xl"
            className="items-center w-full max-w-[548px] p-2 h-full min-h-[364px]"
          >
            <Box className="grow-[1] border border-dashed border-outline-400 rounded-lg bg-background-0 h-full" />
            <Box className="grow-[2] border border-dashed border-outline-400 rounded-lg bg-background-0 h-full" />
            <Box className="grow-[2] border border-dashed border-outline-400 rounded-lg bg-background-0 h-full" />
          </HStack>
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

export default HStackDemo;
