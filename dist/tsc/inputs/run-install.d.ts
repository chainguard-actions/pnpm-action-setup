import { z } from 'zod';
declare const RunInstallSchema: z.ZodObject<{
    recursive: z.ZodOptional<z.ZodBoolean>;
    cwd: z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    cwd?: string | undefined;
    recursive?: boolean | undefined;
    args?: string[] | undefined;
}, {
    cwd?: string | undefined;
    recursive?: boolean | undefined;
    args?: string[] | undefined;
}>;
declare const RunInstallInputSchema: z.ZodUnion<[z.ZodNull, z.ZodBoolean, z.ZodObject<{
    recursive: z.ZodOptional<z.ZodBoolean>;
    cwd: z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    cwd?: string | undefined;
    recursive?: boolean | undefined;
    args?: string[] | undefined;
}, {
    cwd?: string | undefined;
    recursive?: boolean | undefined;
    args?: string[] | undefined;
}>, z.ZodArray<z.ZodObject<{
    recursive: z.ZodOptional<z.ZodBoolean>;
    cwd: z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    cwd?: string | undefined;
    recursive?: boolean | undefined;
    args?: string[] | undefined;
}, {
    cwd?: string | undefined;
    recursive?: boolean | undefined;
    args?: string[] | undefined;
}>, "many">]>;
export type RunInstallInput = z.infer<typeof RunInstallInputSchema>;
export type RunInstall = z.infer<typeof RunInstallSchema>;
export declare function parseRunInstall(inputName: string): RunInstall[];
export {};
