import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';
import api from '../../services/apis';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        const data = { id }
        try {
            const response = await api.post('sessions', data);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            alert(`Bem vindo: ${response.data.name}`);
            history.push('profile');
        } catch (err) {
            alert('Erro no login tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"></img>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"></img>
        </div>
    );
}