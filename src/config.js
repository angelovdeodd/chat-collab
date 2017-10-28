export default (function config() {
    var addr = {
      API_DEV: 'http://localhost:3001/api/',
      API_BLD: '/api/',
      WS: 'ws://localhost:3002'
    }

    var userName = '';

    var _setWebsocketAddress = function(address) {
        console.log("setting addr.ws to ", address);
        addr.WS = address;
    }

    var _getWebsocketAddress = function() {
        return addr.WS;
    }

    var _setUserName = function(name) {
        userName = name;
    }

    var _getUserName = function() {
        return userName;
    }

    return {
        API: addr.API_DEV, 
        getWebsocketAddress: _getWebsocketAddress,
        setWebsocketAddress: _setWebsocketAddress,
        setUserName: _setUserName,
        getUserName: _getUserName
        // setToken: _setToken,
        // getToken: _getToken
    };
})();
