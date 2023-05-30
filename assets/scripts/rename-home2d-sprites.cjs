// one-off script to fix data

const fs = require('fs')
const path = require('path')

const dataDir = path.resolve(path.join(__dirname, '..', 'data'))
const imagesDir = path.resolve(path.join(__dirname, '..', 'images', 'pokemon'))

;(() => {
  const pkmFile = path.join(dataDir, 'pokemon.json')
  const jsonContent = fs.readFileSync(pkmFile, 'utf8')
  const pokemonList = JSON.parse(jsonContent)
  const errors = []

  pokemonList.forEach(pkm => {
    const formIdParts = pkm.formId ? pkm.formId.split('-') : []
    const formFirstCharsUpper = pkm.isForm
      ? formIdParts.map(part => part.charAt(0).toUpperCase()).join('')
      : ''
    let fileName = `${pkm.dexNum}${formFirstCharsUpper} HOME.png`
    if (pkm.isFemaleForm && pkm.isCosmeticForm) {
      const femaleSrcFile = path.join(imagesDir, `home2d-style`, fileName)
      if (!fs.existsSync(femaleSrcFile)) {
        fileName = `${pkm.dexNum} HOME.png`
      }
    }
    if (pkm.nid.includes('0351-')) {
      fileName = '351' + pkm.type1.charAt(0).toUpperCase() + ' HOME.png'
    }
    if (pkm.nid.includes('0773-')) {
      // silvally
      fileName = '773 HOME.png'
    }
    if (
      pkm.isForm &&
      [479, 845, 741, 585, 586, 493, 666, 676, 869, 710, 711].includes(pkm.dexNum)
    ) {
      fileName = pkm.dexNum + pkm.formId.toUpperCase() + ' HOME.png'
    }
    if (pkm.isGmax || pkm.dexNum === 0) {
      fileName = '0-unknown.png'
    }
    if (pkm.isForm && pkm.dexNum === 869) {
      if (pkm.nid.includes('-vanilla-cream')) {
        fileName = '869F1 HOME.png'
      } else if (pkm.nid.includes('-ruby-cream')) {
        fileName = '869F2 HOME.png'
      } else if (pkm.nid.includes('-matcha-cream')) {
        fileName = '869F3 HOME.png'
      } else if (pkm.nid.includes('-mint-cream')) {
        fileName = '869F4 HOME.png'
      } else if (pkm.nid.includes('-salted-cream')) {
        fileName = '869F5 HOME.png'
      } else if (pkm.nid.includes('-lemon-cream')) {
        fileName = '869F6 HOME.png'
      } else if (pkm.nid.includes('-caramel-swirl')) {
        fileName = '869F7 HOME.png'
      } else if (pkm.nid.includes('-ruby-swirl')) {
        fileName = '869F8 HOME.png'
      } else if (pkm.nid.includes('-rainbow-swirl')) {
        fileName = '869F9 HOME.png'
      }
    }
    if (pkm.isGmax || pkm.dexNum === 0) {
      fileName = '0-unknown.png'
    }
    const srcFile = path.join(imagesDir, `home2d-style`, fileName)
    const destFile = path.join(imagesDir, `home2d-style`, 'regular', `${pkm.nid}.png`)
    if (!fs.existsSync(srcFile)) {
      errors.push(`❌ PKM file not found: ${fileName} for ${pkm.nid} (${pkm.name})`)
    } else {
      // console.log(destFile)
      fs.copyFileSync(srcFile, destFile)
    }
  })

  if (errors.length > 0) {
    console.error(errors.join('\n'))
    console.log('')
    console.log(`❌ ${errors.length} Errors found, exiting`)
    console.log('')
    process.exit(1)
  } else {
    console.log('')
    console.log('✅ No errors found')
    console.log('')
  }
})()
