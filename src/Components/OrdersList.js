import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './OrdersList.css';
import Octopus from './Octopus';

function OrdersList() {
    const [octopusDisplay, setOctopusDisplay] = useState([]);
    
    useEffect(() => {
        fetch("/octopus")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setOctopusDisplay(data)
        })
    }, [])
    

    const octopusElements = octopusDisplay.map((octopus) => {
        return (
            <Octopus
                key={octopus.name}
                name={octopus.name}
                lifespan={octopus.lifespan}
                mass={octopus.mass}
                image={octopus.image}
                phylum={octopus.phylum}
                description={octopus.description}
                order={octopus.order}
            />
        )
    })

    return (
        <div>
            <div>
                <div>
                    <Link to="/createoctopus" state={{name: "", lifespan: "", mass: "", phylum: "", description: "", order: ""}}>
                        <button className='addButton'>
                            <p>hello paragraph</p>
                        </button>
                    </Link>
                </div>
                <div className='octopusArray'>
                    {octopusElements}
                </div>
            </div>
        </div>
    )
}

export default OrdersList