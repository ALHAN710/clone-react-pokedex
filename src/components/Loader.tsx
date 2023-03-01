import { Box, Center } from "@chakra-ui/react";

type LTLoaderProps = {
    pb?: string;
};

const Loader:React.FC<LTLoaderProps> = ({ pb  }) => {
    
  return (
    <Center pos={"relative"} pb={pb || "20px"}>
      <Box as="div" className="loader">
      </Box>
    </Center>
  );
}

export default Loader;