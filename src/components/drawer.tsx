// src/components/Drawer.tsx
import React, { useEffect, useRef } from "react";
import {
    Animated,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Pressable,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(320, Math.round(width * 0.8));

type DrawerItem = {
    id: string;
    label: string;
    icon?: string;
    onPress?: () => void;
};

type Props = {
    open: boolean;
    onClose: () => void;
    items?: DrawerItem[];
};

export default function Drawer({ open, onClose, items = [] }: Props) {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, { toValue: open ? 1 : 0, duration: 220, useNativeDriver: true }).start();
    }, [open, anim]);

    const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [-DRAWER_WIDTH, 0] });
    const overlayOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] });

    return (
        <>
            {open ? (
                <Pressable style={styles.overlayContainer} onPress={onClose}>
                    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
                </Pressable>
            ) : null}

            <Animated.View style={[styles.drawer, { width: DRAWER_WIDTH, transform: [{ translateX }] }]} pointerEvents={open ? "auto" : "none"}>
                <View style={styles.drawerHeader}>
                    <Text style={styles.brand}>OneInbox</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.items}>
                    {items.map((it) => (
                        <TouchableOpacity
                            key={it.id}
                            style={styles.itemRow}
                            onPress={() => {
                                it.onPress?.();
                                onClose();
                            }}
                        >
                            {it.icon ? <Icon name={it.icon} size={22} color="#333" /> : null}
                            <Text style={styles.itemLabel}>{it.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Version 1.0.0</Text>
                </View>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    overlay: { flex: 1, backgroundColor: "#000" },
    drawer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 0 },
        shadowRadius: 6,
        elevation: 8,
        zIndex: 1000,
    },
    drawerHeader: { paddingHorizontal: 16, paddingVertical: 20, backgroundColor: "#fff" },
    brand: { fontSize: 20, fontWeight: "700", color: "#111" },
    divider: { height: StyleSheet.hairlineWidth, backgroundColor: "#eee" },
    items: { paddingVertical: 8 },
    itemRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
    itemLabel: { marginLeft: 12, fontSize: 16, color: "#222" },
    footer: { position: "absolute", bottom: 18, left: 16 },
    footerText: { color: "#999", fontSize: 12 },
});
