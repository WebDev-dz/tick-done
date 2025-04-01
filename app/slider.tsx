import React from "react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import HundredEmoji from "@/components/custom/icons/hundredEmoji";
import ThumbDownEmoji from "@/components/custom/icons/thumbDownEmoji";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/slider";

const SliderDemo = () => {
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
          <Box className="bg-background-0 p-6 rounded-xl border border-outline-200 w-full max-w-[336px]">
            <Text size="xl" className="font-medium text-typography-900">
              How satisfied are you with gluestack?
            </Text>
            <Slider defaultValue={30} className="w-full mt-10">
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Box className="flex flex-row justify-between mt-4">
              <Icon as={ThumbDownEmoji} />
              <Icon as={HundredEmoji} />
            </Box>
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

export default SliderDemo;
