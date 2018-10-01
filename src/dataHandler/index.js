module.exports = (data) => {
  const getTags = () => (
    Array.isArray(data))
    ? data
      .map((item) => item.tags)
      .reduce((x, y) => x.concat(y), [])
      .filter((x, i, a) => a.indexOf(x) === i)
    : null

  const getGameProviders = () => (
    Array.isArray(data))
    ? data
      .map((item) => item.gameProvider)
      .filter((x, i, a) => a.indexOf(x) === i)
    : null

  const getGameCollectionIds = () => (
    Array.isArray(data))
    ? data
      .map((item) => item.gameCollectionIds)
      .reduce((x, y) => x.concat(y), [])
      .filter((x, i, a) => a.indexOf(x) === i)
    : null

  const sortCompare = (sortBy) => (a, b) => {
    if (a[sortBy] && b[sortBy]) {
      return isNaN(a[sortBy] - b[sortBy]) ? a[sortBy].localeCompare(b[sortBy]) : a[sortBy] - b[sortBy]
    }
    return true
  }

  const filterGameProvider = gameProviders => game => {
    return (gameProviders && gameProviders.includes(game.gameProvider)) || !gameProviders
  }

  const filterGameCollectionIds = gameColletionIds => game => {
    return (gameColletionIds && game.gameCollectionIds && gameColletionIds.some(v => game.gameCollectionIds.includes(v))) || !gameColletionIds
  }
  const filterTags = tags => game => {
    console.log(tags, game.tags)
    return (tags && game.tags && tags.some(v => game.tags.includes(v))) || !tags
  }

  const getFilteredData = (filter, itemsPerPage = 10, sortBy = 'name') => {
    if (!filter)filter = { gameProviders: null, gameCollectionIds: null, tags: null }
    console.log(filter)
    const filteredData = data
      .filter(filterGameProvider(filter.gameProviders))
      .filter(filterGameCollectionIds(filter.gameCollectionIds))
      .filter(filterTags(filter.tags))
      .sort(sortCompare(sortBy))

    if (itemsPerPage < 1 || !filteredData) return { pages: 0, page: page => [] }

    return {
      pages: Math.ceil(filteredData.length / itemsPerPage),
      totalDataSize: filteredData.length,
      page: page => {
        const firstItem = page * itemsPerPage
        return page >= 0 && firstItem < filteredData.length
          ? filteredData.slice(firstItem, firstItem + itemsPerPage)
          : []
      }
    }
  }

  return {
    getTags,
    getGameProviders,
    getGameCollectionIds,
    getFilteredData
  }
}
