import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../theme";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  isLoading?: boolean;
}

export function Button({ onPress, isLoading, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.text}>Enviar</Text>
      )}
    </TouchableOpacity>
  );
}
