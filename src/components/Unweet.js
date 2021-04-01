import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";

const Unweet = ({ unweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newUnweet, setNewUnweet] = useState(unweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure?");
        if (ok) {
            await dbService.doc(`unweets/${unweetObj.id}`).delete();
            if (unweetObj.attachmentUrl !== "") {
                await storageService
                    .refFromURL(unweetObj.attachmentUrl)
                    .delete();
            }
        }
    };
    const toggleEditing = () => {
        setEditing((prev) => !prev);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`unweets/${unweetObj.id}`).update({
            text: newUnweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewUnweet(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your unweet"
                            value={newUnweet}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update Unweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{unweetObj.text}</h4>
                    {unweetObj.attachmentUrl && (
                        <img
                            src={unweetObj.attachmentUrl}
                            alt="alt"
                            width="50px"
                            height="50px"
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Unweet;
