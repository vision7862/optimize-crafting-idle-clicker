# Optimize Crafting Idle Clicker

## Description
This program is a helper calculator for the game Crafting Idle Clicker, on Steam and mobile. All credit to BlingHub for their game and all game data.

It has two main functions: 
1. Compute the optimized workshop (including events) for a given goal, such as 12 fame, most time-efficient gems, most lore, etc for a given workshop status, including active boosts, level, and multipliers.
2. Return the blueprints to level, in 10-lvl increments, to get a new achievement rank for the least lore cost, for a specific set, or for a set category such as Merchant Revenue.

It requires a fair amount of setup to be able to do this, primarily in recording your blueprint library, but not heavy upkeep. 

## Installation
1. Clone the repository to your machine through the command prompt with `git clone https://github.com/vision7862/optimize-crafting-idle-clicker.git`
2. Change directory into the new folder with `cd optimize-crafting-idle-clicker`
3. Download library files with `yarn install`
4. Open the files under the EDIT_ME folder with your preferred text editor. Matching the existing syntax, fill out the details of your specific game:   
  a. GameStatus.json: boost multipliers purchased, number of days played, dynasty multipliers currently active, etc   
  b. BlueprintLibrary.ts: the evolution stages, upgrade levels, and scores of each blueprint you own. Currently only the top blueprint is important, so no need to record your stage V and stage IV for the same product. Common merging strategies are included at the top for convenience of evolution stage and scoreChange, but are optional.  
  c. Strategies.ts: for each blueprint set, record your strategy (ex. 51+10) for main blueprints and non-main blueprints. (Only required for blueprint-merging side of the optimizer)   
  A code editor will help with syntax here- [Visual Studio Code](https://code.visualstudio.com/download) is free and simple to set up.  

5. Compile and run the program with `yarn local`  
Each time you change something in EDIT_ME, rerun `yarn local`. If nothing has changed, you can use the shortcut `optimizer` to skip the re-building and bring up the workshop optimizer again.

## Usage
#### Workshop Optimizer
After running `yarn local` in your command prompt (or the shortcut `optimizer` after you've done it once since changing any code, including files under EDIT_ME), follow the prompts to fill out your current workshop status regarding active boosts, workshop level, number of researchers, etc.  
Choose a goal, from creating a workshop to get to a specific amount of fame, the fastest way to level up, the most efficient gems/time, etc. vision7862 highly recommends choosing "audit multipliers" the first time, and comparing the values against those in-game in the final tab of the workshop. Discrepancies should be fixed by updating multipliers in GameStatus or correcting blueprint scores in BlueprintLibrary. Further debuggability is on the TODO list ([GH-54](https://github.com/vision7862/optimize-crafting-idle-clicker/issues/54))- feel free to reach out to @vision7862 for direct help.  
After the program runs, it will print the products, levels, and merchants needed to achieve your goal most optimally. It will also print the workshop status, which is a JSON object, and can be copied and edited to shortcut the program in future uses.

#### Blueprint upgrade optimizer
This is currently available through running "tests" in [optimizeUpgradingBlueprints.test.ts](./test/upgradeBlueprints/optimizeUpgradingBlueprints.test.ts). A program to run code ([IDE](https://code.visualstudio.com/download)) is required for this. Making a command line interface for this is on the TODO list ([GH-6](https://github.com/vision7862/optimize-crafting-idle-clicker/issues/6)).  
Some commonly used tests are: 
- `upgradeMostImpactfulSetOfType research`
- `printUpgradeInfoOfEachSet`
- `making space: merge specified stage 1 blueprints` (to print the strategy)  

When given a list of blueprints to upgrade to the specified level, possibly including merging, it is easiest to copy the upgradeLevel and score section directly into BlueprintLibrary. The other parameters should already be set through the strategy object shortcut.

#### Compute time to target of arbitrary workshop
This one is not a main goal and is thus not very user-friendly, but inputting any workshop product setup in [targetHelpers.test.ts](./test/buildWorkshop/helpers/targetHelpers.test.ts) > `test community builds`, giving a workshop status, and a money target, it will print the time to build. Knowledge of Javascript, or good pattern-matching skills, are beneficial here.


## Major TODOs and Notes
- Workshops in which an earlier product make much more money than a later product are not optimized well. My attempts thus far have caused horrible performance impacts. [GH-42](https://github.com/vision7862/optimize-crafting-idle-clicker/issues/42)
- Number of merchants is directly related to how many are needed to sell all the products produced at that level, and are not optimized based on number available or anything else. [GH-11](https://github.com/vision7862/optimize-crafting-idle-clicker/issues/11)
- Only top blueprints are included, so costs to merge a blueprint are inflated if you have already merged some lower-level blueprints on your way up. [GH-4](https://github.com/vision7862/optimize-crafting-idle-clicker/issues/4)
- When upgrading blueprints, the list is sorted such that higher scores are at the bottom, because sometimes doing a more expensive upgrade means you don't have to do some of the cheap ones. Start at the bottom and work your way up. [GH-28](https://github.com/vision7862/optimize-crafting-idle-clicker/issues/28)
- There is currently no usage of offline mode or the click boost. I'd love to hear how you would want them incorporated into this calculator, or just how you use them in your gameplay!
- The program calculates time on whole-cycle ticks, rather than the half-ticks that the game actually runs on, and does not account for having to finish another cycle after building to produce inputs, so building times may be a few seconds off.

## More Resources
- [Discord community](https://discord.gg/weATUfr)
- [Scoli's Beginner's Guide](https://www.youtube.com/playlist?list=PLFKnFBplIpYTAFevuIfIbSJQWeU8J0Rxk)
- [Set Recommendations spreadsheet](https://docs.google.com/spreadsheets/d/1FITLpcC6256luAu8_TLtq2DQXCfp51JHmdFGMyISlzg/edit#gid=166481165)
- [Event Builds spreadsheet](https://docs.google.com/spreadsheets/d/1HFJ42VLELJZ4TKy3btCsgJDquhWe-V8n3O-qkuOUPYU/edit#gid=1910107765)
- [Blueprint locations spreadsheet](https://docs.google.com/spreadsheets/d/1QX_X3WKkQIc5RrhFgGq91w85vIkV0xPrh3bmJSwJECw/edit#gid=1198122905)
- [Verage's calculation spreadsheet, updated by HunterSeeker](https://docs.google.com/spreadsheets/d/1QeJ5R9OQzduW3afX7Oyj3YFxHIo10CQGltgVwAayxDg/edit#gid=1281587777)
- [Gem spending recommendations](https://docs.google.com/spreadsheets/d/1WwsOkw8OKuA8ydaEDJsrLdKL8X2ahKX3lNoRkj3RjVI/edit#gid=0)
- [Lore by level spreadsheet](https://docs.google.com/spreadsheets/d/1oVyXkED8FXZilzsrrHIs69KAb9MlQtghgMDG_pjynqs/edit#gid=0) (to recommend what level to reincarnate at)
- [Zwilariel's Fame Mission Waiting Time spreadsheet](https://docs.google.com/spreadsheets/d/1Y74HBIfpGi90XhljEEI-e_H9JJxGGAzubzJawAIwWEQ/edit#gid=1687380893)

## Credits
Special thanks to: 
- Scoli for the getting started video series
- HunterSeeker for getting @vision7862 access to high level blueprint data
- Sziamonra, HunterSeeker, and 8x Parachute (and historically Scoli, Verage Garoo, and Zathras) for blueprint set upgrade suggestions, especially the format they should take
- 8x Parachute (& helpers) for the blueprint location tracking, especially listing which blueprints can be found outside of events and packs
- Sziamonra, Scoli, KaWeNGoD, tqoftu, and many more for the optimized event builds, providing a benchmark for how much further the workshop optimizer functionality has to go
- All contributors to the wiki, especially regarding achievement ranks, premium bonus multipliers, lore calculation formulas, and more
- Everyone who shares their progress, suggestions, experiments, and opinions in the CIC discord. @vision7862 would not have built this calculator without this community intensity!