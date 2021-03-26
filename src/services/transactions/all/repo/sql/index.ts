import { createSql } from '../../../_common/sql';
import * as filters from '../../../_common/sql/filters';

import { select, selectFromFiltered } from './query';

const queryAfterFilters = {
  get: selectFromFiltered,
  mget: selectFromFiltered,
  search: selectFromFiltered,
};

export default createSql({
  query: select,
  queryAfterFilters,
  filters,
});
