import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="unweet">
            {editing ? (
                <>
                    <form className="container unweetEdit" onSubmit={onSubmit}>
                        <input
                            className="formInput"
                            type="text"
                            placeholder="Edit your unweet"
                            value={newUnweet}
                            required
                            autoFocus
                            onChange={onChange}
                        />
                        <input
                            className="formBtn"
                            type="submit"
                            value="Update Unweet"
                        />
                    </form>
                    <span className="formBtn cancelBtn" onClick={toggleEditing}>
                        Cancel
                    </span>
                </>
            ) : (
                <>
                    <h4>{unweetObj.text}</h4>
                    {unweetObj.attachmentUrl && (
                        <img src={unweetObj.attachmentUrl} />
                    )}
                    {isOwner && (
                        <div class="unweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Unweet;
