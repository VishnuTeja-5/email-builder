import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getTemplates(){
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.CollectionId,
            )
        } catch (error) {
            console.log("Appwrite serive :: getTemplates :: error", error);
            return false
        }
    }

    async getTemplate(id){
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.CollectionId,
                String(id),
            )
        } catch (error) {
            console.log("Appwrite serive :: getTemplate :: error", error);
            return false
        }
    }
}


const service = new Service()
export default service