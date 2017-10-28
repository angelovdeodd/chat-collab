import config from '../config';

export default (function PostService() {
    var _host = config.API;

    /*
    *   data (Object)
    *   callback (Function)
    */
    var _send = function(command, data, callback) {

        const json = JSON.stringify(data);

        fetch(_host + command, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: json
        })
        .then((response) => response.json())
        .then(responseJson => callback(responseJson));
    }


    return {
        send: _send
    };

})();