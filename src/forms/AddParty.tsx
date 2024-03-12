import React, {useState} from 'react';
import Add from "../request/Add";
import Update from "../request/Update";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import GetParty from "../request/GetParty";
import {Party} from "../_types/Party";
import {partyObserver} from "../App";

const AddParty = () => {
    const [title, setTitle] = useState("");
    const add = () => {
        Add('party', {title: title, numbers:[]}).then(async party => {

            const params = await Add('params', {viewType: 'outPutNumber'})
            console.log(party, params)
            const partyParam = await Update('party', party.id, {params: params.id})

            GetParty().then((party: Party) => {
                localStorage.setItem("party", JSON.stringify(party));
                partyObserver.next(party)
            })
        })
    }

    return (
            <Container>
                <Stack height="100vh" alignItems="center" justifyContent="center" spacing={2}>
                    <Typography variant="h2" padding={1}>Quel est le titre de partie ? </Typography>
                    <Paper>
                        <TextField
                            type="text"
                            value={title}

                            onChange={ev => setTitle(ev.target.value)}
                        />
                    </Paper>
                    <Paper sx={{
                        padding: 1
                    }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={title}
                                name="radio-buttons-group"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            >
                                <FormControlLabel value="Une ligne" control={<Radio sx={ButtonColors}/>} label="Une ligne"/>
                                <FormControlLabel value="Deux lignes" control={<Radio sx={ButtonColors}/>} label=" Deux lignes"/>
                                <FormControlLabel value="Carton plein" control={<Radio sx={ButtonColors}/>} label="Carton plein"/>
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                    <Box width={450}>
                    <Button sx={{mt:2,p: 1, bgcolor:"#4A9AD5"}} variant="contained" fullWidth onClick={add}>
                        BinGo !
                    </Button>
                    </Box>
                </Stack>
            </Container>
    );
};

const ButtonColors = {
    color: "#4A9AD5",
    '&.Mui-checked': {
        color: "#C32533",
    }
}
export default AddParty;
