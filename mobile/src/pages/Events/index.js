import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(event) {
        navigation.navigate('Detail', {event});
    }

    async function loadEvents() {
        if (loading) {
            return;
        }

        if (total > 0 && events.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('events', { 
            params: { page }
        });

        setEvents([ ...events, ...response.data]);
        setTotal(response.headers['x-total-count']);
        
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <View  style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} eventos. </Text> 
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text> 
            <Text style={styles.description}>Escolha qual evento salvará o seu final de semana.</Text>

            <FlatList 
                data={events}
                style={styles.eventsList}
                keyExtractor={events => String(events.id)}
                showsVerticalScrollIndicator={false}

                onEndReached={loadEvents}
                onEndReachedThreshold={0.2}
                
                renderItem={({ item: event }) => (
                    <View style={styles.events}>
                        <Text style={styles.eventsProperty}>Contratante:</Text>
                        <Text style={styles.eventsValue}>{event.name}</Text>

                        <Text style={styles.eventsProperty}>Nome:</Text>
                        <Text style={styles.eventsValue}>{event.title}</Text>

                        <Text style={styles.eventsProperty}>Local:</Text>
                        <Text style={styles.eventsValue}>{event.local}</Text>

                        <Text style={styles.eventsProperty}>Data:</Text>
                        <Text style={styles.eventsValue}>{event.date}</Text>
                        
                        <Text style={styles.eventsProperty}>Valor:</Text>
                        <Text style={styles.eventsValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL' 
                            }).format(event.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(event)}
                            >
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>

                </View>
                )}
            />

    


        </View>
    );
}