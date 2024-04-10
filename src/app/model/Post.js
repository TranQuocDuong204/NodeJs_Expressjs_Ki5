class Post {
  constructor(_id, title, content, author, img, id_user) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.img = img;
    this.id_user = id_user;
  }

  // insert a new post
  async save(db) {
    try {
      const result = await db.collection("posts").insertOne(this);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // get all posts
  static async findAll(db) {
    try {
      const docs = await db.collection("posts").find({}).toArray();
      return docs.map(
        (doc) =>
          new Post(
            doc._id,
            doc.title,
            doc.content,
            doc.author,
            doc.img,
            doc.id_user
          )
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // get a post based on id
  static async findById(db, id) {
    try {
      const doc = await db.collection("posts").findOne({ _id: id });
      return doc;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // update a post based on id
  async updates(db, id) {
    try {
      const result = await db.collection("posts").updateOne(
        { _id: id },
        {
          $set: {
            title: this.title,
            content: this.content,
            author: this.author,
            img: this.img,
            id_user: this.id_user,
          },
        }
      );
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // delete a post based on id
  static async del(db, id) {
    try {
      const result = await db.collection("posts").deleteOne({ _id: id });
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async findAllPostsByUserId(db, userId) {
    try {
      const collection = db.collection("posts");
      const cursor = await collection.find({ id_user: userId }).toArray();

      return cursor;
    } catch (err) {
      console.error("Error finding posts by user ID:", err);
      throw err;
    }
  }
}

export default Post;
