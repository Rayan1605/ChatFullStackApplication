import { BaseQueue} from "@services/queues/base.queus";
import {IAuthJob} from "src/features/auth/interfaces/auth.interface"
class AuthQueue extends BaseQueue {
    constructor() {
        super('auth');
    }

    public addAuthUserJob(name: string, data: IAuthJob)
}