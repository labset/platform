// noinspection JSUnusedGlobalSymbols

export default async () => {
    const { stopDb } = await import('jest-dynalite');
    await stopDb();
};
