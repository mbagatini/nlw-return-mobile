import React from "react";
import { Camera, Trash } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { theme } from "../../theme";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTaken: () => void;
  onResetScreenshot: () => void;
}

export function ScreenshotButton({
  screenshot,
  onScreenshotTaken,
  onResetScreenshot,
}: ScreenshotButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onResetScreenshot : onScreenshotTaken}
    >
      {screenshot ? (
        <Trash
          size={22}
          weight="fill"
          color={theme.colors.text_secondary}
          style={styles.removeIcon}
        />
      ) : (
        <Camera size={22} weight="bold" color={theme.colors.text_secondary} />
      )}
    </TouchableOpacity>
  );
}
