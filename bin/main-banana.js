/*
Copyright 2024-2025 ShaJunXing <shajunxing@hotmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

let template = read(dirname(argv[1]) + pathsep + "template.html");
let index_file_name = "view-comic-here.html";
let up_href = "../" + index_file_name;

function last_directory(path) {
    let dirs = path::split(pathsep);
    let len = dirs::length();
    return dirs[len - 1] != "" ? dirs[len - 1] : dirs[len - 2];
}

function process_dir(dir) {
    let sub_entries = [];
    let img_files = [];
    let misc_files = [];
    ls(dir, function(filename, isdir) {
        if (isdir) {
            sub_entries::push([ filename, process_dir(dir + pathsep + filename) ]);
        } else if (filename::endswith(".jpg", ".jpeg", ".jpe", ".jfif", ".png", ".gif", ".bmp", ".webp")) {
            img_files::push(filename);
        } else {
            misc_files::push(filename);
        }
    });
    sub_entries::sort(function(lhs, rhs) { return natural_compare(lhs[0], rhs[0]); });
    img_files::sort(natural_compare);
    misc_files::sort(natural_compare);
    let title = last_directory(dir);
    let sub_dirs_html = "";
    for (let sub_entry of sub_entries) {
        let sub_dir = sub_entry[0];
        sub_dirs_html += format("<a href=\"${0}\"><img src = \"${1}\">${2}</a>\n",
            sub_dir + "/" + index_file_name, sub_entry[1] == null ? "" : sub_dir + "/" + sub_entry[1], last_directory(sub_dir));
    }
    let img_files_html = "";
    for (let img_name of img_files) {
        img_files_html += format("<img id=\"${0}\" src=\"${0}\" title=\"${0}\">\n", img_name);
    }
    let misc_files_html = "";
    for (let misc_name of misc_files) {
        misc_files_html += format("<a href=\"${0}\">${0}</a>\n", misc_name);
    }
    write(dir + pathsep + index_file_name, format(template));
    return img_files[0];
}

let wd = cwd();
if (!wd::endswith(pathsep)) {
    wd += pathsep;
}
process_dir(wd);
print("Done.");
