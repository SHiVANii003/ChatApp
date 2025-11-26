import React, { useEffect, useRef } from "react";
import {
    Modal,
    Pressable,
    Animated,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

export type Item = {
    id: string;
    label: string;
    onPress?: () => void;
};

type Props = {
    visible: boolean;
    onClose: () => void;
    anchor?: { x: number; y: number };
    items: Item[];
    dark?: boolean;
};

const SCREEN_W = Dimensions.get("window").width;

export default function PopoverMenu({ visible, onClose, anchor, items, dark = true }: Props) {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, { toValue: visible ? 1 : 0, duration: 160, useNativeDriver: true }).start();
    }, [visible, anim]);

    if (!visible) return null;

    // compute left/top for the menu (menu width assumed 180)
    const MENU_W = 180;
    const left = Math.max(8, Math.min((anchor?.x ?? SCREEN_W - 16) - MENU_W + 24, SCREEN_W - MENU_W - 8));
    const top = (anchor?.y ?? 56) + 8;

    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] });
    const opacity = anim;

    return (
        <Modal transparent visible={visible} onRequestClose={onClose} animationType="none">
            <Pressable style={styles.overlay} onPress={onClose} />

            <Animated.View
                style={[
                    styles.menu,
                    dark ? styles.menuDark : styles.menuLight,
                    { left, top, opacity, transform: [{ scale }] },
                ]}
            >
                {items.map((it) => (
                    <TouchableOpacity
                        key={it.id}
                        onPress={() => {
                            it.onPress?.();
                            onClose();
                        }}
                        activeOpacity={0.7}
                        style={styles.row}
                    >
                        <Text style={[styles.label, dark ? styles.labelDark : styles.labelLight]}>{it.label}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "transparent" },
    menu: {
        position: "absolute",
        width: 180,
        borderRadius: 10,
        paddingVertical: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 12,
    },
    menuDark: { backgroundColor: "#222" },
    menuLight: { backgroundColor: "#fff" },
    row: { paddingVertical: 10, paddingHorizontal: 12 },
    label: { fontSize: 15 },
    labelDark: { color: "#fff" },
    labelLight: { color: "#111" },
});
