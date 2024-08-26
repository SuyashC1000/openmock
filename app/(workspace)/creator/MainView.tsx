import React from "react";
import Footer from "../../_components/Footer";
import { Text } from "@chakra-ui/react";

const MainView = () => {
  return (
    <div className="flex-1 flex flex-col p-4 h-fit min-h-full bg-neutral-100 gap-6">
      <Text>Content</Text>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MainView;
