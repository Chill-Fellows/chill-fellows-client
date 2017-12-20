'use strict';

if(window.location.pathname !== '/') {
  page.base('/chill-fellows-client');
}

page('/', ctx => (ctx));
page('/test', ctx => (ctx));
page('/dashboard', ctx => (ctx));
page('/watchlist', ctx => (ctx));
page();
