const raidNamesLookup = {
  1: {
    name: 'Ancient Ruins',
    color: 0xffd966,
    1: {
      name: 'Scorpion',
      imageFilename: 'famine-scorpion.png',
    },
    2: {
      name: 'Harpy',
      imageFilename: 'harpy.png',
    },
    3: {
      name: 'Flame Titan',
      imageFilename: 'titan.png',
    },
    4: {
      name: 'Belial',
      imageFilename: 'belial.png',
    },
  },
  2: {
    name: 'Burning Earth',
    color: 0xe06665,
    1: {
      name: 'Basilisk',
      imageFilename: 'basilisk.png',
    },
    2: {
      name: 'Salim',
      imageFilename: 'salim.png',
    },
    3: {
      name: 'Ignis',
      imageFilename: 'ignis.png',
    },
    4: {
      name: 'Bahamut',
      imageFilename: 'bahamut.png',
    },
  },
  3: {
    name: 'Swamp of Death',
    color: 0x93c47d,
    1: {
      name: 'Taratoad',
      imageFilename: 'taratoad.png',
    },
    2: {
      name: 'Nerugal',
      imageFilename: 'nerugal.png',
    },
    3: {
      name: 'Gorgos',
      imageFilename: 'gorgos.png',
    },
    4: {
      name: 'Beelzebub',
      imageFilename: 'beelzebub.png',
    },
  },
  4: {
    name: 'Fortress of Hell Lord',
    color: 0x8e7cc3,
    1: {
      name: 'Hell griffin',
      imageFilename: 'griffin.png',
    },
    2: {
      name: 'Zombie boar',
      imageFilename: 'boar.png',
    },
    3: {
      name: 'Twin Head Bone Wyvern',
      imageFilename: 'wyvern.png',
    },
    4: {
      name: 'Ancient Death Dragon',
      imageFilename: 'death-dragon.png',
    },
    5: {
      name: 'Hell Lord Amaimon',
      imageFilename: 'mamon.png',
    },
  },
  5: {
    name: 'Ancient Frozen Civilization',
    color: 0x4a86e8,
    1: {
      name: 'Urbos',
      imageFilename: 'urubos.png',
    },
    2: {
      name: 'King of the Ice Valley',
      imageFilename: 'fenril.png',
    },
    3: {
      name: 'The Destroyer',
      imageFilename: 'destroyer-collossus.png',
    },
    4: {
      name: 'King of Snowstorm',
      imageFilename: 'skashka.png',
    },
    5: {
      name: 'Leviathan',
      imageFilename: 'leviathan.png',
    },
  },
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
      const raidLookup = raidNamesLookup[raid];
      if (raidLookup) {
        const bossLookup = raidLookup[boss];
        if (bossLookup) {
          name = `${raid}.${stage} ${bossLookup.name}`;
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
      const raidLookup = raidNamesLookup[raid];
      // eslint-disable-next-line prefer-destructuring
      color = raidLookup.color;
    }
  }

  return color;
};

export const getBossImageFilename = (raidStage) => {
  let filename = null;

  if (raidStage) {
    const {
      raid,
      boss,
    } = raidStage;

    if (raid && boss) {
      const raidLookup = raidNamesLookup[raid];
      if (raidLookup) {
        const bossLookup = raidLookup[boss];
        if (bossLookup && bossLookup.imageFilename) {
          filename = `./assets/bosses/${bossLookup.imageFilename}`;
        }
      }
    }
  }

  return filename;
};
