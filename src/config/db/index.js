import { MongoClient, ServerApiVersion }  from 'mongodb';
const uri = "mongodb+srv://tranquocduong2004:acPmSEf7mhpsxMyH@cluster0.um6tazt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class Connection{
    constructor() {
        // Init a MongoClient with a MongoClientOptions object to set the Stable API version
        this.client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
      }

      async connect() {
        try {
          // Connect the client to the server
          console.log("Connecting to MongoDB...");
          await this.client.connect();
          
          // Test connection
        //   await client.db("blog").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
          // Return the database
          return  await this.client.db("blog");
        } catch (e) {
          console.error("check error",e);
        }
      }
    
      async close() {
        await this.client.close();
        console.log("Closed MongoDB connection");
      }
}

export default new Connection;
