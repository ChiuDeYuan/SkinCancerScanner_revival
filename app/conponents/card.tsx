import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TouchableHighlight } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const ThemeColors = require("../constants/colors.json");

const Card = ({ title, content }: { title: string; content: string }) => {
    const [expanded, setExpanded] = useState(false);
    const scale = useSharedValue(1);
    const borderRadius = useSharedValue(20);

    const handlePress = () => {
    setExpanded(!expanded);
    scale.value = withTiming(expanded ? 1 : 1, { duration: 300 });
    borderRadius.value = withTiming(expanded ? 20 : 0, { duration: 300 });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        width: expanded ? width : width * 0.7,
        height: expanded ? height : 200,
        borderRadius: borderRadius.value,
        transform: [{ scale: scale.value }],
        elevation: 5,
    }));

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            {expanded ? (
                <>
                <TouchableOpacity onPress={handlePress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#eff0f1" />
                </TouchableOpacity>
                <Text style={styles.fullscreenText}>{content}</Text>
                </>
            ) : (
                <TouchableHighlight style={styles.unexpandedCard} underlayColor="#6caccf" onPress = {handlePress}>
                    <Text style={styles.cardTitle}>{title}</Text>
                </TouchableHighlight>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ThemeColors['babyBlue'],
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 20,
  },
  touchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  fullscreenText: {
    fontSize: 20,
    color: "white",
    padding: 20,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },
  unexpandedCard: {
    borderRadius: 20,
    width: width * 0.7,
    height: 200,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Card;