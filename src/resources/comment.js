import { BaseResource } from "./index";
import PostResource from './post'

export default class CommentResource extends BaseResource {
    static endpoint = "/comments";
  
    static related = {
        post: PostResource
    }
}