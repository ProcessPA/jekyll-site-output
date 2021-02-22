(function() {
    function getQueryParameter(name) {
        name = name.replace(/[\[\]]/g, '\\$&');
    
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const url = window.location.href;
        const results = regex.exec(url);
    
        if (!results) {
            return null;
        }
    
        if (!results[2]) {
            return '';
        }
    
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    function setCrossSubdomainCookie(name, value, days) {
        const assign = name + '=' + escape(value) + ';';
        const date = new Date();
    
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    
        const expires = 'expires=' + date.toUTCString() + ';';
        const path = 'path=/;';
        const domain = 'domain=' + window.location.hostname.split(/\./).slice(-2).join('.') + ';';

        document.cookie = assign + expires + path + domain;
    }

    setCrossSubdomainCookie('referral_tracking', getQueryParameter('coupon'), 365);
})();