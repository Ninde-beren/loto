import React, {FC} from 'react';
import {Grid, Paper, Tooltip, Typography} from "@mui/material";

const LotoNumber: FC<{ number: any, check: boolean, management?: boolean, addNumber?: any, isLastNumber?: boolean }>
    = ({number, check, management, addNumber, isLastNumber}) => {

    const NumberChecked = {
        color: "#4A9AD5",
        backgroundColor: (isLastNumber) ? "#a8fb91" : "#ffffff",
    }

    const NumberUnChecked = {
        color: (management) ? "#d82626" : "#7d7a7a",
        backgroundColor: (management) ? "#b0adad" : "#7d7a7a",
        cursor:(management)? "pointer": "point",
    }
    return (
        <Grid item xs={1}>
            {management ?
                <Tooltip title={number.name}>
                    <Paper sx={(check) ? NumberChecked : NumberUnChecked} onClick={() => addNumber(number.value)} elevation={(check)?24:0}>
                        <Typography variant='h3'>{number.value}</Typography>
                    </Paper>
                </Tooltip>
                :
                <Paper sx={(check) ? NumberChecked : NumberUnChecked} elevation={(check) ? 24 : 0}>
                    <Typography variant='h3'>{number.value}</Typography>
                </Paper>
            }
        </Grid>
    );
};

export default LotoNumber;
