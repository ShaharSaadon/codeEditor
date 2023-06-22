import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    height: '10vh'
};

const titleStyle = {
    color: '#0a1929'
};

export function AppHeader({ title }) {
    return (
        <Box className='app-header full'>
            <AppBar position="static" style={{ backgroundColor: 'white' }}>
                <Toolbar style={toolbarStyle}>
                    <Link to={'/'}>
                        <img src={logo} alt="Code Block Logo" className='logo' />
                    </Link>
                    <Typography variant="h4" className="title" component="div" style={titleStyle}>
                        {title}
                    </Typography>
                    <Link to={'/'}>
                        <img src={logo} alt="Code Block Logo" className='logo' />
                    </Link>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired,
};