import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
}

const Input = ({ icon, style, ...props }: InputProps) => {
    return (
        <View style={[styles.container, style]}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <TextInput style={styles.input} placeholderTextColor="#696969" {...props} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        paddingHorizontal: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#2691A3',
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#2691A3',
    },
});

export default Input;
