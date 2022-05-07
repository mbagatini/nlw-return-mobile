import React from "react";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity, View, Text, Image, TextInput } from "react-native";
import { styles } from "./styles";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../Widget";
import { ScreenshotButton } from "../ScreenshotButton";

interface WidgetFormProps {
  feedbackType: FeedbackType;
}

export function WidgetForm({ feedbackType }: WidgetFormProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
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

        <View>
          <ScreenshotButton />
        </View>
      </View>
    </View>
  );
}
