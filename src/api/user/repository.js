const { pool } = require('../../database')

exports.register = async (phone, password, name) => {
    const query = `INSERT INTO user
        (phone, password, name)
        VALUES (?,?,?)`;
    return await pool.query(query, [phone, password, name]);
}

exports.login = async (phone, password) => {
    const query = `SELECT * FROM user WHERE
        phone = ? AND password = ?`;
    let result = await pool.query(query, [phone, password]);
    return (result.length < 0) ? null : result[0];
}

exports.findByPhone = async (phone) => {
    let result = await pool.query(`SELECT count(*) count FROM user
where phone = ?`, [phone]);
    return (result.length < 0) ? null : result[0];
}