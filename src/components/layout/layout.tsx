import React from "react";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LayoutProps = {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    scrollable?: boolean;
    stickyFooter?: boolean;
};

export default function Layout({
    header,
    footer,
    children,
    scrollable = false,
    stickyFooter = false,
}: LayoutProps) {
    return (
        <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {header && <View style={styles.header}>{header}</View>}

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.flex}
            >
                {scrollable ? (
                    <ScrollView
                        style={styles.flex}
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.content}>{children}</View>
                        {!stickyFooter && footer && <View style={styles.footer}>{footer}</View>}
                    </ScrollView>
                ) : (
                    <View style={styles.flex}>
                        <View style={styles.content}>{children}</View>
                        {!stickyFooter && footer && <View style={styles.footer}>{footer}</View>}
                    </View>
                )}
            </KeyboardAvoidingView>

            {stickyFooter && footer && <View style={styles.footerSticky}>{footer}</View>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    header: {},
    content: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
    footer: {
        padding: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#eee",
        backgroundColor: "#fff",
    },
    footerSticky: {
        padding: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#eee",
        backgroundColor: "#fff",
    },
    flex: { flex: 1 },
});
