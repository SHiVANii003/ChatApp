import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from "react-native";

type Contact = {
    name: string;
    avatarUrl?: string;
    phone?: string;
    about?: string;
};

type Props = {
    visible: boolean;
    onClose: () => void;
    contact: Contact | null;

    heightFraction?: number;
};

const { height: SCREEN_H } = Dimensions.get("window");

export default function ContactDrawer({
    visible,
    onClose,
    contact,
    heightFraction = 0.5,
}: Props) {
    const anim = useRef(new Animated.Value(0)).current;

    // sheet height
    const sheetHeight = Math.max(220, Math.min(SCREEN_H * heightFraction, SCREEN_H - 80));

    useEffect(() => {
        Animated.timing(anim, {
            toValue: visible ? 1 : 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }, [visible, anim]);

    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [sheetHeight + 20, 0],
    });

    const overlayOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.45] });

    if (!visible) return null;

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            {/* overlay */}
            <Pressable style={styles.full} onPress={onClose}>
                <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
            </Pressable>

            {/* sheet */}
            <Animated.View
                pointerEvents="box-none"
                style={[
                    styles.sheetContainer,
                    { height: sheetHeight, transform: [{ translateY }] },
                ]}
            >
                <View style={styles.handleWrap}>
                    <View style={styles.handle} />
                </View>

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>{contact?.name ?? "Contact"}</Text>
                        <TouchableOpacity onPress={onClose} accessibilityRole="button" style={styles.closeBtn}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.value}>{contact?.phone ?? "—"}</Text>
                    </View>

                    <View style={[styles.infoRow, { marginTop: 12 }]}>
                        <Text style={styles.label}>About</Text>
                        <Text style={styles.value}>{contact?.about ?? "No details"}</Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => console.log("Call", contact?.phone)}>
                            <Text style={styles.actionText}>Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionBtn, styles.actionOutline]} onPress={() => console.log("Message", contact?.name)}>
                            <Text style={[styles.actionText, styles.actionOutlineText]}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    full: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    overlay: { flex: 1, backgroundColor: "#000" },

    sheetContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        paddingTop: 8,
        // shadow
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -6 },
                shadowOpacity: 0.12,
                shadowRadius: 12,
            },
            android: {
                elevation: 16,
            },
        }),
    },

    handleWrap: { alignItems: "center", paddingTop: 6, paddingBottom: 4 },
    handle: {
        width: 48,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#ddd",
    },

    content: { paddingHorizontal: 16, paddingTop: 6, flex: 1 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    title: { fontSize: 18, fontWeight: "700", color: "#111" },
    closeBtn: { padding: 8 },
    closeText: { color: "#007AFF", fontWeight: "600" },

    infoRow: { marginTop: 6 },
    label: { fontSize: 13, color: "#666" },
    value: { fontSize: 16, color: "#111", marginTop: 4 },

    actions: { flexDirection: "row", gap: 12, marginTop: 16 },
    actionBtn: {
        flex: 1,
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    actionText: { color: "#fff", fontWeight: "600" },
    actionOutline: {
        backgroundColor: "#fff",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#007AFF",
    },
    actionOutlineText: { color: "#007AFF" },
});
