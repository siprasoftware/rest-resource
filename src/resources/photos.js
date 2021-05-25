import {BaseResource} from "./index";
import AlbumsResource from './album'

export default class PhotoResource extends BaseResource {
  static endpoint = "/photos";

  static related = {
    albumId: AlbumsResource
}
}
