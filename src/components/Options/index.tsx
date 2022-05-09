import React from "react";
import { View, Text } from "react-native";

import { Option } from "../Option";
import { Copyright } from "../Copyright";
import { styles } from "./styles";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../Widget";

interface OptionsProps {
  onChange: (type: FeedbackType) => void;
}

export function Options({ onChange }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            image={value.image}
            title={value.title}
            onPress={() => onChange(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
