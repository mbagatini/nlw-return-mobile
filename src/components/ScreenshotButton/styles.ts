import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: theme.colors.surface_secondary,
  },
  removeIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
