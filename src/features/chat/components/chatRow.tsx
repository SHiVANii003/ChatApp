import React from "react";
import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    ImageSourcePropType,
} from "react-native";

export type ChatRowData = {
    id: string;
    name: string;
    lastMessage?: string;
    time?: string; // e.g. "09:22", "Yesterday"
    unread?: number;
    avatarUrl?: string; // optional remote image
    isMuted?: boolean;
    isPinned?: boolean;
};

type Props = {
    item: ChatRowData;
    onPress?: (item: ChatRowData) => void;
    onLongPress?: (item: ChatRowData) => void;
};

export default function ChatRow({ item, onPress, onLongPress }: Props) {
    const initials = (item.name || "")
        .split(" ")
        .map((w) => w[0] || "")
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Pressable
            onPress={() => onPress?.(item)}
            onLongPress={() => onLongPress?.(item)}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
            android_ripple={{ color: "rgba(0,0,0,0.06)" }}
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${item.unread ? item.unread + " unread messages" : "no unread messages"}`}
        >
            {/* Avatar */}
            <View style={styles.left}>
                {item.avatarUrl ? (
                    <Image source={{ uri: item.avatarUrl } as ImageSourcePropType} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarFallback}>
                        <Text style={styles.avatarText}>{initials}</Text>
                    </View>
                )}
            </View>

            {/* Middle: name + last message */}
            <View style={styles.center}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Text>

                <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
                    {item.lastMessage ?? ""}
                </Text>
            </View>

            {/* Right: time + badge */}
            <View style={styles.right}>
                <Text style={styles.time}>{item.time ?? ""}</Text>

                {item.unread && item.unread > 0 ? (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {item.unread > 99 ? "99+" : String(item.unread)}
                        </Text>
                    </View>
                ) : (
                    // optional small indicator for muted/pinned etc (keeps layout stable)
                    <View style={styles.emptySpace} />
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 2,
        backgroundColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ececec",
    },
    pressed: {
        opacity: 0.85,
    },

    left: {
        marginRight: 12,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#ddd",
    },
    avatarFallback: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#e6e6e6",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },

    center: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
        marginBottom: 2,
    },
    message: {
        fontSize: 14,
        color: "#666",
    },

    right: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginLeft: 8,
        minWidth: 52,
    },
    time: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },

    badge: {
        backgroundColor: "#007AFF", 
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        minWidth: 26,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },

    emptySpace: {
        height: 18,
    },
});
