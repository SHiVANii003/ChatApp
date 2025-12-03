import React, { useRef, useState } from "react";
import {
    View,
    TextInput,
    Pressable,
    Text,
    StyleSheet,
    GestureResponderEvent,
} from "react-native";
import PopoverMenu, { Item } from "./popoverMenu";

type Props = {
    value: string;
    onChange: (t: string) => void;
    placeholder?: string;
    onFilterSelect?: (id: string) => void;
    showRightDot?: boolean;
};

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search by name",
    onFilterSelect,
}: Props) {
    const inputRef = useRef<TextInput | null>(null);

    const [filterVisible, setFilterVisible] = useState(false);
    const [filterAnchor, setFilterAnchor] =
        useState<{ x: number; y: number } | undefined>(undefined);

    const onFilterPressIn = (e: GestureResponderEvent) => {
        const { pageX, pageY } = e.nativeEvent;
        setFilterAnchor({ x: pageX, y: pageY });
        setFilterVisible(true);
    };

    const filterItems: Item[] = [
        { id: "all", label: "All", onPress: () => onFilterSelect?.("all") },
        { id: "unread", label: "Unread", onPress: () => onFilterSelect?.("unread") },
        { id: "groups", label: "Groups", onPress: () => onFilterSelect?.("groups") },
    ];

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>

                {/* ---------------------- SEARCH INPUT ---------------------- */}
                <View style={styles.searchBox}>
                    <Text style={styles.leftIcon}>🔍</Text>

                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder={placeholder}
                        placeholderTextColor="#888"
                        value={value}
                        onChangeText={onChange}
                        returnKeyType="search"
                        underlineColorAndroid="transparent"
                        selectionColor="#007AFF"
                    />
                    {value.length > 0 ? (
                        <Pressable
                            onPress={() => {
                                onChange("");
                                inputRef.current?.focus();
                            }}
                            style={({ pressed }) => [
                                styles.clearBtn,
                                pressed && { opacity: 0.6 },
                            ]}
                        >
                            <Text style={styles.clearText}>✖</Text>
                        </Pressable>
                    ) : null}
                </View>

                {/* ---------------------- FILTER BUTTON ---------------------- */}
                <Pressable
                    onPressIn={onFilterPressIn}
                    style={({ pressed }) => [
                        styles.filterBtn,
                        pressed && { opacity: 0.6 },
                    ]}
                >
                    <Text style={styles.filterIcon}>⎙</Text>
                </Pressable>
            </View>

            {/* ---------------------- POPOVER ---------------------- */}
            <PopoverMenu
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                anchor={filterAnchor}
                items={filterItems}
                dark={false}
            />
        </View>
    );
}

/* Light Mode Colors */

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "#fff",

    },

    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8
    },


    /* -------- LIGHT MODE SEARCH PILL -------- */
    searchBox: {
        width: "88%",
        height: 44,
        backgroundColor: "#f1f1f1",
        borderRadius: 999,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 14,
        paddingRight: 10,
    },

    leftIcon: {
        fontSize: 17,
        color: "#666",
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: "#000",
        paddingVertical: 0,
    },


    clearBtn: {
        padding: 6,
    },

    clearText: {
        fontSize: 14,
        color: "#666",
    },

    /* FILTER BUTTON */
    filterBtn: {
        width: "12%",
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },

    filterIcon: {
        fontSize: 22,
    },
});
