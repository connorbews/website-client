import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

import "./CreateOctopus.css";

import { uploadPictureStorage } from "../FirebaseStorage/firebaseStorage"

function CreateOctopus(props) {
    const location = useLocation();

    const [octopus, setOctopus] = useState({})
    const [octopusFile, setOctopusFile] = useState({});
    useEffect(() => {
        setOctopus({
            name: location.state.name,
            lifespan: location.state.lifespan,
            mass: location.state.mass,
            phylum: location.state.phylum,
            description: location.state.description,
            order: location.state.order
        })
    }, []);
    
    
    // This function is called whenever an input is changed on the CreateOctopus change
    // It updates octopus which is a JSON object holding all information that should be displayed on the screen.
    function changeOctopus(event) {
        const name = event.target.name;
        const value = event.target.value;
        setOctopus(values => ({...values, [name]: value}));
        console.log(octopus);
    }

    //This is a special function that is called for the file input change on the CreateOctopus page
    function changeOctopusFile(event) {
        const file = event.target.files[0];
        setOctopusFile(file);
    }

    /*
    * Post Request to the backend node/express server
    * Called when the "submit" button is pressed
    */

    function editOctopusValue() {
        fetch('http://localhost:8080/octopus/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: octopus.name,
                lifespan: octopus.lifespan,
                mass: octopus.mass,
                image: octopusFile.name,
                phylum: octopus.phylum,
                description: octopus.description,
                order: octopus.order
            })
        }).then(() => {
            uploadPictureStorage(octopusFile, octopusFile.name).then(() => {
                console.log("done uploadPictureStorage");
            });
            console.log("submit button");
        });
    }

    return (
        <div className='backgroundStyling'>
            <form>
                <div className='labelHeader'>
                    <label>
                        Create a new octopus to add to the list
                    </label>
                </div><br />
                <label className='labelStyling'>
                    Name:
                </label><br />
                <input type="text" name='name' onChange={changeOctopus} className='inputStyling'/><br />
                <label className='labelStyling'>
                    Lifespan:
                </label><br />
                <input type="text" name='lifespan' onChange={changeOctopus} className='inputStyling'/><br />
                <label className='labelStyling'>
                    Mass:
                </label><br />
                <input type="text" name='mass' onChange={changeOctopus} className='inputStyling'/><br />
                <label className='labelStyling'>
                    Image:
                </label><br />
                <input type="file" name='image' onChange={changeOctopusFile} className='inputStyling'/><br />
                <label className='labelStyling'>
                    Phylum:
                </label><br />
                <input type="text" name='phylum' onChange={changeOctopus} className='inputStyling'/><br />
                <label className='labelStyling'>
                    Description:
                </label><br />
                <input type="text" name='description' onChange={changeOctopus} className='inputStyling'/><br />
                <label className='labelStyling'>
                    Order:
                </label><br />
                <input type="text" name='order' onChange={changeOctopus} className='inputStyling'/><br />
            </form>
            <Link to="/" onClick={editOctopusValue}>
                <button>submit</button>
            </Link>
        </div>
    )
}

export default CreateOctopus