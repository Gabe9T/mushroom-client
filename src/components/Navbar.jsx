import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export const Navbar = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleNavigation = (index) => {
        setValue(index);

        switch (index) {

            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/login');
                break;
            case 2:
                navigate('/search');
                break;
            default:
                break;
        }
    };

    return (
        <Box sx={{ width: 200 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    handleNavigation(newValue);
                }}
            >
                <BottomNavigationAction icon={<HomeIcon />} />
                <BottomNavigationAction icon={<LoginIcon />} />
                <BottomNavigationAction icon={<SearchIcon />} />
            </BottomNavigation>
        </Box>
    );
};