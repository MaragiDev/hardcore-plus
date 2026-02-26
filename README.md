# Hardcore+ Addon for Minecraft Bedrock

A high-stakes Hardcore survival system for Minecraft Bedrock Edition. When a player dies, they aren't just out-they become a ghost tethered to their place of death until their teammates can perform a ritual to bring them back.

---

## Key Features

* **Automatic Spectator Mode:** Upon death, players are instantly switched to Spectator mode to witness the world they left behind.
* **Death Persistence:** The script saves the exact coordinates and dimension (Overworld, Nether, or End) where a player fell using a custom scoreboard system.
* **Soul Fragments:** On death, a player drops a **Soul Skull Fragment** containing lore instructions on how to bring them back.
* **The Revival Ritual:** Return to within **15 blocks** of the player's death location while holding a Soul Skull renamed to the fallen player's name.
* **Immersive Effects:** Successful revivals are marked by lightning strikes and custom audio-visual effects.

---

## Crafting Recipes

To revive a fallen comrade, you must craft the necessary components using a Crafting Table.

### 1. Soul Skull Fragment
If you didn't collect the fragment from the death site, you can craft one using this endgame recipe:
* **E**: Echo Shard
* **#**: Diamond
* **N**: Nether Star

| Item | Pattern |
| :--- | :--- |
| **Soul Skull Fragment** | `# E #` |
|  | `E N E` |
|  | `# E #` |

### 2. Soul Skull
Once you have **3 fragments**, combine them to create the Soul Skull.

| Item | Pattern |
| :--- | :--- |
| **Soul Skull** | `F F` |
|  | `F _` |
*(F = Soul Skull Fragment)*

## 📝 Installation & Setup

1.  **Enable Beta APIs:** You must toggle the "Beta APIs" Experimental Gameplay option in your world settings.
2.  **Enable Cheats:** You must enable cheats on your world in order for the addon to operate properly.
3.  **Disable hardcore mode on your world:** The addon automatically emulates hardcore, turning on hardcore mode on your world will break the addon.
