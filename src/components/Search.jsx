import React from "react";
import { useState } from "react";
import { FormControl, Input, Button } from '@mui/material';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { DataArray } from "@mui/icons-material";

export const Search = () => {
    const { accessToken, setToken } = useAuth();
    const [commonName, setCommonName] = useState("");
    const [genus, setGenus] = useState("");
    const [species, setSpecies] = useState("");
    const [gillType, setGillType] = useState("");
    const [toxicity, setToxicity] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleEditClick = (mushroomId) => {
        navigate('/edit');
        console.log(`Editing mushroom with ID: ${mushroomId}`);
    };

    const handleDeleteClick = (mushroomId) => {
        navigate(`/delete/${mushroomId}`);
        console.log(`Deleting mushroom with ID: ${mushroomId}`);
    };

    const handleCreateClick = () => {
        navigate('/create');
        console.log(`Create button clicked`);
    };

    const handleCommonNameChange = (event) => {
        setCommonName(event.target.value);
    };

    const handleGenusChange = (event) => {
        setGenus(event.target.value);
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleGillTypeChange = (event) => {
        setGillType(event.target.value);
    };

    const handleToxicityChange = (event) => {
        setToxicity(event.target.value);
    };

    const makeRandomApiRequest = async () => {
        try {
            const response = await fetch(`https://localhost:5001/Random`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            const data = await response.json();
            const dataArray = [data];
            setSearchResults(dataArray);
        } catch (error) {
            console.error(error);
        }
    };

    const makeApiGetRequest = async () => {
        console.log(accessToken);
        try {
            const queryParams = new URLSearchParams();

            if (commonName) {
                queryParams.append('commonName', commonName);
            }

            if (genus) {
                queryParams.append('genus', genus);
            }

            if (species) {
                queryParams.append('species', species);
            }

            if (gillType) {
                queryParams.append('gillType', gillType);
            }

            if (toxicity) {
                queryParams.append('toxicityLevel', toxicity);
            }

            const queryString = queryParams.toString();

            const apiUrl = queryString
                ? `https://localhost:5001/api/v1/Mushrooms?${queryString}`
                : 'https://localhost:5001/api/v1/Mushrooms';

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            const data = await response.json();
            setSearchResults(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <h1>This is the search page</h1>
            <FormControl id="searchForm" >  {/* onSubmit={handleSubmit} */}
                <input type='text' placeholder='Common Name' value={commonName} onChange={handleCommonNameChange} />
                <input type='text' placeholder='Genus' value={genus} onChange={handleGenusChange} />
                <input type='text' placeholder='Species' value={species} onChange={handleSpeciesChange} />
                <input type='text' placeholder='Gill Type' value={gillType} onChange={handleGillTypeChange} />
                <input type='number' placeholder='Toxicity Level' value={toxicity} onChange={handleToxicityChange} />
                <Button id="searchButton" className="button" type='submit' onClick={makeApiGetRequest}>Search</Button>
            </FormControl>

            <div>
                {/* Display search results */}
                {searchResults.map((mushroom) => (
                    <div key={mushroom.mushroomId}>
                        <h3>{mushroom.commonName}</h3>
                        <img className="cardImage" src={mushroom.imageURL} alt="mushroom" />
                        <p><em>{mushroom.genus} {mushroom.species}</em></p>
                        <p>Notes: {mushroom.notes}</p>
                        <p>Gill Type: {mushroom.gillType}</p>
                        <p>Toxcity:  {mushroom.toxicityLevel}</p>
                        <Button className="button" onClick={() => handleEditClick(mushroom.mushroomId)}>Edit</Button>
                        <Button className="button" onClick={() => handleDeleteClick(mushroom.mushroomId)}>Delete</Button>
                    </div>
                ))}
            </div>
            <Button className="button" onClick={() => makeRandomApiRequest()}>Shroom Me!</Button>
            <Button className="button" onClick={() => handleCreateClick()}>Add a New Entry</Button>
        </>
    )
}