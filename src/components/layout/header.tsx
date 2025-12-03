import React, { useCallback, useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform, GestureResponderEvent } from "react-native";
import PopoverMenu, { Item } from "../popoverMenu";

type Props = {
    title?: string;
    onMenuPress?: () => void; 
};

export default function Header({ title = "OneInbox", onMenuPress }: Props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [anchor, setAnchor] = useState<{ x: number; y: number } | undefined>(undefined);

    // menu items — customize as needed
    const menuItems: Item[] = [
        { id: "new_group", label: "New group", onPress: () => console.log("new_group") },
        { id: "new_broadcast", label: "New broadcast", onPress: () => console.log("new_broadcast") },
        { id: "linked_devices", label: "Linked devices", onPress: () => console.log("linked_devices") },
        { id: "settings", label: "Settings", onPress: () => console.log("settings") },
    ];

    const showMenu = useCallback((e: GestureResponderEvent) => {
        const { pageX, pageY } = e.nativeEvent;
        setAnchor({ x: pageX, y: pageY });
        setMenuVisible(true);
        // keep backward-compatible callback
        onMenuPress?.();
    }, [onMenuPress]);

    const shadow = Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
        },
        android: {
            elevation: 3,
        },
    });

    return (
        <>
            <View style={[styles.container, shadow]}>
                <Text style={styles.title}>{title}</Text>

                <Pressable
                    onPressIn={showMenu}
                    style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
                    accessibilityLabel="Open menu"
                >
                    <Text style={styles.iconText}>☰</Text>
                </Pressable>
            </View>

            <PopoverMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                anchor={anchor}
                items={menuItems}
                dark={false}
            />
        </>
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
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111",
    },
    iconBtn: {
        padding: 8,
        borderRadius: 8,
    },
    iconText: {
        fontSize: 22,
        color: "#111",
    },
});
