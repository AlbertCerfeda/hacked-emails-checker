const https = require('https')
// const localStorage = new (require('node-localstorage').LocalStorage)('.data')
// const args = process.argv.slice(2)
const config = require('./config.js')
const Colors = {
    Reset : "\x1b[0m",
    Bright : "\x1b[1m",
    Dim : "\x1b[2m",
    Underscore : "\x1b[4m",
    Blink : "\x1b[5m",
    Reverse : "\x1b[7m",
    Hidden : "\x1b[8m",

    FgBlack : "\x1b[30m",
    FgRed : "\x1b[31m",
    FgGreen : "\x1b[32m",
    FgYellow : "\x1b[33m",
    FgBlue : "\x1b[34m",
    FgMagenta : "\x1b[35m",
    FgCyan : "\x1b[36m",
    FgWhite : "\x1b[37m",

    BgBlack : "\x1b[40m",
    BgRed : "\x1b[41m",
    BgGreen : "\x1b[42m",
    BgYellow : "\x1b[43m",
    BgBlue : "\x1b[44m",
    BgMagenta : "\x1b[45m",
    BgCyan : "\x1b[46m",
    BgWhite : "\x1b[47m"
}


async function run() {
    console.log(`${Colors.BgCyan} == PWNAGE CHECKER ==${Colors.Reset}`)
    for (idx in config.email_check) {
        await stdout_breaches_for(config.email_check[idx])
    }
}
run()

function stdout_breaches_for(email) {
    return new Promise((resolve,reject)=>{
        breaches_for_account(email)
            .then((breaches)=>{

            //console.log(breaches)
            if(breaches.length<1&&config.suppress_empty) {resolve(); return}

            console.log(`Breaches for '${email}'`)

            const date = new Date()
            for(var i = 0; i < breaches.length; i++) {
                const breach = breaches[i]
                //console.log(breach)


                let recent = new Date(breach.AddedDate).getTime() + (1000*60*60*24*config.new_alert_days) >= date.getTime()
                console.log(`\t${i!=breaches.length-1?'├':'└'}`+
                    `${recent?` ${Colors.BgRed}*NEW*${Colors.Reset} `:"       "}`+
                    `${breach.BreachDate}  ${Colors.BgYellow}${breach.Domain}${Colors.Reset}`)
            }
            resolve()
            },(error)=>{
            console.log(`Breaches for '${email}'`)
            console.log(`\t # ${error.message}# `)
            resolve()
        }).catch((err)=>console.log)
    })
}

function breaches_for_account(email) {
    return new Promise((resolve, reject)=>{
        const reqHeader = {
            hostname: 'haveibeenpwned.com',
            path: `/api/v3/breachedaccount/${email}?truncateResponse=false`,
            method: 'GET',
            headers: {
                'hibp-api-key' : config.API_KEY,
                'user-agent' : "idk"
            }
        }
        const req = https.request(reqHeader, res => {
            let response_string = ""
            res.on('data', d => {
                response_string += d;
            })
            res.on('end', ()=>{
                const resp = JSON.parse(response_string?response_string:"[]")
                if(resp.statusCode!==undefined) reject(resp)
                else resolve(resp)
            })
        })

        req.on('error', error => {
            console.log(error)
            reject(error)
        })
        req.end()
    })
}