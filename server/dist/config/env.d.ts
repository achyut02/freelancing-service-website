export declare const env: {
    readonly nodeEnv: string;
    readonly port: number;
    readonly mongoUri: string;
    readonly clientOrigins: string[];
    readonly jwt: {
        readonly accessSecret: string;
        readonly refreshSecret: string;
        readonly accessExpiresIn: string;
        readonly refreshExpiresIn: string;
    };
    readonly cookie: {
        readonly domain: string | undefined;
        readonly secure: boolean;
    };
};
export declare const isProd: boolean;
//# sourceMappingURL=env.d.ts.map