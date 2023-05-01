import React from 'react';
import s from './Cards.module.scss'
import BackToPackList from "../../common/components/BackToPackList/BackToPackList";
import CardsHeader from "./header/CardsHeader";
import CardsList from "./cardsList/CardsList";

const Cards = () => {
    return <div className={s.container}>
        <div className={s.backTo}><BackToPackList/></div>
        <CardsHeader/>
        <CardsList/>
    </div>;
};

export default Cards;
