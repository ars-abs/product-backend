import { findIndex } from '@laufire/utils/collection';
import { match } from 'path-to-regexp';

const methods = {
	list: ({ method }) => method === 'GET',
	create: ({ method }) => method === 'POST',
	read: ({ id, method }) => id && method === 'GET',
	update: ({ method }) => method === 'PUT',
	delete: ({ method }) => method === 'DELETE',
};

const routes = (context) => {
	const { app, service, config: { baseURL, statusCodes }} = context;
	const parse = match(`${ baseURL }/:name/:id?`, { decode: decodeURIComponent });

	app.all('/*', async (req, res) => {
		const { name, id } = parse(req.path).params;
		const { method, path, query, body: payload } = req;
		const action = findIndex(methods, (fn) => fn({ id, method }));
		const data = { payload, id };
		const meta = { ...query, path };

		const response = await service({
			...context, name, action, data, meta,
		});

		res.status(statusCodes[response.meta.status] || 500);
		res.json(response);
	});
};

export default routes;
