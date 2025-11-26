// src/components/Header.tsx
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform, GestureResponderEvent } from "react-native";
import PopoverMenu, { Item } from "../popoverMenu";

type Props = {
    title?: string;
    onAction?: (id: string) => void; // called when a menu item is pressed
};

export default function Header({ title = "OneInbox", onAction }: Props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [anchor, setAnchor] = useState<{ x: number; y: number } | undefined>(undefined);

    const onHamburgerPressIn = (e: GestureResponderEvent) => {
        const { pageX, pageY } = e.nativeEvent;
        setAnchor({ x: pageX, y: pageY });
        setMenuVisible(true);
    };

    const menuItems: Item[] = [
        { id: "new_group", label: "New group", onPress: () => onAction?.("new_group") },
        { id: "new_broadcast", label: "New broadcast", onPress: () => onAction?.("new_broadcast") },
        { id: "linked", label: "Linked devices", onPress: () => onAction?.("linked") },
        { id: "settings", label: "Settings", onPress: () => onAction?.("settings") },
    ];

    const shadow = Platform.select({
        ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 },
        android: { elevation: 3 },
    });

    return (
        <View style={[styles.container, shadow]}>
            <Text style={styles.title}>{title}</Text>

            <Pressable
                onPressIn={onHamburgerPressIn}
                style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
                accessibilityLabel="Open menu"
            >
                <Text style={styles.hamburger}>☰</Text>
            </Pressable>

            <PopoverMenu visible={menuVisible} onClose={() => setMenuVisible(false)} anchor={anchor} items={menuItems} dark />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: { fontSize: 20, fontWeight: "700", color: "#111" },
    iconBtn: { padding: 8, borderRadius: 8 },
    hamburger: { fontSize: 20 },
});
