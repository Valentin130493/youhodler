import {useEffect} from "react";
import {Container} from "../../components/ui/Container.tsx";
import {upperCase} from "lodash";
import {useAppDispatch, useAppSelector} from "../../store";
import {getCryptosData, setCurrentCrypto} from "../../store/slices/cryptoSlice.ts";
import {useNavigate} from "react-router";
import './home.css'
import {ROUTES} from "../../routes";


const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {cryptos, loading} = useAppSelector(state => state.cryptos);

    useEffect(() => {
        dispatch(getCryptosData());
    }, [dispatch]);

    const handleNavigate = (currency: string, currObj: any) => () => {
        dispatch(setCurrentCrypto(currObj))
        navigate(`${ROUTES.coin}/${currency}`);
    }

    if (loading) return <Container><p>Loading...</p></Container>;

    return (
        <Container>
            <h1>Cryptocurrency Rates</h1>

            <ul>
                {Object.entries(cryptos)?.map(([currency, data]) => {
                    return (
                        <li key={`/${currency}`} className={'list-item'} onClick={handleNavigate(currency, data.usd)}>
                            <p>{upperCase(currency)}: {Number(data?.usd?.rate)?.toFixed(4)}</p>

                            <p className={'green'}> USD</p>

                        </li>
                    )
                })}
            </ul>
        </Container>
    );
};

export default HomePage;