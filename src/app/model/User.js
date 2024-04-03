class User {
    constructor(_id, name, email, password) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
     }

    // insert a new user
    async save(db) {
        try {
            return await db.collection('users').insertOne(this);
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }

    // check user exist
    static async isAvailable(db, email) {
        try {
            const result = await db.collection('users').findOne({ email: email });
            console.log(`Result0: ${result}`);
            return result? true : false;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }

    // get user by email
    static async findByEmail(db, email) {
        try {
            const result = await db.collection('users').findOne({email: email});
            return result ? new User(result._id, result.name, result.email, result.password) : null;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }
}

export default User;