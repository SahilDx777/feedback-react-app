import { createContext, useState, useEffect} from "react";
import React from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // fetch feedback
    const fetchFeedback = async ()=> {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are You Sure You Want To Delete This Feedback?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE'})
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updItem),
        })

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext