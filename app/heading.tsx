import React from "react";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Icon, CircleIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

const HeadingDemo = () => {
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
          <VStack>
            <Heading size="4xl">Main Heading</Heading>
            <Heading size="lg" className="font-medium my-3">
              Description of the heading
            </Heading>
            <Heading size="xl" className="my-3">
              Sub Heading
            </Heading>
            <VStack space="sm">
              <HStack space="sm" className="items-center ml-2">
                <Icon
                  as={CircleIcon}
                  className="h-1.5 w-1.5 fill-typography-950"
                />
                <Heading size="sm" className="font-medium">
                  List Item 1
                </Heading>
              </HStack>
              <HStack space="sm" className="items-center ml-2">
                <Icon
                  as={CircleIcon}
                  className="h-1.5 w-1.5 fill-typography-950"
                />
                <Heading size="sm" className="font-medium">
                  List Item 2
                </Heading>
              </HStack>
              <HStack space="sm" className="items-center ml-2">
                <Icon
                  as={CircleIcon}
                  className="h-1.5 w-1.5 fill-typography-950"
                />
                <Heading size="sm" className="font-medium">
                  List Item 3
                </Heading>
              </HStack>
            </VStack>
          </VStack>
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

export default HeadingDemo;
