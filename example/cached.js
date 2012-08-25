var CachedEmitter = require("../index")

var login = CachedEmitter()
    , user = "steve"
    , pass = "jones"

login.on("login", function () {
    console.log("[FIRST]", this, arguments)
})

setTimeout(function () {
    login.emit("login", user, pass)

    login.on("login", function () {
        console.log("[SECOND]", this, arguments)
    })
}, 500)