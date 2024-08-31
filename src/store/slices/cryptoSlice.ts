import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../static/api.ts";

type CryptoData = {
    rate: number | string;
    ask: number | null;
    bid: number | null;
    diff24h: number;
}
type Currency =
    "cad"
    | "sushi"
    | "snx"
    | "ada"
    | "theta"
    | "btc"
    | "comp"
    | "atom"
    | "xlm"
    | "vet"
    | "tusd"
    | "icp"
    | "yfi"
    | "aave"
    | "paxg"
    | "dash"
    | "usd"
    | "ltc"
    | "bch"
    | "xtz"
    | "xrp"
    | "link"
    | "bnb"
    | "rep"
    | "usdc"
    | "aud"
    | "mkr"
    | "eos"
    | "doge"
    | "pax"
    | "chf"
    | "usdp"
    | "gbp"
    | "not"
    | "bat"
    | "usdt"
    | "zrx"
    | "eur"
    | "eth"
    | "uni"
    | "dai"
    | "trx"
    | "omg"
    | "bnt"
    | "pyusd"
    | "sol"
    | "eurs"
    | "matic";

type CurrObl = Record<Currency, CryptoData>

type CurrencyRates = Record<string, CurrObl>;

interface CryptoState {
    cryptos: CurrencyRates;
    currentCrypto: CryptoData
    loading: boolean;
    error: Error | null;
}

export const getCryptosData = createAsyncThunk("get/getCryptos", async (_, thunkAPI) => {
    try {
        const response = await axios.get<CurrencyRates>(BASE_URL);

        localStorage.setItem('data', JSON.stringify(response.data));

        return response.data;
    } catch (error) {

        return thunkAPI.rejectWithValue({error: error});
    }
});

const crypto = localStorage.getItem('currentCrypto')
const cryptos = localStorage.getItem('data')

const initialState: CryptoState = {
    cryptos: cryptos ? JSON.parse(cryptos) : {},
    currentCrypto: crypto ? JSON.parse(crypto) : {},
    loading: false,
    error: null,
};

export const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {
        setCurrentCrypto: (state, {payload}) => {
            console.log(payload)
            state.currentCrypto = payload
            localStorage.setItem('currentCrypto', JSON.stringify(payload))
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getCryptosData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCryptosData.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.cryptos = payload
        });
        builder.addCase(getCryptosData.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload as Error;
        });

    },
});

export const {setCurrentCrypto} =
    cryptoSlice.actions;

export default cryptoSlice.reducer;