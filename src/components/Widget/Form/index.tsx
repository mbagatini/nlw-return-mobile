import React, { useState } from "react";
import { readAsStringAsync } from "expo-file-system";
import { ArrowLeft } from "phosphor-react-native";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";

import { api } from "../../../libs/api";
import { theme } from "../../../theme";
import { feedbackTypes } from "../../../utils/feedbackTypes";

import { Button } from "../../Button";
import { ScreenshotButton } from "../../ScreenshotButton";
import { FeedbackType } from "../../Widget";

import { styles } from "./styles";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

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

  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const imgBase64 = screenshot && (await readAsStringAsync(screenshot));

    try {
      await api.post("/feedback", {
        type: feedbackType,
        screenshot: `data:image/png;base64,${imgBase64}`,
        comment,
      });

      onFeedbackSent();
    } catch (error) {}
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
          value={comment}
          onChangeText={setComment}
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
