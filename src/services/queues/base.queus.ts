import Queue, { Job} from "bull";
import Logger from "bunyan";
import { createBullBoard} from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import {config} from "@root/config";

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
}

















