// one-off script to fix data

const fs = require('fs')
const path = require('path')

const dataDir = path.resolve(path.join(__dirname, '..', 'data'))

const fixes = {
  fix001_newFields: data => {
    // add new fields

    return data
  },
}

;(() => {
  const pkmFile = path.join(dataDir, 'pokemon.json')
  // fix pokemon entries
  const jsonContent = fs.readFileSync(pkmFile, 'utf8')
  const pokemonList = JSON.parse(jsonContent)

  const modifiedList = pokemonList.map(pkm => {
    const newData = fixes.fix001_newFields(pkm)
    console.log(`fixed ${pkm.id}`)

    return newData
  })

  // write back
  fs.writeFileSync(pkmFile, JSON.stringify(modifiedList, null, 2))
})()

// const combineData = () => {
//   const jsonContent = fs.readFileSync(path.join(dataDir, 'pokemon.json'), 'utf8')
//   const pokemonIds = JSON.parse(jsonContent)

//   const pokes = pokemonIds.map(id => {
//     const pkmFile = path.join(dataDir, 'pokemon', `entries/${id}.json`)
//     const pkm = JSON.parse(fs.readFileSync(pkmFile, 'utf8'))

//     return pkm
//   })

//   fs.writeFileSync(path.join(dataDir, 'pokemon.json'), JSON.stringify(pokes, null, 2))
// }
