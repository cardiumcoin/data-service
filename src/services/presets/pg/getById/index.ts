import { identity } from 'ramda';
import { SchemaLike } from 'joi';

import { get } from '../../../_common/createResolver';
import { validateInput, validateResult } from '../../validation';
import { transformResults as transformResultFn } from './transformResult';
import { getData } from './pg';
import { ServicePresetInitOptions } from '../../types';

export const getByIdPreset = <Id, ResponseRaw, ResponseTransformed>({
  name,
  sql,
  inputSchema,
  resultSchema,
  transformResult,
}: {
  name: string;
  inputSchema: SchemaLike;
  resultSchema: SchemaLike;
  transformResult: (response: ResponseRaw, request?: Id) => ResponseTransformed;
  sql: (r: Id) => string;
}) => ({ pg, emitEvent }: ServicePresetInitOptions) =>
  get<Id, Id, ResponseRaw, ResponseTransformed>({
    transformInput: identity,
    transformResult: transformResultFn<Id, ResponseRaw, ResponseTransformed>(
      transformResult
    ),
    validateInput: validateInput(inputSchema, name),
    validateResult: validateResult(resultSchema, name),
    getData: getData({ name, sql, pg }),
    emitEvent,
  });
