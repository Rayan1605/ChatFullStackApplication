// This focuses on the queue for the authentication service.
// It is used to add jobs to the queue for the worker to process. It inherits from the BaseQueue class.

import { BaseQueue} from "@services/queues/base.queus";
import {IAuthJob} from "src/features/auth/interfaces/auth.interface"
class AuthQueue extends BaseQueue {
    constructor() {
        super('auth');
    }


    public addAuthUserJob(name: string, data: IAuthJob): void {
        this.addJob(name, data)
    }
}

export const authQueue: AuthQueue = new AuthQueue()