import React, { useState } from "react";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity, View, Text, Image, TextInput } from "react-native";
import { captureScreen } from "react-native-view-shot";

import { styles } from "./styles";
import { theme } from "../../../theme";
import { feedbackTypes } from "../../../utils/feedbackTypes";
import { FeedbackType } from "../../Widget";
import { ScreenshotButton } from "../../ScreenshotButton";
import { Button } from "../../Button";

interface FormProps {
  feedbackType: FeedbackType;
  onResetFeedback: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onResetFeedback,
  onFeedbackSent,
}: FormProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [isSubmitting, setIsSubmitting] = useState(true);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  function handleScreenshotTaken() {
    captureScreen({
      format: "png",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.error(error));
  }

  function handleResetScreenshot() {
    setScreenshot(null);
  }

  function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      //code
    } catch (error) {}

    onFeedbackSent();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onResetFeedback}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image}></Image>
          <Text style={styles.title}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <View>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
          placeholderTextColor={theme.colors.text_secondary}
        />

        <View style={styles.footer}>
          <ScreenshotButton
            onResetScreenshot={handleResetScreenshot}
            onScreenshotTaken={handleScreenshotTaken}
            screenshot={screenshot}
          />
          <Button onPress={handleSubmit} isLoading={isSubmitting} />
        </View>
      </View>
    </View>
  );
}
