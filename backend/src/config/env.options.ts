export const envOptions = {
    get WOMPI_API_URL() { return process.env.WOMPI_API_URL; },
    get WOMPI_PUBLIC_KEY() { return process.env.WOMPI_PUBLIC_KEY; },
    get DB_HOST() { return process.env.DB_HOST; },
    get DB_PORT() { return process.env.DB_PORT; },
    get DB_USERNAME() { return process.env.DB_USERNAME; },
    get DB_PASSWORD() { return process.env.DB_PASSWORD; },
    get DB_DATABASE() { return process.env.DB_DATABASE; },
}