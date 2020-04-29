import $ from 'transform-ts';

export const config = $.obj({
  sea_apps: $.array(
    $.obj({
      hashed_host: $.string,
      client_id: $.string,
      client_secret: $.string,
    }),
  ),
}).transformOrThrow(require('./config.json'));
