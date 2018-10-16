/*
    Adjust this file to map your imported JSON data
    "import" should return an array of people in the format: [{name: "John", uid: "something"}, ..]
    "faceUrlFromId" should return an URL to a face image
 */
export default {
    import: (data) => {
        return Object.keys(data).map((k) => {
            return data[k];
        }).filter((person) => {
            return true
        }).map((person) => {
            return {
                name: person.name,
                uid: person.uid
            }
        });
    },
    faceUrlFromId: (id) => {
        const facePath = 'https://example.com/path/to/faces';
        return `${facePath}/${id}.jpg`;
    }
}