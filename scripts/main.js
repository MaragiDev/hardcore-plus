import * as ms from "@minecraft/server";
ms.system.runInterval(() => {
    if (!ms.world.scoreboard.getObjective("hardcorePlus.save.deadPlayers")) {
        ms.world.scoreboard.addObjective("hardcorePlus.save.deadPlayers", "hardcorePlus.save.deadPlayers");
    }
}, 1);
ms.system.runInterval(() => {
    const deadObjective = ms.world.scoreboard.getObjective("hardcorePlus.save.deadPlayers");
    const deadParticipants = deadObjective ? deadObjective.getParticipants() : [];
    const deadNames = deadParticipants.map(score => score.displayName.split("\ue1ff\ue1ff\ue1ff")[0]);
    const deadPeople = deadParticipants.map(score => [score.displayName.split("\ue1ff\ue1ff\ue1ff")[0], score.displayName.split("\ue1ff\ue1ff\ue1ff")[1], score.displayName.split("\ue1ff\ue1ff\ue1ff")[2]]);
    ms.world.getPlayers().forEach(plr => {
        const isDead = deadNames.includes(plr.name);
        const currentGameMode = plr.getGameMode();
        if (isDead) {
            deadPeople.forEach(deadPerson => {
                if (deadPerson[0] == plr.name) {
                    plr.setGameMode(ms.GameMode.Spectator);
                    if (plr.tryTeleport({ x: parseInt(deadPerson[1].split(" ")[0]) + .5, y: parseInt(deadPerson[1].split(" ")[1]), z: parseInt(deadPerson[1].split(" ")[2]) + .5 }, { dimension: ms.world.getDimension(deadPerson[2]) })) {
                        plr.teleport({ x: parseInt(deadPerson[1].split(" ")[0]) + .5, y: parseInt(deadPerson[1].split(" ")[1]), z: parseInt(deadPerson[1].split(" ")[2]) + .5 }, { dimension: ms.world.getDimension(deadPerson[2]) });
                    }
                }
            });
        }
        else if (!isDead && currentGameMode == ms.GameMode.Spectator) {
            plr.setGameMode(ms.GameMode.Survival);
        }
    });
}, 1);
ms.system.runInterval(() => {
    const deadObjective = ms.world.scoreboard.getObjective("hardcorePlus.save.deadPlayers");
    const deadParticipants = deadObjective ? deadObjective.getParticipants() : [];
    const deadPeople = deadParticipants.map(score => [
        score.displayName.split("\ue1ff\ue1ff\ue1ff")[0],
        score.displayName.split("\ue1ff\ue1ff\ue1ff")[1],
        score.displayName.split("\ue1ff\ue1ff\ue1ff")[2]
    ]);
    ms.world.getPlayers().forEach(plr => {
        deadPeople.forEach((deadPersonInfo) => {
            const coords = deadPersonInfo[1].split(" ");
            const blockPosition = {
                x: parseFloat(coords[0]),
                y: parseFloat(coords[1]),
                z: parseFloat(coords[2])
            };
            const radius = 15;
            const dx = plr.location.x - blockPosition.x;
            const dy = plr.location.y - blockPosition.y;
            const dz = plr.location.z - blockPosition.z;
            const distanceSquared = dx * dx + dy * dy + dz * dz;
            if (distanceSquared <= radius * radius) {
                ms.system.run(() => {
                    if (plr?.getComponent("minecraft:inventory")?.container?.getSlot(plr.selectedSlotIndex)?.getItem()?.typeId?.includes("hardcoreplus:soul_skull") && !(plr?.getComponent("minecraft:inventory")?.container?.getSlot(plr.selectedSlotIndex)?.getItem()?.typeId?.includes("hardcoreplus:soul_skull_"))) {
                        if (plr?.getComponent("minecraft:inventory")?.container?.getSlot(plr.selectedSlotIndex)?.getItem()?.nameTag?.toLowerCase() == deadPersonInfo[0].toLowerCase()) {
                            if (plr?.dimension?.id == deadPersonInfo[2]) {
                                // yes now revive the player
                                plr.getComponent("minecraft:inventory").container.getSlot(plr.selectedSlotIndex).setItem();
                                plr.dimension.spawnEntity("minecraft:lightning_bolt", { x: blockPosition.x, y: blockPosition.y, z: blockPosition.z });
                                plr.dimension.spawnEntity("minecraft:lightning_bolt", { x: blockPosition.x, y: blockPosition.y, z: blockPosition.z });
                                plr.dimension.spawnEntity("minecraft:lightning_bolt", { x: blockPosition.x, y: blockPosition.y, z: blockPosition.z });
                                plr.dimension.runCommand(`/particle minecraft:crop_growth_area_emitter ${blockPosition.x} ${blockPosition.y} ${blockPosition.z}`);
                                plr.dimension.runCommand(`/particle minecraft:crop_growth_area_emitter ${blockPosition.x} ${blockPosition.y} ${blockPosition.z}`);
                                plr.dimension.runCommand(`/particle minecraft:crop_growth_area_emitter ${blockPosition.x} ${blockPosition.y} ${blockPosition.z}`);
                                ms.world.getPlayers().forEach(plr2 => {
                                    plr.dimension.playSound("note.bit", { x: plr2.location.x, y: plr2.location.y, z: plr2.location.z }, { pitch: 2 });
                                    plr.dimension.playSound("note.bit", { x: plr2.location.x, y: plr2.location.y, z: plr2.location.z }, { pitch: 1.5 });
                                    ms.system.runTimeout(() => {
                                        plr.dimension.playSound("note.bit", { x: plr2.location.x, y: plr2.location.y, z: plr2.location.z }, { pitch: 1 });
                                        plr.dimension.playSound("note.bit", { x: plr2.location.x, y: plr2.location.y, z: plr2.location.z }, { pitch: 0.75 });
                                        ms.system.runTimeout(() => {
                                            plr.dimension.playSound("note.bit", { x: plr2.location.x, y: plr2.location.y, z: plr2.location.z }, { pitch: 4 });
                                            plr.dimension.playSound("note.bit", { x: plr2.location.x, y: plr2.location.y, z: plr2.location.z }, { pitch: 2.5 });
                                        }, 10);
                                    }, 10);
                                });
                                ms.world.sendMessage(`§e${deadPersonInfo[0]} has just been REVIVED!`);
                                ms.world.scoreboard.getObjective("hardcorePlus.save.deadPlayers").getParticipants().forEach(participant => {
                                    if (participant.displayName.split("\ue1ff\ue1ff\ue1ff")[0] == deadPersonInfo[0]) {
                                        ms.world.scoreboard.getObjective("hardcorePlus.save.deadPlayers").removeParticipant(participant);
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    });
}, 1);
ms.world.afterEvents.playerSpawn.subscribe((player) => {
    if (!player.initialSpawn) {
        player.player.setGameMode(ms.GameMode.Spectator);
        const deadObjective = ms.world.scoreboard.getObjective("hardcorePlus.save.deadPlayers");
        const deadParticipants = deadObjective ? deadObjective.getParticipants() : [];
        const deadNames = deadParticipants.map(score => score.displayName.split("\ue1ff\ue1ff\ue1ff")[0]);
        const deadPeople = deadParticipants.map(score => [score.displayName.split("\ue1ff\ue1ff\ue1ff")[0], score.displayName.split("\ue1ff\ue1ff\ue1ff")[1], score.displayName.split("\ue1ff\ue1ff\ue1ff")[2]]);
        deadPeople.forEach(deadPerson => {
            if (deadPerson[0] == player.player.name) {
                player.player.teleport({ x: parseInt(deadPerson[1].split(" ")[0]) + .5, y: parseInt(deadPerson[1].split(" ")[1]), z: parseInt(deadPerson[1].split(" ")[2]) + .5 }, { dimension: ms.world.getDimension(deadPerson[2]) });
                player.player.addEffect("minecraft:instant_health", 300, { amplifier: 255, showParticles: false });
                player.player.addEffect("minecraft:saturation", 300, { amplifier: 255, showParticles: false });
            }
        });
    }
});
ms.world.afterEvents.entityDie.subscribe((event) => {
    if (event.deadEntity instanceof ms.Player) {
        // set them on scoreboard
        ms.world.scoreboard.getObjective("hardcorePlus.save.deadPlayers").addScore(event.deadEntity.name + "\ue1ff\ue1ff\ue1ff" + (Math.round(Math.floor(event.deadEntity.location.x) + 0.5) - 1) + " " + Math.floor(event.deadEntity.location.y) + " " + (Math.round(Math.floor(event.deadEntity.location.z) + 0.5) - 1) + "\ue1ff\ue1ff\ue1ff" + event.deadEntity.dimension.id, 1);
        // drop skull fragment with lore instructions.
        let soulSkullFragment = new ms.ItemStack("hardcoreplus:soul_skull_fragment", 1);
        soulSkullFragment.setLore(["You need to craft a ", "skull, using 2 more of ", "these skull fragments, and rename ", "it to the players name, ", "come back here holding the ", "skull, and then once you ", "get close, the revive process ", "should initialize.", "", "This skull fragment belongs to:", event.deadEntity.name]);
        event.deadEntity.dimension.spawnItem(soulSkullFragment, event.deadEntity.location);
    }
});
