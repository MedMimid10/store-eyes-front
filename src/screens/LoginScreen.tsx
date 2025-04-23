import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import Input from '../components/Input';
import { login } from '../service/KeycloakService';
import { Ionicons } from '@expo/vector-icons';
import LogoEyes from '../assets/Logo_Store_Eyes.svg';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            onLogin();
        } catch (e: any) {
            Alert.alert('Échec de la connexion', e.message);
        }
    };

    return (
        <LinearGradient
            colors={['#FFFFFF', '#5DD9F0']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <LogoEyes width={100} height={100} style={styles.logo} />
                <Text style={styles.title}>Connexion</Text>

                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    icon={<Ionicons name="mail-outline" size={20} color="#2691A3" />}
                    style={styles.input}
                />

                <Input
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    icon={<Ionicons name="lock-closed-outline" size={20} color="#2691A3" />}
                    style={styles.input}
                />

                <Button
                    title="Se connecter"
                    onPress={handleLogin}
                    style={styles.button}
                />

                <Text style={styles.link}>
                    Mot de passe oublié ? <Text style={styles.linkText}>Réinitialiser</Text>
                </Text>
                <Text style={styles.link}>
                    Pas de compte ? <Text style={styles.linkText}>Créer un compte</Text>
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
    logo: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2691A3',
        marginBottom: 30,
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
