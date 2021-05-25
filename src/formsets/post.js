import { DefaultInput, DefaultCheckbox, DefaultTextarea, PrimaryKeyInput } from './index';

export default {
    userId: new PrimaryKeyInput('User', 'userId', 'name'),
    title: new DefaultInput('Title'),
    body: new DefaultTextarea('Body'),
}
