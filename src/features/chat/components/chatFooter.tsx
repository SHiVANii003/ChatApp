import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet, Platform } from "react-native";

type Props = {
    onSend: (text: string) => void;
    placeholder?: string;
};

export default function ChatFooter({ onSend, placeholder = "Message" }: Props) {
    const [text, setText] = useState("");

    const send = () => {
        const t = text.trim();
        if (t.length === 0) return;
        onSend(t);
        setText("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#666"
                    value={text}
                    onChangeText={setText}
                    multiline
                    returnKeyType="send"
                    onSubmitEditing={send}
                />
            </View>

            <Pressable onPress={send} style={({ pressed }) => [styles.sendBtn, pressed && { opacity: 0.7 }]}>
                <Text style={styles.sendText}>Send</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === "ios" ? 12 : 8,
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#fff",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#e6e6e6",
    },
    inputBox: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 10,
        maxHeight: 120,
    },
    input: {
        fontSize: 15,
        color: "#111",
    },
    sendBtn: {
        backgroundColor: "#007AFF",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    sendText: { color: "#fff", fontWeight: "600" },
});
