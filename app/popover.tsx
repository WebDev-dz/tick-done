import React from "react";
import { Center } from "@/components/ui/center";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import {
  Popover,
  PopoverBackdrop,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@/components/ui/popover";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/popover";
import { Box } from "@/components/ui/box";

const PopoverDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ScrollView
      className={`bg-background-0 ${examples?.length > 0 ? "" : "web:justify-center"}`}
      contentContainerClassName="px-3 pb-6"
    >
      <Box className="p-5 rounded-lg m-3 mt-5 bg-background-100 gap-5 min-h-[200px] max-w-[600px] lg:min-w-[700px] w-full self-center">
        <Text className="border-b border-outline-200 pb-2 lg:pb-3 lg:text-xl text-base">
          Default
        </Text>
        <Center className="flex-1">
          <VStack
            space="md"
            className="max-w-[336px] w-full rounded-lg bg-background-0 p-4"
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1647221598272-9aa015392c81?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              alt="image"
              className="w-full aspect-[336/173] rounded-md"
              size="none"
            />
            <Popover
              isOpen={isOpen}
              onClose={handleClose}
              onOpen={handleOpen}
              placement="bottom"
              offset={8}
              trigger={(triggerProps) => {
                return (
                  <Button {...triggerProps}>
                    <ButtonText>Open Popover</ButtonText>
                  </Button>
                );
              }}
            >
              <PopoverBackdrop />
              <PopoverContent className="max-w-[300px]">
                <PopoverArrow />
                <PopoverBody>
                  <Text className="text-typography-900" size="sm">
                    Alex, Annie and many others are already enjoying the Pro
                    features, don't miss out on the fun!
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
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

export default PopoverDemo;
