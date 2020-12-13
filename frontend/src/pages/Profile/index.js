import React, { useEffect, useState } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoimg from '../../assets/logo.svg';

export default function Profile() {
    const [events, setEvents] = useState([]);

    const contractorId= localStorage.getItem('contractorId');
    const contractorName = localStorage.getItem('contractorName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: contractorId,
            }
        }).then(response => {
            setEvents(response.data);
        })
    }, [contractorId]);

    async function handleDeleteEvent(id) {
        try {
            await api.delete(`events/${id}`, {
                headers: {
                    Authorization: contractorId,
                }
            });

            setEvents(events.filter(event => event.id != id));
        } catch(err) {
            alert('Erro ao deletar evento, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="logoimg"/>
                <span>Bem Vindo, {contractorName} </span> 

                <Link className="button" to="/events/new">Adicionar novo evento</Link>           
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Meus Eventos</h1>

            <ul>
                {events.map(event => (
                
                    <li key={ event.id }>
                        <strong>Nome:</strong>
                        <p> {event.title} </p>
                        
                        <strong>Data:</strong>
                        <p> {event.date} </p>

                        <strong>Descrição:</strong>
                        <p> {event.description} </p>

                        <strong>Local:</strong>
                        <p> {event.local} </p>

                        <strong>Valor:</strong>
                        <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(event.value)} </p>

                        <button onClick={() => handleDeleteEvent(event.id)} type="button" >
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>

                ))}
            </ul>

             
        </div>
    );
}