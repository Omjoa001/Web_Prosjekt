declare module 'reload' {
  declare module.exports: {
    (app: express$Application): Promise<{ reload(): void }>,
  };
}
