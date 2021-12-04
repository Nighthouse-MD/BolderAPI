const env = process.env;

const config = {
    listPerPage: env.LIST_PER_PAGE || 10,
    BOLDER_TRACKER_DB_PATH: 'C:\\boltracker\\db\\boltrackerDB.db',
    BOLDER_API_DB_PATH: 'C:\\boltracker\\db\\bolderApiDB.db'
}

export default config;