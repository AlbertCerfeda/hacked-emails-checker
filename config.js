const settings = {
    email_check : [
        "example@example.com",
        "exampl2@example.com"
    ],
    // Doesn't print "Breaches for XXX" if there arent any breaches
    suppress_empty : true,
    // Shows *NEW* alert on breach if it was added less than X days ago.
    new_alert_days: 30,
    // Your haveibeenpwned.com API key.
    API_KEY: ""
}



// Deep freezes the settings object.
const deepFreeze = obj => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && !Object.isFrozen(obj[key])) deepFreeze(obj[key]);
    });
    return Object.freeze(obj);
};

module.exports = deepFreeze(settings)