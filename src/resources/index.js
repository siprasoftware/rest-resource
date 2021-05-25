import Resource from "rest-resource";

export const client = new Resource.client.constructor(
  "https://jsonplaceholder.typicode.com"
);

export class BaseResource extends Resource {
    
    static client = client;

    static search(query){
      return this.list({query: {q: query}})
    }
  }
  