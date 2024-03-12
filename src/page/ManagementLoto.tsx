import React, {FC, useEffect, useState, useTransition} from 'react';
import {Button, Divider, Grid, Stack, Tooltip} from "@mui/material";
import {Party} from "../_types/Party";
import GetParty from "../request/GetParty";
import {partyObserver} from "../App";
import {db} from "../db";
import Get from "../request/Get";
import Update from "../request/Update";
import AddParty from "../forms/AddParty";
import {LotoNumbers} from "../_types/LotoNumbers";
import LotoNumber from "../component/LotoNumber";

const ManagementLoto: FC = () => {
    const [party, setParty] = useState<Party | false>();
    const [loading, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            GetParty().then((party: Party) => {
                partyObserver.next(party)
                setParty(party)
            })
        })
    }, []);

    useEffect(() => {
        const observer = partyObserver.subscribe((e) => setParty(e))
        return () => {
            observer.unsubscribe()
        };
    }, []);

    const add = (number: string) => {
        //if (number === "90")
        //  confetti(true)
        setTimeout(() => {
            //     confetti(false)
        }, 3000)
        Get('party', 1).then(async party => {
            await Update('party', 1, {numbers: [...party.numbers, number]})
            GetParty().then((party: Party) => {
                // setContest(contest)
                localStorage.setItem("party", JSON.stringify(party));
                partyObserver.next(party)
            })
        })
    }

    const rollback = async () => {
        if (party && "numbers" in party) {
            party.numbers.pop()
            await Update('party', 1, {numbers: [...party.numbers]})
            GetParty().then((party: Party) => {
                // setContest(contest)
                localStorage.setItem("party", JSON.stringify(party));
                partyObserver.next(party)
            })
        }
    }
    const reset = () => {
        localStorage.setItem('party', 'undefined')
        localStorage.clear()
        db.delete()
        db.open()
        partyObserver.next(false)
    }

    // enlever les pub si don --> IP + adresse mail + code
    const newWindow = () => window.open(process.env.REACT_APP_BASE_URL + "/numbers");
    console.log('observable managementLoto', party)

    return (
        !localStorage.getItem('party') ?
            <>
                <AddParty/>
                <Button variant="contained" onClick={reset}>reset</Button>
            </>
            :
            party ?
                <>
                    <Stack direction="row" spacing={2} padding={2} justifyContent="space-between">
                        <>
                            <Stack spacing={2} justifyContent="center">
                                <Tooltip
                                    title="Déplacer l'onglet nouvellement créé vers l'écran projeté, celui-ci sera automatiquement mis à jour en temps reél"
                                    arrow placement="right">
                                    <Button sx={ButtonStyle} onClick={newWindow} variant="contained">Ouvrir l'affichage pour le
                                        public</Button>
                                </Tooltip>
                                <Button sx={ButtonStyle} onClick={rollback} variant="contained">Retirer le dernier numéro</Button>
                            </Stack>
                            <Stack spacing={2} justifyContent="center">
                                <Tooltip title="Pas encore disponible" arrow placement="left">
                                <Button sx={ButtonStyle} variant="contained">Tutoriel</Button>
                                </Tooltip>
                                <Tooltip title="Mettre fin à la partie" arrow placement="left">
                                    <Button sx={ButtonStyle} variant="contained" onClick={reset}>Quitter</Button>
                                </Tooltip>
                                {/*//TODO lien vers tutotou*/}
                            </Stack>
                        </>
                    </Stack>
                    <Divider
                        sx={{borderImage: 'linear-gradient(210deg, #4a9ad5, #ffffff, #C32533, #ffffff, #4a9ad5)1'}}/>
                    <Grid container gap={3} mt={6} justifyContent="center">
                        {LotoNumbers.map((number, index) => (
                            <LotoNumber number={number} check={party.numbers.includes(number.value)} addNumber={add}
                                        management/>
                        ))}
                    </Grid>
                </>
                :
                <img className="logo" width={500} src="/loto.jpg" alt="logo"/>
    )
}

export default ManagementLoto;

const ButtonStyle = {
    backgroundColor: "#4A9AD5",
}