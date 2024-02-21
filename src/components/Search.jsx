import React from "react";
import { useState } from "react";
import { FormControl, Input, Button } from '@mui/material';

export const Search = () => {
    const [accessToken, setAccessToken] = useState("");
    const [commonName, setCommonName] = useState("");
    const [genus, setGenus] = useState("");
    const [species, setSpecies] = useState("");
    const [gillType, setGillType] = useState("");
    const [toxicity, setToxicity] = useState("");

    return (
        <>
            <h1>This is the search page</h1>
            <FormControl id="searchForm" >  {/* onSubmit={handleSubmit} */}
                <Input type='text' placeholder='Common Name' />
                <Input type='text' placeholder='Genus' />
                <Input type='text' placeholder='Species' />
                <Input type='text' placeholder='Gill Type' />
                <Input type='number' placeholder='Toxicity Level' />
                <Button id="searchButton" className="button" type='submit'>Search</Button>
            </FormControl>
        </>
    )
}