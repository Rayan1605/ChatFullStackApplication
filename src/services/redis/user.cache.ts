//Not every data we will save in the chache and the reason for that is that we want to save only the data
// that we think the user wil frequently use. like for example post so we will save post data stored in the cache

// In redis, we assess other users profile because we wasnt the data to be retrieved quickly and not wait

// Only the data that we think the user will frequently use will be stored in the cache or the data that
// we want to be retrieved quickly

// You can save the data in lists, that is in arrays, you can save data sets or in objects, we're going to use sets
import {BaseCache} from "@services/redis/base.cache";
import {IUserDocument} from "@root/features/user/models/user.interface";

export class UserCache extends BaseCache {
    constructor() {
        super('userCache');
    }
// key and userId helping to identify and createdUser providing the actual data to be saved.
    public async saveUserToCache(key: string, userId: string, createdUser: IUserDocument):Promise<void>{
    const createdAt = new Date();
    const {
        _id,
        uId,
        username,
        email,
        avatarColor,
        blocked,
        blockedBy,
        postsCount,
        profilePicture,
        followersCount,
        followingCount,
        notifications,
        work,
        location,
        school,
        quote,
        bgImageId,
        bgImageVersion,
        social
    } = createdUser;

    const firstList: string [] = [

            '_id', `${_id}`,
            'uId', `${uId}`,
            'username', `${username}`,
            'email', `${email}`,
            'avatarColor', `${avatarColor}`,
            'createdAt', `${createdAt}`,
            'postsCount', `${postsCount}`
    ];
    const secondList: string [] = [
            'blocked', JSON.stringify(blocked),
            'blockedBy', JSON.stringify(blockedBy),
            'profilePicture', `${profilePicture}`,
            'followersCount', `${followersCount}`,
            'followingCount', `${followingCount}`,
            'notifications', JSON.stringify(notifications),
            'social', JSON.stringify(social),
      ]
        const
    }
}