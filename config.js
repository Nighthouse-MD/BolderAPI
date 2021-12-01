const env = process.env;

const config = {
    listPerPage: env.LIST_PER_PAGE || 10,
    DB_PATH: 'C:\\boltracker\\db\\boltrackerDB.db'
}

export default config;