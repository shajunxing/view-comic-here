/*
Copyright 2024-2025 ShaJunXing <shajunxing@hotmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

let template = fread(dirname(argv[1]) + pathsep + "template.html");
let index_file_name = "view-comic-here.html";
let up_href = "../" + index_file_name;

function last_directory(path) {
    let dirs = split(path, pathsep);
    let len = length(dirs);
    // print(dirs, len);
    return dirs[len - 1] != "" ? dirs[len - 1] : dirs[len - 2];
}

// print(last_directory("\\a\\b"));
// print(last_directory("\\a\\b\\"));

function is_image(filename) {
    for (let ext of [".jpg", ".jpeg", ".jpe", ".jfif", ".png", ".gif", ".bmp", ".webp"]) {
        if (endswith(filename, ext)) {
            return true;
        }
    }
    return false;
}

function process_dir(dir) {
    let sub_entries = [];
    let img_files = [];
    let misc_files = [];
    listdir(dir, function(filename, isdir) {
        if (isdir) {
            push(sub_entries, [ filename, process_dir(dir + pathsep + filename) ]);
        } else if (is_image(filename)) {
            push(img_files, filename);
        } else {
            push(misc_files, filename);
        }
    });
    sort(sub_entries, function(lhs, rhs) { return natural_compare(lhs[0], rhs[0]); });
    sort(img_files, natural_compare);
    sort(misc_files, natural_compare);
    // print(sub_entries);
    // print(img_files);
    // print(misc_files);
    let title = last_directory(dir);
    let sub_dirs_html = "";
    for (let sub_entry of sub_entries) {
        let sub_dir = sub_entry[0];
        sub_dirs_html += format("<a href=\"${0}\"><img src = \"${1}\">${2}</a>\n",
            sub_dir + "/" + index_file_name, sub_entry[1] == null ? "" : sub_dir + "/" + sub_entry[1], last_directory(sub_dir));
    }
    // print(sub_dirs_html);
    let img_files_html = "";
    for (let img_name of img_files) {
        img_files_html += format("<img id=\"${0}\" src=\"${0}\" title=\"${0}\">\n", img_name);
    }
    // print(img_files_html);
    let misc_files_html = "";
    for (let misc_name of misc_files) {
        misc_files_html += format("<a href=\"${0}\">${0}</a>\n", misc_name);
    }
    // print(misc_files_html);
    fwrite(format(template), dir + pathsep + index_file_name);
    return img_files[0];
}

let cwd = getcwd();
if (!endswith(cwd, pathsep)) {
    cwd += pathsep;
}
process_dir(cwd);
print("Done.");
