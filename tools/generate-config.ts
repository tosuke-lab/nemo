import $ from 'transform-ts';
import * as fs from 'fs';
import * as crypto from 'crypto';

const configTransformer = $.obj({
  sea_apps: $.array(
    $.obj({
      host: $.string,
      client_id: $.string,
      client_secret: $.string,
    }),
  ),
});

const json = fs.readFileSync('./config.dev.json', {encoding: 'utf8'});
const config = configTransformer.transformOrThrow(JSON.parse(json));

const hash = crypto.createHash('sha512');
const seaApps = config.sea_apps.map((app) => {
  const hashedHost = hash.update(app.host).digest('hex');
  return {
    hashed_host: hashedHost,
    client_id: app.client_id,
    client_secret: app.client_secret,
  };
});

fs.writeFileSync(
  './src/config.json',
  JSON.stringify({
    ...config,
    sea_apps: seaApps,
  }),
);
