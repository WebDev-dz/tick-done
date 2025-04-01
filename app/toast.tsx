import React from "react";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { CheckIcon, Icon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
import { examples } from "@/components/docs/examples/toast";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

const ToastDemo = () => {
  const toast = useToast();
  const [toastId, setToastId] = React.useState("0");
  const handleToast = () => {
    if (!toast.isActive(toastId)) {
      showNewToast();
    }
  };

  const showNewToast = () => {
    const newId = Math.random().toString();
    setToastId(newId);
    toast.show({
      id: newId,
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            nativeID={uniqueToastId}
            className="flex flex-row gap-2 mx-2 android:mt-[56px]"
            variant="outline"
            action="success"
          >
            <Icon as={CheckIcon} className="mt-[3px] text-success-800" />
            <VStack>
              <ToastTitle>Completed!</ToastTitle>
              <ToastDescription>File Submitted Successfully.</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };
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
          <Button onPress={handleToast}>
            <ButtonText>Show Toast</ButtonText>
          </Button>
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

export default ToastDemo;
