import { Result, Ok as ok, Error as error } from 'folktale/result';
import { ParseError } from '../../errorHandling';
import {
  AssetsServiceGetRequest,
  AssetsServiceMgetRequest,
  AssetsServiceSearchRequest,
} from '../../services/assets';
import { parseFilterValues } from '../_common/filters';
import commonFilters from '../_common/filters/filters';
import { HttpRequest } from '../_common/types';

const isMgetRequest = (req: any): req is AssetsServiceMgetRequest =>
  'ids' in req && typeof req.ids !== 'undefined' && Array.isArray(req);

export const get = ({
  params,
}: HttpRequest<['id']>): Result<ParseError, AssetsServiceGetRequest> => {
  if (params) {
    return ok({ id: params.id });
  } else {
    return error(new ParseError(new Error('AssetId is not set')));
  }
};

export const mgetOrSearch = ({
  query,
}: HttpRequest): Result<
  ParseError,
  AssetsServiceMgetRequest | AssetsServiceSearchRequest
> => {
  if (!query) {
    return error(new ParseError(new Error('Query is empty')));
  }

  return parseFilterValues({
    ticker: commonFilters.query,
    search: commonFilters.query,
  })(query).chain(fValues => {
    if (isMgetRequest(fValues)) {
      return ok(fValues);
    } else {
      if ('ticker' in fValues && typeof fValues.ticker !== 'undefined') {
        return ok({
          ticker: fValues.ticker,
          sort: fValues.sort,
          limit: fValues.limit,
          after: fValues.after,
        });
      } else if ('search' in fValues && typeof fValues.search !== 'undefined') {
        return ok({
          search: fValues.search,
          sort: fValues.sort,
          limit: fValues.limit,
          after: fValues.after,
        });
      } else {
        return error(
          new ParseError(new Error('There is neither ticker nor search query'))
        );
      }
    }
  });
};
