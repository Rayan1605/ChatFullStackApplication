//Bull: This is a tool used for managing the queue, making sure tasks are added, processed,
// and completed correctly.
// Logger: This is used to keep a record of what happens in the queue, like when a task is done or
// if there's a problem.
// Bull Board: This is like a dashboard that shows what's happening in the queue,
// so you can see the status of tasks easily.
// Config: This is the settings for how the queue should work.

//a queue is a list where things are added at one end and removed from the other end. Just like in the grocery store line:

//to saving to MongoDB, we need to add it to a queue and then from the Queue it will be gotten by a worker and send it to mongocb
import Queue, { Job} from "bull";
import Logger from "bunyan";
import { createBullBoard} from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import {config} from "@root/config";
import {IAuthJob} from "@root/features/auth/interfaces/auth.interface";

type IBaseJobData = | IAuthJob

let bullAdapters: BullAdapter[] = [];

export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
    queue: Queue.Queue
    log: Logger;

    constructor(QueueName: string) {
        this.queue = new Queue(QueueName, `${config.REDIS_HOST}`);
        bullAdapters.push(new BullAdapter(this.queue));
        bullAdapters = [...new Set(bullAdapters)];
        serverAdapter = new ExpressAdapter();
        serverAdapter.setBasePath('/queues');


        createBullBoard({
            queues: bullAdapters,
            serverAdapter
        });
        this.log = config.createLogger(`${QueueName}Queue`);

        this.queue.on('global:completed', (jobId: string) => {
            this.log.info(`Job with ID ${jobId} has been completed`);
        })
        this.queue.on('Completed', (job: Job) => {
            job.remove();
        })
        this.queue.on('global:stalled', (jobId: string) => {
            this.log.error(`Job with ID ${jobId} has been stalled`);
        })

    }

    protected addJob(name: string, data: any): void {
        this.queue.add(name, data, {attempts: 3, backoff: { type: "fixed", delay: 5000} });
    }

    protected processJob(name: string, concurrency: number, callback: Queue.ProcessCallbackFunction<void>): void {
        this.queue.process(name, concurrency, callback);
    }
}

















