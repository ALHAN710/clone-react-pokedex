import React from "react";
import { Box, Stack, Skeleton, SkeletonText } from "@chakra-ui/react";

const PokedexSkeleton = () => {
  return (
    <Stack direction={"column"} height="auto" width="250px">
      {/* Skeleton for pokemon image */}
      <Skeleton height="200px" width="100%" borderRadius={"5px"} />

      {/* Pokemon info */}
      <Box as="div" pl="3.62625%">
        {/* Skeleton for id number of pokemon */}
        <SkeletonText mt="2" width="30%" noOfLines={1} />
        {/* Skeleton for the name of pokemon */}
        <SkeletonText mt="4" width="40%" noOfLines={1} />
        
        <Stack as="div" mt="2" direction={"row"}>
            {/* Skeleton for the type 1 of pokemon */}
            <Skeleton width="30%" height="20px" />
            {/* Skeleton for the type 2 of pokemon */}
            <Skeleton width="30%" height="20px" />

        </Stack>

      </Box>
      
    </Stack>
  );
};

export default PokedexSkeleton;
