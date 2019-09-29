import * as utils from '../src/utils';

describe('parseGoldString()', () => {
  test('should work properly', () => {
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
    testHelper('1,2a', 1200);
  });
});

describe('formatGoldString()', () => {
  test('should work properly', () => {
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

    test('should calculate average', () => {
      const target = utils.assessProgress(5.4, testEntities);

      expect(target.kls).toBeDefined();
      expect(Object.keys(target.kls).length).toBe(1);

      const klSummary = target.kls[testKL];
      expect(klSummary).toBeDefined();
      expect(klSummary.n).toBe(5);
      expect(klSummary.percentageMin).toBe(1.1);
      expect(klSummary.percentageMax).toBe(6.7);

      expect(target.score).toBeDefined();
    });

    test('should toss out null percentages', () => {
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

      const target = utils.assessProgress(2.8, entities);

      const klSummary = target.kls[testKL];
      expect(klSummary).toBeDefined();
      expect(klSummary.n).toBe(2);
      expect(klSummary.percentageMin).toBe(3.2);
      expect(klSummary.percentageMax).toBe(3.4);

      expect(target.score).toBeDefined();
    });

    test('should toss out NaN percentages', () => {
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

    test('should calculate average', () => {
      const target = utils.assessProgress(5.4, testEntities);

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
    test('returns top score', () => {
      const testKL = 201;
      const progress = {
        percentage: 5.74,
        kl: testKL,
      };
      const testEntities = [progress];

      const target = utils.assessProgress(5.74, testEntities);

      expect(target.kls).toBeDefined();
      expect(Object.keys(target.kls).length).toBe(1);

      expect(target.kls[testKL].n).toBe(1);

      expect(target.kls[testKL].percentageMin).toBe(5.74);
      expect(target.kls[testKL].percentageMax).toBe(5.74);

      expect(target.score).toBeDefined();
    });
  });
});

describe('filterOutlierProgresses()', () => {
  const generateRecords = percentages => percentages.map(percentage => ({ percentage }));

  describe('when given 1 record', () => {
    test('should not remove the record', () => {
      // ARRANGE
      const testRecords = generateRecords([5]);

      // ACT
      const target = utils.filterOutlierProgresses(testRecords);

      // ASSERT
      expect(target.length).toBe(1);
    });
  });

  describe('when given 2 records', () => {
    test('should not remove any records that are close', () => {
      // ARRANGE
      const testRecords = generateRecords([5, 6]);

      // ACT
      const target = utils.filterOutlierProgresses(testRecords);

      // ASSERT
      expect(target.length).toBe(2);
    });

    test('should not remove any records that are not close', () => {
      // ARRANGE
      const testRecords = generateRecords([5, 96]);

      // ACT
      const target = utils.filterOutlierProgresses(testRecords);

      // ASSERT
      expect(target.length).toBe(2);
    });
  });

  describe('when given 3 records', () => {
    test('should not remove any records that are close', () => {
      // ARRANGE
      const testRecords = generateRecords([5, 6, 7]);

      // ACT
      const target = utils.filterOutlierProgresses(testRecords);

      // ASSERT
      expect(target.length).toBe(3);
    });

    test('should not remove any records that are somewhat close', () => {
      // ARRANGE
      const testRecords = generateRecords([0.71, 0.77, 12.08]);

      // ACT
      const target = utils.filterOutlierProgresses(testRecords);

      // ASSERT
      expect(target.length).toBe(3);
    });

    test('should remove a record that is not close', () => {
      // ARRANGE
      const testRecords = generateRecords([5, 6, 106]);

      // ACT
      const target = utils.filterOutlierProgresses(testRecords);

      // ASSERT
      expect(target.length).toBe(2);
    });
  });
});

describe('validatePercentage()', () => {
  describe('should not allow', () => {
    test('negative numbers', () => {
      // ARRANGE
      const testPercentage = -12;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('null', () => {
      // ARRANGE
      const testPercentage = null;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('undefined', () => {
      // ARRANGE

      // ACT
      const target = utils.validatePercentage();

      // ASSERT
      expect(target).toBe(false);
    });
    test('NaN', () => {
      // ARRANGE
      const testPercentage = NaN;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('a very high number', () => {
      // ARRANGE
      const testPercentage = 9001;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('a high number', () => {
      // ARRANGE
      const testPercentage = 101;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('0', () => {
      // ARRANGE
      const testPercentage = 0;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('a string', () => {
      // ARRANGE
      const testPercentage = 'blah';

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('an object', () => {
      // ARRANGE
      const testPercentage = 'blah';

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
    test('a function', () => {
      // ARRANGE
      const testPercentage = () => {};

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(false);
    });
  });
  describe('should allow', () => {
    test('a reasonably low number', () => {
      // ARRANGE
      const testPercentage = 0.02;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(true);
    });
    test('a reasonably high number', () => {
      // ARRANGE
      const testPercentage = 12.01;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(true);
    });
    test('a reasonably very high number', () => {
      // ARRANGE
      const testPercentage = 58.99;

      // ACT
      const target = utils.validatePercentage(testPercentage);

      // ASSERT
      expect(target).toBe(true);
    });
  });
});

describe('parseRaidStage', () => {
  const testHelper = (inputString, expectedValue) => {
    expect(utils.parseRaidStage(inputString)).toEqual(expectedValue);
  };

  test('should return null when given invalid inputs', () => {
    testHelper(null, null);
    testHelper(undefined, null);
    testHelper(1, null);
    testHelper(() => {}, null);
    testHelper('1', null);
    testHelper('1.2', null);
    testHelper('1.2.3.4', null);
    testHelper('letters', null);
    testHelper('x', null);
    testHelper('1,2,3', null);
    testHelper('-1.2.3', null);
  });

  test('should return parsed object when given valid inputs', () => {
    testHelper('1.2.3', { raid: 1, stage: 2, boss: 3 });
    testHelper('5.5.5', { raid: 5, stage: 5, boss: 5 });
    testHelper('1.12.3', { raid: 1, stage: 12, boss: 3 });
  });
});
