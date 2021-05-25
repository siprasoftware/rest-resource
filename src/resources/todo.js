import { BaseResource } from "./index";
import UserResource from './user';


export default class TodoResource extends BaseResource {
    static endpoint = "/todos";
  
    static related = {
        userId: UserResource
    }

}