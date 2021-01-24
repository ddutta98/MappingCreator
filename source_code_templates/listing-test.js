
module.exports = {
  listing_test: function (foldername,varname) {
    return `
    /*
    * Copyright (c) 2019 - Present, Vamstar Limited
    * All rights reserved.
    *
    * Redistribution and use in source and binary forms, with or
    * without modification, are not permitted.
    */
   
   import { extractSampleEntities } from '@vamstar/fox-parser/esm/lib/utils/validate';
   import { log } from '@vamstar/fox-node-logger';
   import { ${varname} } from './${foldername}.mapping';
   
   //const NOTICES_LENGTH = 31;
   const JEST_TIMEOUT = 90000;
   jest.setTimeout(JEST_TIMEOUT);
   describe('Testing the mapping', () => {
     it('should extract right values from a notice', async (done: () => void) => {
       const result: any = await extractSampleEntities(${varname});
       log.debug('listing test', result);
      // expect(result.notices.length).toBe(NOTICES_LENGTH);
      // expect(result.notices[0].originalUrl).toContain('');
       done();
     });
   });
        `;
  },

};