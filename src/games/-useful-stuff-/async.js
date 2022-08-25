export async function getJsonLink(link) {

    const requestURL = link;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonResult = await response.json();

    return jsonResult
}

export async function getJson(link) {
    const jsonLink = await getJsonLink(link)
    return jsonLink
}