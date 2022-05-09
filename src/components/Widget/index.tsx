import BottomSheet from "@gorhom/bottom-sheet";
import { ChatTeardropDots } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Options } from "../Options";
import { Form } from "./Form";
import { Success } from "./Success";

import { styles } from "./styles";

export type FeedbackType = keyof typeof feedbackTypes;

function WidgetComponent() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const [isFeedbackSent, setIsFeedbackSent] = useState(false);
  const [optionSelected, setOptionSelected] = useState<FeedbackType | null>(
    null
  );

  function handleResetFeedback() {
    setIsFeedbackSent(false);
    setOptionSelected(null);
  }

  function handleFeedbackSent() {
    setIsFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight={"bold"}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {isFeedbackSent ? (
          <Success onReset={handleResetFeedback} />
        ) : (
          <>
            {optionSelected ? (
              <Form
                feedbackType={optionSelected}
                onResetFeedback={handleResetFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onChange={setOptionSelected} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetComponent);
