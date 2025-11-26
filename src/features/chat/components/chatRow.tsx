import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export type ChatItemType = {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread?: number;
};

type Props = {
    item: ChatItemType;
    onPress?: (item: ChatItemType) => void;
};

export default function ChatRow({ item, onPress }: Props) {
    const initials = item.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Pressable
            onPress={() => onPress?.(item)}
            style={({ pressed }) => [styles.container, pressed && { opacity: 0.6 }]}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View style={styles.middle}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message} numberOfLines={1}>
                    {item.lastMessage}
                </Text>
            </View>

            <View style={styles.right}>
                <Text style={styles.time}>{item.time}</Text>

                {item.unread && item.unread > 0 ? (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.unread}</Text>
                    </View>
                ) : null}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e5e5e5",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#dfe6e9",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: { fontWeight: "700", color: "#2d3436", fontSize: 17 },
    middle: { flex: 1 },
    name: { fontSize: 16, fontWeight: "600", color: "#111", marginBottom: 2 },
    message: { fontSize: 14, color: "#555" },
    right: { alignItems: "flex-end", justifyContent: "space-between", height: "100%" },
    time: { fontSize: 12, color: "#888", marginBottom: 4 },
    badge: {
        backgroundColor: "#25D366",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 12,
        minWidth: 22,
        alignItems: "center",
    },
    badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
