import expect from 'expect';

import * as utils from '../src/utils';

describe('parseGoldString()', () => {
  it('should work properly', () => {
    const testHelper = (inputString, expectedValue) => {
      expect(utils.parseGoldString(inputString)).toEqual(expectedValue);
    };

    testHelper('1a', 1000);
    testHelper('12a', 12000);
    testHelper('123a', 123000);
    testHelper('1.2a', 1200);
    testHelper('1.23a', 1230);
    testHelper('12.3a', 12300);
    testHelper('123.1a', 123100);
    testHelper('123.123a', 123123);
  });
});

describe('formatGoldString()', () => {
  it('should work properly', () => {
    const testHelper = (inputValue, expectedValue) => {
      expect(utils.formatGoldString(inputValue)).toEqual(expectedValue);
    };

    testHelper(100, '100');
    testHelper(1000, '1a');
    testHelper(12000, '12a');
    testHelper(123000, '123a');
    testHelper(1200, '1.2a');
    testHelper(1230, '1.23a');
    testHelper(12300, '12.3a');
    testHelper(123100, '123.1a');
    testHelper(123123, '123.123a');
    testHelper(123123123, '123.123b');
    testHelper(123123123123, '123.123c');
    testHelper(123123123123123, '123.123d');
  });
});

describe('assessProgress()', () => {
  describe('when given a single KL', () => {
    const testKL = 350;
    const testEntities = [
      {
        percentage: 1.1,
        kl: testKL,
      }, {
        percentage: 1.2,
        kl: testKL,
      }, {
        percentage: 2.1,
        kl: testKL,
      }, {
        percentage: 5.2,
        kl: testKL,
      }, {
        percentage: 6.7,
        kl: testKL,
      },
    ];

    it('should calculate average', () => {
      const progress = {
        percentage: 5.4,
        kl: testKL,
      };

      const target = utils.assessProgress(progress, testEntities);

      expect(target.kls).toBeDefined();
      expect(Object.keys(target.kls).length).toBe(1);

      const klSummary = target.kls[testKL];
      expect(klSummary).toBeDefined();
      expect(klSummary.n).toBe(5);
      expect(klSummary.percentageMin).toBe(1.1);
      expect(klSummary.percentageMax).toBe(6.7);

      expect(target.score).toBeDefined();
    });

    it('should toss out null percentages', () => {
      const progress = {
        percentage: 2.8,
        kl: testKL,
      };

      const entities = [
        {
          kl: testKL,
          percentage: 3.4,
        }, {
          percentage: null,
          kl: testKL,
        }, {
          percentage: 3.2,
          kl: testKL,
        },
      ];

      const target = utils.assessProgress(progress, entities);

      const klSummary = target.kls[testKL];
      expect(klSummary).toBeDefined();
      expect(klSummary.n).toBe(2);
      expect(klSummary.percentageMin).toBe(3.2);
      expect(klSummary.percentageMax).toBe(3.4);

      expect(target.score).toBeDefined();
    });

    it('should toss out NaN percentages', () => {
      const progress = {
        percentage: 2.8,
        kl: testKL,
      };

      const entities = [
        {
          kl: testKL,
          percentage: 3.4,
        }, {
          percentage: NaN,
          kl: testKL,
        }, {
          percentage: 3.2,
          kl: testKL,
        },
      ];

      const target = utils.assessProgress(progress, entities);

      const klSummary = target.kls[testKL];
      expect(klSummary).toBeDefined();
      expect(klSummary.n).toBe(2);
      expect(klSummary.percentageMin).toBe(3.2);
      expect(klSummary.percentageMax).toBe(3.4);

      expect(target.score).toBeDefined();
    });
  });

  describe('when given multiple KL', () => {
    const testKL = 350;
    const testEntities = [
      {
        percentage: 1.1,
        kl: testKL - 1,
      }, {
        percentage: 1.2,
        kl: testKL - 1,
      }, {
        percentage: 2.1,
        kl: testKL,
      }, {
        percentage: 5.2,
        kl: testKL,
      }, {
        percentage: 6.7,
        kl: testKL + 1,
      }, {
        percentage: 2.7,
        kl: testKL + 1,
      },
    ];

    it('should calculate average', () => {
      const progress = {
        percentage: 5.4,
        kl: testKL,
      };

      const target = utils.assessProgress(progress, testEntities);

      expect(target.kls).toBeDefined();
      expect(Object.keys(target.kls).length).toBe(3);

      expect(target.kls[testKL - 1].n).toBe(2);
      expect(target.kls[testKL].n).toBe(2);
      expect(target.kls[testKL + 1].n).toBe(2);

      expect(target.kls[testKL - 1].percentageMin).toBe(1.1);
      expect(target.kls[testKL - 1].percentageMax).toBe(1.2);

      expect(target.kls[testKL].percentageMin).toBe(2.1);
      expect(target.kls[testKL].percentageMax).toBe(5.2);

      expect(target.kls[testKL + 1].percentageMin).toBe(2.7);
      expect(target.kls[testKL + 1].percentageMax).toBe(6.7);

      expect(target.score).toBeDefined();
    });
  });

  describe('when given a single record', () => {
    it('returns top score', () => {
      const testKL = 201;
      const progress = {
        percentage: 5.74,
        kl: testKL,
      };
      const testEntities = [progress];

      const target = utils.assessProgress(progress, testEntities);

      expect(target.kls).toBeDefined();
      expect(Object.keys(target.kls).length).toBe(1);

      expect(target.kls[testKL].n).toBe(1);

      expect(target.kls[testKL].percentageMin).toBe(5.74);
      expect(target.kls[testKL].percentageMax).toBe(5.74);

      expect(target.score).toBeDefined();
    });
  });
});
