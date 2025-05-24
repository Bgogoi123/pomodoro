import { CSSObject } from "@mantine/core";

const common: CSSObject = {
  padding: "1em",
  borderRadius: "10px",
  minHeight: "90vh",
  border: "1px solid #d6d6d6",
};

export const working: CSSObject = {
  ...common,
  backgroundColor: "#fff",
};

export const onBreak: CSSObject = {
  ...common,
  backgroundColor: "#FFF9DB",
};
