import config from './base/config';
import express from 'express';
import setupServer from './setup/setupServer';
import setupRoutes from './setup/setupRoutes';
import setupContext from './setup/setupContext';
import { expressResources } from 'express-resources';
import { expressAuth } from 'express-auth';
import setupMiddleWares from './setup/setupMiddleWares';
import setupProtectedRoutes from './setup/setupProtectedRoutes';
import { map } from '@laufire/utils/collection';

const main = () => {
	const app = express();
	const context = { app, config };

	const setupSteps = [
		setupContext,
		setupMiddleWares,
		setupRoutes,
		expressAuth,
		setupProtectedRoutes,
		expressResources,
		setupServer,
	];
	const setup = (data) => map(setupSteps, (setupStep) => setupStep(data));

	setup(context);
};

main();

// for testing
export {
	main,
};
