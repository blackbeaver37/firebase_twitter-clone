import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { dbService, storageService } from "myFirebase";

const UnweetFactory = ({ userObj }) => {
    const [unweet, setUnweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuid()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const dataObj = {
            text: unweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("unweets").add(dataObj);
        setUnweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setUnweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit}>
            <input
                value={unweet}
                onChange={onChange}
                type="text"
                placeholder="Write Your Unweet!"
                maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Unweet" />
            {attachment && (
                <div>
                    <img
                        src={attachment}
                        alt="alt"
                        width="50px"
                        height="50px"
                    />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default UnweetFactory;
