import { BaseResource } from "./index";

import UserResource from './user';
import { isGreaterThanFiveChars, startsWithB } from './validations'
export default class PostResource extends BaseResource {
  static endpoint = "/posts";

  static related = {
      userId: UserResource
  }

  static validation = {

    body: isGreaterThanFiveChars('body'),
    title: [startsWithB('title'), isGreaterThanFiveChars('title')]
  }

  toString(){
    return this.attributes.title
  }
  
}
