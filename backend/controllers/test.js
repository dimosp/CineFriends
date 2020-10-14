const fs = require('fs');

const path = require("path");
const file_path = "test_users.json"
const relative_path =  path.join("./controllers/test_json_files/", file_path);

let raw_data = fs.readFileSync(relative_path);
let test_data = JSON.parse(raw_data);

exports.getTest = (req, res) => {
    res.json(test_data);
};