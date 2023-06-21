import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/images/logo.png'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export function AppHeader({ title }) {
    return (
        <Box sx={{ flexGrow: 1 }} className='app-header full'>
            <AppBar position="static" style={{ backgroundColor: 'white' }} >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', height: '10vh' }}>
                    <img src={logo} alt="" className='logo' />
                    <Typography variant="h3" component="div" style={{ color: '#0a1929' }}>
                        {title}
                    </Typography>
                    <img src={logo} alt="" className='logo' />

                </Toolbar>
            </AppBar>
        </Box >
    );
}
