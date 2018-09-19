const { pipe, compose, map, pick, filter, has, __ } = require('ramda');

const F = require('./filters');
const { select, withDecimals } = require('./query');

// one — get by id
// many — apply filters
module.exports = {
  get: id =>
    pipe(
      F.id(id),
      withDecimals,
      String
    )(select),

  search: fValues => {
    const order = [
      'id',
      'assetId',
      'sender',
      'recipient',
      'after',
      'timeStart',
      'timeEnd',
      'sort',
      'limit',
    ];

    const fValuesPicked = pick(order, fValues);

    const appliedFs = compose(
      map(x => F[x](fValuesPicked[x])),
      filter(has(__, fValuesPicked))
    )(order);
    return pipe(
      q => q.clone(),
      ...appliedFs,
      withDecimals,
      String
    )(select);
  },
};
