import React, { useEffect, useState } from "react";
import { useAuth } from './AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const Delete = () => {
    const { accessToken } = useAuth();
    const { mushroomId } = useParams();
    const navigate = useNavigate();
    const [mushroom, setMushroom] = useState(null);
    const { userEmail } = useAuth();

    useEffect(() => {
        const fetchMushroom = async () => {
            try {
                const response = await fetch(`https://localhost:5001/api/v1/Mushrooms/${mushroomId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMushroom(data);
                } else {
                    // Handle error, e.g., navigate to an error page
                    console.error(`Failed to fetch mushroom with ID ${mushroomId}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMushroom();
    }, [mushroomId, accessToken]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:5001/api/v1/Mushrooms/${mushroomId}?editor=${userEmail}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (response.ok) {
                console.log(`Mushroom with ID ${mushroomId} deleted successfully`);
                // Optionally, you can navigate to another page after successful deletion
                navigate('/search');
            } else {
                // Handle error, e.g., show an error message
                console.error(`Failed to delete mushroom with ID ${mushroomId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Delete Mushroom</h1>
            {mushroom && (
                <>
                    <p>Are you sure you want to delete the mushroom "{mushroom.commonName}"?</p>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button onClick={() => navigate('/search')}>Cancel</Button>
                </>
            )}
        </div>
    );
};