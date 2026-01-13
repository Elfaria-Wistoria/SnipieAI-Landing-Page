import pino from 'pino';

// Configure pino
const logger = pino({
    browser: {
        asObject: true,
    },
    level: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
    base: {
        env: process.env.NODE_ENV,
    },
});

export const getLogger = (componentName: string) => {
    return logger.child({ component: componentName });
};

export default logger;
