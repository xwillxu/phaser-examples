let bandInfo;

// Put your code here
const band = {
    name: 'The Weekend',
    nationality: 'Canadian',
    genre: 'pop',
    members: ['Andrea Wasse', 'Link C.', 'Lorien Jones', 'Mike Clive'],
    formed: 1998,
    split: false,
    albums: [
        {
            name: 'Beatbox My Heartbeat',
            realeased: 2005
        },
        {
            name: 'The Weekend',
            realeased: 1998
        },
    ],

}

const albumString = []
for (const album of band.albums) {
    albumString.push(`${album.name} and realeased in ${album.realeased}`)
}

const anotherString = band.albums.map(album => `${album.name} and realeased in ${album.realeased}`).join(', ')

bandInfo = `${band.name} is a ${band.nationality} ${band.genre} band. The members are ${band.members.join(', ')} and formed in ${band.formed}. ${band.split ? 'It was split in ' + band.split : 'the band has not split.'} The albums are ${anotherString}`

// Don't edit the code below here

let para1 = document.createElement('p');
para1.textContent = bandInfo;
section.appendChild(para1);