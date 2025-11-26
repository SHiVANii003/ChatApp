import React, { useEffect, useRef } from "react";
import {
    Animated,
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    TouchableOpacity,
} from "react-native";

const { height } = Dimensions.get("window");

type Props = {
    visible: boolean;
    onClose: () => void;
};

export default function FilterModal({ visible, onClose }: Props) {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, { toValue: visible ? 1 : 0, duration: 200, useNativeDriver: true }).start();
    }, [visible, anim]);

    const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [height, height * 0.35] });
    const overlayOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] });

    return (
        <>
            {visible ? (
                <Pressable style={styles.overlayContainer} onPress={onClose}>
                    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
                </Pressable>
            ) : null}

            <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]} pointerEvents={visible ? "auto" : "none"}>
                <View style={styles.handleContainer}>
                    <View style={styles.handle} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.heading}>Filter</Text>

                    <TouchableOpacity style={styles.optionRow} onPress={() => console.log("Unread toggled")}>
                        <Text style={styles.optionText}>Unread messages</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionRow} onPress={() => console.log("Groups only toggled")}>
                        <Text style={styles.optionText}>Groups only</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.optionRow, { marginTop: 12 }]} onPress={onClose}>
                        <Text style={[styles.optionText, { color: "#0a84ff" }]}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    overlay: { flex: 1, backgroundColor: "#000" },
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        height: height * 0.65,
        backgroundColor: "#fff",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        zIndex: 2000,
        elevation: 20,
    },
    handleContainer: { alignItems: "center", paddingVertical: 8 },
    handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#ddd" },
    content: { paddingHorizontal: 16, paddingVertical: 8 },
    heading: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
    optionRow: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#eee" },
    optionText: { fontSize: 15, color: "#222" },
});
