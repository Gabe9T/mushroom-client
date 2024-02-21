import '../App.css';
import React from "react";
import { useState } from "react";
import { FormControl, Button } from '@mui/material';
import { useAuth } from './AuthContext';

export const Create = () => {
    const { accessToken, setToken } = useAuth();
    const [commonName, setCommonName] = useState("");
    const [genus, setGenus] = useState("");
    const [species, setSpecies] = useState("");
    const [gillType, setGillType] = useState("");
    const [toxicity, setToxicity] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [notes, setNotes] = useState("");
    const [editor, setEditor] = useState("");

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

    const handleImageURLChange = (event) => {
        setImageURL(event.target.value);
    };

    const handleToxicityChange = (event) => {
        setToxicity(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleEditorChange = (event) => {
        setEditor(event.target.value);
    };

    const makeApiPostRequest = async () => {
        console.log(accessToken);
        try {
            const response = await fetch('https://localhost:5001/api/v1/Mushrooms', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    commonName: commonName,
                    genus: genus,
                    species: species,
                    gillType: gillType,
                    imageURL: imageURL,
                    toxicityLevel: toxicity,
                    notes: notes,
                    editor: editor
                }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1>This is the create page</h1>
            <FormControl id="createForm" >
                <input type='text' placeholder='Common Name' value={commonName} onChange={handleCommonNameChange} />
                <input type='text' placeholder='Genus' value={genus} onChange={handleGenusChange} />
                <input type='text' placeholder='Species' value={species} onChange={handleSpeciesChange} />
                <input type='text' placeholder='Gill Type' value={gillType} onChange={handleGillTypeChange} />
                <input type='text' placeholder='Image URL' value={imageURL} onChange={handleImageURLChange} />
                <input type='number' placeholder='Toxicity Level' value={toxicity} onChange={handleToxicityChange} />
                <input type='text' placeholder='Notes' value={notes} onChange={handleNotesChange} />
                <input type='text' placeholder='Editor' value={editor} onChange={handleEditorChange} />
                <Button id="createButton" className="button" type='submit' onClick={makeApiPostRequest}>Add Entry</Button>
            </FormControl>
        </>
    )
}