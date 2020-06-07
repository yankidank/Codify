import React from "react";
import CompanyInfo from "./subComponents/CompanyInfo";
import StatusBar from "./subComponents/StatusBar";
import Position from "./subComponents/Position";
import Contact from "./subComponents/Contact";
import NewContactBtn from "./subComponents/NewContactBtn";
import NewOfferBtn from "./subComponents/NewOfferBtn";
import Offer from "./subComponents/Offer";

function Offer(){
    return(
        <div>
            <CompanyInfo />
            <StatusBar />
            <NewOfferBtn />
            <Offer />
            <Position />
            <NewContactBtn />
            <Contact />
        </div>
    )
};

export default Offer;