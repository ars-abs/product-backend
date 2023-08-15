import 'module-alias/register';
import setupServer from './setup/setupServer';
import setupRoutes from './setup/setupRoutes';
import buildContext from './setup/buildContext';
import { expressResources as setupResources } from 'express-resources';
import setupMiddleWare from './setup/setupMiddleWare';
import setupHooks from './setup/setupHooks';
import { pipe } from './helpers';
import setupPlugins from './setup/setupPlugin';

const main = () => pipe([
	setupPlugins,
	setupMiddleWare,
	setupRoutes,
	setupResources,
	setupHooks,
	setupServer,
], buildContext());

main();

// for testing
export {
	main,
};
