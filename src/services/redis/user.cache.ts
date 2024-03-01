//Not every data we will save in the chache and the reason for that is that we want to save only the data
// that we think the user wil frequently use. like for example post so we will save post data stored in the cache

// In redis, we assess other users profile because we wasnt the data to be retrieved quickly and not wait

// Only the data that we think the user will frequently use will be stored in the cache or the data that
// we want to be retrieved quickly
import {BaseCache} from "@services/redis/base.cache";

export class UserCache extends BaseCache {
    constructor() {
        super('userCache');
    }
}