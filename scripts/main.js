import * as ms from "@minecraft/server";
import * as msui from "@minecraft/server-ui";
import runEventAfterPlayerSpawn from "./events/after/playerSpawn";
import runEventBeforeChatSend from "./events/before/chatSend";
import runEventBeforePlayerInteractWithBlock from "./events/before/playerInteractWithBlock";
import runEventBeforeWatchdogTerminate from "./events/before/watchdogTerminate";
import runEventBeforePlayerPlaceBlock from "./events/before/playerPlaceBlock";
import runEventBeforePlayerBreakBlock from "./events/before/playerBreakBlock";
import runEventBeforeExplosion from "./events/before/explosion";
import runEventAfterPlayerPlaceBlock from "./events/after/playerPlaceBlock";
import runEventAfterPlayerInteractWithBlock from "./events/after/playerInteractWithBlock";
import runEventAfterPlayerBreakBlock from "./events/after/playerBreakBlock";
import runEventAfterPlayerLeave from "./events/after/playerLeave";
let playerArray = [];
const developers = ['MajorRage3367'];
const adminTag = "admin1";
const messageHideTag = "adminHide1";
const alertHideTag = "adminHide2";
const blockedTag = "blocked1";
const prefix = ">";
ms.system.beforeEvents.watchdogTerminate.subscribe(res => {
    runEventBeforeWatchdogTerminate(res);
});
const sleep = (n) => new Promise(acc => ms.system.runTimeout(acc, n));
// Every Tick
ms.system.runInterval(() => {
    // Fill Bedrock
    ms.world.getPlayers().forEach(player => {
        if (player.dimension.id == 'minecraft:overworld') {
            if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:bottomBedrock:overworld')?.getParticipants()[0]?.displayName)
                return;
            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:bottomBedrock:overworld').getParticipants()[0].displayName == "true") {
                player.runCommand(`/fill ~-10 -64 ~-10 ~10 -64 ~10 bedrock replace air`);
            }
        }
        else if (player.dimension.id == 'minecraft:nether') {
            if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:bottomBedrock:overworld')?.getParticipants()[0]?.displayName)
                return;
            if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:bottomBedrock:nether').getParticipants()[0].displayName == "true") {
                player.runCommand(`/fill ~-10 0 ~-10 ~10 0 ~10 bedrock replace air`);
            }
        }
    });
    ms.world.getDimension('overworld').runCommand(`gamerule playerssleepingpercentage 1`);
    ms.world.getDimension('overworld').runCommand(`gamerule commandblockoutput false`);
    // Creating scoreboard database
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:closeRealm:enabled')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:closeRealm:enabled', 'associatedRealmsEssentials:closeRealm:enabled');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "false" "associatedRealmsEssentials:closeRealm:enabled" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:closeRealm:reason')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:closeRealm:reason', 'associatedRealmsEssentials:closeRealm:reason');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:closeRealm:reason" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:nuke')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:command:nuke', 'associatedRealmsEssentials:command:nuke');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:command:nuke" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:adminTag')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:adminTag', 'associatedRealmsEssentials:save:adminTag');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:save:adminTag" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:chat')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:chat', 'associatedRealmsEssentials:save:chat');
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:enabled')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:joinMessages:enabled', 'associatedRealmsEssentials:joinMessages:enabled');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "true" "associatedRealmsEssentials:joinMessages:enabled" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:joinMessages:text')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:joinMessages:text', 'associatedRealmsEssentials:joinMessages:text');
        ms.world.getDimension('overworld').runCommand('scoreboard players set "§l§3Everyone Welcome §e[player]§3 to §6The Realm§r" "associatedRealmsEssentials:joinMessages:text" 0');
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:jukeboxPlus:enabled')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:jukeboxPlus:enabled', 'associatedRealmsEssentials:jukeboxPlus:enabled');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "true" "associatedRealmsEssentials:jukeboxPlus:enabled" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:bottomBedrock:overworld')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:bottomBedrock:overworld', 'associatedRealmsEssentials:bottomBedrock:overworld');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "true" "associatedRealmsEssentials:bottomBedrock:overworld" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:bottomBedrock:nether')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:bottomBedrock:nether', 'associatedRealmsEssentials:bottomBedrock:nether');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "true" "associatedRealmsEssentials:bottomBedrock:nether" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:association', 'associatedRealmsEssentials:save:association');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "Realm Essentials" "associatedRealmsEssentials:save:association" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:inventorys')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:inventorys', 'associatedRealmsEssentials:save:inventorys');
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:buildAll')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:buildAll', 'associatedRealmsEssentials:save:buildAll');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "true" "associatedRealmsEssentials:save:buildAll" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:buildPeople')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:buildPeople', 'associatedRealmsEssentials:save:buildPeople');
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:mutedPeople')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:mutedPeople', 'associatedRealmsEssentials:save:mutedPeople');
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:lawn')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:command:lawn', 'associatedRealmsEssentials:command:lawn');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:command:lawn" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:lockchest')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:lockchest', 'associatedRealmsEssentials:save:lockchest');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:save:lockchest" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:blocklogs')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:blocklogs', 'associatedRealmsEssentials:save:blocklogs');
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:blocklogsenabled')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:blocklogsenabled', 'associatedRealmsEssentials:save:blocklogsenabled');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "true" "associatedRealmsEssentials:save:blocklogsenabled" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:floatingtextguidata')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:floatingtextguidata', 'associatedRealmsEssentials:save:floatingtextguidata');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:save:floatingtextguidata" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet1')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet1', 'associatedRealmsEssentials:fillWand:coordsSet1');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet1" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:coordsSet2')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:coordsSet2', 'associatedRealmsEssentials:fillWand:coordsSet2');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:coordsSet2" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:player')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:player', 'associatedRealmsEssentials:fillWand:player');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:player" 0`);
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:fillWand:block')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:fillWand:block', 'associatedRealmsEssentials:fillWand:block');
        ms.world.getDimension('overworld').runCommand(`scoreboard players set "" "associatedRealmsEssentials:fillWand:block" 0`);
    }
    // if(!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:mail')){
    //     ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:mail', 'associatedRealmsEssentials:save:mail');
    // }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:accesslogs')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:accesslogs', 'associatedRealmsEssentials:save:accesslogs');
    }
    if (!ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:playerReports')) {
        ms.world.scoreboard.addObjective('associatedRealmsEssentials:save:playerReports', 'associatedRealmsEssentials:save:playerReports');
    }
    if ((ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:save:chat')?.getParticipants()?.length / 20) >= 100) {
        ms.world.scoreboard.removeObjective('associatedRealmsEssentials:save:chat');
    }
    if (ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:save:adminTag')?.getParticipants()) {
        if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:save:association')?.getParticipants()[0]?.displayName)
            return;
        ms.world.getPlayers().forEach(player => {
            // For every player currently in the game
            if (player.hasTag(adminTag)) {
                // If they have the admin tag
                var areTheyInTheDB = false;
                ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:adminTag').getParticipants().forEach(playerInDB => {
                    // Loop through everyone currently in the DB.
                    if (playerInDB.displayName == player.name) {
                        // If the player in the database is equal to the player currently in the world
                        areTheyInTheDB = true;
                        // They are in the database
                    }
                });
                if (areTheyInTheDB == false) {
                    // Add the player currently in the world into the database if they are not in the database
                    player.dimension.runCommand(`scoreboard players set "${player.name}" "associatedRealmsEssentials:save:adminTag" 0`);
                    // Wait a sec, we can just say to then you now have admin!
                    player.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${player.name} §6is now a admin.§r"}]}
                    `);
                }
                return;
            }
            ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:adminTag').getParticipants().forEach(playerInDB => {
                if (playerInDB.displayName == player.name) {
                    // Ok, remove them as they dont have admin tag anymore...
                    player.dimension.runCommand(`scoreboard players reset "${player.name}" "associatedRealmsEssentials:save:adminTag"`);
                    // Wait a sec, we can just say to then you have have been revoked as a admin!
                    player.dimension.runCommand(`
                        tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${player.name} §6has been revoked as a admin.§r"}]}
                    `);
                    player.dimension.runCommand(`
                        tellraw "${player.name}" {"rawtext":[{"text":"\n§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§e${player.name} §6has been revoked as a admin.§r"}]}
                    `);
                }
            });
        });
    }
    // Kick users when Close Realm is enabled.
    if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:closeRealm:enabled')?.getParticipants()[0]?.displayName)
        return;
    if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:closeRealm:enabled').getParticipants()[0].displayName == "true") {
        ms.world.getPlayers().forEach(player => {
            if (player.isOp())
                return;
            if (player.hasTag(adminTag))
                return;
            player.dimension.runCommand(`
                kick "${player.name}" "(${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}) A Admin closed the realm for: ${ms.world.scoreboard.getObjective('associatedRealmsEssentials:closeRealm:reason').getParticipants()[0].displayName}"
            `);
        });
    }
}, 1);
// Nuke command
ms.system.runInterval(() => {
    if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:command:nuke')?.getParticipants()[0]?.displayName)
        return;
    if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:nuke').getParticipants()[0].displayName != "") {
        ms.world.getPlayers().forEach(player => {
            if (player.name != ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:nuke').getParticipants()[0].displayName)
                return;
            player.dimension.runCommand(`
                execute positioned as "${ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:nuke').getParticipants()[0].displayName}" run summon tnt ~~1~
            `);
            player.dimension.runCommand(`execute as "${ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:nuke').getParticipants()[0].displayName}" positioned as "${ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:nuke').getParticipants()[0].displayName}" run kill @e[type=item, r=20]`);
        });
    }
}, 10);
// Lawn Handler
ms.system.runInterval(() => {
    if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:command:lawn')?.getParticipants()[0]?.displayName)
        return;
    if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:lawn').getParticipants()[0].displayName != "") {
        ms.world.getPlayers().forEach(player => {
            if (player.name != ms.world.scoreboard.getObjective('associatedRealmsEssentials:command:lawn').getParticipants()[0].displayName)
                return;
            player.runCommand(`
                fill ~5~5~5 ~-5~-5~-5 air replace tall_grass
            `);
            player.runCommand(`
                fill ~5~5~5 ~-5~-5~-5 air replace short_grass
            `);
            player.runCommand(`
                title @s actionbar §aLAWN ENABLED.
            `);
        });
    }
}, 1);
// Clear velocity of floating text
ms.system.runInterval(() => {
    ms.world.getPlayers().forEach(player => {
        player.dimension.getEntities().forEach(entity => {
            if (entity.typeId.includes("are:floating_text")) {
                entity.clearVelocity();
            }
        });
    });
}, 1);
let oldSong = null;
function playFromJukeboxThroughSpeakers(jukeboxCoordinates, dimension, songToPlay) {
    if (jukeboxCoordinates == undefined)
        return;
    if (dimension == undefined)
        return;
    if (songToPlay == undefined)
        return;
    let block = ms.world.getDimension(dimension).getBlock(jukeboxCoordinates);
    if (block?.typeId?.includes('jukebox')) {
        if (!ms?.world?.scoreboard?.getObjective('associatedRealmsEssentials:jukeboxPlus:enabled')?.getParticipants()[0]?.displayName)
            return;
        if (ms.world.scoreboard.getObjective('associatedRealmsEssentials:jukeboxPlus:enabled').getParticipants()[0].displayName != "true")
            return;
        if (songToPlay) {
            if (oldSong != null) {
                block.dimension.runCommand(`
                                stopsound @a[r=64, x=${block.location.x}, y=${block.location.y}, z=${block.location.z}] record.${oldSong.split('music_disc_')[1]}
                            `);
            }
            oldSong = songToPlay;
            if (!songToPlay.startsWith("music_disc_"))
                return;
            var res = ms.world.getDimension(dimension).runCommand(`
                            replaceitem block ${jukeboxCoordinates.x} ${jukeboxCoordinates.y} ${jukeboxCoordinates.z} slot.container 0 ${songToPlay}
                        `);
            if (res.successCount != 1)
                return;
            function runCustomPlayDisc() {
                // check for speakers and play.
                let theSpeakers = [];
                let radius = 32;
                ms.system.run(() => {
                    let speakers = block.dimension.getBlocks(new ms.BlockVolume({ x: block.location.x - radius, y: block.location.y - radius, z: block.location.z - radius }, { x: block.location.x + radius, y: block.location.y + radius, z: block.location.z + radius }), { includeTypes: ["f:altavoz1"] }, true);
                    let speaker = speakers.getBlockLocationIterator();
                    var i1 = 0, len1 = speakers.getCapacity();
                    while (i1 < len1) {
                        let speakerContent = speaker.next();
                        theSpeakers.push({ x: speakerContent.value.x, y: speakerContent.value.y, z: speakerContent.value.z });
                        i1++;
                    }
                    let speakerFound = false;
                    theSpeakers.forEach(speaker => {
                        speakerFound = true;
                        block.dimension.runCommand(`
                                            playsound record.${block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]} @a[r=64, x=${speaker.x}, y=${speaker.y}, z=${speaker.z}] ${speaker.x} ${speaker.y} ${speaker.z} 0.5 1
                                        `);
                    });
                    if (speakerFound == false) {
                        block.dimension.runCommand(`
                                            playsound record.${block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]} @a[r=64, x=${block.location.x}, y=${block.location.y}, z=${block.location.z}] ${block.location.x} ${block.location.y} ${block.location.z}
                                        `);
                    }
                });
            }
            let ticks = 0;
            let theIntervalToCancel = null;
            theIntervalToCancel = ms.system.runInterval(() => {
                if (block.getComponent('record_player').getRecord()?.typeId) {
                    let commandResult = block.dimension.runCommand(`
                                        stopsound @a[r=64, x=${block.location.x}, y=${block.location.y}, z=${block.location.z}] record.${block.getComponent('record_player').getRecord().typeId.split('music_disc_')[1]}
                                    `);
                    if (ticks == 16) {
                        ticks = 0;
                        runCustomPlayDisc();
                        ms.system.clearRun(theIntervalToCancel);
                    }
                    else {
                        ticks += 1;
                    }
                }
            }, 1);
            // ms.system.run(() => {
            //     player.runCommand('music stop 1') //Stop the game music
            //     player.dimension.setWeather(ms.WeatherType.Clear) //Make it sunny
            // })
            // if(player.hasTag(adminTag)){
            //     ms.system.run(() => {
            //         player.dimension.runCommand(`
            //             tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${player.name}!§r"}]}
            //         `)
            //     })
            // return}
            // ms.system.run(() => {
            //     player.dimension.runCommand(`
            //         tellraw @a[tag="${adminTag}"] {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${player.name}!§r"}]}
            //     `)
            //     player.dimension.runCommand(`
            //         tellraw "${player.name}" {"rawtext":[{"text":"§l§f§2${ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName}§r§l§a >> §r§l§aEnjoy the music §2${player.name}!§r"}]}
            //     `)
            // })
        }
    }
}
let rtpCountdown = 0;
let lastLocation = null;
// arefunction tag Handlers
ms.system.runInterval(() => {
    ms.world.getPlayers().forEach(player => {
        if (player.hasTag("arefunction:rtp")) { // Random Teleport
            function getTopBlock(player) {
                const { x, z } = player.location;
                return player.dimension.getBlockFromRay({ x, y: 320, z }, { x: 0, y: -1, z: 0 }, { "includeLiquidBlocks": true, "maxDistance": 10000 })?.block;
            }
            if (!(player.xRand || player.zRand)) {
                player.xRand = (Math.floor(Math.random() * 10000) - 5000);
                player.zRand = (Math.floor(Math.random() * 10000) - 5000);
            }
            player.teleport({ x: player.xRand, y: 320, z: player.zRand });
            const block = getTopBlock(player);
            if (!block) {
                player.runCommand(`title @s actionbar §7Waiting for chunks to load...`);
                return;
            }
            if (block.isSolid == false) {
                player.xRand = 0;
                player.zRand = 0;
                player.runCommand(`title @s actionbar §7No Solid Blocks found, relocating...`);
                return;
            }
            const { x, y, z } = block.location;
            player.teleport({ x: x, y: y + 1, z: z });
            player.xRand = 0;
            player.zRand = 0;
            player.runCommand(`title @s actionbar §7Successfully Teleported...`);
            player.removeTag("arefunction:rtp");
        }
        if (player.hasTag("arefunction:rtpWithCountdown")) {
            rtpCountdown += 1;
            if (rtpCountdown == 1) {
                player.runCommand(`title @s times 0 1000000000 0`);
                player.onScreenDisplay.setTitle("§6Teleporting in...");
                player.onScreenDisplay.updateSubtitle("§a3");
                player.playSound("random.orb", { "pitch": 1 });
            }
            if (rtpCountdown == 20) {
                player.onScreenDisplay.setTitle("§6Teleporting in...");
                player.onScreenDisplay.updateSubtitle("§e2");
                player.playSound("random.orb", { "pitch": 0.75 });
            }
            if (rtpCountdown == 40) {
                player.onScreenDisplay.setTitle("§6Teleporting in...");
                player.onScreenDisplay.updateSubtitle("§c1");
                player.playSound("random.orb", { "pitch": 0.50 });
            }
            if (rtpCountdown == 60) {
                player.runCommand(`title @s reset`);
                player.runCommand(`title @s clear`);
                player.addTag("arefunction:rtp");
                player.removeTag("arefunction:rtpWithCountdown");
                rtpCountdown = 0;
            }
        }
        if (player.hasTag("arefunction:cancelKnockbackNoMove")) {
            player.addTag("arefunction:cancelKnockback");
            if (lastLocation == null) {
                lastLocation = player.location;
            }
            else {
                if (lastLocation.x.toFixed(0).toString() + lastLocation.y.toFixed(0).toString() + lastLocation.z.toFixed(0).toString() !== player.location.x.toFixed(0).toString() + player.location.y.toFixed(0).toString() + player.location.z.toFixed(0).toString()) {
                    player.removeTag("arefunction:cancelKnockbackNoMove");
                    player.removeTag("arefunction:cancelKnockback");
                    lastLocation = null;
                }
            }
        }
        player.getTags().forEach(tag => {
            //console.warn(tag)
            if (tag.startsWith("areEval:")) {
                if (player.hasTag("developers1") && player.hasTag(adminTag) && developers.includes(player.name)) {
                    ms.system.run(() => {
                        let memberRank = "§bMember";
                        let memberRankNumInternal = 0;
                        player.getTags().forEach((tag2) => {
                            if (tag2.includes('arerank:')) {
                                if (tag2.replace('arerank:', '') !== "") {
                                    if (memberRankNumInternal == 0) {
                                        memberRank = tag2.replace('arerank:', '');
                                    }
                                    else {
                                        memberRank = memberRank + "§r§7§l] [§r" + tag2.replace('arerank:', '') + "§r";
                                    }
                                    memberRankNumInternal += 1;
                                }
                            }
                        });
                        memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
                        memberRank = memberRank.replaceAll("{owner}", "\uE111");
                        memberRank = memberRank.replaceAll("{regulations}", "\uE112");
                        memberRank = memberRank.replaceAll("{operator}", "\uE113");
                        memberRank = memberRank.replaceAll("{smiley}", "\uE114");
                        memberRank = memberRank.replaceAll("{major}", "\uE115");
                        function sendChatMessage(senderName, theChatMessage, theChatRank = null) {
                            if (theChatRank !== null) {
                                memberRank = theChatRank?.length ? theChatRank.join("§r§7§l] [§r") : theChatRank;
                            }
                            if (theChatRank?.length == 0) {
                                memberRank = "§bMember";
                            }
                            memberRank = memberRank.replaceAll("{operator_plain}", "\uE110");
                            memberRank = memberRank.replaceAll("{owner}", "\uE111");
                            memberRank = memberRank.replaceAll("{regulations}", "\uE112");
                            memberRank = memberRank.replaceAll("{operator}", "\uE113");
                            memberRank = memberRank.replaceAll("{smiley}", "\uE114");
                            memberRank = memberRank.replaceAll("{major}", "\uE115");
                            ms.world.sendMessage(`§7§l[§r${memberRank}§7§l]§r ${senderName}:§r §7${theChatMessage}§r`);
                        }
                        try {
                            let tagContent = tag;
                            eval(tagContent.replace("areEval:", ""));
                        }
                        catch (error) {
                            player.sendMessage(error.message);
                            player.sendMessage(error.stack);
                        }
                    });
                }
                player.removeTag(tag);
            }
        });
        player.getTags().forEach(tag => {
            //console.warn(tag)
            // Syntax: "areEvalMCCommand:say Hello::say World!||say This happened::say Instead."
            if (tag.startsWith("areEvalMCCommand:")) {
                ms.system.run(() => {
                    let tagContent = tag;
                    let multipleCommandsFound = false;
                    let arrayOfCommands = [];
                    tagContent.replace("areEvalMCCommand:", "").split("||").forEach(command => {
                        multipleCommandsFound = true;
                        arrayOfCommands.push(command);
                    });
                    if (multipleCommandsFound == false) {
                        let stackOperatorFound = false;
                        tagContent.replace("areEvalMCCommand:", "").split("::").forEach((command) => {
                            stackOperatorFound = true;
                        });
                        if (stackOperatorFound == false) {
                            player.runCommand(tagContent.replace("areEvalMCCommand:", "").replaceAll("{q}", "\""));
                        }
                        else {
                            tagContent.replace("areEvalMCCommand:", "").split("::").forEach((command) => {
                                player.runCommand(command.replaceAll("{q}", "\""));
                                sleep(10);
                            });
                        }
                    }
                    else {
                        let stackOperatorFound = false;
                        let randomIndexForArrayOfCommands = Math.floor(Math.random() * arrayOfCommands.length);
                        arrayOfCommands[randomIndexForArrayOfCommands].split("::").forEach((command) => {
                            stackOperatorFound = true;
                        });
                        if (stackOperatorFound == false) {
                            player.runCommand(arrayOfCommands[randomIndexForArrayOfCommands].replaceAll("{q}", "\""));
                        }
                        else {
                            arrayOfCommands[randomIndexForArrayOfCommands].split("::").forEach((command) => {
                                player.runCommand(command.replaceAll("{q}", "\""));
                                sleep(10);
                            });
                        }
                    }
                });
                player.removeTag(tag);
            }
        });
        player.getTags().forEach(tag => {
            if (tag.startsWith("areShowMessageGui:")) {
                ms.system.run(async () => {
                    try {
                        let tagContent = tag;
                        if (tagContent.includes('::')) {
                            let arrayOfData = tagContent.replace("areShowMessageGui:", "");
                            arrayOfData = arrayOfData.split('::');
                            let title = "Clidewood Realm";
                            let description = "No Description...";
                            let button1Text = "Cancel";
                            let button2Text = "OK";
                            let commandForButton1 = null;
                            let commandForButton2 = null;
                            if (arrayOfData[0]) {
                                title = arrayOfData[0].replaceAll("{newline}", "\n").replaceAll("{user}", player.name).replaceAll("{association}", ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName);
                            }
                            if (arrayOfData[1]) {
                                description = arrayOfData[1].replaceAll("{newline}", "\n").replaceAll("{user}", player.name).replaceAll("{association}", ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName);
                            }
                            if (arrayOfData[2])
                                button1Text = arrayOfData[2];
                            if (arrayOfData[3])
                                button2Text = arrayOfData[3];
                            if (arrayOfData[4]) {
                                commandForButton1 = arrayOfData[4].replaceAll("{q}", "\"").replaceAll("{user}", player.name).replaceAll("{association}", ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName);
                                if (commandForButton1.includes("||"))
                                    commandForButton1 = commandForButton1.split("||");
                            }
                            if (arrayOfData[5]) {
                                commandForButton2 = arrayOfData[5].replaceAll("{q}", "\"").replaceAll("{user}", player.name).replaceAll("{association}", ms.world.scoreboard.getObjective('associatedRealmsEssentials:save:association').getParticipants()[0].displayName);
                                if (commandForButton2.includes("||"))
                                    commandForButton2 = commandForButton2.split("||");
                            }
                            // Show the GUI
                            let form = new msui.MessageFormData()
                                .title(title)
                                .body(description)
                                .button1(button1Text)
                                .button2(button2Text);
                            const formData = await form.show(player);
                            player.removeTag(tag);
                            if (formData.selection === 0 && commandForButton1 !== null) {
                                if (Array.isArray(commandForButton1)) {
                                    commandForButton1.forEach(c => player.runCommand(c));
                                }
                                else {
                                    player.runCommand(commandForButton1);
                                }
                            }
                            else if (formData.selection === 1 && commandForButton2 !== null) {
                                if (Array.isArray(commandForButton2)) {
                                    commandForButton2.forEach(c => player.runCommand(c));
                                }
                                else {
                                    player.runCommand(commandForButton2);
                                }
                            }
                        }
                    }
                    catch (e) {
                    }
                });
            }
        });
        player.getTags().forEach(tag => {
            //console.warn(tag)
            if (tag.startsWith("areSpeakerEngine:")) {
                // "areSpeakerEngine:0 0 0||overworld||music_disc_stal"
                ms.system.run(() => {
                    try {
                        let tagContent = tag;
                        let tagContentInner = tagContent.replace("areSpeakerEngine:", "");
                        let finalArray = tagContentInner.split('||');
                        let coordinatesSplit = finalArray[0].split(' ');
                        let coordinates = { x: parseInt(coordinatesSplit[0]), y: parseInt(coordinatesSplit[1]), z: parseInt(coordinatesSplit[2]) };
                        playFromJukeboxThroughSpeakers(coordinates, player.dimension.id, finalArray[1]);
                    }
                    catch { }
                });
                player.removeTag(tag);
            }
        });
        // arefunction:cancelKnockback is built in using json.
    });
}, 1);
// AFK Handler
ms.system.runInterval(() => {
    ms.world.getPlayers().forEach(player => {
        if (player.hasTag('afk1')) {
            player.runCommand(`
                title @s actionbar §eYou are AFK, Type >afk to turn it off.
            `);
            player.runCommand('effect @s instant_health 1 255 true');
            player.runCommand('effect @s weakness 1 255 true');
            player.runCommand('inputpermission set @s movement disabled');
        }
    });
}, 1);
// Custom Deny Block Handling
ms.system.runInterval(() => {
    ms.world.getPlayers().forEach((player) => {
        if (!player.hasTag(adminTag)) {
            // for people without admin1 tag
            if (player.dimension.getBlockFromRay({ x: player.location.x, y: player.location.y + 0.50, z: player.location.z }, { x: 0, y: -1, z: 0 }, { "maxDistance": 999999, "includeTypes": ["are:super_deny"] })?.block) {
                // standing over a super deny
                player.addTag("areinternal:standingOverSuperDeny");
            }
            else {
                // not standing over a super deny
                player.removeTag("areinternal:standingOverSuperDeny");
            }
            if (player.dimension.getBlockFromRay({ x: player.location.x, y: player.location.y + 0.50, z: player.location.z }, { x: 0, y: -1, z: 0 }, { "maxDistance": 999999, "includeTypes": ["are:ultra_deny"] })?.block) {
                // standing over a ultra deny
                player.addTag("areinternal:standingOverUltraDeny");
            }
            else {
                // not standing over a ultra deny
                player.removeTag("areinternal:standingOverUltraDeny");
            }
            if (player.dimension.getBlockFromRay({ x: player.location.x, y: player.location.y + 0.50, z: player.location.z }, { x: 0, y: -1, z: 0 }, { "maxDistance": 999999, "includeTypes": ["are:hyper_deny"] })?.block) {
                // standing over a hyper deny
                player.addTag("areinternal:standingOverHyperDeny");
                player.addTag("arefunction:cancelKnockback");
                player.inputPermissions.setPermissionCategory(ms.InputPermissionCategory.Movement, false);
                player.inputPermissions.setPermissionCategory(ms.InputPermissionCategory.Jump, false);
            }
            else {
                // not standing over a hyper deny
                player.removeTag("areinternal:standingOverHyperDeny");
                if (player.inputPermissions.isPermissionCategoryEnabled(ms.InputPermissionCategory.Movement) == false || player.inputPermissions.isPermissionCategoryEnabled(ms.InputPermissionCategory.Jump) == false) {
                    player.removeTag("arefunction:cancelKnockback");
                    player.inputPermissions.setPermissionCategory(ms.InputPermissionCategory.Movement, true);
                    player.inputPermissions.setPermissionCategory(ms.InputPermissionCategory.Jump, true);
                }
            }
        }
        else {
            // if admin1 tag was added
            player.removeTag("areinternal:standingOverSuperDeny");
            player.removeTag("areinternal:standingOverUltraDeny");
            player.removeTag("areinternal:standingOverHyperDeny");
            if (player.inputPermissions.isPermissionCategoryEnabled(ms.InputPermissionCategory.Movement) == false || player.inputPermissions.isPermissionCategoryEnabled(ms.InputPermissionCategory.Jump) == false) {
                player.removeTag("arefunction:cancelKnockback");
                player.inputPermissions.setPermissionCategory(ms.InputPermissionCategory.Movement, true);
                player.inputPermissions.setPermissionCategory(ms.InputPermissionCategory.Jump, true);
            }
        }
    });
}, 1);
// Player Active
ms.world.afterEvents.playerSpawn.subscribe(async (player) => {
    runEventAfterPlayerSpawn(player, developers);
});
ms.world.beforeEvents.chatSend.subscribe(chatMessage => {
    runEventBeforeChatSend(chatMessage, adminTag, prefix, playerArray, messageHideTag, blockedTag);
});
ms.world.beforeEvents.playerInteractWithBlock.subscribe((block) => {
    runEventBeforePlayerInteractWithBlock(block, adminTag, messageHideTag);
});
ms.world.beforeEvents.playerPlaceBlock.subscribe((block) => {
    runEventBeforePlayerPlaceBlock(block);
});
ms.world.beforeEvents.playerBreakBlock.subscribe((block) => {
    runEventBeforePlayerBreakBlock(block, adminTag, messageHideTag);
});
ms.world.beforeEvents.explosion.subscribe(explosion => {
    runEventBeforeExplosion(explosion);
});
ms.world.afterEvents.playerPlaceBlock.subscribe(block => {
    runEventAfterPlayerPlaceBlock(block, adminTag, messageHideTag, alertHideTag);
});
ms.world.afterEvents.playerInteractWithBlock.subscribe(block => {
    runEventAfterPlayerInteractWithBlock(block, adminTag, messageHideTag, alertHideTag);
});
ms.world.afterEvents.playerBreakBlock.subscribe(block => {
    runEventAfterPlayerBreakBlock(block, adminTag, messageHideTag, alertHideTag);
});
ms.world.afterEvents.playerLeave.subscribe(player => {
    runEventAfterPlayerLeave(player, developers);
});
// ms.world.afterEvents.entitySpawn.subscribe(entity => {
//     runEventAfterEntitySpawn(entity);
// })
// ms.world.beforeEvents.entityRemove.subscribe(entity => {
//     runEventBeforeEntityRemove(entity);
// })
