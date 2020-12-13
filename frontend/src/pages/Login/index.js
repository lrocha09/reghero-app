import React, { useState } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';


import regimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';

export default function Login(){
    const [id, setId] = useState();
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('contractorId', id);
            localStorage.setItem('contractorName', response.data.name);

            history.push('/profile');
        } catch(err) {
            alert('Falha no login, tente novamente.');

        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoimg} alt="logoimg"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Seu ID" 
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />


                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Fazer um cadastro
                    </Link>

                </form>
            </section>

            <img src={regimg} alt="RegHeroimg"/>
        </div>
    );  
}