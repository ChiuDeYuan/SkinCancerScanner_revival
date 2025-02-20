import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Animated, {
    useAnimatedStyle,
    withTiming,
    Easing,
    useSharedValue
} from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

import images from '../constants/images';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.65;
const cardHeight = height * 0.5;

const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

const AboutCard = ({ setScrollable, idx }: { setScrollable: (b: boolean) => void; idx: number }) => {
    const [toggleCard, setToggleCard] = useState(false);
    const [pageIdx, setPageIdx] = useState(1);
    const TitleFontSize = RFPercentage(2);
    const DetailsFontSize = RFPercentage(1.8);

    const AnimatedCardStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(toggleCard ? width : cardWidth, { duration: 400, easing: Easing.bezier(0.5, 0.01, 0, 1) }),
            height: withTiming(toggleCard ? height : cardHeight, { duration: 300, easing: Easing.bezier(0.5, 0.01, 0, 1) }),
            borderRadius: withTiming(toggleCard ? 0 : 20, { duration: 300 }),
            borderWidth: withTiming(toggleCard ? 0 : 5, { duration: 300 }),
            transform: [{ translateX: withTiming(toggleCard ? -(width - cardWidth) / 2 : 0, { duration: 300 }) }],
        };
    })

    const AnimatedCoverTitle = useAnimatedStyle(() => {
        return {
            fontSize: withTiming(toggleCard ? 40 : TitleFontSize, { duration: 200 })
        };
    })

    const AnimatedCoverDetails = useAnimatedStyle(() => {
        return {
            fontSize: withTiming(toggleCard ? 40 : DetailsFontSize, { duration: 200 })
        };
    })

    const AnimatedCoverContentStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(toggleCard ? 0 : 1, { duration: toggleCard ? 0 : 0 })
        };
    })

    const AnimatedCoverContainer = useAnimatedStyle(() => {
        return {
            width: withTiming(toggleCard ? width * 20 : cardWidth, { duration: toggleCard ? 200 : 300, easing: Easing.bezier(0.5, 0.01, 0, 1) }),
        };
    })

    const AnimatedDetailsContainer = useAnimatedStyle(() => {
        return {
            width: withTiming(toggleCard ? width * 10 : cardWidth, { duration: toggleCard ? 200 : 300, easing: Easing.bezier(0.5, 0.01, 0, 1) }),
        };
    })

    const AnimatedHighlightStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(toggleCard ? height : cardHeight - 10, { duration: 300, easing: Easing.bezier(0.5, 0.01, 0, 1) }),
        };
    })

    const AnimatedCardContentStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(toggleCard ? 1 : 0, { duration: toggleCard ? 500 : 0 }),
            width: withTiming(toggleCard ? width : cardWidth, { duration: 300 }),
        };
    })

    const nextPage = () => {
        if (pageIdx == info['about'][idx]['content'].length) {
            setToggleCard(false);
            setScrollable(true);
            setTimeout(() => {
                setPageIdx(1);
            }, 500)
        }
        else {
            setPageIdx(pageIdx + 1);
        }
    }

    const prevPage = () => {
        if (pageIdx == 1) {
            setToggleCard(false);
            setScrollable(true);
            setPageIdx(1);
        }
        else {
            setPageIdx(pageIdx - 1);
        }
    }

    return (
        <Animated.View style={[styles.CardStyle, AnimatedCardStyle]}>

            {toggleCard ? (
                <Animated.View style={[{ flex: 1 }, AnimatedCardContentStyle]}>

                    <View style={{ flex: 2, alignItems: "flex-end", justifyContent: "flex-start", flexDirection: "row", paddingHorizontal: 20, paddingBottom: 20 }}>
                        <TouchableHighlight underlayColor={ThemeColors['touchable']} onPress={() => { setToggleCard(false); setScrollable(true); setPageIdx(1) }} style={styles.cancelButton}>
                            <Ionicons name="arrow-back" size={24} color={ThemeColors['white']} />
                        </TouchableHighlight>
                    </View>

                    <View pointerEvents='none' style={styles.cardContentImageContainer}>
                        <Image source={images.about[idx][pageIdx]} style={styles.cardImg} />
                    </View>

                    <View pointerEvents='none' style={styles.cardContentTextContainer}>
                        <Animated.Text style={[styles.cardText]}>
                            {info['about'][idx]['content'][pageIdx - 1]}
                        </Animated.Text>
                    </View>

                    <View pointerEvents={'box-only'} style={{ flex: 3, alignItems: "flex-start", justifyContent: "space-around", flexDirection: "row" }}>
                        <TouchableHighlight underlayColor={ThemeColors['touchable']} onPress={() => prevPage()} style={[styles.BottomButton]}>
                            <>
                                <Ionicons name="chevron-back-outline" size={RFPercentage(3)} color={ThemeColors['white']} />
                                <Animated.Text style={[{ fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginRight: 10 }]}>
                                    Back
                                </Animated.Text>
                            </>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={ThemeColors['touchable']} onPress={() => nextPage()} style={styles.BottomButton}>
                            <>
                                <Animated.Text style={[{ fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10 }]}>
                                    Next
                                </Animated.Text>
                                <Ionicons name="chevron-forward-outline" size={RFPercentage(3)} color={ThemeColors['white']} />
                            </>
                        </TouchableHighlight>
                    </View>
                </Animated.View>
            ) : (
                <AnimatedTouchableHighlight underlayColor={"#F2D2BD"} onPress={() => { setScrollable(false); setToggleCard(true); }} style={[styles.touchableHighlight, AnimatedHighlightStyle]} disabled={toggleCard}>
                    <Animated.View pointerEvents={'none'} style={[{ flex: 1 }, AnimatedCoverContentStyle]}>
                        <Animated.View pointerEvents={'none'} style={[styles.cardTopContainer, AnimatedCoverContainer]}>
                            <Animated.Text ellipsizeMode={'clip'} numberOfLines={1} style={[styles.cardTitle, AnimatedCoverTitle]}>
                                {info['about'][idx]['title']}
                            </Animated.Text>
                        </Animated.View>
                        <Animated.View pointerEvents={'none'} style={[styles.cardMiddleContainer, AnimatedCoverContainer]}>
                            <Image source={images.about[idx][0]} style={styles.cardImg} />
                        </Animated.View>
                        <Animated.View pointerEvents={'none'} style={[styles.cardBottomContainer, AnimatedDetailsContainer]}>
                            <View pointerEvents={'none'} style={styles.detailsContainer}>
                                <Animated.Text style={[styles.details, AnimatedCoverDetails]}>
                                    More Details
                                </Animated.Text>
                                <Ionicons name="chevron-forward-outline" size={RFPercentage(2)} style={styles.detailsIcon} />
                            </View>
                        </Animated.View>
                    </Animated.View>
                </AnimatedTouchableHighlight>
            )}

        </Animated.View>
    );
}

