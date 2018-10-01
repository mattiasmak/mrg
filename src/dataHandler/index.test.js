/* global describe it  */
const expect = require('chai').expect
const dataHandler = require('./')

const testData = [
  { 'tags': ['A', 'B'], 'gameCollectionIds': ['A', 'B'], 'gameProvider': 'SCIENTIFIC' },
  { 'tags': ['A', 'C'], 'gameCollectionIds': ['A', 'C'], 'gameProvider': 'NETENT' },
  { 'tags': ['A', 'C'], 'gameCollectionIds': ['A', 'C'], 'gameProvider': 'NETENT' },
  { 'tags': ['A', 'C'], 'gameCollectionIds': ['A', 'C'], 'gameProvider': 'NETENT' },
  { 'tags': ['A', 'C'], 'gameCollectionIds': ['A', 'C'], 'gameProvider': 'NETENT' },
  { 'tags': ['A', 'C'], 'gameCollectionIds': ['A', 'C'], 'gameProvider': 'PLAYNGO' }
]

describe('Data Handler', () => {
  describe('Get Tags', () => {
    it('Should return null', () => {
      expect(dataHandler({}).getTags()).to.equal(null)
      expect(dataHandler().getTags()).to.equal(null)
      expect(dataHandler(null).getTags()).to.equal(null)
    })
    it('Should return an empty array', () => {
      expect(dataHandler([]).getTags())
        .to.an('array')
    })
    it('Should return a correct list of tags', () => {
      expect(dataHandler(testData).getTags())
        .to.eql([ 'A', 'B', 'C' ])
    })
  })
  describe('Get GameCollectionIds', () => {
    it('Should return null', () => {
      expect(dataHandler({}).getGameCollectionIds()).to.equal(null)
      expect(dataHandler().getGameCollectionIds()).to.equal(null)
      expect(dataHandler(null).getGameCollectionIds()).to.equal(null)
    })
    it('Should return an empty array', () => {
      expect(dataHandler([]).getGameCollectionIds())
        .to.an('array')
    })
    it('Should return a correct list of GameCollectionIds', () => {
      expect(dataHandler(testData).getGameCollectionIds())
        .to.eql([ 'A', 'B', 'C' ])
    })
  })
  describe('Get GameProviders', () => {
    it('Should return null', () => {
      expect(dataHandler({}).getGameProviders()).to.equal(null)
      expect(dataHandler().getGameProviders()).to.equal(null)
      expect(dataHandler(null).getGameProviders()).to.equal(null)
    })
    it('Should return an empty array', () => {
      expect(dataHandler([]).getGameProviders())
        .to.an('array')
    })
    it('Should return a correct list of GameCollectionIds', () => {
      expect(dataHandler(testData).getGameProviders())
        .to.eql([ 'SCIENTIFIC', 'NETENT', 'PLAYNGO' ])
    })
  })

  describe('Get filtered list', () => {
    it('Should return an object with pages and page', () => {
      const data = dataHandler(testData).getFilteredData()

      expect(data).to.have.property('pages')
      expect(data).to.have.property('page')
    })
    it('Should return a filtered list', () => {
      const data = dataHandler(testData).getFilteredData({ gameProviders: ['SCIENTIFIC'] })
      expect(data.totalDataSize).to.be.greaterThan(0)
      expect(data.page(0)[0].gameProvider).to.equal('SCIENTIFIC')
    })
    it('Should honor itemsPerPage', () => {
      const data = dataHandler(testData).getFilteredData(null, 5)
      expect(data.page(0).length).to.equal(5)
      expect(data.pages).to.equal(2)
    })
  })
})
