import React from 'react';
import s from './collapseMenu.module.scss';
import {useNavigate} from 'react-router-dom';
import {ContentType} from 'features/profile/Account/Account';

type CollapsedType = {
    contentData: ContentType[];
};

const CollapseMenu = ({contentData}: CollapsedType) => {
    const navigate = useNavigate();
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.menu}>
                    {contentData.map((el) => {
                        return (
                            <div
                                className={s.item}
                                key={el.id}
                                onClick={(e) => {
                                    navigate(el.link);
                                    el.handler(e);
                                }}
                            >
                                <img src={el.icon} alt='icon'/>
                                <p>{el.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CollapseMenu;
