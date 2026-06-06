/*
Copyright 2024-2026 ShaJunXing <shajunxing@hotmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

let url, filename;
for (let i in argv) {
    if (argv[i] == "-") {
        url = argv[i + 1];
        filename = argv[i + 2];
    }
}
for (;;) {
    let command = "wget " + url;
    system(command);
    let st = stat(filename);
    if (st.size > 0) {
        break;
    }
    rm(filename);
}
