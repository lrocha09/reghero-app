import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const event = route.params.event;

    function navigateBack() {
        navigation.goBack();
    }

     
    return (
        <View  style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

        
            <View style={styles.events}>
                    <Text style={styles.eventsProperty2}>Contratante:</Text>
                    <Text style={styles.eventsValue}>{event.name}</Text>

                    <Text style={styles.eventsProperty}>Nome:</Text>
                    <Text style={styles.eventsValue}>{event.title}</Text>

                    <Text style={styles.eventsProperty}>Local:</Text>
                    <Text style={styles.eventsValue}>{event.local} - {event.city}/{event.uf}</Text>

                    <Text style={styles.eventsProperty}>Data:</Text>
                    <Text style={styles.eventsValue}>{event.date}</Text>

                    <Text style={styles.eventsProperty}>Descrição:</Text>
                    <Text style={styles.eventsValue}>{event.description}</Text>

                    <Text style={styles.eventsProperty}>Valor:</Text>
                    <Text style={styles.eventsValue}>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency', 
                            currency: 'BRL' 
                        }).format(event.value)}
                    </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Nem todo herói usa capa. </Text>
                <Text style={styles.heroTitle}>Salve o rolê!</Text>
                

                <Text style={styles.heroDescription}>Entre em contato: </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>

            </ScrollView>

        </View>
    );
}