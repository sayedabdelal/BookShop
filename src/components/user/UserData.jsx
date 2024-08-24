import React, { useState, useRef } from 'react';
import './UserComponent.css';
import Modal from '../../UI/Modal';

function UserData({ onDone }) {
    // Initialize useRef hooks
    const title = useRef();
    const description = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        
        // Create a FormData object and append data
        const data = new FormData();
        data.append('title', title.current.value);
        data.append('description', description.current.value);
        
        console.log(data); 
        // Example: Log the FormData object for debugging
        onDone()
    }

    return (
        <>      
            <Modal title="Update Your Data" onClose={onDone}>
                <form id="new-challenge" onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor="title">Job</label>
                        <input ref={title} type="text" name="title" id="title" />
                    </p>
                    <p>
                        <label htmlFor="description">Description</label>
                        <textarea ref={description} name="description" id="description" />
                    </p>
                    <p className="new-challenge-actions">
                        <button type="button" onClick={onDone}>Cancel</button>
                        <button type="submit">Add Challenge</button>
                    </p>
                </form>
            </Modal>
        </>
    );
}

export default UserData;
