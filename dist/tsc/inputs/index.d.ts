import { RunInstall } from './run-install';
export interface Inputs {
    readonly version?: string;
    readonly dest: string;
    readonly cache: boolean;
    readonly cacheDependencyPath: string;
    readonly runInstall: RunInstall[];
    readonly packageJsonFile: string;
    readonly standalone: boolean;
}
export declare const getInputs: () => Inputs;
export default getInputs;
