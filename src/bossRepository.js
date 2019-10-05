const bosses = {
  scorpion: {
    name: 'Famine Scorpion',
    imageFilename: 'scorpion.png',
  },
  harpy: {
    name: 'Desert Storm Harpy',
    imageFilename: 'harpy.png',
  },
  titan: {
    name: 'Flame Titan',
    imageFilename: 'titan.png',
  },
  belial: {
    name: 'Lord of the Desert, Belial',
    imageFilename: 'belial.png',
  },
  basilisk: {
    name: 'Volcano Basilisk',
    imageFilename: 'basilisk.png',
  },
  salim: {
    name: 'Fire Soul\'s Salim',
    imageFilename: 'salim.png',
  },
  ignis: {
    name: 'Fire Demon\'s Ignis',
    imageFilename: 'ignis.png',
  },
  bahamut: {
    name: 'Fire Hell Lord\'s Bahamut',
    imageFilename: 'bahamut.png',
  },
  taratoad: {
    name: 'Taratoad',
    imageFilename: 'taratoad.png',
  },
  nerugal: {
    name: 'Nerugal',
    imageFilename: 'nerugal.png',
  },
  gorgos: {
    name: 'Gorgos',
    imageFilename: 'gorgos.png',
  },
  beelzebub: {
    name: 'Beelzebub',
    imageFilename: 'beelzebub.png',
  },
  griffin: {
    name: 'Hell Griffin',
    imageFilename: 'griffin.png',
  },
  boar: {
    name: 'Zombie Giant Boar',
    imageFilename: 'boar.png',
  },
  wyvern: {
    name: 'Twinhead Bone Wyvern',
    imageFilename: 'wyvern.png',
  },
  deathDragon: {
    name: 'Ancient Death Dragon',
    imageFilename: 'death-dragon.png',
  },
  mamon: {
    name: 'Mamon the Hell Lord',
    imageFilename: 'mamon.png',
  },
  urubos: {
    name: 'Urubos the Leader of Frozen Forest',
    imageFilename: 'urubos.png',
  },
  fenril: {
    name: 'Fenril the King of Frozen Valley',
    imageFilename: 'fenril.png',
  },
  destroyer: {
    name: 'Destroyer the Colossus of Frozen Mountain',
    imageFilename: 'destroyer-colossus.png',
  },
  skashka: {
    name: 'Skashka the Lord of Snow Storm',
    imageFilename: 'skashka.png',
  },
  leviathan: {
    name: 'Leviathan the Monarch of Cold',
    imageFilename: 'leviathan.png',
  },
  ancientDragonKnight: {
    name: 'Ancient Dragon Knight of the Desert',
    imageFilename: 'ancientDragonKnight.png',
  },
};

