import React from "react";
import { View, Text, Pressable, Image, StyleSheet, Platform } from "react-native";

type Props = {
    name: string;
    avatarUrl?: string;
    onBack?: () => void;
    onOpenDetails?: () => void;
};

export default function ChatHeader({ name, avatarUrl, onBack, onOpenDetails }: Props) {
    const shadow = Platform.select({
        ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 },
        android: { elevation: 3 },
    });

    return (
        <View style={[styles.container, shadow]}>
            <View style={styles.leftRow}>
                {onBack ? (
                    <Pressable onPress={onBack} style={styles.backBtn}>
                        <Text style={styles.backText}>‹</Text>
                    </Pressable>
                ) : null}

                <Pressable style={styles.avatarRow} onPress={onOpenDetails} accessibilityLabel="Open contact details">
                    {avatarUrl ? (
                        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarFallback}>
                            <Text style={styles.avatarText}>{name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</Text>
                        </View>
                    )}
                    <View style={styles.nameWrap}>
                        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                        <Text style={styles.status}>online</Text>
                    </View>
                </Pressable>
            </View>

            <View style={{ width: 44 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    leftRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    backBtn: {
        paddingHorizontal: 8,
        marginRight: 6,
    },
    backText: { fontSize: 26, color: "#007AFF" },

    avatarRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    avatarFallback: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: "#e6e6e6", justifyContent: "center", alignItems: "center", marginRight: 10
    },
    avatarText: { fontWeight: "700", color: "#333" },

    nameWrap: { maxWidth: 220 },
    name: { fontSize: 16, fontWeight: "600", color: "#111" },
    status: { fontSize: 12, color: "#007AFF", marginTop: 2 },
});
