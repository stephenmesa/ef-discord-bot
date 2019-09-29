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
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    2: {
      name: 'Stage 2',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    3: {
      name: 'Stage 3',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    4: {
      name: 'Stage 4',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    5: {
      name: 'Stage 5',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    6: {
      name: 'Stage 6',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    7: {
      name: 'Stage 7',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    8: {
      name: 'Stage 8',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
    },
    9: {
      name: 'Stage 9',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
      5: bosses.ancientDragonKnight,
    },
    10: {
      name: 'Stage 10',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
      5: bosses.ancientDragonKnight,
    },
    11: {
      name: 'Stage 11',
      1: bosses.scorpion,
      2: bosses.harpy,
      3: bosses.titan,
      4: bosses.belial,
      5: bosses.ancientDragonKnight,
    },
  },
  2: {
    name: 'Burning Earth',
    color: 0xe06665,
    1: {
      name: 'Stage 1',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
    2: {
      name: 'Stage 2',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
    3: {
      name: 'Stage 3',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
    4: {
      name: 'Stage 4',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
    5: {
      name: 'Stage 5',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
    6: {
      name: 'Stage 6',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
    7: {
      name: 'Stage 7',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
    8: {
      name: 'Stage 8',
      1: bosses.basilisk,
      2: bosses.salim,
      3: bosses.ignis,
      4: bosses.bahamut,
    },
  },
  3: {
    name: 'Swamp of Death',
    color: 0x93c47d,
    1: {
      name: 'Stage 1',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
    2: {
      name: 'Stage 2',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
    3: {
      name: 'Stage 3',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
    4: {
      name: 'Stage 4',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
    5: {
      name: 'Stage 5',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
    6: {
      name: 'Stage 6',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
    7: {
      name: 'Stage 7',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
    8: {
      name: 'Stage 8',
      1: bosses.taratoad,
      2: bosses.nerugal,
      3: bosses.gorgos,
      4: bosses.beelzebub,
    },
  },
  4: {
    name: 'Fortress of Hell Lord',
    color: 0x8e7cc3,
    1: {
      name: 'Stage 1',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
    2: {
      name: 'Stage 2',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
    3: {
      name: 'Stage 3',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
    4: {
      name: 'Stage 4',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
    5: {
      name: 'Stage 5',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
    6: {
      name: 'Stage 6',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
    7: {
      name: 'Stage 7',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
    8: {
      name: 'Stage 8',
      1: bosses.griffin,
      2: bosses.boar,
      3: bosses.wyvern,
      4: bosses.deathDragon,
      5: bosses.amaimon,
    },
  },
  5: {
    name: 'Ancient Frozen Civilization',
    color: 0x4a86e8,
    1: {
      name: 'Stage 1',
      1: bosses.urbos,
      2: bosses.fenril,
      3: bosses.destroyer,
      4: bosses.skashka,
      5: bosses.leviathan,
    },
    2: {
      name: 'Stage 2',
      1: bosses.urbos,
      2: bosses.fenril,
      3: bosses.destroyer,
      4: bosses.skashka,
      5: bosses.leviathan,
    },
    3: {
      name: 'Stage 3',
      1: bosses.urbos,
      2: bosses.fenril,
      3: bosses.destroyer,
      4: bosses.skashka,
      5: bosses.leviathan,
    },
    4: {
      name: 'Stage 4',
      1: bosses.urbos,
      2: bosses.fenril,
      3: bosses.destroyer,
      4: bosses.skashka,
      5: bosses.leviathan,
    },
    5: {
      name: 'Stage 5',
      1: bosses.urbos,
      2: bosses.fenril,
      3: bosses.destroyer,
      4: bosses.skashka,
      5: bosses.leviathan,
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
          return bossLookup;
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
            name = `${raid}.${stage} ${bossLookup.name}`;
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
