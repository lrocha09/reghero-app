import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoimg from '../../assets/logo.svg';

export default function NewEvent(){
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [local, setLocal] = useState('');
    const [value, setValue] = useState('');

    const contractorId = localStorage.getItem('contractorId');

    const history = useHistory();

    async function handleNewEvent(e){
        e.preventDefault();

        const data = {
            title, 
            date, 
            description, 
            local,  
            value,
        };

        try {
            await api.post('events', data, {
                headers: {
                    Authorization: contractorId,
                }
            });

            history.push('/profile');
            
        } catch (err) {
            alert('Erro ao adicionar o evento, tente novamente.');
        }
    }


    return(
        <div className="new-event-container">
            <div className="content">  
                <section className="form">
                    <img src={logoimg} alt="logoimg2"/>

                    <h1>Adicionar um novo evento</h1>
                    <p>Descreva o evento detalhadamente para</p> 
                    <p>salvar o rolê da galera.</p>
                
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />Voltar
                    </Link>
                </section>

                <form onSubmit={handleNewEvent}>
                    
                    <input 
                    placeholder="Titulo" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />

                    <input 
                    type="date"  
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    />

                    <textarea 
                    placeholder="Descrição do evento" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                    placeholder="Local" 
                    value={local}
                    onChange={e => setLocal(e.target.value)}
                    />

                    <input 
                    placeholder="Valor"
                    value={value}
                    onChange={e => setValue(e.target.value)} 
                    />
                    
        
                    <button className="button" type="submit">Adicionar</button>
                
                

                    
                
                
                </form>
            </div> 
        </div>
    );  
}