import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export function AppHeader({ title }) {
    return (
        <Box className='app-header full'>
            <AppBar position="static" style={{ backgroundColor: 'white' }} >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', height: '10vh' }}>
                    <Link to={'/'}>
                        <img src={logo} alt="Code Block Logo" className='logo' />
                    </Link>
                    <Typography variant="h4" className="title" component="div" style={{ color: '#0a1929' }}>
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