import React, {useEffect} from "react";
import { useParams, useHistory, Link } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api/index"

function EditDeck({ deck, setDeck }) {
    const history = useHistory();
    const {deckId} = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function getDeck() {
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDeck()
        
        
    }, [deckId])

    const handleChange = ({target}) => {
        setDeck({
            ...deck, [target.name]: target.value,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await updateDeck(deck)
        history.push(`/decks/${deck.id}`)
    }

    function handleCancel(event) {
        event.preventDefault();
        history.push(`/decks/${deck.id}`)
    }
    
    return (
        <div>
            <Link to="/">Home</Link>
            <span>{" "}/{" "}</span>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            <span>{" "}/{" "}Edit Deck</span>
            <h1>Edit Deck</h1>
            <form>
        <div className= "form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                placeholder={deck.name}
                name="name"
                onChange={handleChange}
                value={deck.name}/>
            </div>
            <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
                type="text"
                className="form-control input-lg"
                id="description"
                placeholder={deck.decription}
                name="description"
                onChange={handleChange}
                value={deck.description}/>
        </div>
        <button type="submit" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
        </div>
        
    )
}

export default EditDeck;