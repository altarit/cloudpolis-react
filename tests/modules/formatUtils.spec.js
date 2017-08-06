import {toMMSS, apiLink, trackLink} from 'modules/formatUtils.js'

describe('modules/formatUtils', () => {
  it('toMMSS', () => {
    expect(toMMSS(null)).to.equal('-:--')
    expect(toMMSS(27)).to.equal('0:27')
    expect(toMMSS(67)).to.equal('1:07')
    expect(toMMSS(680)).to.equal('11:20')
  })

  it('apiLink', () => {
    expect(apiLink('/music/search/')).to.equal('/api/music/search/')
  })

  it('trackLink', () => {
    expect(trackLink(null)).to.be.null()
    expect(trackLink('/Pachelbel/Canon.mp3')).to.equal('/library/Pachelbel/Canon.mp3')
  })
})
