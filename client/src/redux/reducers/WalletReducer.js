import {
  WALLET_CONNECT,
  CONNECT_REFRESH,
  CONNECT_ERROR,
} from "./WalletActions";

const initialState = {
  loading: false,
  account: "",
  refresh: "",
  error: "",
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_CONNECT:
      return {
        ...state,
        loading: false,
        account: action.payload.account,
      };

    case CONNECT_REFRESH:
      return {
        ...state,
        loading: false,
        account: action.payload.account,
      };

    case CONNECT_ERROR:
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
};

export default WalletReducer;
