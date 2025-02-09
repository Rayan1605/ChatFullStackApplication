import { Request, Response } from 'express';
import { PostCache } from '@service/redis/post.cache';
import HTTP_STATUS from 'http-status-codes';
import { postQueue } from '@service/queues/post.queue';
import { socketIOPostObject } from '@socket/post';

const postCache: PostCache = new PostCache();

export class Delete {

}
