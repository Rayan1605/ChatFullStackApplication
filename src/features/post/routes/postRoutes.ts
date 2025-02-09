import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { Create } from '@post/controllers/create-post';
import { Get } from '@post/controllers/get-posts';
import { Delete } from '@post/controllers/delete-post';
import { Update } from '@post/controllers/update-post';

class PostRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/post/all/:page', Get.prototype.posts);
    this.router.get('/post/images/:page', Get.prototype.postsWithImages);

    this.router.post('/post',  Create.prototype.post);
    this.router.post('/post/image/post', Create.prototype.postWithImage);

    this.router.put('/post/:postId', Update.prototype.posts);
    this.router.put('/post/image/:postId', Update.prototype.postWithImage);

    this.router.delete('/post/:postId', Delete.prototype.post);

    return this.router;
  }
}

export const postRoutes: PostRoutes = new PostRoutes();
