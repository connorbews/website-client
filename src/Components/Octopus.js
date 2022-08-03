import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Octopus.css";

import { getUrlFromConsole } from "../FirebaseStorage/firebaseStorage"


function Octopus(props) {
    const [viewButtons, setViewButtons] = useState(false);
    const [urlState, setUrlState] = useState();
    
    getUrlFromConsole(props.image).then((url) => {
        setUrlState(url)
    })

    function setButtonsFalse() {
        setViewButtons(false);
    }

    function setButtonsTrue() {
        setViewButtons(true);
    }

    function deleteLog() {
        fetch('http://localhost:8080/octopus/', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: props.name,
                lifespan: props.lifespan,
                mass: props.mass,
                image: urlState,
                phylum: props.phylum,
                description: props.description,
                order: props.order
            })
        }).then(() => {
            console.log("delete button");
        })
    }

    function printHello() {
        console.log("hello button");
    }

    return (
        <div className='octopusOrganization'>
            <div className='octopusMargin'>
                <Link to="/createoctopus" style={{textDecoration: 'none'}} state={{name: props.name, lifespan: props.lifespan, mass: props.mass, phylum: props.phylum, description: props.description, order: props.order}}>
                    <div onClick={printHello} onMouseEnter={setButtonsTrue} onMouseLeave={setButtonsFalse} className='octopusTab'>
                        <h2>Name: {props.name}</h2>
                        <h4>Lifespan: {props.lifespan}</h4>
                        <h4>Mass: {props.mass}</h4>
                        <img src={urlState} alt='Logo' className="octopusImages"/>
                        <h4>Phylum: {props.phylum}</h4>
                        <p className='description'>Description: {props.description}</p>
                        <div className='organizeButtons'>
                            <h4 className='orderBox'>Order: {props.order}</h4>
                            {viewButtons && <button onClick={deleteLog} className='editButton'>Delete</button>}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
    
}

export default Octopus