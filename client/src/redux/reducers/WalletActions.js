export const WALLET_CONNECT = "WALLET_CONNECT";
export const CONNECT_REFRESH = "CONNECT_REFRESH";
export const CONNECT_ERROR = "CONNECT_ERROR";
export const ADD_USER = "ADD_USER";

const walletConnect = payload => {
  return {
    type: WALLET_CONNECT,
    payload,
  };
};

const connectRefresh = payload => {
  return {
    type: CONNECT_REFRESH,
    payload,
  };
};

const addUser = payload => {
  return {
    type: ADD_USER,
    payload,
  };
};

const connectError = payload => {
  return {
    type: CONNECT_ERROR,
    payload,
  };
};

export const connect = () => async dispatch => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      dispatch(walletConnect({ account: accounts[0] }));
    } catch (error) {
      dispatch(connectError(error.message));
    }
  }
};

export const getAddress = () => async dispatch => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        dispatch(connectRefresh({ account: addressArray[0] }));
      }
    } catch (error) {
      dispatch(connectError(error.message));
    }
  }
};

export const addUserName = event => dispatch => {
  dispatch(addUser({ name: event.target.value }));
};
