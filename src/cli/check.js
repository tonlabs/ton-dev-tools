/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at: https://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 *
 */

// @flow
import { TONClient as TONClientNodeJs } from "ton-client-node-js";
import type { TONClient } from "ton-client-js/types";

const os = require('os');
const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');

export class CheckNetwork {
    static async checkNetworks(servers: string[], verbose: boolean): Promise<void> {
        await CheckNetwork.resolveGiverParameters();
        const checkers: CheckNetwork[] = servers.map(server => new CheckNetwork(server, verbose));
        let seconds: number = 0;
        const getStatus = (checker: CheckNetwork) => {
            const status = {
                status: '  ',
                title: checker.server,
                time: '',
                message: '',
            };
            if (checker.isFinished()) {
                status.status = checker.succeeded ? '✓ ' : '✖ ';
                status.time = ` … ${checker.time / 1_000}s`;
            } else if (seconds > 0) {
                status.time = ` … ${seconds}s`;
            }
            if (!checker.succeeded) {
                status.message = checker.message !== '' ? ` … ${checker.message}` : '';
            }
            return status;
        };
        const multiBar = new cliProgress.MultiBar(
            {
                format: '{status}{title}{time}{message}',
            }
        );
        const bars = checkers.map(checker => multiBar.create(100, 0, getStatus(checker)));
        const updateLog = () => {
            console.log(checkers
                .map(getStatus)
                .map(status => `${status.title}${status.time}${status.status}`)
                .join(' / ')
            );
        };
        const updateBar = () => {
            for (let i = 0; i < checkers.length; i += 1) {
                bars[i].update(1, getStatus(checkers[i]));
            }
        };
        const updateProgress = bars[0] ? updateBar : updateLog;
        await Promise.all([
            new Promise((resolve) => {
                const timerId = setInterval(() => {
                    seconds += 1;
                    updateProgress();
                    const unfinished = checkers.find(x => !x.isFinished());
                    if (!unfinished) {
                        clearInterval(timerId);
                        resolve();
                        process.exit(0);
                    }
                }, 1_000)
            }),
            ...checkers.map((checker: CheckNetwork) => checker.check(updateProgress))
        ]);
    }

    server: string;
    verbose: boolean;
    client: TONClient;
    onUpdate: () => void;

    message: string;
    succeeded: boolean;
    failed: boolean;
    start: number;
    time: number;

    constructor(server: string, verbose: boolean) {
        this.server = server;
        this.verbose = verbose;

        this.message = '';
        this.succeeded = false;
        this.failed = false;
        this.start = Date.now();
        this.time = 0;
    }

    async check(onUpdate: () => void): Promise<void> {
        this.onUpdate = onUpdate;
        this.client = await TONClientNodeJs.create({
            servers: [this.server],
            log_verbose: this.verbose,
        });
        try {
            await this.checkGiver();
            await this.checkSendGrams();
            this.report({ succeeded: true });
        } catch (error) {
            this.report({ error });
        }
    }

    async checkGiver(): Promise<void> {
        const givers = await this.client.queries.accounts.query(
            { id: { eq: CheckNetwork.giverAddress } },
            'balance code');
        if (givers.length < 1) {
            this.report({ error: 'no giver' });
            return;
        }
        //$FlowFixMe
        const giverBalance = BigInt(givers[0].balance);
        if (giverBalance === BigInt(0)) {
            this.report({ error: 'giver balance is empty' });
            return;
        }
        if (giverBalance < BigInt(1_000_000_000)) {
            this.report({ error: `giver balance too low: ${giverBalance}` });
            return;
        }
        if (!givers[0].code) {
            this.report({ error: `giver code missing` });
        }
    }

    async checkSendGrams(): Promise<void> {
        await this.client.contracts.run({
            address: CheckNetwork.giverAddress,
            functionName: 'sendTransaction',
            abi: CheckNetwork.giverPackage.abi,
            input: {
                dest: '0:adb63a228837e478c7edf5fe3f0b5d12183e1f22246b67712b99ec538d6c5357',
                value: 1_000_000,
                bounce: false
            },
            keyPair: CheckNetwork.giverKeys,
        });
    }

    isFinished() {
        return this.succeeded || this.failed;
    }

    report(options: {
        succeeded?: boolean,
        error?: any,
        message?: string,
    }) {
        if (options.succeeded !== undefined) {
            this.succeeded = options.succeeded;
            this.failed = false;
            this.message = '';
            this.time = Date.now() - this.start;
        } else if (options.error !== undefined) {
            this.message = (options.error && options.error.message)
                ? options.error.message
                : (options.error || '').toString();
            this.failed = true;
            this.succeeded = false;
            this.time = Date.now() - this.start;
        } else if (options.message !== undefined && !this.isFinished()) {
            this.message = options.message;
        }
        this.onUpdate();
    }

    static giverAddress = '0:5b168970a9c63dd5c42a6afbcf706ef652476bb8960a22e1d8a2ad148e60c0ea';
    static giverKeys = {
        secret: '2245e4f44af8af6bbd15c4a53eb67a8f211d541ddc7c197f74d7830dba6d27fe',
        public: 'd542f44146f169c6726c8cf70e4cbb3d33d8d842a4afd799ac122c5808d81ba3',
    };
    static giverPackage = {
        abi: {
            "ABI version": 1,
            "functions": [
                {
                    "name": "constructor",
                    "inputs": [],
                    "outputs": []
                },
                {
                    "name": "sendTransaction",
                    "inputs": [
                        { "name": "dest", "type": "address" },
                        { "name": "value", "type": "uint128" },
                        { "name": "bounce", "type": "bool" }
                    ],
                    "outputs": []
                }
            ],
            "events": [],
            "data": [
                { "key": 100, "name": "owner", "type": "uint256" }
            ]
        },
        imageBase64: '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',
    };

    static async resolveGiverParameters(): Promise<void> {
        const client = await TONClientNodeJs.create({ servers: ['net.ton.dev'] });
        try {
            let keysPath = path.resolve(os.homedir(), 'giverKeys.json');
            CheckNetwork.giverKeys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
        } catch (error) {
        }
        CheckNetwork.giverAddress = (await client.contracts.createDeployMessage({
            package: CheckNetwork.giverPackage,
            constructorParams: {},
            keyPair: CheckNetwork.giverKeys,
        })).address;
    }


}

