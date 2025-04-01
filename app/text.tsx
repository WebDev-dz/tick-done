import React from "react";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/text";

const TextDemo = () => {
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
          <Box className="max-w-[600px]">
            <Text className="text-2xl font-semibold text-typography-900 mb-3">
              Your Notes
            </Text>
            <Text>
              This is a text. A text is a written or printed work that conveys
              information, ideas, thoughts, or emotions through language. It can
              take various forms, such as books, articles, essays, messages, and
              can serve multiple purposes, including communication,
              entertainment, etc. In a broader sense, a "text" refers to any
              coherent and meaningful collection of words that can be read and
              interpreted.
            </Text>
          </Box>
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

export default TextDemo;
