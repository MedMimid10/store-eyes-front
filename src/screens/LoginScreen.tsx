import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GoogleIcon from '../assets/icons8-google.svg';
import Button from '../components/Button';
import Input from '../components/Input';
import { login } from '../service/KeycloakService';
import { Ionicons } from '@expo/vector-icons';
import LogoEyes from '../assets/Logo_Store_Eyes.svg';

interface LoginScreenProps {
    onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            onLogin();
        } catch (e: any) {
            Alert.alert('Login Failed', e.message);
        }
    };

    const handleGoogleAuth = () => {
        // TODO: Implement Google authentication logic
        console.log('Google authentication');
    };

    return (
        <LinearGradient
            colors={['#FFFFFF', '#5DD9F0']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <LogoEyes width={100} height={100} />
                    <Text style={styles.accessText}>Access my account</Text>
                </View>

                <Text style={styles.connectText}>Connect with</Text>
                <Button
                    title="Google"
                    onPress={handleGoogleAuth}
                    style={styles.googleButton}
                    icon={<GoogleIcon width={24} height={24} />}
                />

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.divider} />
                </View>

                <Text style={styles.subtitle}>Please enter your credentials</Text>

                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    icon={<Ionicons name="mail-outline" size={20} color="#2691A3" />}
                    style={styles.input}
                />

                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    icon={<Ionicons name="lock-closed-outline" size={20} color="#2691A3" />}
                    style={styles.input}
                />

                <Button
                    title="Login"
                    onPress={handleLogin}
                    style={styles.button}
                />

                <Text style={styles.link}>
                    Forgot password? <Text style={styles.linkText}>Reset</Text>
                </Text>
                <Text style={styles.link}>
                    Need an account? <Text style={styles.linkText}>Register</Text>
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    accessText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2691A3',
        marginTop: 10,
    },
    connectText: {
        fontSize: 16,
        color: '#2691A3',
        marginBottom: 10,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%',
        maxWidth: 300,
        borderWidth: 1,
        borderColor: '#2691A3',
        backgroundColor: '#2691A344',
        borderRadius: 25,
        paddingVertical: 12,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    orText: {
        marginHorizontal: 10,
        color: '#2691A3',
    },
    subtitle: {
        fontSize: 16,
        color: '#2691A3',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        maxWidth: 340,
        marginVertical: 8,
    },
    button: {
        marginTop: 20,
        width: '100%',
        maxWidth: 340,
        backgroundColor: '#2691A3',
        borderRadius: 25,
        paddingVertical: 14,
    },
    link: {
        marginTop: 16,
        color: '#696969',
        fontSize: 14,
    },
    linkText: {
        color: '#2691A3',
        fontWeight: 'bold',
    },
});
