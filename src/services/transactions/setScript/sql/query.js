const pg = require('knex')({ client: 'pg' });

const columnsWithoutFee = [
  // common
  'height',
  'tx_type',
  'id',
  'time_stamp',
  'signature',
  'proofs',
  'tx_version',
  // 'fee',
  'sender',
  'sender_public_key',
  // type-specific
  'script',
];

const select = pg({ t: 'txs_13' })
  .select(columnsWithoutFee)
  .select({
    fee: pg.raw('fee * 10^(-8)'),
  });

module.exports = { select };