const raids = {
  1: {
    name: 'Ancient Ruins',
    color: 0xffd966,
    1: {
      name: 'Stage 1',
      1: {
        boss: bosses.scorpion,
        health: 390000000,
      },
      2: {
        boss: bosses.harpy,
        health: 390000000,
      },
      3: {
        boss: bosses.titan,
        health: 650000000,
      },
      4: {
        boss: bosses.belial,
        health: 780000000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.scorpion,
        health: 1800000000,
      },
      2: {
        boss: bosses.harpy,
        health: 1395000000,
      },
      3: {
        boss: bosses.titan,
        health: 1785000000,
      },
      4: {
        boss: bosses.belial,
        health: 1500000000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.scorpion,
        health: 6300000000,
      },
      2: {
        boss: bosses.harpy,
        health: 5610000000,
      },
      3: {
        boss: bosses.titan,
        health: 4641000000,
      },
      4: {
        boss: bosses.belial,
        health: 3000000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.scorpion,
        health: 42000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 37200000000,
      },
      3: {
        boss: bosses.titan,
        health: 21165000000,
      },
      4: {
        boss: bosses.belial,
        health: 22500000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.scorpion,
        health: 139500000000,
      },
      2: {
        boss: bosses.harpy,
        health: 109320000000,
      },
      3: {
        boss: bosses.titan,
        health: 137000000000,
      },
      4: {
        boss: bosses.belial,
        health: 200000000000,
      },
    },
    6: {
      name: 'Stage 6',
      1: {
        boss: bosses.scorpion,
        health: 4000000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 4800000000000,
      },
      3: {
        boss: bosses.titan,
        health: 6720000000000,
      },
      4: {
        boss: bosses.belial,
        health: 12000000000000,
      },
    },
    7: {
      name: 'Stage 7',
      1: {
        boss: bosses.scorpion,
        health: 48000000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 57600000000000,
      },
      3: {
        boss: bosses.titan,
        health: 67200000000000,
      },
      4: {
        boss: bosses.belial,
        health: 144000000000000,
      },
    },
    8: {
      name: 'Stage 8',
      1: {
        boss: bosses.scorpion,
        health: 576000000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 691200000000000,
      },
      3: {
        boss: bosses.titan,
        health: 967680000000000,
      },
      4: {
        boss: bosses.belial,
        health: 1728000000000000,
      },
    },
    9: {
      name: 'Stage 9',
      1: {
        boss: bosses.scorpion,
        health: 565100000000,
      },
      2: {
        boss: bosses.harpy,
        health: 819400000000,
      },
      3: {
        boss: bosses.titan,
        health: 1189000000000,
      },
      4: {
        boss: bosses.belial,
        health: 1723000000000,
      },
      5: {
        boss: bosses.ancientDragonKnight,
        health: 2499000000000,
      },
    },
    10: {
      name: 'Stage 10',
      1: {
        boss: bosses.scorpion,
        health: 2499000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 3623000000000,
      },
      3: {
        boss: bosses.titan,
        health: 5253000000000,
      },
      4: {
        boss: bosses.belial,
        health: 7616000000000,
      },
      5: {
        boss: bosses.ancientDragonKnight,
        health: 11050000000000,
      },
    },
    11: {
      name: 'Stage 11',
      1: {
        boss: bosses.scorpion,
        health: 11050000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 16020000000000,
      },
      3: {
        boss: bosses.titan,
        health: 23220000000000,
      },
      4: {
        boss: bosses.belial,
        health: 33670000000000,
      },
      5: {
        boss: bosses.ancientDragonKnight,
        health: 48820000000000,
      },
    },
  },
  2: {
    name: 'Burning Earth',
    color: 0xe06665,
    1: {
      name: 'Stage 1',
      1: {
        boss: bosses.basilisk,
        health: 390000000,
      },
      2: {
        boss: bosses.salim,
        health: 520000000,
      },
      3: {
        boss: bosses.ignis,
        health: 650000000,
      },
      4: {
        boss: bosses.bahamut,
        health: 780000000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.basilisk,
        health: 1800000000,
      },
      2: {
        boss: bosses.salim,
        health: 2100000000,
      },
      3: {
        boss: bosses.ignis,
        health: 2500000000,
      },
      4: {
        boss: bosses.bahamut,
        health: 3000000000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.basilisk,
        health: 7560000000,
      },
      2: {
        boss: bosses.salim,
        health: 11040000000,
      },
      3: {
        boss: bosses.ignis,
        health: 14400000000,
      },
      4: {
        boss: bosses.bahamut,
        health: 21600000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.basilisk,
        health: 63000000000,
      },
      2: {
        boss: bosses.salim,
        health: 100800000000,
      },
      3: {
        boss: bosses.ignis,
        health: 136747500000,
      },
      4: {
        boss: bosses.bahamut,
        health: 183750000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.basilisk,
        health: 319000000000,
      },
      2: {
        boss: bosses.salim,
        health: 358640000000,
      },
      3: {
        boss: bosses.ignis,
        health: 400000000000,
      },
      4: {
        boss: bosses.bahamut,
        health: 500000000000,
      },
    },
    6: {
      name: 'Stage 6',
      1: {
        boss: bosses.basilisk,
        health: 840000000000000,
      },
      2: {
        boss: bosses.salim,
        health: 1100000000000000,
      },
      3: {
        boss: bosses.ignis,
        health: 1200000000000000,
      },
      4: {
        boss: bosses.bahamut,
        health: 1400000000000000,
      },
    },
    7: {
      name: 'Stage 7',
      1: {
        boss: bosses.basilisk,
        health: 3400000000000000,
      },
      2: {
        boss: bosses.salim,
        health: 5900000000000000,
      },
      3: {
        boss: bosses.ignis,
        health: 10000000000000000,
      },
      4: {
        boss: bosses.bahamut,
        health: 12000000000000000,
      },
    },
    8: {
      name: 'Stage 8',
      1: {
        boss: bosses.basilisk,
        health: 120000000000000000,
      },
      2: {
        boss: bosses.salim,
        health: 245000000000000000,
      },
      3: {
        boss: bosses.ignis,
        health: 372000000000000000,
      },
      4: {
        boss: bosses.bahamut,
        health: 400000000000000000,
      },
    },
  },
  3: {
    name: 'Swamp of Death',
    color: 0x93c47d,
    1: {
      name: 'Stage 1',
      1: {
        boss: bosses.taratoad,
        health: 508809000,
      },
      2: {
        boss: bosses.nerugal,
        health: 559690000,
      },
      3: {
        boss: bosses.gorgos,
        health: 671628000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 873117000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.taratoad,
        health: 2794541000,
      },
      2: {
        boss: bosses.nerugal,
        health: 3073996000,
      },
      3: {
        boss: bosses.gorgos,
        health: 3688795000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 4795433000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.taratoad,
        health: 62504694000,
      },
      2: {
        boss: bosses.nerugal,
        health: 68755164000,
      },
      3: {
        boss: bosses.gorgos,
        health: 82506197000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 107258000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.taratoad,
        health: 332521000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 365773000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 438928000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 570606000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.taratoad,
        health: 4112274756000,
      },
      2: {
        boss: bosses.nerugal,
        health: 4523502232000,
      },
      3: {
        boss: bosses.gorgos,
        health: 5428202678000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 7056663482000,
      },
    },
    6: {
      name: 'Stage 6',
      1: {
        boss: bosses.taratoad,
        health: 10000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 10000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 20000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 50000000000000,
      },
    },
    7: {
      name: 'Stage 7',
      1: {
        boss: bosses.taratoad,
        health: 200000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 200000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 400000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 1800000000000000,
      },
    },
    8: {
      name: 'Stage 8',
      1: {
        boss: bosses.taratoad,
        health: 4000000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 4000000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 8000000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 72000000000000000,
      },
    },
  },
  4: {
    name: 'Fortress of Hell Lord',
    color: 0x8e7cc3,
    1: {
      name: 'Stage 1',
      1: {
        boss: bosses.griffin,
        health: 509000000,
      },
      2: {
        boss: bosses.boar,
        health: 560000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 672000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 873000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 2790000000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.griffin,
        health: 2790000000,
      },
      2: {
        boss: bosses.boar,
        health: 3074000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 3690000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 4790000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 62500000000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.griffin,
        health: 62500000000,
      },
      2: {
        boss: bosses.boar,
        health: 68800000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 82500000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 107000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 333000000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.griffin,
        health: 333000000000,
      },
      2: {
        boss: bosses.boar,
        health: 366000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 439000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 571000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 4110000000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.griffin,
        health: 4110000000000,
      },
      2: {
        boss: bosses.boar,
        health: 4520000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 5430000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 7060000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 9200000000000,
      },
    },
    6: {
      name: 'Stage 6',
      1: {
        boss: bosses.griffin,
        health: 125200000000000,
      },
      2: {
        boss: bosses.boar,
        health: 187900000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 281900000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 422800000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 634200000000000,
      },
    },
    7: {
      name: 'Stage 7',
      1: {
        boss: bosses.griffin,
        health: 951400000000000,
      },
      2: {
        boss: bosses.boar,
        health: 1427000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 2140000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 3211000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 7224000000000000,
      },
    },
    8: {
      name: 'Stage 8',
      1: {
        boss: bosses.griffin,
        health: 7224000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 10837000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 16256000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 24384000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 36576000000000000,
      },
    },
  },
  5: {
    name: 'Ancient Frozen Civilization',
    color: 0x4a86e8,
    1: {
      name: 'Stage 1',
      1: {
        boss: bosses.urubos,
        health: 6491000000,
      },
      2: {
        boss: bosses.fenril,
        health: 6526000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 7533000000,
      },
      4: {
        boss: bosses.skashka,
        health: 7577000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 10200000000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.urubos,
        health: 28800000000,
      },
      2: {
        boss: bosses.fenril,
        health: 28900000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 38800000000,
      },
      4: {
        boss: bosses.skashka,
        health: 38800000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 60600000000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.urubos,
        health: 128000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 128000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 199000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 215000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 362000000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.urubos,
        health: 565000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 565000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 883000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 952000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 1600000000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.urubos,
        health: 2510000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 2700000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 4540000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 4900000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 8240000000000,
      },
    },
  },
};

