import React from "react";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/skeleton";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

const SkeletonDemo = () => {
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
          <VStack space="lg" className="w-full max-w-[352px]">
            <HStack space="xl" className="w-full">
              <VStack space="sm" className="flex-1">
                <Skeleton
                  className="w-full h-[84px]"
                  variant="rounded"
                  speed={4}
                />
                <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
                <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
              </VStack>
              <VStack space="sm" className="flex-1">
                <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
                <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
                <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
                <Skeleton
                  className="w-full h-[52px]"
                  variant="rounded"
                  speed={4}
                />
              </VStack>
            </HStack>
            <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
            <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
            <SkeletonText className="h-6 w-full" _lines={1} speed={4} />
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

export default SkeletonDemo;
