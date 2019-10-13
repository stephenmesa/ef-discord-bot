import * as bossRepository from '../src/bossRepository';

describe('getStageData()', () => {
  const testHelper = (raidStage, expectTruthy) => {
    const target = bossRepository.getStageData(raidStage);

    if (expectTruthy) {
      expect(target).toBeTruthy();
    } else {
      expect(target).toBeFalsy();
    }
  };

  test('should return objects for all known raid stages', () => {
    const raidStagesToTest = [
      {
        raid: 1,
        maxStage: 11,
        maxBoss: 4,
      }, {
        raid: 2,
        maxStage: 8,
        maxBoss: 4,
      }, {
        raid: 3,
        maxStage: 8,
        maxBoss: 4,
      }, {
        raid: 4,
        maxStage: 8,
        maxBoss: 5,
      }, {
        raid: 5,
        maxStage: 8,
        maxBoss: 5,
      },
    ];

    raidStagesToTest.forEach((data) => {
      const { raid } = data;
      for (let stage = 1; stage < data.maxStage; stage += 1) {
        for (let boss = 1; boss < data.maxBoss; boss += 1) {
          testHelper({ raid, stage, boss }, true);
        }
      }
    });

    // don't forget about the senior raid stages
    testHelper({ raid: 1, stage: 9, boss: 5 }, true);
    testHelper({ raid: 1, stage: 10, boss: 5 }, true);
    testHelper({ raid: 1, stage: 11, boss: 5 }, true);
  });

  test('should return nothing for unknown raid stages', () => {
    testHelper({ raid: 1, stage: 1, boss: 5 }, false);
    testHelper({ raid: 1, stage: 2, boss: 5 }, false);
    testHelper({ raid: 1, stage: 3, boss: 5 }, false);
    testHelper({ raid: 1, stage: 4, boss: 5 }, false);
    testHelper({ raid: 1, stage: 5, boss: 5 }, false);
    testHelper({ raid: 1, stage: 6, boss: 5 }, false);
    testHelper({ raid: 1, stage: 7, boss: 5 }, false);
    testHelper({ raid: 1, stage: 8, boss: 5 }, false);
    testHelper({ raid: 1, stage: 9, boss: 6 }, false);
    testHelper({ raid: 1, stage: 10, boss: 6 }, false);
    testHelper({ raid: 1, stage: 11, boss: 6 }, false);
    testHelper({ raid: 1, stage: 12, boss: 1 }, false);

    testHelper({ raid: 2, stage: 1, boss: 5 }, false);
    testHelper({ raid: 2, stage: 2, boss: 5 }, false);
    testHelper({ raid: 2, stage: 3, boss: 5 }, false);
    testHelper({ raid: 2, stage: 4, boss: 5 }, false);
    testHelper({ raid: 2, stage: 5, boss: 5 }, false);
    testHelper({ raid: 2, stage: 6, boss: 5 }, false);
    testHelper({ raid: 2, stage: 7, boss: 5 }, false);
    testHelper({ raid: 2, stage: 8, boss: 5 }, false);
    testHelper({ raid: 2, stage: 9, boss: 1 }, false);

    testHelper({ raid: 3, stage: 1, boss: 5 }, false);
    testHelper({ raid: 3, stage: 2, boss: 5 }, false);
    testHelper({ raid: 3, stage: 3, boss: 5 }, false);
    testHelper({ raid: 3, stage: 4, boss: 5 }, false);
    testHelper({ raid: 3, stage: 5, boss: 5 }, false);
    testHelper({ raid: 3, stage: 6, boss: 5 }, false);
    testHelper({ raid: 3, stage: 7, boss: 5 }, false);
    testHelper({ raid: 3, stage: 8, boss: 5 }, false);
    testHelper({ raid: 3, stage: 9, boss: 1 }, false);

    testHelper({ raid: 4, stage: 1, boss: 6 }, false);
    testHelper({ raid: 4, stage: 2, boss: 6 }, false);
    testHelper({ raid: 4, stage: 3, boss: 6 }, false);
    testHelper({ raid: 4, stage: 4, boss: 6 }, false);
    testHelper({ raid: 4, stage: 5, boss: 6 }, false);
    testHelper({ raid: 4, stage: 6, boss: 6 }, false);
    testHelper({ raid: 4, stage: 7, boss: 6 }, false);
    testHelper({ raid: 4, stage: 8, boss: 6 }, false);
    testHelper({ raid: 4, stage: 9, boss: 1 }, false);

    testHelper({ raid: 5, stage: 1, boss: 6 }, false);
    testHelper({ raid: 5, stage: 2, boss: 6 }, false);
    testHelper({ raid: 5, stage: 3, boss: 6 }, false);
    testHelper({ raid: 5, stage: 4, boss: 6 }, false);
    testHelper({ raid: 5, stage: 5, boss: 6 }, false);
    testHelper({ raid: 5, stage: 6, boss: 6 }, false);
    testHelper({ raid: 5, stage: 7, boss: 6 }, false);
    testHelper({ raid: 5, stage: 8, boss: 6 }, false);
    testHelper({ raid: 5, stage: 9, boss: 1 }, false);
  });
});
