import { FC, PropsWithChildren } from "react";
import { Flex, FlexProps } from "../Flex/Flex";

type VStackProps = Omit<FlexProps, "direction">;

export const VStack: FC<PropsWithChildren<VStackProps>> = (props) => {
  const { align = "start" } = props;
  return (
    <Flex {...props} direction={"column"} align={align} />
  );
};
