import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, FlatList, Image, View, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Home() {
    const navigation = useNavigation();

    function navigateToDetails() {
        navigation.navigate('Details');
    }
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> 0 casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um vídeo para assistir.</Text>

            <FlatList
                data={[1, 2, 3]}
                style={styles.videoList}
                keyExtractor={video => String(video)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.video}>
                        <Text style={styles.videoProperty}>VIDEO:</Text>
                        <Text style={styles.videoDescription}>Video description</Text>

                        <Text style={styles.videoProperty}>CASO:</Text>
                        <Text style={styles.videoDescription}>Video de javaScript</Text>

                        <Text style={styles.videoProperty}>VALOR:</Text>
                        <Text style={styles.videoDescription}>R$ 120,00</Text>

                        <TouchableOpacity
                            style={styles.destailsButton}
                            onPress={navigateToDetails}>
                            <Text style={styles.destailsButtonText}>Ver Video</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
