import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, FlatList, Image, View, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import api from '../../services/api';

export default function Home() {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    const navigation = useNavigation();

    function navigateToDetails(video) {
        navigation.navigate('Details', { video });
    }

    async function loadVideos() {
        if (isLoading) {
            return;
        }
        if (isFinish) {
            return;
        }
        setLoading(true);
        const response = await api.get(`users/15/videos/${currentPage}/5`);

        setVideos([...videos, ...response.data.videos]);

        setCurrentPage(response.data.currentPage);

        setLoading(false);

        if (response.data.videos == '' || response.data.videos == null) {
            setIsFinish(true);
            console.log('finalizou a busca')
        }
    }

    useEffect(() => {
        loadVideos();
    }, []);

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
                data={videos}
                style={styles.videoList}
                keyExtractor={video => String(video.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadVideos}
                onEndReachedThreshold={0.2}
                renderItem={({ item: video }) => (
                    <View style={styles.video}>
                        <Text style={styles.videoProperty}>VIDEO:</Text>
                        <Text style={styles.videoDescription}>{video.name}</Text>

                        <Text style={styles.videoProperty}>DESCRIÇÃO:</Text>
                        <Text style={styles.videoDescription}>{video.description}</Text>

                        <Text style={styles.videoProperty}>URL:</Text>
                        <Text style={styles.videoDescription}>{video.url}</Text>

                        <TouchableOpacity
                            style={styles.destailsButton}
                            onPress={() => navigateToDetails(video)}>
                            <Text style={styles.destailsButtonText}>Ver Video</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
