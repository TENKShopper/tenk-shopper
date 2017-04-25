export const groupByCollection = (prods) => {
  return prods.map(prod => prod.collections)
  .reduce((flatArray, collectionArray) => {
    return flatArray.concat(...collectionArray)
  }, [])
  .filter((collection, index, origArray) => origArray.indexOf(collection) === index)
}
