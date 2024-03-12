import React, {FC} from 'react';
import {Paper, Typography} from "@mui/material";

const NewNumber:FC<{number: any}> = ({number}) => {

    const NewNumber = {
        position: "absolute",
        marginTop:"2.5%",
        marginLeft:"10%",
        width:"80%",
        height:"80%",
        color: "#4A9AD5",
    }

    return (
        <Paper sx={NewNumber}>
            <Typography sx={{fontSize:500}}>{number}</Typography>
        </Paper>
    );
};

export default NewNumber;
