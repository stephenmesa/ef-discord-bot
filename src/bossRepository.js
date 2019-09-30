const bosses = {
  scorpion: {
    name: 'Scorpion',
    imageFilename: 'famine-scorpion.png',
  },
  harpy: {
    name: 'Harpy',
    imageFilename: 'harpy.png',
  },
  titan: {
    name: 'Flame Titan',
    imageFilename: 'titan.png',
  },
  belial: {
    name: 'Belial',
    imageFilename: 'belial.png',
  },
  basilisk: {
    name: 'Basilisk',
    imageFilename: 'basilisk.png',
  },
  salim: {
    name: 'Salim',
    imageFilename: 'salim.png',
  },
  ignis: {
    name: 'Ignis',
    imageFilename: 'ignis.png',
  },
  bahamut: {
    name: 'Bahamut',
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
    name: 'Hell griffin',
    imageFilename: 'griffin.png',
  },
  boar: {
    name: 'Zombie boar',
    imageFilename: 'boar.png',
  },
  wyvern: {
    name: 'Twin Head Bone Wyvern',
    imageFilename: 'wyvern.png',
  },
  deathDragon: {
    name: 'Ancient Death Dragon',
    imageFilename: 'death-dragon.png',
  },
  amaimon: {
    name: 'Hell Lord Amaimon',
    imageFilename: 'mamon.png',
  },
  urbos: {
    name: 'Urbos',
    imageFilename: 'urubos.png',
  },
  fenril: {
    name: 'King of the Ice Valley',
    imageFilename: 'fenril.png',
  },
  destroyer: {
    name: 'The Destroyer',
    imageFilename: 'destroyer-collossus.png',
  },
  skashka: {
    name: 'King of Snowstorm',
    imageFilename: 'skashka.png',
  },
  leviathan: {
    name: 'Leviathan',
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
        health: 100000000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 100000000000000,
      },
      3: {
        boss: bosses.titan,
        health: 100000000000000,
      },
      4: {
        boss: bosses.belial,
        health: 100000000000000,
      },
      5: {
        boss: bosses.ancientDragonKnight,
        health: 100000000000000,
      },
    },
    10: {
      name: 'Stage 10',
      1: {
        boss: bosses.scorpion,
        health: 100000000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 100000000000000,
      },
      3: {
        boss: bosses.titan,
        health: 100000000000000,
      },
      4: {
        boss: bosses.belial,
        health: 100000000000000,
      },
      5: {
        boss: bosses.ancientDragonKnight,
        health: 100000000000000,
      },
    },
    11: {
      name: 'Stage 11',
      1: {
        boss: bosses.scorpion,
        health: 100000000000000,
      },
      2: {
        boss: bosses.harpy,
        health: 100000000000000,
      },
      3: {
        boss: bosses.titan,
        health: 100000000000000,
      },
      4: {
        boss: bosses.belial,
        health: 100000000000000,
      },
      5: {
        boss: bosses.ancientDragonKnight,
        health: 100000000000000,
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
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.taratoad,
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.taratoad,
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.taratoad,
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.taratoad,
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
      },
    },
    6: {
      name: 'Stage 6',
      1: {
        boss: bosses.taratoad,
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
      },
    },
    7: {
      name: 'Stage 7',
      1: {
        boss: bosses.taratoad,
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
      },
    },
    8: {
      name: 'Stage 8',
      1: {
        boss: bosses.taratoad,
        health: 100000000000000,
      },
      2: {
        boss: bosses.nerugal,
        health: 100000000000000,
      },
      3: {
        boss: bosses.gorgos,
        health: 100000000000000,
      },
      4: {
        boss: bosses.beelzebub,
        health: 100000000000000,
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
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.griffin,
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.griffin,
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.griffin,
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.griffin,
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
    6: {
      name: 'Stage 6',
      1: {
        boss: bosses.griffin,
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
    7: {
      name: 'Stage 7',
      1: {
        boss: bosses.griffin,
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
    8: {
      name: 'Stage 8',
      1: {
        boss: bosses.griffin,
        health: 100000000000000,
      },
      2: {
        boss: bosses.boar,
        health: 100000000000000,
      },
      3: {
        boss: bosses.wyvern,
        health: 100000000000000,
      },
      4: {
        boss: bosses.deathDragon,
        health: 100000000000000,
      },
      5: {
        boss: bosses.amaimon,
        health: 100000000000000,
      },
    },
  },
  5: {
    name: 'Ancient Frozen Civilization',
    color: 0x4a86e8,
    1: {
      name: 'Stage 1',
      1: {
        boss: bosses.urbos,
        health: 100000000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 100000000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 100000000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 100000000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 100000000000000,
      },
    },
    2: {
      name: 'Stage 2',
      1: {
        boss: bosses.urbos,
        health: 100000000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 100000000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 100000000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 100000000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 100000000000000,
      },
    },
    3: {
      name: 'Stage 3',
      1: {
        boss: bosses.urbos,
        health: 100000000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 100000000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 100000000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 100000000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 100000000000000,
      },
    },
    4: {
      name: 'Stage 4',
      1: {
        boss: bosses.urbos,
        health: 100000000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 100000000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 100000000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 100000000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 100000000000000,
      },
    },
    5: {
      name: 'Stage 5',
      1: {
        boss: bosses.urbos,
        health: 100000000000000,
      },
      2: {
        boss: bosses.fenril,
        health: 100000000000000,
      },
      3: {
        boss: bosses.destroyer,
        health: 100000000000000,
      },
      4: {
        boss: bosses.skashka,
        health: 100000000000000,
      },
      5: {
        boss: bosses.leviathan,
        health: 100000000000000,
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
