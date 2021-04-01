import React, { useEffect, useState } from "react";
import Unweet from "components/Unweet";
import { dbService } from "myFirebase";
import UnweetFactory from "components/UnweetFactory";

const Home = ({ userObj }) => {
    const [unweets, setUnweets] = useState([]);
    useEffect(() => {
        dbService.collection("unweets").onSnapshot((snapshot) => {
            const unweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUnweets(unweetArray);
        });
    }, []);
    return (
        <div className="container">
            <UnweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {unweets.map((unweet) => (
                    <Unweet
                        key={unweet.id}
                        unweetObj={unweet}
                        isOwner={unweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
