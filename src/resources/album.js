import { BaseResource } from "./index";
import UserResource from './user';

export default class AlbumsResource extends BaseResource {
    static endpoint = "/albums";
  
    static related = {
        userId: UserResource
    }

}