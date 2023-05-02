import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/Fontisto';

export default function CheckBox({isChecked, onPress, title}) {
    const iconName = isChecked ?
        "checkbox-active" : "checkbox-passive";

    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <Icon
                    name={iconName} size={24} color="#000" />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
        marginTop: 5,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 15,
        color: "#5a5a5b",
        position: 'absolute',
        left: 40,
    },
});
