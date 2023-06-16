export const setUpCookies = (name, value) => {
    let cookieValue = '';
    let expire = '';
    let period = '';

    cookieValue = name + '=' + JSON.stringify(value) + ';';
    cookieValue += 'path=/ ;';

    period = 30;
    expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
    expire.toUTCString();
    cookieValue += 'expires=' + expire + ';';

    if (value === []) {
        cookieValue += 'expires=' + 0 + ';';
    }
    document.cookie = cookieValue;
};

export const getCookies = () => {

    let cookieValue = '';
    let cookieArray = new Array();
    let result = new Array();

    cookieValue = document.cookie;

    if (cookieValue) {
        cookieArray = cookieValue.split(';');

        cookieArray.forEach(data => {
            data = data.split('=');
            result[data[0]] = JSON.parse(data[1]);
        });
    }
    return result;
}