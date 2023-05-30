// one-off script to fix data

const fs = require('fs')
const path = require('path')

const dataDir = path.resolve(path.join(__dirname, '..', 'data'))
const imagesDir = path.resolve(path.join(__dirname, '..', 'images', 'pokemon'))

;(() => {
  const pkmFile = path.join(dataDir, 'pokemon.json')
  const jsonContent = fs.readFileSync(pkmFile, 'utf8')
  const pokemonList = JSON.parse(jsonContent)

  pokemonList.forEach(pkm => {
    if (pkm.isForm) {
      return
    }
    const srcFile = path.join(imagesDir, `gen9-menu-style0`, `${pkm.dexNum}.png`)
    const destFile = path.join(imagesDir, `gen9-menu-style`, `${pkm.nid}.png`)
    if (!fs.existsSync(srcFile)) {
      console.error(`PKM file not found: ${srcFile}`)
    }

    fs.renameSync(srcFile, destFile)
  })
})()
