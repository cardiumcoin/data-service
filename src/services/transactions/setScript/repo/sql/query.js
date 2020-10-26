const pg = require('knex')({ client: 'pg' });

const select = pg({ t: 'txs_13' }).select([
  'tx_uid',
  'height',
  'sender',
  'sender_public_key',
  'script',
]);

const selectFromFiltered = (filtered) =>
  pg({ t: filtered })
    .select({
      // common
      tx_uid: 't.tx_uid',
      height: 't.height',
      tx_type: 'txs.tx_type',
      id: 'txs.id',
      time_stamp: 'txs.time_stamp',
      signature: 'txs.signature',
      proofs: 'txs.proofs',
      tx_version: 'txs.tx_version',
      fee: 'txs.fee',
      status: 'txs.status',
      sender: 't.sender',
      sender_public_key: 't.sender_public_key',

      // type-specific
      script: 't.script',
    })
    .leftJoin('txs', 'txs.uid', 't.tx_uid');

module.exports = { select, selectFromFiltered };
