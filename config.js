const settings = {
    email_check : [
        "example@example.com",
        "exampl2@example.com"
    ],
    // Doesn't print "Breaches for XXX" if there arent any breaches
    suppress_empty : true,
    // Doesn't print "Breaches for XXX" if the request returns an error
    suppress_error : true,
    // Shows *NEW* alert on breach if it was added less than X days ago.
    new_alert_days: 30,
    // Your haveibeenpwned.com API key.
    API_KEY: "",

    // Limits the script to max 1 request per X milliseconds
    rate_limit : 1550
}



// Deep freezes the settings object.
const deepFreeze = obj => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && !Object.isFrozen(obj[key])) deepFreeze(obj[key]);
    });
    return Object.freeze(obj);
};

module.exports = deepFreeze(settings)