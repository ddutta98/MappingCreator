
module.exports = {
  detail_test: function (foldername,varname) {
    return `
    /*
 * Copyright (c) 2019 - Present, Vamstar Limited
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or
 * without modification, are not permitted.
 */

import { extractSingleEntity } from '@vamstar/fox-parser/esm/lib/utils/validate';
import { log } from '@vamstar/fox-node-logger';
import { ${varname} } from './${foldername}.mapping';

const JEST_TIMEOUT = 50000;
jest.setTimeout(JEST_TIMEOUT);
describe('Testing the mapping for details mapping', () => {
  it('should extract right values from a notice', async (done: () => void) => {
    const entity: any = await extractSingleEntity(${varname});
    log.debug('detail test', entity);

    //expect(entity.shortDescription).toBe('');
    done();
  });
});

        `;
  },

};