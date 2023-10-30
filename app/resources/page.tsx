"use client";

import { Center, Flex, Box } from "@chakra-ui/react";
import ResourcesModal from "@/components/modals/ResourcesModal";
import Navbar from "@/components/LandingNavbar";
import { PigLoader } from "@/components/PigLoader";

const Resources = () => {
  return (
    <Box height="100vh" bgGradient={["linear(to-b, black,#4F1B7C)"]}>
      <Navbar />
      <Center mt="1rem">
        <Flex>
          <ResourcesModal />
          {/* <PigLoader /> */}
        </Flex>
      </Center>
    </Box>
  );
};

export default Resources;
