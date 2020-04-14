import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();
    const video = route.params.video;

    const message = 'Olá APAD, estou entrando em contato pois gostaria de ajudar no caso da cadelinha atropelado no valor de R$ 120,00'

    function navigateBack() {
        navigation.goBack();
    }
    function sendMail() {
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cadelinha atropelada',
            recipients: ['aldemir.gomes2017@gmail.com'],
            body: message,
        })
    }
    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=558195947371&text=${message}`);
    }
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.video}>
                <Text style={[styles.videoProperty, { marginTop: 0 }]}>VIDEO:</Text>
                <Text style={styles.videoDescription}>{video.name}</Text>

                <Text style={styles.videoProperty}>CASO:</Text>
                <Text style={styles.videoDescription}>{video.description}</Text>

                <Text style={styles.videoProperty}>VALOR:</Text>
                <Text style={styles.videoDescription}>R$ 120,00</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
