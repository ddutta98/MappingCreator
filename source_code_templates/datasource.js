
module.exports = {
  datasource: function (rowDetails,varname) {
    return `/*
        * Copyright (c) 2019 - Present, Vamstar Limited
        * All rights reserved.
        *
        * Redistribution and use in source and binary forms, with or
        * without modification, are not permitted.
        */
       import { Datasource } from '@vamstar/fox-node-datalib/esm/datasource/datasource.model';
       import { Frequency } from 'rrule';
       import {
         WebSourceLayout,
         DatasourceStatus,
         DatasourceType,
         Protocol,
       } from '@vamstar/fox-api-common/esm/datasource/types';
       import { parse } from 'date-fns';
       
       export const ${varname}_DATASOURCE = Datasource.new({
         name: '${rowDetails.name}',
         description: '${rowDetails.description}',
         listPageUrl: '${rowDetails.listingPage}',
         sampleContractUrl: '${rowDetails.sampleContractUrl}',
         domain: '${rowDetails.mainUrl}',
         mappedBy: 'deeptonabho.dutta@vamstar.io',
         sourceCollectedBy: '${rowDetails.Author}',
         mappedOn: parse('${new Date().toLocaleDateString(undefined,{timeZone: 'Asia/Kolkata'})}', 'MM/dd/yyyy', new Date()),
         mainUrl: '${rowDetails.mainUrl}',
         country: '${rowDetails.countryISO}',
         language: '${rowDetails.languageISO}',
         status: DatasourceStatus.PUBLISHED,
         datasourceType: DatasourceType.HTML,
         protocol: Protocol.HTTP,
         pageLayout: WebSourceLayout.NO_DETAIL_PAGE,
       
         scrapeFrequency: {
           start: new Date(),
           frequency: Frequency.DAILY,
           isRecurring: true,
           end: new Date(),
         },
       });
       `;
  },

};