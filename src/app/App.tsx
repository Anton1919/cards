import React, {useEffect} from 'react';
import Header from '../common/components/Header/Header';
import s from './App.module.scss';
import RoutesPage from 'common/routes/RoutesPage';
import {useAppDispatch, useAppSelector} from './store';
import {PreLoader} from 'common/components/Loader/PreLoader';
import {me} from 'features/auth/authReducer/authReducer';
import {ErrorSnackbar} from 'common/components/ErrorSnackBar/ErrorSnackBar';
import {selectError, selectIsInitialized} from 'common/selectors/selectors';

const App = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(selectIsInitialized);
    const error = useAppSelector(selectError);

    useEffect(() => {
        dispatch(me());
    }, []);

    if (!isInitialized) {
        return <PreLoader/>;
    }

    return (
        <div className={s.App}>
            <Header/>
            {error && <ErrorSnackbar/>}
            <RoutesPage/>
        </div>
    );
};

export default App;
