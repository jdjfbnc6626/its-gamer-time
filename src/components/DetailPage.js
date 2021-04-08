import { useEffect, useReducer } from "react"


const initalState = {
    imageURL: '',
    title: '',
    bestPrice: '',
    bestPriceStore: '',
    historicLow: '',
    isLoading: true,
}

function reducer(state, action){ //action = {type:, data:, storeList:}
    switch(action.type){
        case 'initalFetch':
            let bestDeal = getLowestPrice(action.data.deals)
            
            return {
                imageURL: action.data.info.thumb, //change later if we want a different picture
                title:  action.data.info.title,
                bestPrice: bestDeal.price,
                // bestPriceStore: action.storeList[bestDeal.storeID],
                historicLow: action.data.cheapestPriceEver.price,
                isLoading: false,
            }
        default:
            return state
    }
}

//takes list of deals and outputs an array with lowest price and the store id
function getLowestPrice(dealList){
    let lowestPriceKey = undefined
    Object.keys(dealList).forEach(key => {
        //checks if the key is the first key to prevent comparing undefined
        if(lowestPriceKey===undefined){
            lowestPriceKey = key
            return
        }

        if(key.price<lowestPriceKey.price){
            lowestPriceKey = key
        }
        return
    })
    return lowestPriceKey
}




//Expects input of game id as string, and an input object of key value paired store ID and names
//Create a fetch request per id with API call, replace 'NUMBER' with ID https://www.cheapshark.com/api/1.0/games?id='NUMBER'
//returns JSX element

export default function DetailPage({match /*, storeList*/}){ //removing storeList until proper context is created for it
    const gameID = match.params.id
    console.log(gameID)
    const storeList = {} //REMOVE once storelist is properly initalized

    const [state, dispatch] = useReducer(reducer, initalState)

    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        //fetch request for the passed in gameID
        fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`, requestOptions) 
            .then(response => response.json())
            .then(result => dispatch({type:"initalFetch", data: result, stores: storeList}))
            .catch(error => console.log('error', error));
    },[])
    //if the fetch request is not complete yet, rended a loading screen.
    if(state.isLoading === true){
        return (
            <div className="Detail-View">
                <div> 'Loading...' </div>
            </div>
        )
    }else{
        return(
            //JSX
            //want to display: box art, title, current best price, best price store, historic low price & date of price
            <div className="Detail-View">
                <img className="Detail-View Box-Art" src={state.imageURL} alt={`Box Art of ${state.title}`}/> {/* box art */}
                <span className="Detail-View Title">{state.title}</span>{/* title */}
                <span className="Detail-View Best-Price">Best Price:{state.bestPrice}</span>{/* current best price */}
                <span className="Detail-View Best-Price-Store"> from {state.bestPriceStore}</span>{/* Store with best price */}
                <span className="DetailView Historic-Low">Historic low: {state.historicLow}</span>{/* Historic Low price with date */}
            </div>

        )
    }
}

