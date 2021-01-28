import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 16,
        marginBottom: 16,
    },
}));

const JsonInput = (props) => {
    const classes = useStyles();

    const { label, handleSelect, inputRef } = props;

    return (
        <div className={classes.root}>
            <label htmlFor="input-file">
                <Typography>
                    {label}
                </Typography>
            </label>
            <input 
                ref={inputRef}
                id="input-file" 
                className={classes.input} 
                accept="application/json"
                type="file" 
                onChange={handleSelect}
            />
        </div>   
    );
}

export default JsonInput;