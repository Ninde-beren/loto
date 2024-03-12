import React from 'react';
import './App.css';
import {Box} from "@mui/material";
import Router from "./Router";
import {BrowserRouter} from "react-router-dom";
import {BehaviorSubject} from "rxjs";

export const partyObserver: BehaviorSubject<any> = new BehaviorSubject(false);
function App() {
    //TODO faire le design
    // Voir pour mettre un bouton don
    // ajouter de la pub et Analytics
    // trouver un nom de domaines
    // pouvoir changer les couleurs
    // pouvoir mettre son propre logo
    // enlever les pub si don --> IP + adresse mail + code

    return (
        <div className="App">
            <Box sx={{
                minHeight:'100vh',
                background: 'linear-gradient(45deg, rgba(7,146,249,1) 0%, rgba(155,79,156,1) 100%)',
                color: "white"
            }}>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </Box>
        </div>
    );
}

export default App;
