import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['vast-sloth-13988-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'dmFzdC1zbG90aC0xMzk4OCTBrHlLLNlnU0X8ULcARusvrZYvz46xY-68ka6hKFI',
                    password: '-7qTxtwsXDg1rdMB4CxXoxcVAscun_tzfPsvYU-SeSDaPB5j9xFTBC5akhU1DeLD_HxrWg==',
                },
                ssl: true,
            }
        });

    }

    async onModuleDestroy() {
        await this.close();
    }
}