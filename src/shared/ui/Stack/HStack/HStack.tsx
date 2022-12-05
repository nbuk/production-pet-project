import { FC, PropsWithChildren } from "react";
import { Flex, FlexProps } from "../Flex/Flex";

type HStackProps = Omit<FlexProps, "direction">;

export const HStack: FC<PropsWithChildren<HStackProps>> = (props) => {
  return (
    <Flex {...props} direction={"row"} />
  );
};
