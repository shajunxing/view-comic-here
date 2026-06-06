/*
Copyright 2024-2026 ShaJunXing <shajunxing@hotmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

let wd = cwd();
for (;;) {
    let metadata = input("Paste metadata here: ")::split("||");
    if (metadata::length() > 0) {
        let chapter = metadata[0];
        try {
            md(chapter);
        }
        cd(chapter);
        for (let i = 1; i < metadata::length(); i++) {
            let imgdata = metadata[i] ::split("|");
            let url = imgdata[0];
            let filename = imgdata[1];
            spawn("cmd", "/c", "start", "/min", "cmd", "/c", "dch-worker", "-", url, filename);
        }
        cd(wd);
    }
}