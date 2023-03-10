const { Client } = require('pg');


const client = new Client('postgres://localhost:5432/juicebox-dev');


const createUser = async({ username, password, name, location }) => {
    try {
        const { rows: [ user ] } = await client.query(`
            INSERT INTO users(username, password, name, location) 
            VALUES($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, password, name, location]);

        return user;
    }catch (error) {
        throw error;
    }
}

const getAllUsers = async() => {
    const { rows } = await client.query(
        `SELECT id, username, name, location, active
        FROM users;
        `)

        return rows;
}

const updateUser = async(id, fields = {}) => {
    const{ rows: [ user ]} = await client.query(`
        
    `, []);

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if(setString.length === 0) {
        return;
    }

    try {
        const result = await client.query(`
            UPDATE users
            SET ${ setString }
            WHERE id = ${ id }
            RETURNING *;
        `, Object.values(fields));

        return result;
    }catch (error) {
     throw error;
    }
}








module.exports = {
    client,
    getAllUsers,
    createUser,
    updateUser,
}