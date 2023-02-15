import { CSSObject } from "@mantine/core";

const common: CSSObject = {
  padding: "1em",
  borderRadius: "10px",
  width: "40%",
  minHeight: "95vh",
};

export const working: CSSObject = {
  ...common,
  backgroundColor: "#fff",
  boxShadow: "-3px 0px 5px 0px  #d6d6d6",
  borderRadius: "10px",
};

export const onBreak: CSSObject = {
  ...common,
  backgroundColor: "#FFF9DB",
  boxShadow: "-3px 0px 5px 0px  #d6d6d6",
};
