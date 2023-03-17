const data = {
    "id": "a unique identifier", // a unique identifier generated with `node genModId`
    "name": "Name", // the name of your mod
    "issuesPageLink":  "https://github.../issues", // a link to the issues tab of your mods github/gitlab
    "path": 'https://something.com', // the url of your mod
    "description": "A description", // the description of your mod
    "isNative": false, // leave as false
}

// mod file names should follow the format `${mod name}_${repository name}.json`

// {
//     "id": "a unique identifier",
//     "name": "Name", 
//     "isNative": false, 
//     "path": 'https://something.com', 
//     "description": "A description", 
//     "issuesPageLink":  "https://github.com/Saint-Maker/prayer-book-template-a/issues/new" 
// }