const getBoss = (raidStage) => {
  if (raidStage) {
    const {
      raid,
      boss,
      stage,
    } = raidStage;

    if (raid && boss && stage) {
      const raidLookup = raids[raid];
      if (raidLookup) {
        const stageLookup = raidLookup[stage];
        if (stageLookup) {
          const bossLookup = stageLookup[boss];
          if (bossLookup) {
            return bossLookup.boss;
          }
        }
      }
    }
  }

  return null;
};

export const getRaidBossName = (raidStage) => {
  let name = null;

  if (raidStage) {
    const {
      raid,
      boss,
      stage,
    } = raidStage;

    if (raid && boss && stage) {
      const raidLookup = raids[raid];
      if (raidLookup) {
        const stageLookup = raidLookup[stage];
        if (stageLookup) {
          const bossLookup = stageLookup[boss];
          if (bossLookup) {
            const bossObj = bossLookup.boss;
            if (bossObj) {
              name = `${raid}.${stage} ${bossObj.name}`;
            }
          }
        }
      }
    }
  }

  return name;
};

export const getRaidColor = (raidStage) => {
  let color = null;

  if (raidStage) {
    const {
      raid,
    } = raidStage;

    if (raid) {
      const raidLookup = raids[raid];
      color = raidLookup.color;
    }
  }

  return color;
};

export const getBossImageFilename = (raidStage) => {
  const bossLookup = getBoss(raidStage);
  if (bossLookup && bossLookup.imageFilename) {
    return `./assets/bosses/${bossLookup.imageFilename}`;
  }
  return null;
};

export const getBossHealth = (raidStage) => {
  if (raidStage) {
    const {
      raid,
      boss,
      stage,
    } = raidStage;

    if (raid && boss && stage) {
      const raidLookup = raids[raid];
      if (raidLookup) {
        const stageLookup = raidLookup[stage];
        if (stageLookup) {
          const bossLookup = stageLookup[boss];
          if (bossLookup) {
            return bossLookup.health;
          }
        }
      }
    }
  }

  return null;
};
