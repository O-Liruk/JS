export default class Http {
    constructor(url, config) {
        this._url = url;
        this._config = config;
    }

    get(uri = '', params = {}) {
        return this._request('GET', uri, params);
    }

    post(uri = '', body, params = {}) {
        return this._request('POST', uri, params, body);
    }

    put(uri = '', body, params = {}) {
        return this._request('PUT', uri, params, body);
    }

    delete(uri = '', params = {}) {
        return this._request('DELETE', uri, params);
    }

    _request(method, uri, params = {}, body = null, options = {}) {
        options.method = options.method || method;
        options.headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (body) {
            options.body = options.body || JSON.stringify(body);
        }

        return fetch(this._buildUrl(uri, params), options).then((res) => {
            if (res.ok) return res.json();

            return Promise.reject(res);
        });
    }

    _buildUrl(uri = '', params = {}) {
        let queryParams = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join('&');
        queryParams = queryParams.length ? '?' + queryParams : '';

        if (this._url[this._url.length - 1] === '/') {
            return this._url + uri + queryParams;
        } else {
            return this._url + '/' + uri + queryParams;
        }
    }
}
