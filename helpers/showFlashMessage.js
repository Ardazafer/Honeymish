import { showMessage } from "react-native-flash-message";
import Colors from "../constants/Colors";

export default function showFlashMessage(message, description) {
  showMessage({
    floating: true,
    message,
    description,
    type: "default",
    backgroundColor: "#fff",
    color: Colors.mainColor,
  });
}
