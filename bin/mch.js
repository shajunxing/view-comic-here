/*
Copyright 2024-2025 ShaJunXing <shajunxing@hotmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

let template = read(dirname(argv[1]) + pathsep + "vch-template.html");
let index_file_name = "vch.html";
let up_link = format("<a href=\"../${0}\">🡡</a>", index_file_name);

function last_directory(path) {
    let dirs = path::split(pathsep);
    let len = dirs::length();
    return dirs[len - 1] != "" ? dirs[len - 1] : dirs[len - 2];
}

// returns first image as cover
function process_dir(dir, prev, next) {
    let sub_dirs = [];
    let img_files = [];
    let misc_files = [];
    ls(dir, function(filename, isdir) {
        if (isdir) {
            sub_dirs::push(filename);
        } else if (filename::endswith(".jpg", ".jpeg", ".jpe", ".jfif", ".png", ".gif", ".bmp", ".webp")) {
            img_files::push(filename);
        } else {
            misc_files::push(filename);
        }
    });
    sub_dirs::sort(natural_compare);
    img_files::sort(natural_compare);
    misc_files::sort(natural_compare);
    let title = last_directory(dir);
    let sub_dirs_html = "";
    for (let i = 0; i < sub_dirs::length(); i++) {
        let sub_dir = sub_dirs[i];
        let cover = process_dir(dir + pathsep + sub_dir, sub_dirs[i - 1], sub_dirs[i + 1]);
        sub_dirs_html += format("<a href=\"${0}\"><img src = \"${1}\">${2}</a>\n",
            sub_dir + "/" + index_file_name, cover == null ? "" : sub_dir + "/" + cover, last_directory(sub_dir));
    }
    let img_files_html = "";
    for (let img_name of img_files) {
        img_files_html += format("<img id=\"${0}\" src=\"${0}\" title=\"${0}\">\n", img_name);
    }
    let misc_files_html = "";
    for (let misc_name of misc_files) {
        misc_files_html += format("<a href=\"${0}\">${0}</a>\n", misc_name);
    }
    let prev_link = prev == null ? "" : format(format("<a href=\"../${0}/${1}\">🡠</a> ", prev, index_file_name));
    let next_link = next == null ? "" : format(format(" <a href=\"../${0}/${1}\">🡢</a>", next, index_file_name));
    write(dir + pathsep + index_file_name, format(template));
    return img_files[0];
}

let wd = cwd();
if (!wd::endswith(pathsep)) {
    wd += pathsep;
}
process_dir(wd);
print("Done.");
