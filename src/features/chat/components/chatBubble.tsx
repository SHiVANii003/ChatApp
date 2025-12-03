import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    text: string;
    time?: string;
    isMine?: boolean;
};

export default function ChatBubble({ text, time, isMine = false }: Props) {
    return (
        <View style={[styles.row, isMine ? styles.rowRight : styles.rowLeft]}>
            <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}>
                <Text style={[styles.text, isMine ? styles.textMine : styles.textOther]}>{text}</Text>
                {time ? <Text style={[styles.time, isMine ? styles.timeMine : styles.timeOther]}>{time}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { width: "100%", paddingHorizontal: 12, marginVertical: 6 },
    rowLeft: { alignItems: "flex-start" },
    rowRight: { alignItems: "flex-end" },

    bubble: {
        maxWidth: "85%",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    bubbleMine: {
        backgroundColor: "#007AFF", // blue outgoing
        borderBottomRightRadius: 6,
    },
    bubbleOther: {
        backgroundColor: "#f1f0f0", // light incoming
        borderBottomLeftRadius: 6,
    },

    text: { fontSize: 15 },
    textMine: { color: "#fff" },
    textOther: { color: "#111" },

    time: {
        fontSize: 11,
        marginTop: 6,
        opacity: 0.85,
    },
    timeMine: { color: "rgba(255,255,255,0.9)", textAlign: "right" },
    timeOther: { color: "#666", textAlign: "left" },
});
