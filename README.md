# SFU MyExperience Compact (userscript)
Userscript to make SFU MyExperience "Job Postings" page more compact by eliminating wasted space.\
This will likely work on non-SFU version of MyExperience aside from a few text replacements, but is untested.

Uses Gleb Pirogov's [SFU MyExperience Revamp](https://userstyles.org/styles/180535/sfu-myexperience-revamp) (under CC-BY of unspecified version) as a base.

Beyond Gleb Pirogov's version, this includes
- Merges "Tags" and "App[lication] Status" columns as their usage is mutually exclusive
  - Anything from "App Status" is put in a (new) green tag to make it more visible
- Merges "Organization" and "Division" columns as a vast majority of companies don't use it (often just repeating the organization name in the division column)
- Shortens some wording prevent "Position Type" and "Openings" from being unnecessarily large

Note that this breaks sorting by "Division" (you will not be missed) and empty columns still take some space as removing them entirely would interfere with different parts of the script and likley the website as well.

### Current Issues
FIXME: Sorting the page causes the non-css reformating to be lost. Can be fixed by running the `reformat()` function again after a sort.

### (Minor) Limitation
Due to the nature of how the website itself loads, all the job postings must load before the script runs itself.
For an end user, this means there is a noticeable delay between when the page is first viewable and when the compactness changes take effect.
For the most part, there is nothing I can do about this unless the developers behind MyExperience make changes.

## Installation
To use the userscript, a userscript manager extension is required for your browser. 

This was tested with the open source [Violentmonkey](https://violentmonkey.github.io/) and is what I recommend.
Some other popular options are [Tampermonkey](https://www.tampermonkey.net/) (not open source) and [Greasemonkey](https://github.com/greasemonkey/greasemonkey) (open source), but many more exist.

This was also only tested in Firefox, but probably maybe possibly should work as expected with any other modern browser.

After installing a userscript manager, you can [click here to install the userscript](https://github.com/KaranveerB/SFU-MyExperience-Compact/raw/master/sfu-myexperience-compact.user.js).
