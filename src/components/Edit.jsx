import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from './AuthContext';

export const Edit = () => {
    const { accessToken, setToken } = useAuth();
    const { userEmail } = useAuth();
    const { mushroomId } = useParams();
    const [mushroomDetails, setMushroomDetails] = useState({
        commonName: "",
        genus: "",
        species: "",
        gillType: "",
        imageURL: "",
        toxicityLevel: 0,
        notes: "",
        editor: "",
    });

    useEffect(() => {
        // Fetch mushroom details using mushroomId
        const fetchMushroomDetails = async () => {
            try {
                const response = await fetch(
                    `https://localhost:5001/api/v1/Mushrooms/${mushroomId}`,
                    {
                        method: "GET",
                        headers: {
                            'Accept': "*/*",
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setMushroomDetails((prevDetails) => ({
                        commonName: data.commonName || "",
                        genus: data.genus || "",
                        species: data.species || "",
                        gillType: data.gillType || "",
                        imageURL: data.imageURL || "",
                        toxicityLevel: data.toxicityLevel || 0,
                        notes: data.notes || "",
                        editor: data.editor || "",
                    }));
                } else {
                    console.error("Failed to fetch mushroom details. Status:", response.status);
                }
            } catch (error) {
                console.error("An error occurred while fetching mushroom details:", error);
            }
        };

        fetchMushroomDetails();
    }, [mushroomId, accessToken]);

    // Handle form changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMushroomDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Log the body before sending the request
        console.log("Request Body:", JSON.stringify({
            commonName: mushroomDetails.commonName,
            genus: mushroomDetails.genus,
            species: mushroomDetails.species,
            gillType: mushroomDetails.gillType,
            imageURL: mushroomDetails.imageURL,
            toxicityLevel: mushroomDetails.toxicityLevel,
            notes: mushroomDetails.notes,
            editor: mushroomDetails.editor,
            mushroomId: mushroomId
        }));

        // Perform PUT request to update mushroom details
        try {
            const response = await fetch(
                `https://localhost:5001/api/v1/Mushrooms/${mushroomId}?editor=${userEmail}`,
                {
                    method: "PUT",
                    headers: {
                        'Accept': "*/*",
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        commonName: mushroomDetails.commonName,
                        genus: mushroomDetails.genus,
                        species: mushroomDetails.species,
                        gillType: mushroomDetails.gillType,
                        imageURL: mushroomDetails.imageURL,
                        toxicityLevel: mushroomDetails.toxicityLevel,
                        notes: mushroomDetails.notes,
                        editor: mushroomDetails.editor,
                        mushroomId: mushroomId
                    }),
                }
            );

            if (response.status === 204) {
                console.log("Mushroom details updated successfully");
            } else {
                console.error("Failed to update mushroom details. Status:", response.status);
            }

            if (!response.ok) {
                console.error("Failed to update mushroom details. Status:", response.status);
                return;
            }

            const updatedData = await response.json();
            console.log("Mushroom details updated:", updatedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1>Edit Mushroom</h1>
            <form onSubmit={handleSubmit}>
                {/* Your form inputs here, for example: */}
                <label>
                    Common Name:
                    <input
                        type="text"
                        name="commonName"
                        value={mushroomDetails.commonName}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Genus:
                    <input
                        type="text"
                        name="genus"
                        value={mushroomDetails.genus}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Species:
                    <input
                        type="text"
                        name="species"
                        value={mushroomDetails.species}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Gill Type:
                    <input
                        type="text"
                        name="gillType"
                        value={mushroomDetails.gillType}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="imageURL"
                        value={mushroomDetails.imageURL}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Toxicity Level:
                    <input
                        type="number"
                        name="toxicityLevel"
                        value={mushroomDetails.toxicityLevel}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Notes:
                    <input
                        type="text"
                        name="notes"
                        value={mushroomDetails.notes}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
};