import { Button } from '@material-ui/core';
import React from 'react';

const Result = (props) => {
    const { similarity, handleReset } = props;

    if (similarity) {
        return (
            <div>
                <h1>Similarity is: {similarity}</h1>
                <Button
                    color="primary"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
        )
    } else {
        return null;
    }
    
}

export default Result;
