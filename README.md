# View Comic Here

This article is openly licensed via [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

This project requires <https://github.com/shajunxing/banana-script>.

Generate HTML files in your comic folder 

Add `bin` folder into `path` environment. Open command prompt, go to where your comic located, run `mch.bat`, will recursively generate `view-comic-here.html` in all sub folders so that you can directly open and enjoy them through web browser, just like this:

![](screenshot.png)

Download comics from certain websites using `dch.bat`. Need to be corporated with GreaseMonkey scripts for generating downloading metadata. Metadata format is:

`chapter(sub folder name)||image url|image file name||image url|image file name ...`

For example:

```
111||https://i1.website.com/token/b28d4bd53010166775q16%3At%3An92.r2rp2q-7c330w%3Ao%3A0r4%3A9q569q230o0/0.jpg|0.jpg||https://i1.website.com/token/db86ff213010166775qr6%3At%3An92.r3op2q-7c360w%3Ao%3A0r4%3A9q769s23121/1.jpg|1.jpg||https://i1.website.com/token/98d282b03010166775q06%3At%3An92.r31p2q-7c370w%3Ao%3A0r4%3A9qr69923o92/2.jpg|2.jpg||https://i1.website.com/token/16402ed13010166775qp6%3At%3An92.r40p2q-7c390w%3Ao%3A0r4%3A9qn69023603/3.jpg|3.jpg||https://i1.website.com/token/1b480a8c3010166775q16%3At%3An92.rs0p2q-7c340w%3Ao%3A0r4%3A9q469023np4/4.jpg|4.jpg||https://i1.website.com/token/f93f5c3d3010166775q46%3At%3An92.r0rp2q-7c340w%3Ao%3A0r4%3A9q569823nr5/5.jpg|5.jpg||https://i1.website.com/token/665da4453010166775qq6%3At%3An92.r24p2q-7c3s0w%3Ao%3A0r4%3A9q869o234p6/6.jpg|6.jpg||https://i1.website.com/token/4d1d1a283010166775q96%3At%3An92.rs4p2q-7c370w%3Ao%3A0r4%3A9q269023657/7.jpg|7.jpg||https://i1.website.com/token/62f6f5303010166775q56%3At%3An92.r97p2q-7c3s0w%3Ao%3A0r4%3A9q4697237s8/8.jpg|8.jpg||https://i1.website.com/token/8e91df843010166775q86%3At%3An92.r69p2q-7c380w%3Ao%3A0r4%3A9q269n231p9/9.jpg|9.jpg||https://i1.website.com/token/1f88a6333010166775.942rn6%3A%3A91%3A126t397c3p0w2o%3A0q6%3Apq8q9n2r8-0/10.jpg|10.jpg||https://i1.website.com/token/01a1cbcb3010166775.242rn6%3A%3A91%3A371t397c390w2o%3A0q6%3Apqoq932r8-1/11.jpg|11.jpg||https://i1.website.com/token/150a796f3010166775.r42rn6%3A%3A91%3A593t397c390w2o%3A0q6%3Apq3q9p2rp-2/12.jpg|12.jpg||https://i1.website.com/token/c697e1c73010166775.542rn6%3A%3A91%3Asp6t397c330w2o%3A0q6%3Apq3q9s2rs-3/13.jpg|13.jpg||https://i1.website.com/token/7d15b7873010166775.o42rn6%3A%3A91%3A59nt397c3r0w2o%3A0q6%3Apq9q9r2r8-4/14.jpg|14.jpg||https://i1.website.com/token/fba0ee303010166775.o42rn6%3A%3A91%3Aq2qt397c310w2o%3A0q6%3Apqqq912r2-5/15.jpg|15.jpg||https://i1.website.com/token/2e32c0293010166775.o42rn6%3A%3A91%3Anp0t397c390w2o%3A0q6%3Apq1q902r4-6/16.jpg|16.jpg||https://i1.website.com/token/347762043010166775.942rn6%3A%3A91%3Aoo3t397c3p0w2o%3A0q6%3Apq0q9q2r5-7/17.jpg|17.jpg||https://i1.website.com/token/313988573010166775.n42rn6%3A%3A91%3An6pt397c3s0w2o%3A0q6%3Apqnq952rq-8/18.jpg|18.jpg||https://i1.website.com/token/55974faa3010166775.642rn6%3A%3A91%3A004t397c3r0w2o%3A0q6%3Apqpq9n2rn-9/19.jpg|19.jpg||https://i1.website.com/token/d7b243573010166775.742rn6%3A%3A92%3Aq20t397c3o0w2o%3A0q6%3Apq0q952r7-0/20.jpg|20.jpg||https://i1.website.com/token/354ead763010166775.s42rn6%3A%3A92%3A3rnt397c3o0w2o%3A0q6%3Apq5q942r6-1/21.jpg|21.jpg
```