export default AboutCard;

const styles = StyleSheet.create({
    CardStyle: {
        width: cardWidth,
        height: cardHeight,
        borderRadius: 20,
        backgroundColor: "#FFE5DE",
        alignItems: "center",
        elevation: 10,
        borderWidth: 5,
        borderColor: "#ffffff",
        marginHorizontal: 15
    },
    touchableHighlight: {
        width: cardWidth - 10,
        height: cardHeight - 10,
        borderRadius: 20,
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 30,
        position: "absolute"
    },
    cardTopContainer: {
        flex: 3,
        width: cardWidth,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    cardMiddleContainer: {
        flex: 5,
        width: cardWidth,
    },
    cardBottomContainer: {
        flex: 2,
        width: cardWidth,
    },
    cardImg: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    details: {
        fontFamily: "MerriweatherBoldItalic",
        fontSize: RFPercentage(1.8),
        color: ThemeColors['touchable'],
    },
    detailsIcon: {
        color: ThemeColors['touchable'],
    },
    detailsContainer: {
        flex: 1,
        justifyContent: "center",
        position: "absolute",
        bottom: 3,
        right: 6,
        alignItems: "center",
        flexDirection: "row"
    },
    cardTitle: {
        fontFamily: "MerriweatherBold",
        fontSize: RFPercentage(2),
        color: ThemeColors['black'],
    },
    cardText: {
        fontFamily: "MerriweatherRegular",
        fontSize: RFPercentage(2),
        color: ThemeColors['black'],
        lineHeight: 26,
        textAlign: "center",
    },
    cancelButton: {
        backgroundColor: "#FAA0A0",
        borderRadius: 100,
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    BottomButton: {
        backgroundColor: "#FAA0A0",
        borderRadius: 100,
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    indicator: {
        position: "absolute",
        bottom: 60,
    },
    cardContentImageContainer: {
        flex: 9,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 40,
        borderTopWidth: 1,
        borderColor: "#FAA0A0",
    },
    cardContentTextContainer: {
        flex: 3,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        marginHorizontal: 40,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#FAA0A0",
    }
});