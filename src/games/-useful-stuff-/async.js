export async function getJsonLink(link) {

    const requestURL = link;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonResult = await response.json();

    const jsonString = JSON.stringify(jsonResult)
    console.log(jsonString)

    const newString = '{"squadName":"Super Hero Squad","homeTown":"Metro City","formed":2016,"secretBase":"Super tower","active":true,"members":[{"name":"Molecule Man","age":29,"secretIdentity":"Dan Jukes","powers":["Radiation resistance","Turning tiny","Radiation blast"]},{"name":"Madame Uppercut","age":39,"secretIdentity":"Jane Wilson","powers":["Million tonne punch","Damage resistance","Superhuman reflexes"]},{"name":"Eternal Flame","age":1000000,"secretIdentity":"Unknown","powers":["Immortality","Heat Immunity","Inferno","Teleportation","Interdimensional travel"]}]}'

    const jsonObject = JSON.parse(newString)
    console.log(jsonObject)

    return jsonResult
}