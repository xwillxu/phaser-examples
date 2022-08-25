import { getJsonLink } from "../../../-useful-stuff-/async";


getJsonLink("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json").then((result) => {
    console.log(result)
    populateHeader(result);
    populateHeroes(result);
})

function populateHeader(obj) {
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = obj.squadName;
    header.appendChild(myH1);

    const myPara = document.createElement('p');
    myPara.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
    header.appendChild(myPara);
}


function populateHeroes(obj) {
    const section = document.querySelector('section');
    const heroes = obj.members;

    for (const hero of heroes) {
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = hero.name
        myPara1.textContent = 'Secret Identity: ' + hero.secretIdentity
        myPara2.textContent = 'Age: ' + hero.age
        myPara3.textContent = 'Superpowers: '
        for (const superPower of hero.powers) {
            const newPower = document.createElement('li')
            newPower.textContent = superPower
            myList.appendChild(newPower)
        }
        console.log(hero)

        myArticle.appendChild(myH2)
        myArticle.appendChild(myPara1)
        myArticle.appendChild(myPara2)
        myArticle.appendChild(myPara3)
        myArticle.appendChild(myList)

        section.appendChild(myArticle);
    }
}