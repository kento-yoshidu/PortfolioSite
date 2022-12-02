import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
import ReactDOM from 'react-dom';

import 'graphiql/graphiql.css';

const fetcher = createGraphiQLFetcher({
  url: 'http://localhost:3000/graphql',
});

ReactDOM.render(<GraphiQL fetcher={fetcher} />, document.body);
