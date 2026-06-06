/*
Copyright 2024-2026 ShaJunXing <shajunxing@hotmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
let fp = fopen(dirname(argv[1]) + pathsep + "vch-template.txt", "r");
let template = fread(fp);
fclose(fp);
let index_file_name = "vch.html";
let up_link = sprintf("<a href=\"../%s\">🡡</a>", index_file_name);

function last_directory(path) {
    let dirs = path::split(pathsep);
    let len = dirs::length();
    return dirs[len - 1] != "" ? dirs[len - 1] : dirs[len - 2];
}

// returns first image as cover
let process_dir;
process_dir = function(dir, prev, next) {
    // print(dir);
    let sub_dirs = [];
    let img_files = [];
    let misc_files = [];
    ls(dir, function(filename, isdir) {
        if (isdir) {
            sub_dirs::push(filename);
        } else if (filename::tolower()::endswith(".jpg", ".jpeg", ".jpe", ".jfif", ".png", ".gif", ".bmp", ".webp")) {
            img_files::push(filename);
        } else {
            misc_files::push(filename);
        }
    });
    sub_dirs::sort();
    img_files::sort();
    misc_files::sort();
    let title = last_directory(dir);
    let sub_dirs_html = "";
    for (let i = 0; i < sub_dirs::length(); i++) {
        let sub_dir = sub_dirs[i];
        let cover = process_dir(dir + pathsep + sub_dir, i - 1 < 0 ? null : sub_dirs[i - 1], sub_dirs[i + 1]);
        sub_dirs_html += sprintf("<a href=\"%s\"><img src = \"%s\">%s</a>\n",
            urlescape(sub_dir) + "/" + index_file_name, cover == null ? "" : urlescape(sub_dir) + "/" + cover, last_directory(sub_dir));
    }
    // print(sub_dirs_html);
    let img_files_html = "";
    for (let img_name of img_files) {
        img_files_html += sprintf("<img id=\"%1$s\" src=\"%1$s\" title=\"%1$s\">\n", urlescape(img_name));
    }
    // print(img_files_html);
    let misc_files_html = "";
    for (let misc_name of misc_files) {
        misc_files_html += sprintf("<a href=\"%s\">%s</a>\n", urlescape(misc_name), misc_name);
    }
    // print(misc_files_html);
    let prev_link = prev == null ? "<span class = \"button\"></span>" : sprintf("<a class=\"button\" href=\"../%s/%s\">🡠</a>", urlescape(prev), index_file_name);
    let next_link = next == null ? "<span class = \"button\"></span>" : sprintf("<a class=\"button\" href=\"../%s/%s\">🡢</a>", urlescape(next), index_file_name);
    fp = fopen(dir + pathsep + index_file_name, "w");
    fprintf(fp, template,
        title, sub_dirs_html, img_files_html, misc_files_html,
        prev_link, up_link, next_link);
    fclose(fp);
    return img_files[0];
};

process_dir(cwd());
print("Done.");
