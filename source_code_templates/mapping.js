
module.exports = {
  mapping: function (foldername, varname) {
    return `
    /*
    * Copyright (c) 2019 - Present, Vamstar Limited
    * All rights reserved.
    *
    * Redistribution and use in source and binary forms, with or
    * without modification, are not permitted.
    */
   import * as path from 'path';
   
   import { MappingDetails } from '@vamstar/fox-parser/esm/lib/utils/rule-bag';
   import { RuleType, RuleScope } from '@vamstar/fox-api-common/esm/rule';
   import { Rule } from '@vamstar/fox-node-datalib/esm/rule/rule.model';
   
   import { ${varname}_DATASOURCE } from './${foldername}.datasource';
   
   ${varname}_DATASOURCE.beforeSave();
   const datasourcePK = ${varname}_DATASOURCE.pk;
   
   const LISTING_RULES: Rule[] = [
     Rule.new({
       datasourcePK,
       type: RuleType.ENTITY_LISTING_START,
       fieldPath: 'notices',
       cssSelector: '',
       scope: RuleScope.LISTING_PAGE,
       sequence: 1,
       pipe: true,
     }),
     Rule.new({
       datasourcePK,
       fieldPath: 'entityIdAtSource',
       type: RuleType.GET_ELEMENT_TEXT,
       cssSelector: '',
       scope: RuleScope.LISTING_PAGE,
       sequence: ,
     }),
     Rule.new({
       datasourcePK,
       fieldPath: 'documentLinks',
       type: RuleType.GET_ELEMENT_ATTRIBUTE,
       cssSelector: '',
       elementAttrName: 'href',
       scope: RuleScope.LISTING_PAGE,
       sequence: ,
     }),
   ];
   export const LISTING_END = [
     Rule.new({
       datasourcePK,
       scope: RuleScope.LISTING_PAGE,
       type: RuleType.ENTITY_LISTING_END,
       contentType: 'dummy',
       sequence: ,
     }),
   ];
   
   const DETAIL_RULES: Rule[] = [];
   // const CHANGE_PAGE_RULES: Rule[] = [
   //   Rule.new({
   //     datasourcePK,
   //     type: RuleType.ENTITY_LISTING_END,
   //     scope: RuleScope.LISTING_PAGE,
   //     sequence: ,
   //   }),
   //   Rule.new({
   //     datasourcePK,
   //     scope: RuleScope.LISTING_PAGE,
   //     type: RuleType.CLICK_ELEMENT,
   //     contentType: 'dummy',
   //     startLabel: '',
   //     sequence: ,
   //     cssSelector:'',
   //   }),
   //   Rule.new({
   //     datasourcePK,
   //     scope: RuleScope.LISTING_PAGE,
   //     type: RuleType.WAIT,
   //     value: '3000',
   //     predicateValue: '10000',
   //     sequence: ,
   //   }),
   //   Rule.new({
   //     datasourcePK,
   //     scope: RuleScope.LISTING_PAGE,
   //     type: RuleType.GOTO,
   //     gotoSequence: 1,
   //     sequence: ,
   //   }),
   //   Rule.new({
   //     datasourcePK,
   //     scope: RuleScope.LISTING_PAGE,
   //     type: RuleType.WAIT,
   //     value: '3000',
   //     predicateValue: '10000',
   //     sequence: ,
   //   }),
   // ];
   
   export const LIVE_LISTING_RULES = LISTING_RULES.concat(LISTING_END);
   // export const LIVE_LISTING_RULES = LISTING_RULES;
   // export const LIVE_LISTING_RULES_WITH_CHANGE = LISTING_RULES.concat(CHANGE_PAGE_RULES);
   export const ALL_RULES = LIVE_LISTING_RULES.concat(DETAIL_RULES);
   
   export const ${varname}: MappingDetails = {
     all: ALL_RULES,
     listing: LISTING_RULES,
     detail: DETAIL_RULES,
     // changePage: CHANGE_PAGE_RULES,
     liveListingRules: LIVE_LISTING_RULES,
     // liveListingWithChangePage: LI$VE_LISTING_RULES_WITH_CHANGE,
     datasource: ${varname}_DATASOURCE,
     listingFilePath: path.resolve(\`\${__dirname}/__mocks__/listing.html\`),
     detailFilePath: path.resolve(\`\${__dirname}/__mocks__/detail.html\`),
   };
   
   export default ${varname};

       `;
  },

};