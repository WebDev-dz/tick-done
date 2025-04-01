import React, { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { examples } from "@/components/docs/examples/alert-dialog";

const AlertDialogDemo = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);
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
          <Button onPress={() => setShowAlertDialog(true)}>
            <ButtonText>Open Dialog</ButtonText>
          </Button>
          <AlertDialog size="md" isOpen={showAlertDialog} onClose={handleClose}>
            <AlertDialogBackdrop />
            <AlertDialogContent>
              <AlertDialogHeader>
                <Heading
                  className="text-typography-950 font-semibold"
                  size="md"
                >
                  Delete post?
                </Heading>
              </AlertDialogHeader>
              <AlertDialogBody className="mt-3 mb-4">
                <Text size="sm">
                  Deleting the post will remove it permanently and cannot be
                  undone.
                </Text>
              </AlertDialogBody>
              <AlertDialogFooter className="">
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={handleClose}
                  size="sm"
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button size="sm" onPress={handleClose}>
                  <ButtonText>Delete</ButtonText>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

export default AlertDialogDemo;
