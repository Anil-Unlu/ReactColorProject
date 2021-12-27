import React, {useEffect, useState} from 'react';

function Component() {
    const [error,setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [clickedIndex, setClickedIndex] = useState([]);

    const toggle = (index) => () => {

        setClickedIndex(state => ({
            ...state,
            [index] : !state[index]
        }))
    }


    useEffect(() => {
        fetch("https://reqres.in/api/products")
        .then(res=>res.json())
        .then(  
            (result) => {
                setIsLoaded(true);
                setData(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if(error) {
        return <div>Error: {error.message}</div>
    }else if(!isLoaded){
        return <div>Loading...</div>
    }else{
        return(
            <ul>
                {data.map(a => (
                    <li onClick={toggle(a.id)} style={{ display: "flex",justifyContent: "center",alignItems: "center",color: "white",fontSize: "2em", backgroundColor: a.color, width: '32vw', height: "50vh", float: "left", borderStyle: "solid", borderColor: a.id%2==0 ? 'black':'white' }} key = {a.id}>
                        {a.name}<br></br><br></br>
                        {clickedIndex[a.id]? a.color : ""}
                    </li>
                ))}
            </ul>
        )
    }

    
}

export default Component;