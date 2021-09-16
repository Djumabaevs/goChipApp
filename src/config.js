String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

export default {
    loginApiProd: "https://syn-otp-server-external.production.syncrasy.dev/graphql",
    loginApiDev: "https://syn-otp-server-external.wcvie.at/graphql",
    appApiProd: "https://syn-vet-app-api-external.production.syncrasy.dev/v1/graphql",
    appApiDev: "https://gochip-external-new.wcvie.at/v1/graphql"
}
