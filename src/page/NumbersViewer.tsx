import React, {FC, useEffect, useState} from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import {Party} from "../_types/Party";
import {LotoNumbers} from "../_types/LotoNumbers";
import LotoNumber from "../component/LotoNumber";
import NewNumber from "../component/numbersViewer/NewNumber";

const NumbersViewer: FC = () => {
    const [party, setParty] = useState<Party>()
    const [tata, setTata] = useState(false)

    const onStorageUpdate = (e: any) => {
        const {key, newValue} = e;
        setParty((localStorage.getItem('party') !== null) ? JSON.parse(newValue) : null);
    };

    useEffect(() => {
        console.log(localStorage.getItem('party'))
        if (localStorage.getItem('party') !== null)
            setParty(JSON.parse(localStorage.getItem('party') ?? ""));
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, []);

    useEffect(() => {
        if (party) {
        if (party.numbers.length > 0) {
            setTata(true)
            setTimeout(() => setTata(false), 5000)
        }
        }
    }, [party?.numbers]);
    return (
        party && party.numbers ?
            <>
                <Box sx={{p: 1, backgroundColor: '#9b44ff'}}>
                    <Typography variant="h2" fontWeight="bold">{party?.title}</Typography>
                </Box>
                {tata &&
                    <NewNumber number={party.numbers.slice(-1)}/>
                }
                <Grid container gap={4} mt={10} justifyContent="center">
                    {LotoNumbers.map((number, index) => (
                        <LotoNumber number={number} check={party?.numbers.includes(number.value)} isLastNumber={party.numbers.slice(-1)[0] === number.value}/>
                    ))}
                </Grid>
            </>
            :
            <Stack sx={{height: '100vh'}} justifyContent="center">
                <Typography variant="h2">ICI sera affiché les numéros sortis !</Typography>
            </Stack>
    )
}
export default NumbersViewer



