import {Container} from "../../components/ui/Container.tsx";
import {useAppSelector} from "../../store";
import './crypto.css'

const CryptoPage = () => {
    const {currentCrypto} = useAppSelector(state => state.cryptos);

    return (
        <Container>
            <h3>Medium price: {currentCrypto?.rate} USD</h3>
            <h3>Ask price: {currentCrypto?.ask} USD</h3>
            <h3>Bid price: {currentCrypto?.bid} USD</h3>
            <div style={{display: 'flex', alignItems: 'end',  gap:8}}><h3>24 hours movement of the
                price: </h3><p
                style={{color: currentCrypto?.diff24h > 0 ? 'green' : 'red', }}> {currentCrypto?.diff24h}</p>
                <p>USD</p>
            </div>
        </Container>
    );
};

export default CryptoPage;