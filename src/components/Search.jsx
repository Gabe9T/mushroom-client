import React from "react";
import { useState } from "react";
import { FormControl, Input, Button } from '@mui/material';
import { useAuth } from './AuthContext';

export const Search = () => {
    const { accessToken, setToken } = useAuth();
    const [commonName, setCommonName] = useState("");
    const [genus, setGenus] = useState("");
    const [species, setSpecies] = useState("");
    const [gillType, setGillType] = useState("");
    const [toxicity, setToxicity] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
                <Input type='text' placeholder='Common Name' value={commonName} onChange={handleCommonNameChange} />
                <Input type='text' placeholder='Genus' value={genus} onChange={handleGenusChange} />
                <Input type='text' placeholder='Species' value={species} onChange={handleSpeciesChange} />
                <Input type='text' placeholder='Gill Type' value={gillType} onChange={handleGillTypeChange} />
                <Input type='number' placeholder='Toxicity Level' value={toxicity} onChange={handleToxicityChange} />
                <Button id="searchButton" className="button" type='submit' onClick={makeApiGetRequest}>Search</Button>
            </FormControl>

            <div>
                {/* Display search results */}
                {searchResults.map((mushroom) => (
                    <div key={mushroom.mushroomId}>
                        <h3>{mushroom.commonName}</h3>
                        <img className="cardImage" src={mushroom.imageURL} alt="mushroom" />
                        <p>Genus: {mushroom.genus}</p>
                        <p>Species: {mushroom.species}</p>
                        <p>Notes: {mushroom.notes}</p>
                        <p>Gill Type: {mushroom.gillType}</p>
                        <p>Toxcity:  {mushroom.toxicityLevel}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </>
    )
}