import {BaseResource} from "./index";

import { isRequired } from './validations'

export default class UserResource extends BaseResource {
  static endpoint = "/users";

  static validation = {

    name: isRequired('name'),
    username: isRequired('username'),
    email: isRequired('email'),
    phone: isRequired('phone'),
    website: isRequired('website')
    
  }

  toString(){
    return this.attributes.name
  }
}
