"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRunInstall = parseRunInstall;
const core_1 = require("@actions/core");
const yaml_1 = require("yaml");
const zod_1 = require("zod");
const RunInstallSchema = zod_1.z.object({
    recursive: zod_1.z.boolean().optional(),
    cwd: zod_1.z.string().optional(),
    args: zod_1.z.array(zod_1.z.string()).optional(),
});
const RunInstallInputSchema = zod_1.z.union([
    zod_1.z.null(),
    zod_1.z.boolean(),
    RunInstallSchema,
    zod_1.z.array(RunInstallSchema),
]);
function parseRunInstall(inputName) {
    const input = (0, core_1.getInput)(inputName, { required: true });
    const parsedInput = (0, yaml_1.parse)(input);
    try {
        const result = RunInstallInputSchema.parse(parsedInput);
        if (!result)
            return [];
        if (result === true)
            return [{ recursive: true }];
        if (Array.isArray(result))
            return result;
        return [result];
    }
    catch (exception) {
        (0, core_1.error)(`Error for input "${inputName}" = ${input}`);
        if (exception instanceof zod_1.ZodError) {
            (0, core_1.error)(`Errors: ${exception.errors}`);
        }
        else {
            (0, core_1.error)(`Exception: ${exception}`);
        }
        process.exit(1);
    }
}
//# sourceMappingURL=run-install.js.map