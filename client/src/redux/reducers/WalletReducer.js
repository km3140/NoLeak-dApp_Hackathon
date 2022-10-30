import {
  WALLET_CONNECT,
  CONNECT_REFRESH,
  CONNECT_ERROR,
  ADD_USER,
} from "./WalletActions";

const initialState = {
  loading: false,
  account: "",
  refresh: "",
  name: "",
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

    case ADD_USER:
      return {
        ...state,
        name: action.payload.name,
      };

    case CONNECT_ERROR:
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
};

export default WalletReducer;
