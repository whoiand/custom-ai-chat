import React from "react";
import {
  Text as RNText,
  StyleSheet,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import { theme } from "@theme/theme";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: "header" | "subheader" | "body" | "caption";
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  style,
  ...props
}) => {
  const textStyle = {
    header: { fontSize: theme.fontSize.xl, fontWeight: "bold" },
    subheader: { fontSize: theme.fontSize.lg, fontWeight: "bold" },
    caption: { fontSize: theme.fontSize.xs, color: theme.colors.muted },
    body: { fontSize: theme.fontSize.md },
  }[variant] as TextStyle;

  return (
    <RNText style={[styles.text, textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.regular,
  },
});
