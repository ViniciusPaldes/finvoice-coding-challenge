import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = (props) => {
    const { title } = props;
    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography>
                        {title}
                    </Typography>
                </Toolbar>   
            </AppBar>
        </React.Fragment>
    )
}

export default Header;
