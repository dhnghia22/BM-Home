#!/usr/bin/env bash

if [ "${ENVIRONMENT}" = "prod" ]; then
    envName=prod
else
    envName=dev
fi

CONFIG="
import {prod, dev} from './env';
export class ConfigUtil {
    static configs = ${envName};
    static setConfigs = name => {
        if (name === 'dev') {
            ConfigUtil.configs = dev;
            } else if (name === 'prod') {
            ConfigUtil.configs = prod;
        }
    };
}"

echo $CONFIG >./src/configs/index.ts
npx prettier --config "./.prettierrc.js" --write './src/configs/index.ts'
